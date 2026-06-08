from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
import urllib.error
import urllib.request


APP_DIR = Path(__file__).resolve().parent
MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")


SYSTEM_PROMPT = """
Ban la chuyen gia content cho seller Viet ban hang tren Shopee, TikTok Shop va Facebook.
Nhiem vu: tao noi dung ban hang ro rang, de copy, dung tieng Viet tu nhien.
Khong noi chung chung. Khong bia thong so san pham. Khong hua hen qua da.
Output bat buoc la JSON hop le voi 4 key: caption, description, hooks, live.
Moi value la string tieng Viet.
""".strip()


def fallback_content(payload):
    product = payload.get("product") or "san pham cua shop"
    customer = payload.get("customer") or "khach mua online"
    pain = payload.get("pain") or "muon chon nhanh nhung so mua khong hop"
    channel = payload.get("channel") or "TikTok Shop"
    benefits = payload.get("benefits") or "de dung, dep, hop nhu cau hang ngay"

    parts = [item.strip() for item in benefits.replace(";", ",").split(",") if item.strip()]
    bullet_lines = "\n".join(f"- {item[:1].upper() + item[1:]}" for item in parts[:5])
    first_benefit = parts[0] if parts else benefits

    return {
        "caption": (
            f"Neu ban dang {pain}, xem thu {product}.\n\n"
            f"Diem dang chu y:\n{bullet_lines}\n\n"
            f"Phu hop cho: {customer}.\n\n"
            "Comment \"minh can\" de shop tu van mau phu hop."
        ),
        "description": (
            f"{product[:1].upper() + product[1:]}\n\n"
            f"Phu hop cho {customer}. San pham tap trung vao nhu cau: {pain}.\n\n"
            f"Diem noi bat:\n{bullet_lines}\n\n"
            "Shop nen bo sung size, mau, chat lieu, hinh that va chinh sach doi tra neu co."
        ),
        "hooks": (
            f"1. Neu ban dang {pain}, xem thu {product} nay.\n\n"
            f"2. 3 ly do {customer} nen can nhac {product}: {first_benefit}.\n\n"
            f"3. Dung chon {product} chi vi re. Hay nhin vao loi ich that truoc."
        ),
        "live": (
            f"Kich ban live ngan cho {channel}\n\n"
            f"1. Mo live: Ai dang tim {product} thi o lai 30 giay.\n\n"
            f"2. Goi van de: Nhieu ban {pain}, nen chon sai rat de phi tien.\n\n"
            f"3. Gioi thieu: Mau nay hop voi {customer}, noi bat o {benefits}.\n\n"
            "4. CTA: Comment so 1 de shop gui thong tin va mau phu hop."
        ),
    }


def extract_output_text(data):
    if isinstance(data, dict) and data.get("output_text"):
        return data["output_text"]

    chunks = []
    for item in data.get("output", []):
        for content in item.get("content", []):
            if content.get("type") in ("output_text", "text"):
                text = content.get("text")
                if text:
                    chunks.append(text)
    return "\n".join(chunks).strip()


def parse_model_json(output_text):
    clean = output_text.strip()
    if clean.startswith("```"):
        clean = clean.strip("`").strip()
        if clean.lower().startswith("json"):
            clean = clean[4:].strip()

    start = clean.find("{")
    end = clean.rfind("}")
    if start != -1 and end != -1:
        clean = clean[start : end + 1]

    return json.loads(clean)


def call_openai(payload):
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return fallback_content(payload), "fallback"

    user_prompt = {
        "product": payload.get("product"),
        "customer": payload.get("customer"),
        "pain": payload.get("pain"),
        "channel": payload.get("channel"),
        "tone": payload.get("tone"),
        "detailLevel": payload.get("detailLevel"),
        "benefits": payload.get("benefits"),
    }

    request_body = {
        "model": MODEL,
        "input": (
            f"{SYSTEM_PROMPT}\n\n"
            "Tao content cho seller tu brief sau. "
            "Chi tra JSON hop le, khong markdown:\n"
            + json.dumps(user_prompt, ensure_ascii=False)
        ),
    }

    request = urllib.request.Request(
        "https://api.openai.com/v1/responses",
        data=json.dumps(request_body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    with urllib.request.urlopen(request, timeout=45) as response:
        data = json.loads(response.read().decode("utf-8"))

    output_text = extract_output_text(data)
    parsed = parse_model_json(output_text)
    return parsed, "openai"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(APP_DIR), **kwargs)

    def do_POST(self):
        if self.path != "/api/generate":
            self.send_error(404)
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            content, mode = call_openai(payload)
            self.respond_json({"mode": mode, "content": content})
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
            self.respond_json(
                {"mode": "fallback", "content": fallback_content(payload if "payload" in locals() else {}), "error": str(error)},
                status=200,
            )
        except Exception as error:
            self.respond_json({"error": str(error)}, status=500)

    def respond_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main():
    port = int(os.environ.get("PORT", "5506"))
    host = os.environ.get("HOST", "0.0.0.0")
    server = ThreadingHTTPServer((host, port), Handler)
    print(f"ShopContentVN AI running at http://{host}:{port}/")
    print("Set OPENAI_API_KEY to enable real AI generation.")
    server.serve_forever()


if __name__ == "__main__":
    main()
