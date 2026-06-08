# ShopContentVN AI - Auto Backup

Last updated: 2026-06-08 11:53:50

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
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main class="product">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-logo">SC</div>
          <div>
            <strong>ShopContentVN</strong>
            <span>AI Studio</span>
          </div>
        </div>

        <nav class="side-nav" aria-label="Điều hướng">
          <button class="nav-item active" type="button"><span>01</span> Content Studio</button>
          <button class="nav-item" type="button"><span>02</span> Templates</button>
          <button class="nav-item" type="button"><span>03</span> History</button>
        </nav>

        <div class="usage-card">
          <div class="usage-head">
            <span>Beta usage</span>
            <strong>Free</strong>
          </div>
          <div class="usage-bar"><span></span></div>
          <p>Demo MVP chưa tốn phí. Bản sau sẽ gắn AI thật và giới hạn lượt dùng.</p>
        </div>

        <div class="mini-history">
          <div class="section-label">Gần đây</div>
          <button type="button" data-sample="shirt">Áo thun nữ form rộng</button>
          <button type="button" data-sample="sunscreen">Kem chống nắng da dầu</button>
          <button type="button" data-sample="lamp">Đèn livestream để bàn</button>
        </div>
      </aside>

      <section class="main-stage">
        <header class="topbar">
          <div>
            <p class="eyebrow">AI content kit cho seller Việt</p>
            <h1>Tạo bộ nội dung bán hàng từ một sản phẩm.</h1>
          </div>
          <div class="top-actions">
            <button type="button" id="fillDemo" class="secondary-button">Điền mẫu</button>
            <button type="button" id="copyAllTop" class="primary-button">Copy tất cả</button>
          </div>
        </header>

        <section class="metrics">
          <article>
            <span>Output</span>
            <strong>4 định dạng</strong>
          </article>
          <article>
            <span>Kênh bán</span>
            <strong>Shopee / TikTok</strong>
          </article>
          <article>
            <span>Thời gian</span>
            <strong>&lt; 30 giây</strong>
          </article>
        </section>

        <section class="workspace">
          <form id="generatorForm" class="brief-panel">
            <div class="panel-title">
              <div>
                <p class="eyebrow">Product brief</p>
                <h2>Thông tin đầu vào</h2>
              </div>
              <button type="button" id="clearForm" class="text-button">Reset</button>
            </div>

            <div class="quality-card">
              <div>
                <span>Brief quality</span>
                <strong id="briefQuality">Sẵn sàng</strong>
              </div>
              <div class="quality-bar"><span id="briefQualityBar"></span></div>
            </div>

            <div class="preset-row" aria-label="Sản phẩm mẫu">
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

          <section class="output-panel" aria-live="polite">
            <div class="panel-title">
              <div>
                <p class="eyebrow">Generated workspace</p>
                <h2>Bộ nội dung có thể copy ngay</h2>
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
                <pre id="hooksOutput">App sẽ gợi ý 3 câu mở đầu video.</pre>
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
  --bg: #06080c;
  --surface: #0d1218;
  --surface-2: #121922;
  --surface-3: #17212b;
  --line: rgba(255, 255, 255, 0.1);
  --line-strong: rgba(255, 255, 255, 0.16);
  --text: #f7fbff;
  --muted: #95a3b3;
  --mint: #2cf2a7;
  --cyan: #35d7ff;
  --yellow: #ffe15d;
  --orange: #ff9a4d;
  --shadow: 0 24px 70px rgba(0, 0, 0, 0.45);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background:
    linear-gradient(rgba(255, 255, 255, 0.026) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.026) 1px, transparent 1px),
    radial-gradient(circle at 12% 12%, rgba(44, 242, 167, 0.16), transparent 30%),
    radial-gradient(circle at 92% 8%, rgba(255, 154, 77, 0.13), transparent 28%),
    var(--bg);
  background-size: 42px 42px, 42px 42px, auto, auto, auto;
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.product {
  width: min(1440px, 100%);
  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-right: 1px solid var(--line);
  background: rgba(7, 10, 15, 0.88);
  backdrop-filter: blur(18px);
  padding: 18px;
}

