# ShopContentVN AI - Auto Backup

Last updated: 2026-06-08 13:43:17

## Project

MVP app for Vietnamese sellers. Input product details, then generate caption, Shopee description, video hooks, and livestream script.

Local URL:

```text
http://127.0.0.1:5506/
```

Run:

```powershell
python server.py
```

Run with OpenAI key:

```powershell
$env:OPENAI_API_KEY="sk-..."
python server.py
```

## Source Snapshot

### index.html

```html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ShopContentVN AI</title>
    <meta name="description" content="AI content studio cho seller Viet: tao caption TikTok, mo ta Shopee, hook video va kich ban livestream." />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="#top" aria-label="ShopContentVN AI">
        <span class="brand-logo">SC</span>
        <span>
          <strong>ShopContentVN</strong>
          <small>AI Studio cho seller Việt</small>
        </span>
      </a>
      <nav class="site-nav" aria-label="Điều hướng">
        <a href="#templates">Templates</a>
        <a href="#tool">Studio</a>
        <a href="#examples">Ví dụ</a>
        <a href="#submit">Góp ý</a>
        <button type="button" id="copyAllTop" class="ghost-button">Copy output</button>
      </nav>
    </header>

    <main id="top">
      <section class="hero">
        <div class="hero-stage">
          <div class="hero-copy">
            <p class="eyebrow">Public beta · miễn phí cho seller nhỏ</p>
            <h1>Biến một tên sản phẩm thành cả bộ nội dung bán hàng.</h1>
            <p class="hero-subtitle">
              Chọn tình huống, nhập vài dòng brief, rồi lấy caption TikTok, mô tả Shopee,
              hook video và kịch bản livestream có thể copy dùng ngay.
            </p>
            <div class="hero-actions">
              <a class="primary-link" href="#tool">Mở Content Studio</a>
              <button type="button" id="fillDemo" class="secondary-button">Chạy demo mẫu</button>
            </div>
          </div>

          <div class="hero-console" aria-label="Preview sản phẩm">
            <div class="console-top">
              <span></span><span></span><span></span>
              <strong>ShopContentVN Workspace</strong>
            </div>
            <div class="console-body">
              <aside class="console-rail">
                <b>01</b>
                <b>02</b>
                <b>03</b>
              </aside>
              <div class="console-main">
                <div class="prompt-card">
                  <span>Brief</span>
                  <strong>Kem chống nắng cho da dầu</strong>
                  <p>Khách sợ bóng mặt, bí da, nặng mặt khi dùng hằng ngày.</p>
                </div>
                <div class="mini-grid">
                  <article>
                    <span>Caption</span>
                    <p>Nếu bạn bôi chống nắng mà mặt luôn bóng dầu...</p>
                  </article>
                  <article>
                    <span>Hook video</span>
                    <p>3 dấu hiệu kem chống nắng không hợp da dầu.</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-strip" aria-label="Tính năng chính">
          <article>
            <span>Template hub</span>
            <strong>Chọn tình huống trước</strong>
          </article>
          <article>
            <span>AI studio</span>
            <strong>Viết lại theo sản phẩm</strong>
          </article>
          <article>
            <span>Output</span>
            <strong>Copy từng phần</strong>
          </article>
          <article>
            <span>Data</span>
            <strong>Gom nhu cầu seller</strong>
          </article>
        </div>
      </section>

      <section id="templates" class="template-hub">
        <div class="section-head">
          <div>
            <p class="eyebrow">Template marketplace</p>
            <h2>Không bắt seller nghĩ từ trang trắng.</h2>
          </div>
          <p>
            App phải cho người dùng cảm giác có một kho công thức thật. Bấm template là brief
            tự đổi theo tình huống, sau đó AI viết lại theo sản phẩm của shop.
          </p>
        </div>

        <div class="template-grid" aria-label="Thư viện template">
          <button type="button" class="template-card active" data-template="problem">
            <span class="template-index">01</span>
            <strong>Mở bằng vấn đề</strong>
            <small>Đánh đúng nỗi đau khách trước khi nói tới sản phẩm.</small>
            <em>Skincare · đồ gia dụng · thời trang</em>
          </button>
          <button type="button" class="template-card" data-template="comparison">
            <span class="template-index">02</span>
            <strong>So sánh trước/sau</strong>
            <small>Hợp video TikTok, review sản phẩm, biến đổi rõ ràng.</small>
            <em>Video ngắn · review · before/after</em>
          </button>
          <button type="button" class="template-card" data-template="threeReasons">
            <span class="template-index">03</span>
            <strong>3 lý do nên mua</strong>
            <small>Gọn, rõ lợi ích, dễ dùng cho caption và mô tả.</small>
            <em>Caption · mô tả · landing</em>
          </button>
          <button type="button" class="template-card" data-template="livestream">
            <span class="template-index">04</span>
            <strong>Livestream chốt đơn</strong>
            <small>Mở live, gọi vấn đề, chốt lợi ích, kêu comment.</small>
            <em>Live TikTok · Shopee Live</em>
          </button>
          <button type="button" class="template-card" data-template="shopee">
            <span class="template-index">05</span>
            <strong>Mô tả Shopee rõ ràng</strong>
            <small>Biến mô tả khô thành nội dung dễ đọc, dễ tư vấn.</small>
            <em>Shopee · TikTok Shop</em>
          </button>
          <button type="button" class="template-card" data-template="comment">
            <span class="template-index">06</span>
            <strong>Câu kéo comment</strong>
            <small>Tạo CTA để khách hỏi size, màu, giá, mẫu phù hợp.</small>
            <em>Comment · inbox · tư vấn</em>
          </button>
        </div>
      </section>

      <section id="tool" class="studio-shell">
        <aside class="studio-panel left-panel">
          <div class="panel-title">
            <p class="eyebrow">Creator OS</p>
            <h2>Quy trình 3 bước</h2>
          </div>
          <div class="workflow-list">
            <article class="active">
              <b>1</b>
              <div>
                <strong>Chọn template</strong>
                <span>Lấy khung theo tình huống bán hàng.</span>
              </div>
            </article>
            <article>
              <b>2</b>
              <div>
                <strong>Nhập brief</strong>
                <span>Tên sản phẩm, khách hàng, vấn đề, lợi ích.</span>
              </div>
            </article>
            <article>
              <b>3</b>
              <div>
                <strong>Copy output</strong>
                <span>Caption, Shopee, hook, livestream.</span>
              </div>
            </article>
          </div>

          <div class="insight-card">
            <span>Beta signal</span>
            <strong>Seller không cần AI chung chung.</strong>
            <p>Họ cần template đúng cảnh bán hàng, output ngắn, rõ, copy được liền.</p>
          </div>
        </aside>

        <form id="generatorForm" class="brief-card">
          <div class="card-head">
            <div>
              <p class="eyebrow">Product brief</p>
              <h2>Nhập thông tin sản phẩm</h2>
            </div>
            <button type="button" id="clearForm" class="text-button">Reset</button>
          </div>

          <div class="quality-card">
            <div>
              <span>Độ rõ brief</span>
              <strong id="briefQuality">Sẵn sàng</strong>
            </div>
            <div class="quality-bar"><span id="briefQualityBar"></span></div>
          </div>

          <div id="examples" class="preset-row" aria-label="Sản phẩm mẫu">
            <button type="button" data-sample="shirt">Áo thun nữ</button>
            <button type="button" data-sample="sunscreen">Kem chống nắng</button>
            <button type="button" data-sample="lamp">Đèn livestream</button>
          </div>

          <label class="field">
            <span>Tên sản phẩm</span>
            <input id="productName" name="productName" type="text" placeholder="Ví dụ: áo thun nữ form rộng" required autocomplete="off" />
          </label>

          <div class="field-grid">
            <label class="field">
              <span>Khách hàng</span>
              <input id="customer" name="customer" type="text" placeholder="Ví dụ: nữ 18-28 tuổi" autocomplete="off" />
            </label>

            <label class="field">
              <span>Kênh bán</span>
              <select id="channel" name="channel">
                <option value="TikTok Shop">TikTok Shop</option>
                <option value="Shopee">Shopee</option>
                <option value="Facebook">Facebook</option>
              </select>
            </label>
          </div>

          <label class="field">
            <span>Vấn đề của khách</span>
            <input id="painPoint" name="painPoint" type="text" placeholder="Ví dụ: muốn mặc đẹp nhưng sợ lộ bụng" autocomplete="off" />
          </label>

          <label class="field">
            <span>Điểm nổi bật</span>
            <input id="benefits" name="benefits" type="text" placeholder="Ví dụ: che dáng, chất mềm, dễ phối đồ" autocomplete="off" />
          </label>

          <div class="field-grid">
            <label class="field">
              <span>Tone nội dung</span>
              <select id="tone" name="tone">
                <option value="friendly">Vui vẻ, gần gũi</option>
                <option value="premium">Chuyên nghiệp</option>
                <option value="trend">Bắt trend</option>
                <option value="short">Ngắn gọn</option>
              </select>
            </label>

            <label class="field">
              <span>Mức chi tiết</span>
              <select id="detailLevel" name="detailLevel">
                <option value="balanced">Vừa đủ</option>
                <option value="short">Rất ngắn</option>
                <option value="rich">Nhiều ý</option>
              </select>
            </label>
          </div>

          <button type="submit" id="generateButton" class="generate-button">
            <span>Tạo bộ nội dung</span>
            <b>Generate</b>
          </button>
        </form>

        <section class="result-card" aria-live="polite">
          <div class="card-head">
            <div>
              <p class="eyebrow">Generated workspace</p>
              <h2>Output sẵn để đăng</h2>
            </div>
            <button type="button" id="copyAll" class="text-button">Copy tất cả</button>
          </div>

          <div class="loading" id="loadingState" hidden>
            <div class="loader"></div>
            <span>Đang dựng caption, mô tả, hook và kịch bản...</span>
          </div>

          <div class="output-grid" id="outputGrid">
            <article class="output-card highlight">
              <div class="output-head">
                <div>
                  <span class="tag">01</span>
                  <strong>Caption TikTok/Facebook</strong>
                </div>
                <button type="button" class="copy-button" data-copy="captionOutput">Copy</button>
              </div>
              <pre id="captionOutput">Nhập sản phẩm rồi bấm "Tạo bộ nội dung".</pre>
            </article>

            <article class="output-card">
              <div class="output-head">
                <div>
                  <span class="tag">02</span>
                  <strong>Mô tả Shopee</strong>
                </div>
                <button type="button" class="copy-button" data-copy="descriptionOutput">Copy</button>
              </div>
              <pre id="descriptionOutput">Mô tả sản phẩm sẽ nằm ở đây.</pre>
            </article>

            <article class="output-card">
              <div class="output-head">
                <div>
                  <span class="tag">03</span>
                  <strong>Hook video</strong>
                </div>
                <button type="button" class="copy-button" data-copy="hooksOutput">Copy</button>
              </div>
              <pre id="hooksOutput">App sẽ gợi ý 3-5 câu mở đầu video.</pre>
            </article>

            <article class="output-card">
              <div class="output-head">
                <div>
                  <span class="tag">04</span>
                  <strong>Kịch bản livestream</strong>
                </div>
                <button type="button" class="copy-button" data-copy="liveOutput">Copy</button>
              </div>
              <pre id="liveOutput">Kịch bản live ngắn sẽ nằm ở đây.</pre>
            </article>
          </div>
        </section>
      </section>

      <section class="example-section">
        <div class="section-head compact">
          <div>
            <p class="eyebrow">Before / After</p>
            <h2>Người dùng cần thấy app giúp họ tốt hơn thật.</h2>
          </div>
        </div>
        <div class="before-after-grid">
          <article>
            <span>Trước</span>
            <p>Kem chống nắng cho da dầu. Mỏng nhẹ, không bí da, dùng hằng ngày.</p>
          </article>
          <article class="after">
            <span>Sau</span>
            <p>Nếu bôi chống nắng mà mặt cứ bóng dầu sau 1 tiếng, thử loại mỏng nhẹ, ráo mặt, không bí da này. Hợp cho da dầu dùng mỗi ngày.</p>
          </article>
          <article class="after">
            <span>Hook video</span>
            <p>3 dấu hiệu kem chống nắng của bạn đang làm da dầu bí hơn.</p>
          </article>
        </div>
      </section>

      <section id="submit" class="submit-panel">
        <div>
          <p class="eyebrow">Seller request board</p>
          <h2>Cho seller gửi vấn đề, mình biến thành template mới.</h2>
          <p>
            Đây là phần làm app khác một tool demo. Người dùng gửi ngành hàng và vấn đề họ hay bí,
            mình gom dữ liệu để cập nhật template theo nhu cầu thật.
          </p>
        </div>
        <form id="feedbackForm" class="feedback-form">
          <label class="field">
            <span>Ngành hàng</span>
            <input name="category" type="text" placeholder="Ví dụ: skincare, thời trang, đồ gia dụng" autocomplete="off" />
          </label>
          <label class="field">
            <span>Bạn hay bí phần nào?</span>
            <input name="pain" type="text" placeholder="Ví dụ: mở đầu video, mô tả Shopee, caption chốt đơn" autocomplete="off" />
          </label>
          <label class="field">
            <span>Email/Zalo nếu muốn nhận bản update</span>
            <input name="contact" type="text" placeholder="Không bắt buộc" autocomplete="off" />
          </label>
          <button type="submit" class="generate-button">
            <span>Gửi góp ý</span>
            <b>Submit</b>
          </button>
        </form>
      </section>
    </main>

    <div id="toast" role="status" aria-live="polite"></div>
    <script src="./app.js"></script>
  </body>
</html>
```

