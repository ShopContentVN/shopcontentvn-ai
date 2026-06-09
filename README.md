# ShopContentVN AI MVP

App demo cho seller Viet:

- Nhap ten san pham.
- Chon kenh ban va tone.
- Tao caption, mo ta Shopee, hook video va kich ban livestream.
- Upload 1-3 anh san pham de AI goi y brief.
- Copy tung phan hoac copy tat ca.

Chay local:

```bash
python server.py
```

Mo:

```text
http://127.0.0.1:5506/
```

Neu co `OPENAI_API_KEY`, backend se goi OpenAI qua:

- `/api/generate`: tao content.
- `/api/analyze-image`: phan tich anh va tu dien brief.

Neu chua co key, app tu chay fallback demo de khong bi chet flow. Che do demo khong thuc su doc noi dung anh.

Set key tren PowerShell:

```powershell
$env:OPENAI_API_KEY="sk-..."
$env:OPENAI_VISION_MODEL="gpt-4.1-mini"
python server.py
```

Tren Render, them `OPENAI_API_KEY` trong Environment. Khong ghi API key vao `app.js`, `server.py` hoac GitHub.