.brand,
.topbar,
.top-actions,
.panel-title,
.output-head,
.usage-head,
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
  color: #06110c;
  background: linear-gradient(135deg, var(--mint), var(--cyan));
  font-weight: 950;
  box-shadow: 0 0 34px rgba(44, 242, 167, 0.24);
}

.brand strong,
.brand span {
  display: block;
}

.brand strong {
  font-size: 15px;
}

.brand span,
.section-label,
.usage-card p,
.metrics span,
.quality-card span {
  color: var(--muted);
}

.brand span,
.section-label,
.usage-card p,
.metrics span,
.quality-card span,
.output-head strong {
  font-size: 13px;
}

.side-nav {
  display: grid;
  gap: 8px;
}

.nav-item,
.mini-history button,
.text-button,
.secondary-button,
.copy-button,
.preset-row button {
  border: 1px solid var(--line);
  color: var(--text);
  background: rgba(255, 255, 255, 0.04);
}

.nav-item {
  min-height: 42px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  padding: 0 12px;
  text-align: left;
  font-weight: 800;
}

.nav-item span {
  color: var(--mint);
  font-size: 12px;
}

.nav-item.active {
  color: #06110c;
  background: var(--mint);
}

.nav-item.active span {
  color: #06110c;
}

.usage-card,
.mini-history,
.brief-panel,
.output-panel,
.metrics article {
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(18, 25, 34, 0.78);
  box-shadow: var(--shadow);
}

.usage-card {
  padding: 14px;
}

.usage-head {
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
}

.usage-head strong {
  color: var(--mint);
}

.usage-bar,
.quality-bar {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}

.usage-bar {
  margin: 12px 0;
}

.usage-bar span,
.quality-bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--mint), var(--yellow));
}

.usage-bar span {
  width: 38%;
}

.usage-card p {
  margin: 0;
  line-height: 1.45;
}

.mini-history {
  display: grid;
  gap: 8px;
  padding: 14px;
}

.section-label {
  font-weight: 850;
  text-transform: uppercase;
}

.mini-history button {
  min-height: 38px;
  border-radius: 10px;
  padding: 0 10px;
  text-align: left;
}

.main-stage {
  padding: 18px;
}

.topbar {
  justify-content: space-between;
  gap: 18px;
  min-height: 116px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background:
    linear-gradient(135deg, rgba(44, 242, 167, 0.12), transparent 50%),
    rgba(13, 18, 24, 0.88);
  box-shadow: var(--shadow);
  padding: 20px;
}

.eyebrow {
  margin: 0 0 7px;
  color: var(--mint);
  font-size: 12px;
  font-weight: 950;
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
  max-width: 760px;
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1.02;
}

h2 {
  font-size: 20px;
}

.top-actions {
  gap: 10px;
}

.primary-button,
.secondary-button,
.text-button,
.copy-button,
.generate-button {
  min-height: 40px;
  border-radius: 10px;
  font-weight: 900;
}

.primary-button,
.generate-button {
  border: 0;
  color: #06110c;
  background: linear-gradient(135deg, var(--mint), var(--yellow));
}

.primary-button,
.secondary-button,
.text-button {
  padding: 0 14px;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 12px 0;
}

.metrics article {
  padding: 14px;
  box-shadow: none;
}

.metrics strong,
.metrics span {
  display: block;
}

.metrics strong {
  margin-top: 6px;
  font-size: 20px;
}

.workspace {
  display: grid;
  grid-template-columns: minmax(340px, 420px) minmax(0, 1fr);
  gap: 12px;
}

.brief-panel,
.output-panel {
  padding: 18px;
}

.panel-title {
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.quality-card {
  display: grid;
  gap: 10px;
  border: 1px solid rgba(44, 242, 167, 0.2);
  border-radius: 12px;
  padding: 12px;
  background: rgba(44, 242, 167, 0.06);
  margin-bottom: 14px;
}

.quality-card > div:first-child {
  justify-content: space-between;
}

#briefQuality {
  color: var(--mint);
}

.quality-bar span {
  width: 42%;
  transition: width 180ms ease;
}