### styles.css

```css
:root {
  color-scheme: dark;
  --bg: #06080d;
  --bg-2: #0b1118;
  --panel: rgba(14, 20, 29, 0.82);
  --panel-solid: #101722;
  --panel-soft: rgba(255, 255, 255, 0.055);
  --line: rgba(255, 255, 255, 0.12);
  --line-strong: rgba(255, 255, 255, 0.22);
  --text: #f7fbff;
  --muted: #9dabba;
  --soft: #d8e4ed;
  --green: #20f5a6;
  --cyan: #45d8ff;
  --yellow: #fff06a;
  --pink: #ff5fa2;
  --orange: #ff9c55;
  --shadow: 0 28px 90px rgba(0, 0, 0, 0.46);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background:
    linear-gradient(120deg, rgba(32, 245, 166, 0.2), transparent 26%),
    linear-gradient(240deg, rgba(255, 95, 162, 0.18), transparent 22%),
    linear-gradient(180deg, #0b1118 0%, #05070b 38%, #070b10 100%);
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, black, transparent 86%);
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

.site-header,
main {
  position: relative;
  z-index: 1;
  width: min(1240px, calc(100% - 36px));
  margin: 0 auto;
}

.site-header {
  min-height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.brand,
.site-nav,
.hero-actions,
.card-head,
.output-head,
.workflow-list article,
.quality-card > div:first-child {
  display: flex;
  align-items: center;
}

.brand {
  gap: 12px;
}

.brand-logo {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: #06100c;
  background: linear-gradient(135deg, var(--green), var(--cyan));
  font-weight: 950;
  box-shadow: 0 0 36px rgba(32, 245, 166, 0.28);
}

.brand strong,
.brand small,
.metrics span,
.metrics strong {
  display: block;
}

.brand small,
.preview-panel span,
.quality-card span,
.template-card small,
.workflow-list span,
.insight-card p,
.section-head p,
.submit-panel p {
  color: var(--muted);
}

.brand small {
  margin-top: 2px;
  font-size: 12px;
}

.site-nav {
  gap: 8px;
}

.site-nav a,
.ghost-button,
.secondary-button,
.text-button,
.copy-button,
.preset-row button {
  border: 1px solid var(--line);
  color: var(--text);
  background: rgba(255, 255, 255, 0.055);
  backdrop-filter: blur(12px);
}

.site-nav a,
.ghost-button {
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0 14px;
  font-weight: 850;
}

.ghost-button {
  color: var(--green);
}

.hero {
  padding: 20px 0 18px;
}

.hero-stage {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(480px, 1.05fr);
  gap: 18px;
  align-items: stretch;
}

.hero-copy,
.hero-console,
.template-hub,
.studio-panel,
.brief-card,
.result-card,
.submit-panel,
.example-section,
.hero-strip article {
  border: 1px solid var(--line);
  background: var(--panel);
  box-shadow: var(--shadow);
  backdrop-filter: blur(22px);
}

.hero-copy {
  position: relative;
  overflow: hidden;
  min-height: 590px;
  border-radius: 30px;
  padding: clamp(30px, 5vw, 60px);
  background:
    linear-gradient(135deg, rgba(32, 245, 166, 0.2), transparent 42%),
    linear-gradient(160deg, rgba(255, 255, 255, 0.09), transparent 32%),
    rgba(12, 18, 27, 0.9);
}

.hero-copy::before {
  content: "SHOP CONTENT VN";
  position: absolute;
  left: 36px;
  bottom: 28px;
  color: rgba(255, 255, 255, 0.045);
  font-size: clamp(58px, 7vw, 110px);
  font-weight: 950;
  line-height: 0.86;
  max-width: 740px;
}

.eyebrow {
  margin: 0 0 12px;
  color: var(--green);
  font-size: 12px;
  font-weight: 950;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1,
h2,
p {
  letter-spacing: 0;
}

h1,
h2 {
  margin: 0;
}

h1 {
  position: relative;
  max-width: 780px;
  font-size: clamp(44px, 5vw, 68px);
  line-height: 0.98;
}

h2 {
  font-size: 26px;
}

.hero-subtitle {
  position: relative;
  max-width: 680px;
  margin: 22px 0 0;
  color: var(--soft);
  font-size: 18px;
  line-height: 1.7;
}

.hero-actions {
  position: relative;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 30px;
}

.primary-link,
.secondary-button,
.generate-button {
  min-height: 56px;
  border-radius: 15px;
  font-weight: 950;
}

.primary-link,
.generate-button {
  border: 0;
  color: #07110d;
  background: linear-gradient(135deg, var(--green), var(--yellow));
  box-shadow: 0 18px 46px rgba(32, 245, 166, 0.16);
}

.primary-link {
  display: inline-flex;
  align-items: center;
  padding: 0 22px;
}

.secondary-button {
  padding: 0 18px;
}

.hero-console {
  overflow: hidden;
  min-height: 590px;
  border-radius: 30px;
  background:
    linear-gradient(145deg, rgba(69, 216, 255, 0.14), transparent 42%),
    linear-gradient(315deg, rgba(255, 95, 162, 0.11), transparent 30%),
    #090d13;
}

.console-top {
  min-height: 54px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--line);
  padding: 0 18px;
}

.console-top span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--pink);
}

.console-top span:nth-child(2) {
  background: var(--yellow);
}

.console-top span:nth-child(3) {
  background: var(--green);
}

.console-top strong {
  margin-left: 8px;
  color: var(--soft);
  font-size: 13px;
}

.console-body {
  display: grid;
  grid-template-columns: 74px 1fr;
  gap: 18px;
  padding: 20px;
}

.console-rail {
  display: grid;
  gap: 12px;
  align-content: start;
}

.console-rail b {
  height: 54px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 16px;
  color: #06100c;
  background: var(--green);
}

.console-rail b:nth-child(2) {
  color: var(--text);
  background: rgba(255, 255, 255, 0.08);
}

.console-rail b:nth-child(3) {
  color: var(--text);
  background: rgba(255, 255, 255, 0.08);
}

.console-main {
  display: grid;
  gap: 16px;
}

.prompt-card,
.mini-grid article {
  border: 1px solid var(--line);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.065);
}

.prompt-card {
  min-height: 230px;
  padding: 24px;
}

.prompt-card span,
.mini-grid span,
.template-card em,
.before-after-grid span,
.insight-card span {
  color: var(--green);
  font-size: 12px;
  font-style: normal;
  font-weight: 950;
  text-transform: uppercase;
}

.prompt-card strong {
  display: block;
  max-width: 520px;
  margin-top: 14px;
  font-size: clamp(30px, 4vw, 54px);
  line-height: 0.96;
}

.prompt-card p,
.mini-grid p {
  color: var(--soft);
  line-height: 1.6;
}

.prompt-card p {
  max-width: 520px;
  font-size: 17px;
}

.mini-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.mini-grid article {
  min-height: 170px;
  padding: 18px;
}

.hero-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 14px;
}

.hero-strip article {
  border-radius: 18px;
  padding: 18px;
}

.hero-strip span {
  color: var(--muted);
  font-size: 13px;
}

.hero-strip strong {
  display: block;
  margin-top: 7px;
  font-size: 18px;
}

.template-hub,
.submit-panel,
.example-section {
  border-radius: 28px;
  padding: 28px;
  margin: 18px 0;
}

.section-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
  gap: 20px;
  align-items: end;
  margin-bottom: 20px;
}

.section-head.compact {
  grid-template-columns: 1fr;
}

.section-head h2,
.submit-panel h2 {
  max-width: 820px;
  font-size: clamp(32px, 4.2vw, 56px);
  line-height: 1.02;
}

.section-head p,
.submit-panel p {
  margin: 0;
  line-height: 1.65;
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.template-card {
  min-height: 196px;
  display: grid;
  align-content: start;
  gap: 11px;
  border: 1px solid var(--line);
  border-radius: 22px;
  color: var(--text);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.09), transparent 52%),
    rgba(14, 20, 29, 0.92);
  padding: 20px;
  text-align: left;
  transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
}

.template-card:hover,
.template-card.active {
  transform: translateY(-3px);
  border-color: rgba(32, 245, 166, 0.58);
  background:
    linear-gradient(135deg, rgba(32, 245, 166, 0.16), transparent 54%),
    rgba(14, 20, 29, 0.98);
}

.template-index,
.tag {
  color: #06100c;
  background: var(--green);
  font-weight: 950;
}

.template-index {
  width: fit-content;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
}

.template-card strong {
  font-size: 20px;
}

.template-card small {
  font-size: 14px;
  line-height: 1.55;
}

.template-card em {
  color: var(--yellow);
  text-transform: none;
}

.studio-shell {
  display: grid;
  grid-template-columns: 280px minmax(360px, 430px) minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  margin: 18px 0;
}

.studio-panel,
.brief-card,
.result-card {
  border-radius: 26px;
  padding: 22px;
}

.panel-title {
  margin-bottom: 18px;
}

.workflow-list {
  display: grid;
  gap: 10px;
}

.workflow-list article {
  gap: 12px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.045);
  padding: 13px;
}

.workflow-list article.active {
  border-color: rgba(32, 245, 166, 0.5);
  background: rgba(32, 245, 166, 0.09);
}

.workflow-list b {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  border-radius: 11px;
  color: #06100c;
  background: var(--yellow);
}

.workflow-list span,
.insight-card p {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.45;
}

.insight-card {
  margin-top: 16px;
  border: 1px solid rgba(255, 240, 106, 0.26);
  border-radius: 20px;
  background: rgba(255, 240, 106, 0.07);
  padding: 16px;
}

.insight-card strong {
  display: block;
  margin-top: 8px;
  line-height: 1.25;
}

.card-head {
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 18px;
}

.text-button,
.copy-button {
  min-height: 38px;
  border-radius: 12px;
  padding: 0 12px;
  color: var(--green);
  font-weight: 900;
}

.quality-card {
  display: grid;
  gap: 12px;
  border: 1px solid rgba(32, 245, 166, 0.26);
  border-radius: 18px;
  padding: 15px;
  background: rgba(32, 245, 166, 0.08);
  margin-bottom: 16px;
}

.quality-card > div:first-child {
  justify-content: space-between;
}

#briefQuality {
  color: var(--green);
}

.quality-bar {
  height: 9px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
}

.quality-bar span {
  display: block;
  width: 42%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--green), var(--yellow));
  transition: width 180ms ease;
}

.preset-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.preset-row button {
  min-height: 38px;
  border-radius: 999px;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 850;
}

.field,
.field-grid {
  display: grid;
  gap: 9px;
}

.field {
  margin-bottom: 16px;
}

.field-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.field span {
  color: #ecf6fc;
  font-size: 14px;
  font-weight: 850;
}

input,
select {
  width: 100%;
  min-height: 54px;
  border: 1px solid var(--line-strong);
  border-radius: 14px;
  color: var(--text);
  background: rgba(5, 8, 12, 0.88);
  outline: none;
  padding: 0 14px;
}

input:focus,
select:focus {
  border-color: var(--green);
  box-shadow: 0 0 0 4px rgba(32, 245, 166, 0.13);
}

.generate-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 18px;
  font-size: 16px;
}

.generate-button b {
  color: rgba(6, 16, 12, 0.7);
  font-size: 12px;
  text-transform: uppercase;
}

.loading {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(32, 245, 166, 0.24);
  border-radius: 16px;
  color: #d8fff0;
  background: rgba(32, 245, 166, 0.09);
  padding: 13px;
  margin-bottom: 14px;
  font-weight: 850;
}

.loader {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.22);
  border-top-color: var(--green);
  border-radius: 50%;
  animation: spin 700ms linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.output-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.output-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: rgba(16, 23, 34, 0.95);
}

.output-card.highlight {
  background:
    linear-gradient(135deg, rgba(32, 245, 166, 0.13), transparent 44%),
    rgba(16, 23, 34, 0.98);
}

.output-head {
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid var(--line);
  padding: 14px 15px;
}

.output-head > div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.output-head strong {
  font-size: 14px;
}

.tag {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  font-size: 12px;
}

pre {
  margin: 0;
  min-height: 190px;
  white-space: pre-wrap;
  color: #f4fbff;
  font: 560 14px/1.68 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  padding: 16px;
}

.before-after-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr 1fr;
  gap: 14px;
}

.before-after-grid article {
  min-height: 170px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
}

.before-after-grid article.after {
  border-color: rgba(32, 245, 166, 0.34);
  background: rgba(32, 245, 166, 0.08);
}

.before-after-grid p {
  color: var(--soft);
  font-size: 17px;
  line-height: 1.65;
}

.submit-panel {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1fr);
  gap: 22px;
  align-items: start;
  margin-bottom: 56px;
}

.feedback-form {
  border: 1px solid var(--line);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.055);
  padding: 18px;
}

#toast {
  position: fixed;
  z-index: 3;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%) translateY(12px);
  opacity: 0;
  pointer-events: none;
  border-radius: 999px;
  color: #06100c;
  background: var(--green);
  padding: 11px 16px;
  font-weight: 950;
  transition: 180ms ease;
}

#toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

@media (max-width: 1160px) {
  .hero-stage,
  .studio-shell {
    grid-template-columns: 1fr;
  }

  .hero-copy,
  .hero-console {
    min-height: auto;
  }

  .output-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 920px) {
  .template-grid,
  .hero-strip,
  .before-after-grid,
  .submit-panel,
  .section-head {
    grid-template-columns: 1fr;
  }

  .mini-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .site-header,
  main {
    width: min(100% - 20px, 1240px);
  }

  .site-header {
    align-items: flex-start;
    flex-direction: column;
    padding: 12px 0;
  }

  .site-nav {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .hero {
    padding-top: 6px;
  }

  .hero-copy,
  .hero-console,
  .template-hub,
  .studio-panel,
  .brief-card,
  .result-card,
  .submit-panel,
  .example-section {
    border-radius: 20px;
  }

  .hero-copy,
  .template-hub,
  .studio-panel,
  .brief-card,
  .result-card,
  .submit-panel,
  .example-section {
    padding: 18px;
  }

  h1 {
    font-size: 42px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .console-body,
  .field-grid {
    grid-template-columns: 1fr;
  }

  .console-rail {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### app.js

```javascript
const form = document.querySelector("#generatorForm");
const feedbackForm = document.querySelector("#feedbackForm");
const fillDemoButton = document.querySelector("#fillDemo");
const clearFormButton = document.querySelector("#clearForm");
const copyAllButton = document.querySelector("#copyAll");
const copyAllTopButton = document.querySelector("#copyAllTop");
const loadingState = document.querySelector("#loadingState");
const outputGrid = document.querySelector("#outputGrid");
const toast = document.querySelector("#toast");
const briefQuality = document.querySelector("#briefQuality");
const briefQualityBar = document.querySelector("#briefQualityBar");

