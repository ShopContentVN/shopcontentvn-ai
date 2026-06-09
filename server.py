from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import csv
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import urllib.error
import urllib.request


APP_DIR = Path(__file__).resolve().parent
MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")
FEEDBACK_PATH = APP_DIR / "feedback.csv"


SYSTEM_PROMPT = """
Bạn là chuyên gia content cho seller Việt bán hàng trên Shopee, TikTok Shop và Facebook.
Nhiệm vụ: tạo nội dung bán hàng rõ ràng, dễ copy, dùng tiếng Việt tự nhiên.
Không nói chung chung. Không bịa thông số sản phẩm. Không hứa hẹn quá đà.
Output bắt buộc là JSON hợp lệ với 4 key: caption, description, hooks, live.
Mỗi value là string tiếng Việt.
""".strip()


def fallback_content(payload):
    product = payload.get("product") or "sản phẩm của shop"
    customer = payload.get("customer") or "khách mua online"
    pain = payload.get("pain") or "muốn chọn nhanh nhưng sợ mua không hợp"
    channel = payload.get("channel") or "TikTok Shop"
    benefits = payload.get("benefits") or "dễ dùng, đẹp, hợp nhu cầu hằng ngày"

    parts = [item.strip() for item in benefits.replace(";", ",").split(",") if item.strip()]
    bullet_lines = "\n".join(f"- {item[:1].upper() + item[1:]}" for item in parts[:5])
    first_benefit = parts[0] if parts else benefits

    return {
        "caption": (
            f"Nếu bạn đang {pain}, xem thử {product}.\n\n"
            f"Điểm đáng chú ý:\n{bullet_lines}\n\n"
            f"Phù hợp cho: {customer}.\n\n"
            "Comment \"mình cần\" để shop tư vấn mẫu phù hợp."
        ),
        "description": (
            f"{product[:1].upper() + product[1:]}\n\n"
            f"Phù hợp cho {customer}. Sản phẩm tập trung vào nhu cầu: {pain}.\n\n"
            f"Điểm nổi bật:\n{bullet_lines}\n\n"
            "Shop nên bổ sung size, màu, chất liệu, hình thật và chính sách đổi trả nếu có."
        ),
        "hooks": (
            f"1. Nếu bạn đang {pain}, xem thử {product} này.\n\n"
            f"2. 3 lý do {customer} nên cân nhắc {product}: {first_benefit}.\n\n"
            f"3. Đừng chọn {product} chỉ vì rẻ. Hãy nhìn vào lợi ích thật trước."
        ),
        "live": (
            f"Kịch bản live ngắn cho {channel}\n\n"
            f"1. Mở live: Ai đang tìm {product} thì ở lại 30 giây.\n\n"
            f"2. Gọi vấn đề: Nhiều bạn {pain}, nên chọn sai rất dễ phí tiền.\n\n"
            f"3. Giới thiệu: Mẫu này hợp với {customer}, nổi bật ở {benefits}.\n\n"
            "4. CTA: Comment số 1 để shop gửi thông tin và mẫu phù hợp."
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

    with urllib.request.urlopen(request, timeout=10) as response:
        data = json.loads(response.read().decode("utf-8"))

    output_text = extract_output_text(data)
    parsed = parse_model_json(output_text)
    return parsed, "openai"


def save_feedback(payload):
    row = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "category": str(payload.get("category") or "").strip(),
        "pain": str(payload.get("pain") or "").strip(),
        "contact": str(payload.get("contact") or "").strip(),
    }

    is_new = not FEEDBACK_PATH.exists()
    with FEEDBACK_PATH.open("a", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=row.keys())
        if is_new:
            writer.writeheader()
        writer.writerow(row)

    return {"saved": True}


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(APP_DIR), **kwargs)

    def do_POST(self):
        if self.path not in ("/api/generate", "/api/feedback"):
            self.send_error(404)
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(length).decode("utf-8"))

            if self.path == "/api/feedback":
                self.respond_json(save_feedback(payload))
                return

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