.preset-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.preset-row button {
  min-height: 34px;
  border-radius: 999px;
  padding: 0 11px;
  font-size: 13px;
  font-weight: 850;
}

.preset-row button:hover,
.mini-history button:hover,
.secondary-button:hover,
.text-button:hover,
.copy-button:hover {
  border-color: rgba(44, 242, 167, 0.45);
}

.field,
.field-grid {
  display: grid;
  gap: 8px;
}

.field {
  margin-bottom: 13px;
}

.field-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.field span {
  color: #dce6ef;
  font-size: 13px;
  font-weight: 850;
}

input,
select {
  width: 100%;
  min-height: 48px;
  border: 1px solid var(--line-strong);
  border-radius: 10px;
  color: var(--text);
  background: rgba(6, 9, 13, 0.86);
  outline: none;
  padding: 0 13px;
}

input:focus,
select:focus {
  border-color: var(--mint);
  box-shadow: 0 0 0 4px rgba(44, 242, 167, 0.12);
}

.generate-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 14px;
  margin-top: 2px;
}

.generate-button b {
  color: rgba(6, 17, 12, 0.7);
  font-size: 12px;
  text-transform: uppercase;
}

.loading {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(44, 242, 167, 0.2);
  border-radius: 12px;
  color: #d8fff0;
  background: rgba(44, 242, 167, 0.08);
  padding: 12px;
  margin-bottom: 12px;
  font-weight: 850;
}

.loader {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: var(--mint);
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.output-card {
  min-height: 286px;
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  background: var(--surface-2);
}

.output-card.highlight {
  background:
    linear-gradient(135deg, rgba(44, 242, 167, 0.1), transparent 45%),
    var(--surface-2);
}

.output-head {
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid var(--line);
  padding: 12px;
}

.output-head > div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tag {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  color: #06110c;
  background: var(--mint);
  font-size: 12px;
  font-weight: 950;
}

.copy-button {
  min-height: 32px;
  padding: 0 10px;
  color: var(--mint);
}

pre {
  margin: 0;
  min-height: 226px;
  white-space: pre-wrap;
  color: #edf6fb;
  font: 550 14px/1.58 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  padding: 14px;
}

#toast {
  position: fixed;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%) translateY(12px);
  opacity: 0;
  pointer-events: none;
  border-radius: 999px;
  color: #06110c;
  background: var(--mint);
  padding: 11px 16px;
  font-weight: 950;
  transition: 180ms ease;
}

#toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

@media (max-width: 1120px) {
  .product {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
    height: auto;
    display: grid;
    grid-template-columns: 1fr;
  }

  .side-nav,
  .mini-history {
    display: none;
  }

  .workspace {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .main-stage,
  .sidebar {
    padding: 10px;
  }

  .topbar,
  .top-actions,
  .panel-title {
    align-items: stretch;
    flex-direction: column;
  }

  .metrics,
  .output-grid,
  .field-grid {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 30px;
  }

  .primary-button,
  .secondary-button,
  .text-button {
    width: 100%;
  }
}
```

### app.js

```javascript
const form = document.querySelector("#generatorForm");
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

const toneMap = {
  friendly: {
    opener: "Nói thật, nếu bạn đang tìm một món dễ dùng hằng ngày thì nên xem thử",
    cta: "Comment \"mình cần\" để shop tư vấn mẫu phù hợp nha.",
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

const fillSample = (sample) => {
  Object.entries(sample).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value;
  });
  updateBriefQuality();
  simulateGenerate();
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1500);
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
  outputs.hooks.textContent = "App sẽ gợi ý 3 câu mở đầu video.";
  outputs.live.textContent = "Kịch bản live ngắn sẽ nằm ở đây.";
  updateBriefQuality();
  showToast("Đã reset");
});

document.querySelectorAll("[data-sample]").forEach((button) => {
  button.addEventListener("click", () => fillSample(samples[button.dataset.sample]));
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(`#${button.dataset.copy}`);
    copyText(target.textContent);
  });
});

copyAllButton.addEventListener("click", () => copyText(getAllOutput()));
copyAllTopButton.addEventListener("click", () => copyText(getAllOutput()));

updateBriefQuality();
```

### server.py

```python
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