const outputs = {
  caption: document.querySelector("#captionOutput"),
  description: document.querySelector("#descriptionOutput"),
  hooks: document.querySelector("#hooksOutput"),
  live: document.querySelector("#liveOutput"),
};

const samples = {
  shirt: {
    productName: "áo thun nữ form rộng",
    customer: "nữ 18-28 tuổi thích mặc thoải mái",
    painPoint: "muốn mặc đẹp nhưng sợ lộ bụng",
    channel: "TikTok Shop",
    tone: "friendly",
    detailLevel: "balanced",
    benefits: "che dáng, chất mềm, dễ phối đồ, mặc đi học đi chơi đều được",
  },
  sunscreen: {
    productName: "kem chống nắng cho da dầu",
    customer: "người da dầu, dễ bí da",
    painPoint: "bôi chống nắng hay bị bóng mặt và nặng da",
    channel: "Shopee",
    tone: "premium",
    detailLevel: "rich",
    benefits: "mỏng nhẹ, ráo mặt, không bí da, phù hợp dùng hằng ngày",
  },
  lamp: {
    productName: "đèn livestream để bàn",
    customer: "seller mới bán hàng online tại nhà",
    painPoint: "quay video bị tối, mặt và sản phẩm nhìn không rõ",
    channel: "TikTok Shop",
    tone: "trend",
    detailLevel: "balanced",
    benefits: "ánh sáng đều, dễ chỉnh góc, gọn bàn, hợp quay video bán hàng",
  },
};

