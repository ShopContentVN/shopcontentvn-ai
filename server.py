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
VISION_MODEL = os.environ.get("OPENAI_VISION_MODEL", "gpt-4.1-mini")
FEEDBACK_PATH = APP_DIR / "feedback.csv"
SUPABASE_URL = os.environ.get("SUPABASE_URL", "").rstrip("/")
SUPABASE_ANON_KEY = os.environ.get("SUPABASE_ANON_KEY", "")
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
DAILY_AI_LIMIT = 5


class ApiError(Exception):
    def __init__(self, message, status=400):
        super().__init__(message)
        self.status = status


SYSTEM_PROMPT = """
Bạn là chuyên gia content cho seller Việt bán hàng trên Shopee, TikTok Shop và Facebook.
Nhiệm vụ: tạo nội dung bán hàng rõ ràng, dễ copy, dùng tiếng Việt tự nhiên.
Không nói chung chung. Không bịa thông số sản phẩm. Không hứa hẹn quá đà.
Output bắt buộc là JSON hợp lệ với 4 key: caption, description, hooks, live.
Mỗi value là string tiếng Việt.
""".strip()

VISION_PROMPT = """
Bạn đang phân tích ảnh sản phẩm để hỗ trợ seller Việt viết content.
Chỉ mô tả chi tiết nhìn thấy rõ trong ảnh. Không đoán chất liệu, công dụng, kích thước,
thành phần, thương hiệu, chứng nhận hoặc hiệu quả nếu ảnh không thể hiện chắc chắn.
Trả về JSON hợp lệ, không markdown, với các key:
productName, customer, painPoint, benefits, category, productSummary, visualDetails, confidence, notes.
Mỗi value là string tiếng Việt. benefits là chuỗi 3-5 ý ngăn cách bằng dấu phẩy.
productSummary là đoạn giới thiệu 2-4 câu, kết hợp thông tin người dùng đã nhập với những gì nhìn thấy
trong ảnh. Nếu người dùng đã nhập tên sản phẩm, khách hàng hoặc điểm nổi bật thì phải giữ và bổ sung,
không được thay bằng mô tả chung chung. visualDetails mô tả màu sắc, kiểu dáng, bao bì và chi tiết nhìn thấy.
notes phải nhắc người dùng xác minh các thông tin không thể biết chỉ từ ảnh.
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


def fallback_image_analysis():
    return {
        "productName": "sản phẩm trong ảnh",
        "customer": "khách đang tìm sản phẩm phù hợp nhu cầu cá nhân",
        "painPoint": "chưa biết sản phẩm có phù hợp với nhu cầu thực tế hay không",
        "benefits": "hình ảnh trực quan, dễ giới thiệu, có thể tư vấn theo nhu cầu khách",
        "category": "chưa xác định",
        "productSummary": "Sản phẩm trong ảnh đang được giới thiệu cho khách mua online. Hãy bổ sung tên sản phẩm, đối tượng phù hợp và lợi ích thật để có phần giới thiệu đầy đủ hơn.",
        "visualDetails": "Ảnh sản phẩm do người dùng cung cấp.",
        "confidence": "demo",
        "notes": "Chưa có API Vision nên app chưa thực sự đọc ảnh. Hãy kiểm tra và sửa brief trước khi tạo nội dung.",
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


def supabase_auth_is_configured():
    return bool(SUPABASE_URL and SUPABASE_ANON_KEY)


def supabase_quota_is_configured():
    return bool(supabase_auth_is_configured() and SUPABASE_SERVICE_ROLE_KEY)


def request_json(url, method="GET", headers=None, payload=None, timeout=12):
    data = None if payload is None else json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=data,
        headers=headers or {},
        method=method,
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        raw = response.read().decode("utf-8")
        return json.loads(raw) if raw else None


def verify_supabase_user(authorization_header):
    if not supabase_auth_is_configured():
        raise ApiError("Google login chưa được cấu hình.", 503)

    if not authorization_header or not authorization_header.startswith("Bearer "):
        raise ApiError("Bạn cần đăng nhập Google để dùng AI.", 401)

    access_token = authorization_header.removeprefix("Bearer ").strip()
    try:
        user = request_json(
            f"{SUPABASE_URL}/auth/v1/user",
            headers={
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": f"Bearer {access_token}",
            },
        )
    except urllib.error.HTTPError as error:
        raise ApiError("Phiên đăng nhập không hợp lệ hoặc đã hết hạn.", 401) from error

    if not user or not user.get("id"):
        raise ApiError("Không xác minh được tài khoản.", 401)
    return user


def call_quota_rpc(function_name, user_id, daily_limit=DAILY_AI_LIMIT):
    if not supabase_quota_is_configured():
        raise ApiError("Giới hạn AI chưa được cấu hình.", 503)

    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Content-Type": "application/json",
    }
    if not SUPABASE_SERVICE_ROLE_KEY.startswith("sb_secret_"):
        headers["Authorization"] = f"Bearer {SUPABASE_SERVICE_ROLE_KEY}"

    try:
        result = request_json(
            f"{SUPABASE_URL}/rest/v1/rpc/{function_name}",
            method="POST",
            headers=headers,
            payload={"p_user_id": user_id, "p_daily_limit": daily_limit},
        )
    except urllib.error.HTTPError as error:
        raise ApiError("Không kiểm tra được giới hạn sử dụng.", 503) from error

    if isinstance(result, (int, float)):
        return int(result)
    raise ApiError("Dữ liệu giới hạn sử dụng không hợp lệ.", 503)


def consume_daily_quota(user_id):
    remaining = call_quota_rpc("consume_daily_ai_quota", user_id)
    if remaining < 0:
        raise ApiError("Bạn đã dùng hết 5 lượt phân tích ảnh hôm nay.", 429)
    return remaining


def get_daily_quota(user_id):
    return max(0, call_quota_rpc("get_daily_ai_remaining", user_id))


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


def call_openai_vision(payload):
    images = payload.get("images") or []
    if not isinstance(images, list) or not 1 <= len(images) <= 3:
        raise ValueError("Cần từ 1 đến 3 ảnh.")

    total_size = sum(len(str(image)) for image in images)
    if total_size > 16_000_000:
        raise ValueError("Tổng dung lượng ảnh quá lớn.")

    for image in images:
        if not isinstance(image, str) or not image.startswith(
            ("data:image/jpeg;base64,", "data:image/png;base64,", "data:image/webp;base64,")
        ):
            raise ValueError("Định dạng ảnh không hợp lệ.")

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return fallback_image_analysis(), "demo"

    current_brief = payload.get("currentBrief") or {}
    prompt = (
        f"{VISION_PROMPT}\n\n"
        "Thông tin người dùng đã nhập, phải ưu tiên giữ lại và làm đầy đủ hơn:\n"
        + json.dumps(current_brief, ensure_ascii=False)
    )
    content = [{"type": "input_text", "text": prompt}]
    content.extend(
        {"type": "input_image", "image_url": image, "detail": "low"}
        for image in images
    )

    request_body = {
        "model": VISION_MODEL,
        "input": [{"role": "user", "content": content}],
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

    with urllib.request.urlopen(request, timeout=25) as response:
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

    def do_GET(self):
        if self.path == "/api/config":
            self.respond_json(
                {
                    "supabaseUrl": SUPABASE_URL,
                    "supabaseAnonKey": SUPABASE_ANON_KEY,
                    "authConfigured": supabase_auth_is_configured(),
                    "quotaConfigured": supabase_quota_is_configured(),
                    "dailyAiLimit": DAILY_AI_LIMIT,
                }
            )
            return

        if self.path == "/api/quota":
            try:
                user = verify_supabase_user(self.headers.get("Authorization"))
                self.respond_json(
                    {
                        "remaining": get_daily_quota(user["id"]),
                        "limit": DAILY_AI_LIMIT,
                    }
                )
            except ApiError as error:
                self.respond_json({"error": str(error)}, status=error.status)
            return

        super().do_GET()

    def do_POST(self):
        if self.path not in ("/api/generate", "/api/feedback", "/api/analyze-image"):
            self.send_error(404)
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length > 20_000_000:
                raise ApiError("Dữ liệu gửi lên quá lớn.", 413)
            payload = json.loads(self.rfile.read(length).decode("utf-8"))

            if self.path == "/api/feedback":
                self.respond_json(save_feedback(payload))
                return

            if self.path == "/api/analyze-image":
                user = verify_supabase_user(self.headers.get("Authorization"))
                remaining = consume_daily_quota(user["id"])
                analysis, mode = call_openai_vision(payload)
                self.respond_json(
                    {
                        "mode": mode,
                        "analysis": analysis,
                        "remaining": remaining,
                    }
                )
                return

            self.respond_json(
                {
                    "mode": "free",
                    "content": fallback_content(payload),
                    "remaining": None,
                }
            )
        except ApiError as error:
            self.respond_json({"error": str(error)}, status=error.status)
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
            if self.path == "/api/analyze-image":
                self.respond_json(
                    {
                        "mode": "demo",
                        "analysis": fallback_image_analysis(),
                        "remaining": remaining if "remaining" in locals() else None,
                        "error": str(error),
                    },
                    status=200,
                )
                return
            self.respond_json(
                {
                    "mode": "fallback",
                    "content": fallback_content(payload if "payload" in locals() else {}),
                    "remaining": remaining if "remaining" in locals() else None,
                    "error": str(error),
                },
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
