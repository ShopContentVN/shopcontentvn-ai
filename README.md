# ShopContentVN AI MVP

App demo cho seller Viet:

- Nhap ten san pham.
- Chon kenh ban va tone.
- Tao caption, mo ta Shopee, hook video va kich ban livestream.
- Copy tung phan hoac copy tat ca.

Chay local:

```bash
python server.py
```

Mo:

```text
http://127.0.0.1:5506/
```

Neu co `OPENAI_API_KEY`, backend se goi OpenAI qua `/api/generate`. Neu chua co key, app tu chay fallback demo de khong bi chet flow.

Set key tren PowerShell:

```powershell
$env:OPENAI_API_KEY="sk-..."
python server.py
```