const templateBriefs = {
  problem: {
    painPoint: "khách muốn mua nhưng sợ chọn sai, phí tiền",
    tone: "friendly",
    detailLevel: "balanced",
    benefits: "giải quyết đúng vấn đề, dễ hiểu, dễ tư vấn cho khách",
  },
  comparison: {
    painPoint: "trước đây dùng chưa hợp, sau đó cần một lựa chọn dễ dùng hơn",
    tone: "trend",
    detailLevel: "balanced",
    benefits: "thấy khác biệt rõ, dễ dùng mỗi ngày, phù hợp nhu cầu thật",
  },
  threeReasons: {
    painPoint: "không biết sản phẩm này có đáng mua không",
    tone: "premium",
    detailLevel: "rich",
    benefits: "lợi ích rõ, dễ so sánh, đáng cân nhắc trước khi mua",
  },
  livestream: {
    painPoint: "xem live nhưng chưa hiểu sản phẩm có hợp với mình không",
    tone: "friendly",
    detailLevel: "rich",
    benefits: "dễ giới thiệu trên live, dễ chốt lợi ích, có CTA rõ",
  },
  shopee: {
    painPoint: "đọc mô tả Shopee nhưng vẫn chưa hiểu điểm nổi bật",
    tone: "premium",
    detailLevel: "rich",
    benefits: "mô tả rõ ràng, dễ đọc, có đủ điểm nổi bật và lưu ý",
  },
  comment: {
    painPoint: "khách xem xong nhưng không biết nên hỏi gì tiếp",
    tone: "short",
    detailLevel: "short",
    benefits: "CTA rõ, dễ kéo comment, dễ tư vấn size màu giá",
  },
};

