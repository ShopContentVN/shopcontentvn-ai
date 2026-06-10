# ShopContentVN AI MVP

App demo cho seller Viet:

- Nhap ten san pham.
- Chon kenh ban va tone.
- Chon nganh hang va muc tieu noi dung.
- Tao caption, mo ta Shopee, hook video va kich ban livestream.
- Upload 1-3 anh san pham de AI goi y brief.
- Tu dong dung 3 poster san pham 4:5 khong gan thuong hieu cua app.
- Bam vao poster de xem lon, kiem tra roi moi tai xuong.
- AI ket hop anh voi thong tin nguoi dung da nhap de viet gioi thieu san pham day du.
- Tao content chu mien phi, khong can dang nhap.
- Dang nhap Google khi can AI phan tich anh.
- Gioi han 5 luot phan tich anh moi ngay cho moi tai khoan.
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

- `/api/analyze-image`: phan tich anh va tu dien brief.

Content chu va poster template chay mien phi ngay trong app. Neu chua co key,
phan tich anh se dung fallback demo va khong thuc su doc noi dung anh.

Set key tren PowerShell:

```powershell
$env:OPENAI_API_KEY="sk-..."
$env:OPENAI_VISION_MODEL="gpt-4.1-mini"
python server.py
```

Tren Render, them `OPENAI_API_KEY` trong Environment. Khong ghi API key vao `app.js`, `server.py` hoac GitHub.

Google login va quota can Supabase. Xem `SUPABASE_SETUP.md` va chay `supabase.sql`.