const toneMap = {
  friendly: {
    opener: "Nói thật, nếu bạn đang tìm một món dễ dùng hằng ngày thì nên xem thử",
    cta: 'Comment "mình cần" để shop tư vấn mẫu phù hợp nha.',
    style: "gần gũi, dễ đọc",
  },
  premium: {
    opener: "Một lựa chọn đáng cân nhắc nếu bạn muốn sản phẩm rõ lợi ích, dễ dùng và đáng tiền:",
    cta: "Nhắn shop để được tư vấn phiên bản phù hợp nhất.",
    style: "rõ ràng, chuyên nghiệp",
  },
  trend: {
    opener: "Đừng mua thêm đồ linh tinh nếu bạn chưa thử món này:",
    cta: "Lưu lại để khỏi quên, cần mẫu thì comment cho shop.",
    style: "bắt trend, có nhịp nhanh",
  },
  short: {
    opener: "Cần một món gọn, dễ dùng, đáng tiền?",
    cta: "Inbox shop để chốt mẫu.",
    style: "ngắn gọn, đi thẳng ý",
  },
};

const defaults = {
  product: "sản phẩm của shop",
  customer: "khách đang mua online",
  pain: "muốn chọn nhanh nhưng sợ mua không hợp",
  benefits: "dễ dùng, đẹp, hợp nhu cầu hằng ngày",
};

const normalize = (value, fallback) => String(value || "").trim() || fallback;

const sentenceCase = (value) => {
  const clean = normalize(value, "");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
};

const splitBenefits = (benefits) =>
  benefits
    .split(/[,.;|]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 5);

const getFormData = () => {
  const data = new FormData(form);
  return {
    product: normalize(data.get("productName"), defaults.product),
    customer: normalize(data.get("customer"), defaults.customer),
    pain: normalize(data.get("painPoint"), defaults.pain),
    channel: normalize(data.get("channel"), "TikTok Shop"),
    tone: normalize(data.get("tone"), "friendly"),
    detailLevel: normalize(data.get("detailLevel"), "balanced"),
    benefits: normalize(data.get("benefits"), defaults.benefits),
  };
};

const buildBullets = (items, marker = "•") => items.map((item) => `${marker} ${sentenceCase(item)}`).join("\n");

const detailAddon = (level, input, benefits) => {
  if (level === "short") return "";
  if (level === "rich") {
    return `\n\nGợi ý chốt đơn:\n- Nhấn vào vấn đề: ${input.pain}.\n- Nhấn vào lợi ích dễ hiểu nhất: ${benefits[0] || input.benefits}.\n- Kết bài bằng một CTA cụ thể, đừng để khách tự đoán.`;
  }
  return `\n\nMẹo đăng: mở đầu bằng vấn đề của khách, sau đó mới nói đến sản phẩm.`;
};

const buildContent = (input) => {
  const tone = toneMap[input.tone] || toneMap.friendly;
  const benefits = splitBenefits(input.benefits);
  const benefitText = benefits.length ? benefits.join(", ") : input.benefits;
  const firstBenefit = benefits[0] || input.benefits;

  const caption = `${tone.opener} ${input.product}.\n\nVấn đề khách hay gặp:\n${input.pain}.\n\nĐiểm đáng chú ý:\n${buildBullets(benefits)}\n\nPhù hợp cho:\n${input.customer}.\n\n${tone.cta}${detailAddon(input.detailLevel, input, benefits)}`;

  const description = `${sentenceCase(input.product)}\n\n${input.product} phù hợp cho ${input.customer}. Sản phẩm tập trung vào nhu cầu: ${input.pain}.\n\nĐiểm nổi bật:\n${buildBullets(benefits, "-")}\n\nVì sao nên chọn:\n- Dễ hiểu lợi ích, dễ tư vấn cho khách.\n- Phù hợp để đăng ${input.channel} hoặc dùng làm mô tả sản phẩm.\n- Có thể biến thành caption, kịch bản video hoặc nội dung live.\n\nLưu ý: Shop nên bổ sung size, màu, chất liệu, chính sách đổi trả và hình thật nếu có.`;

  const hooks = `1. Nếu bạn đang ${input.pain}, xem thử ${input.product} này.\n\n2. 3 lý do ${input.customer} nên cân nhắc ${input.product}: ${firstBenefit}.\n\n3. Đừng chọn ${input.product} chỉ vì rẻ. Hãy nhìn vào điểm này trước: ${benefitText}.\n\n4. Mua online dễ sai nhất ở chỗ này: không biết sản phẩm có hợp nhu cầu thật không.\n\n5. Đây là cách shop tư vấn ${input.product} cho khách đang phân vân.`;

  const live = `Kịch bản live ngắn cho ${input.channel}\n\n1. Mở live:\n"Ai đang tìm ${input.product} thì ở lại 30 giây, shop nói nhanh điểm đáng tiền nhất."\n\n2. Gọi đúng vấn đề:\n"Nhiều bạn ${input.pain}, nên chọn sai là rất dễ phí tiền."\n\n3. Giới thiệu sản phẩm:\n"Mẫu này hợp với ${input.customer}, nổi bật ở ${benefitText}."\n\n4. Chốt lợi ích:\n"Nếu bạn cần một lựa chọn ${tone.style}, mẫu này đáng để thử."\n\n5. CTA:\n"Comment số 1 để shop gửi thông tin, giá và mẫu phù hợp cho bạn."`;

  return { caption, description, hooks, live };
};

const generateWithApi = async (input) => {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`Generate failed: ${response.status}`);
  }

  const data = await response.json();
  return data.content || data;
};

const renderContent = (content) => {
  outputs.caption.textContent = content.caption;
  outputs.description.textContent = content.description;
  outputs.hooks.textContent = content.hooks;
  outputs.live.textContent = content.live;
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1500);
};

const updateBriefQuality = () => {
  const fields = ["productName", "customer", "painPoint", "benefits"];
  const filled = fields.filter((key) => normalize(form.elements[key]?.value, "")).length;
  const width = 24 + filled * 19;
  briefQualityBar.style.width = `${Math.min(width, 100)}%`;

  if (filled <= 1) briefQuality.textContent = "Cần thêm thông tin";
  if (filled === 2) briefQuality.textContent = "Tạm ổn";
  if (filled === 3) briefQuality.textContent = "Tốt";
  if (filled >= 4) briefQuality.textContent = "Rất tốt";
};

const simulateGenerate = async () => {
  const input = getFormData();
  loadingState.hidden = false;
  outputGrid.style.opacity = "0.45";

  try {
    const content = await generateWithApi(input);
    renderContent(content);
    showToast("Đã tạo bằng AI");
  } catch (error) {
    renderContent(buildContent(input));
    showToast("Đang chạy bản demo");
  } finally {
    loadingState.hidden = true;
    outputGrid.style.opacity = "1";
  }
};

const fillSample = (sample) => {
  Object.entries(sample).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value;
  });
  updateBriefQuality();
  simulateGenerate();
};

const applyTemplate = (templateKey) => {
  const template = templateBriefs[templateKey];
  if (!template) return;

  Object.entries(template).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value;
  });

  document.querySelectorAll("[data-template]").forEach((button) => {
    button.classList.toggle("active", button.dataset.template === templateKey);
  });

  updateBriefQuality();
  showToast("Đã chọn template");
};

const sendFeedback = async (payload) => {
  const response = await fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error(`Feedback failed: ${response.status}`);
  return response.json();
};

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
  }
  showToast("Đã copy");
};

const getAllOutput = () =>
  [
    "CAPTION",
    outputs.caption.textContent,
    "",
    "MÔ TẢ SHOPEE",
    outputs.description.textContent,
    "",
    "HOOK VIDEO",
    outputs.hooks.textContent,
    "",
    "KỊCH BẢN LIVESTREAM",
    outputs.live.textContent,
  ].join("\n");

form.addEventListener("input", updateBriefQuality);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  simulateGenerate();
});

fillDemoButton.addEventListener("click", () => fillSample(samples.shirt));

clearFormButton.addEventListener("click", () => {
  form.reset();
  outputs.caption.textContent = 'Nhập sản phẩm rồi bấm "Tạo bộ nội dung".';
  outputs.description.textContent = "Mô tả sản phẩm sẽ nằm ở đây.";
  outputs.hooks.textContent = "App sẽ gợi ý 3-5 câu mở đầu video.";
  outputs.live.textContent = "Kịch bản live ngắn sẽ nằm ở đây.";
  updateBriefQuality();
  showToast("Đã reset");
});

document.querySelectorAll("[data-sample]").forEach((button) => {
  button.addEventListener("click", () => fillSample(samples[button.dataset.sample]));
});

document.querySelectorAll("[data-template]").forEach((button) => {
  button.addEventListener("click", () => applyTemplate(button.dataset.template));
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(`#${button.dataset.copy}`);
    copyText(target.textContent);
  });
});

copyAllButton.addEventListener("click", () => copyText(getAllOutput()));
copyAllTopButton.addEventListener("click", () => copyText(getAllOutput()));

if (feedbackForm) {
  feedbackForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(feedbackForm);
    const payload = {
      category: normalize(data.get("category"), ""),
      pain: normalize(data.get("pain"), ""),
      contact: normalize(data.get("contact"), ""),
    };

    if (!payload.category && !payload.pain) {
      showToast("Nhập ngành hoặc vấn đề");
      return;
    }

    try {
      await sendFeedback(payload);
      feedbackForm.reset();
      showToast("Đã gửi góp ý");
    } catch (error) {
      showToast("Đã ghi nhận demo");
    }
  });
}

updateBriefQuality();
```

### server.py

```python
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

    with urllib.request.urlopen(request, timeout=45) as response:
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
```

### README.md

```markdown
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
```

### render.yaml

```yaml
services:
  - type: web
    name: shopcontentvn-ai
    runtime: python
    plan: free
    buildCommand: ""
    startCommand: "python server.py"
    envVars:
      - key: OPENAI_MODEL
        value: gpt-4o-mini
```

### requirements.txt

```text
# No external Python dependencies are required.
```

