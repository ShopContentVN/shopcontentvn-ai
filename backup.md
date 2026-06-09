# ShopContentVN AI - Auto Backup

Last updated: 2026-06-09 12:02:08

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
        <a href="#contact">Liên hệ</a>
        <button type="button" id="copyAllTop" class="ghost-button">Copy output</button>
      </nav>
      <div class="auth-area">
        <div class="quota-badge" id="quotaBadge" hidden>
          <span>Lượt AI hôm nay</span>
          <strong id="quotaRemaining">5/5</strong>
        </div>
        <button type="button" id="loginButton" class="google-login-button">
          <span class="google-mark">G</span>
          <span>Đăng nhập Google</span>
        </button>
        <div class="user-chip" id="userChip" hidden>
          <img id="userAvatar" alt="" />
          <span id="userEmail"></span>
          <button type="button" id="logoutButton" aria-label="Đăng xuất" title="Đăng xuất">↗</button>
        </div>
      </div>
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

          <section class="image-analyzer">
            <div class="image-analyzer-head">
              <div>
                <span>Phân tích ảnh sản phẩm</span>
                <small>Tải 1-3 ảnh thật, AI sẽ gợi ý brief để bạn kiểm tra lại.</small>
              </div>
              <span class="beta-badge">Vision beta</span>
            </div>

            <label class="upload-zone" id="uploadZone">
              <input id="productImages" type="file" accept="image/png,image/jpeg,image/webp" multiple hidden />
              <span class="upload-icon">+</span>
              <strong>Chọn hoặc kéo ảnh sản phẩm vào đây</strong>
              <small>PNG, JPG, WEBP · tối đa 3 ảnh · mỗi ảnh dưới 8 MB</small>
            </label>

            <div class="image-preview-grid" id="imagePreviewGrid" hidden></div>

            <div class="image-actions">
              <button type="button" id="analyzeImages" class="analyze-button" disabled>
                <span>Phân tích và tự điền brief</span>
                <b>AI Vision</b>
              </button>
              <button type="button" id="clearImages" class="text-button" hidden>Xóa ảnh</button>
            </div>

            <div class="analysis-status" id="analysisStatus" hidden>
              <div class="loader"></div>
              <span>Đang nhìn ảnh và tìm điểm bán hàng...</span>
            </div>

            <div class="analysis-warning" id="analysisWarning" hidden>
              AI chỉ phân tích chi tiết nhìn thấy được. Hãy tự kiểm tra chất liệu, công dụng và thông số trước khi đăng.
            </div>
          </section>

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
              <h2>Chọn bản hợp ý nhất</h2>
            </div>
            <button type="button" id="copyAll" class="text-button">Copy tất cả</button>
          </div>

          <div class="loading" id="loadingState" hidden>
            <div class="loader"></div>
            <span>Đang dựng caption, mô tả, hook và kịch bản...</span>
          </div>

          <div class="result-tabs" role="tablist" aria-label="Loại nội dung">
            <button type="button" class="result-tab active" data-output-type="caption">Caption</button>
            <button type="button" class="result-tab" data-output-type="description">Mô tả Shopee</button>
            <button type="button" class="result-tab" data-output-type="hooks">Hook video</button>
            <button type="button" class="result-tab" data-output-type="live">Livestream</button>
          </div>

          <article class="result-player" id="outputGrid">
            <div class="result-player-head">
              <div>
                <span class="result-kicker" id="resultTypeLabel">Caption TikTok/Facebook</span>
                <strong id="variantLabel">Phương án 1 / 6</strong>
              </div>
              <button type="button" class="copy-button" id="copyCurrent">Copy bản này</button>
            </div>

            <pre id="currentOutput">Nhập sản phẩm rồi bấm "Tạo bộ nội dung".</pre>

            <div class="result-controls">
              <button type="button" class="icon-button" id="previousVariant" aria-label="Phương án trước" title="Phương án trước">←</button>
              <div class="variant-dots" id="variantDots" aria-label="Các phương án"></div>
              <button type="button" class="icon-button" id="nextVariant" aria-label="Phương án tiếp theo" title="Phương án tiếp theo">→</button>
            </div>
          </article>

          <div class="result-note">
            <span>6 phương án mỗi loại</span>
            <p>Không hợp bản đầu thì chuyển tiếp, chỉnh nhẹ rồi đăng. Không cần generate lại từ đầu.</p>
          </div>

          <div class="source-outputs" hidden>
            <pre id="captionOutput">Nhập sản phẩm rồi bấm "Tạo bộ nội dung".</pre>
            <pre id="descriptionOutput">Mô tả sản phẩm sẽ nằm ở đây.</pre>
            <pre id="hooksOutput">App sẽ gợi ý 3-5 câu mở đầu video.</pre>
            <pre id="liveOutput">Kịch bản live ngắn sẽ nằm ở đây.</pre>
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

      <section id="contact" class="contact-section">
        <div class="contact-copy">
          <p class="eyebrow">Liên hệ ShopContentVN</p>
          <h2>Đang bán hàng mà bí content? Gửi thẳng tình huống cho tụi mình.</h2>
          <p>
            ShopContentVN đang ở giai đoạn beta. Mọi câu hỏi, lỗi app và đề xuất template đều được
            dùng để cải thiện sản phẩm cho seller Việt.
          </p>
        </div>
        <div class="contact-grid">
          <a href="mailto:shopcontentvn@gmail.com">
            <span>Email</span>
            <strong>shopcontentvn@gmail.com</strong>
          </a>
          <a href="https://x.com/ShopContentVN" target="_blank" rel="noreferrer">
            <span>Kênh cập nhật</span>
            <strong>@ShopContentVN trên X</strong>
          </a>
          <article>
            <span>Phản hồi</span>
            <strong>Trả lời trong 24-48 giờ</strong>
          </article>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div>
        <a class="brand footer-brand" href="#top">
          <span class="brand-logo">SC</span>
          <span><strong>ShopContentVN</strong><small>AI Studio cho seller Việt</small></span>
        </a>
        <p>Công cụ đang beta. Nội dung AI cần được shop kiểm tra trước khi đăng.</p>
      </div>
      <div class="footer-links">
        <a href="#templates">Templates</a>
        <a href="#tool">Content Studio</a>
        <a href="#submit">Gửi góp ý</a>
        <a href="#contact">Liên hệ</a>
      </div>
      <small>© 2026 ShopContentVN. Built for Vietnamese sellers.</small>
    </footer>

    <div id="toast" role="status" aria-live="polite"></div>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
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

.auth-area {
  display: flex;
  align-items: center;
  gap: 8px;
}

.google-login-button,
.user-chip,
.quota-badge {
  min-height: 42px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
}

.google-login-button {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--text);
  padding: 0 13px;
  font-size: 13px;
  font-weight: 900;
}

.google-mark {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #4285f4;
  background: white;
  font-weight: 950;
}

.quota-badge {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 12px;
}

.quota-badge span {
  color: var(--muted);
  font-size: 11px;
  font-weight: 800;
}

.quota-badge strong {
  color: var(--yellow);
  font-size: 13px;
}

.user-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 250px;
  padding: 5px 7px 5px 5px;
}

.user-chip img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  object-fit: cover;
}

.user-chip > span {
  overflow: hidden;
  color: var(--soft);
  font-size: 12px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-chip button {
  width: 28px;
  height: 28px;
  flex: 0 0 auto;
  border: 0;
  border-radius: 9px;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.07);
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

.image-analyzer {
  margin-bottom: 18px;
  border: 1px solid rgba(69, 216, 255, 0.28);
  border-radius: 20px;
  background:
    linear-gradient(145deg, rgba(69, 216, 255, 0.1), transparent 48%),
    rgba(255, 255, 255, 0.035);
  padding: 15px;
}

.image-analyzer-head,
.image-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.image-analyzer-head span,
.image-analyzer-head small {
  display: block;
}

.image-analyzer-head > div > span {
  font-size: 14px;
  font-weight: 900;
}

.image-analyzer-head small {
  margin-top: 4px;
  color: var(--muted);
  line-height: 1.45;
}

.beta-badge {
  flex: 0 0 auto;
  border-radius: 999px;
  color: #06100c;
  background: var(--cyan);
  padding: 6px 9px;
  font-size: 11px;
  font-weight: 950;
  text-transform: uppercase;
}

.upload-zone {
  min-height: 142px;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 7px;
  margin-top: 14px;
  border: 1px dashed rgba(255, 255, 255, 0.28);
  border-radius: 17px;
  background: rgba(4, 8, 12, 0.45);
  padding: 18px;
  text-align: center;
  cursor: pointer;
  transition: border-color 160ms ease, background 160ms ease;
}

.upload-zone:hover,
.upload-zone.dragging {
  border-color: var(--cyan);
  background: rgba(69, 216, 255, 0.08);
}

.upload-zone small {
  color: var(--muted);
}

.upload-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #06100c;
  background: var(--cyan);
  font-size: 24px;
  font-weight: 900;
}

.image-preview-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
  margin-top: 12px;
}

.image-preview {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #080d12;
}

.image-preview img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.image-preview button {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 28px;
  height: 28px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
  background: rgba(5, 8, 12, 0.84);
  font-weight: 900;
}

.image-actions {
  align-items: stretch;
  margin-top: 12px;
}

.analyze-button {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  gap: 12px;
  border: 0;
  border-radius: 13px;
  color: #06100c;
  background: linear-gradient(135deg, var(--cyan), var(--green));
  padding: 0 15px;
  font-weight: 950;
}

.analyze-button b {
  font-size: 11px;
  text-transform: uppercase;
}

.analyze-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.analysis-status {
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  color: var(--soft);
  font-size: 13px;
  font-weight: 800;
}

.analysis-warning {
  margin-top: 12px;
  border-left: 3px solid var(--yellow);
  color: var(--muted);
  background: rgba(255, 240, 106, 0.06);
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.5;
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

.generate-button:disabled {
  cursor: wait;
  opacity: 0.72;
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

.result-tabs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 12px;
}

.result-tab {
  min-height: 44px;
  border: 1px solid var(--line);
  border-radius: 12px;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.045);
  font-size: 13px;
  font-weight: 850;
}

.result-tab:hover,
.result-tab.active {
  border-color: rgba(32, 245, 166, 0.48);
  color: #06100c;
  background: var(--green);
}

.result-player {
  overflow: hidden;
  border: 1px solid rgba(32, 245, 166, 0.3);
  border-radius: 22px;
  background:
    linear-gradient(145deg, rgba(32, 245, 166, 0.1), transparent 42%),
    rgba(16, 23, 34, 0.98);
}

.result-player-head {
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border-bottom: 1px solid var(--line);
  padding: 14px 16px;
}

.result-player-head strong,
.result-kicker {
  display: block;
}

.result-kicker {
  margin-bottom: 4px;
  color: var(--green);
  font-size: 12px;
  font-weight: 950;
  text-transform: uppercase;
}

#currentOutput {
  min-height: 410px;
  max-height: 560px;
  overflow: auto;
  padding: 24px;
  font-size: 15px;
  line-height: 1.75;
}

.result-controls {
  min-height: 66px;
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  align-items: center;
  gap: 14px;
  border-top: 1px solid var(--line);
  padding: 10px 14px;
}

.icon-button {
  width: 44px;
  height: 44px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  color: var(--text);
  background: rgba(255, 255, 255, 0.07);
  font-size: 20px;
  font-weight: 900;
}

.icon-button:hover {
  border-color: var(--green);
  color: #06100c;
  background: var(--green);
}

.variant-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.variant-dot {
  width: 10px;
  height: 10px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  padding: 0;
}

.variant-dot.active {
  width: 26px;
  border-radius: 999px;
  background: var(--green);
}

.result-note {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: center;
  margin-top: 12px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  padding: 12px 14px;
}

.result-note span {
  color: var(--yellow);
  font-size: 12px;
  font-weight: 950;
  text-transform: uppercase;
}

.result-note p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.5;
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

.contact-section {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(480px, 1.2fr);
  gap: 24px;
  align-items: end;
  border: 1px solid var(--line);
  border-radius: 28px;
  background:
    linear-gradient(130deg, rgba(69, 216, 255, 0.12), transparent 42%),
    var(--panel);
  box-shadow: var(--shadow);
  padding: 28px;
  margin: 18px 0 24px;
}

.contact-copy h2 {
  max-width: 650px;
  font-size: clamp(30px, 4vw, 50px);
  line-height: 1.04;
}

.contact-copy > p:last-child {
  max-width: 620px;
  margin: 16px 0 0;
  color: var(--muted);
  line-height: 1.65;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.contact-grid a,
.contact-grid article {
  display: grid;
  gap: 6px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.055);
  padding: 17px;
}

.contact-grid a:hover {
  border-color: rgba(32, 245, 166, 0.5);
  background: rgba(32, 245, 166, 0.08);
}

.contact-grid span {
  color: var(--muted);
  font-size: 12px;
  font-weight: 850;
  text-transform: uppercase;
}

.site-footer {
  position: relative;
  z-index: 1;
  width: min(1240px, calc(100% - 36px));
  display: grid;
  grid-template-columns: 1.2fr 1fr auto;
  gap: 24px;
  align-items: end;
  border-top: 1px solid var(--line);
  margin: 0 auto;
  padding: 28px 0 34px;
}

.site-footer p,
.site-footer > small {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.5;
}

.site-footer p {
  max-width: 460px;
  margin: 12px 0 0;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.footer-links a {
  color: var(--soft);
  font-size: 14px;
  font-weight: 800;
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
  .site-header {
    flex-wrap: wrap;
  }

  .site-nav {
    order: 3;
    width: 100%;
  }

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
  .section-head,
  .contact-section,
  .site-footer {
    grid-template-columns: 1fr;
  }

  .mini-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .site-header,
  main,
  .site-footer {
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

  .auth-area {
    width: 100%;
    flex-wrap: wrap;
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
  .example-section,
  .contact-section {
    border-radius: 20px;
  }

  .hero-copy,
  .template-hub,
  .studio-panel,
  .brief-card,
  .result-card,
  .submit-panel,
  .example-section,
  .contact-section {
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

  .result-tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  #currentOutput {
    min-height: 330px;
    padding: 18px;
  }

  .result-note {
    grid-template-columns: 1fr;
  }

  .image-analyzer-head,
  .image-actions {
    align-items: stretch;
    flex-direction: column;
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
const generateButton = document.querySelector("#generateButton");
const toast = document.querySelector("#toast");
const briefQuality = document.querySelector("#briefQuality");
const briefQualityBar = document.querySelector("#briefQualityBar");

const outputs = {
  caption: document.querySelector("#captionOutput"),
  description: document.querySelector("#descriptionOutput"),
  hooks: document.querySelector("#hooksOutput"),
  live: document.querySelector("#liveOutput"),
};

const currentOutput = document.querySelector("#currentOutput");
const resultTypeLabel = document.querySelector("#resultTypeLabel");
const variantLabel = document.querySelector("#variantLabel");
const variantDots = document.querySelector("#variantDots");
const previousVariant = document.querySelector("#previousVariant");
const nextVariant = document.querySelector("#nextVariant");
const copyCurrentButton = document.querySelector("#copyCurrent");
const productImagesInput = document.querySelector("#productImages");
const uploadZone = document.querySelector("#uploadZone");
const imagePreviewGrid = document.querySelector("#imagePreviewGrid");
const analyzeImagesButton = document.querySelector("#analyzeImages");
const clearImagesButton = document.querySelector("#clearImages");
const analysisStatus = document.querySelector("#analysisStatus");
const analysisWarning = document.querySelector("#analysisWarning");
const loginButton = document.querySelector("#loginButton");
const logoutButton = document.querySelector("#logoutButton");
const userChip = document.querySelector("#userChip");
const userAvatar = document.querySelector("#userAvatar");
const userEmail = document.querySelector("#userEmail");
const quotaBadge = document.querySelector("#quotaBadge");
const quotaRemaining = document.querySelector("#quotaRemaining");

let selectedImages = [];
let authClient = null;
let authSession = null;
let authConfigured = false;

const outputLabels = {
  caption: "Caption TikTok/Facebook",
  description: "Mô tả Shopee",
  hooks: "Hook video",
  live: "Kịch bản livestream",
};

let activeOutputType = "caption";
let activeVariantIndex = 0;
let outputVariants = {
  caption: ['Nhập sản phẩm rồi bấm "Tạo bộ nội dung".'],
  description: ["Mô tả sản phẩm sẽ nằm ở đây."],
  hooks: ["App sẽ gợi ý các câu mở đầu video."],
  live: ["Kịch bản live ngắn sẽ nằm ở đây."],
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

const updateQuotaDisplay = (remaining = 5) => {
  const safeRemaining = Math.max(0, Number(remaining) || 0);
  quotaRemaining.textContent = `${safeRemaining}/5`;
  quotaBadge.hidden = !authSession;
};

const updateAuthDisplay = (session) => {
  authSession = session;
  const user = session?.user;
  loginButton.hidden = Boolean(user);
  userChip.hidden = !user;
  quotaBadge.hidden = !user;

  if (user) {
    userEmail.textContent = user.email || "Tài khoản Google";
    userAvatar.src = user.user_metadata?.avatar_url || "";
    userAvatar.hidden = !userAvatar.src;
  } else {
    userEmail.textContent = "";
    userAvatar.src = "";
    updateQuotaDisplay(5);
  }
};

const startGoogleLogin = async () => {
  if (!authConfigured || !authClient) {
    showToast("Chưa cấu hình đăng nhập Google");
    return;
  }

  const { error } = await authClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}${window.location.pathname}`,
    },
  });

  if (error) showToast("Không mở được đăng nhập Google");
};

const requireAuthSession = async () => {
  if (!authConfigured || !authClient) {
    showToast("Chủ app chưa cấu hình Google login");
    return null;
  }

  const { data } = await authClient.auth.getSession();
  const session = data.session;
  updateAuthDisplay(session);

  if (!session) {
    showToast("Đăng nhập Google để dùng AI");
    await startGoogleLogin();
    return null;
  }

  return session;
};

const authorizedFetch = async (url, options = {}) => {
  const session = await requireAuthSession();
  if (!session) {
    const error = new Error("Authentication required");
    error.name = "AuthRequiredError";
    throw error;
  }

  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${session.access_token}`);
  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    updateAuthDisplay(null);
    const error = new Error("Session expired");
    error.name = "AuthRequiredError";
    throw error;
  }

  if (response.status === 429) {
    updateQuotaDisplay(0);
    const error = new Error("Daily quota reached");
    error.name = "QuotaExceededError";
    throw error;
  }

  return response;
};

const refreshQuota = async () => {
  if (!authSession) return;

  try {
    const response = await authorizedFetch("/api/quota");
    if (!response.ok) return;
    const data = await response.json();
    updateQuotaDisplay(data.remaining);
  } catch (error) {
    if (error.name !== "AuthRequiredError") {
      console.warn("Could not refresh quota", error);
    }
  }
};

const initializeAuth = async () => {
  try {
    const response = await fetch("/api/config");
    const config = await response.json();
    authConfigured = Boolean(config.supabaseUrl && config.supabaseAnonKey && window.supabase);

    if (!authConfigured) {
      loginButton.querySelector("span:last-child").textContent = "Chưa cấu hình Google";
      return;
    }

    authClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
    const { data } = await authClient.auth.getSession();
    updateAuthDisplay(data.session);
    if (data.session) await refreshQuota();

    authClient.auth.onAuthStateChange((_event, session) => {
      updateAuthDisplay(session);
      if (session) window.setTimeout(refreshQuota, 0);
    });
  } catch (error) {
    loginButton.querySelector("span:last-child").textContent = "Đăng nhập chưa sẵn sàng";
  }
};

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

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const compressImage = async (file) => {
  const source = await fileToDataUrl(file);
  const image = new Image();

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = source;
  });

  const maxSide = 1280;
  const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.82);
};

const renderImagePreviews = () => {
  imagePreviewGrid.replaceChildren();
  imagePreviewGrid.hidden = selectedImages.length === 0;
  imagePreviewGrid.style.display = selectedImages.length ? "grid" : "";
  analyzeImagesButton.disabled = selectedImages.length === 0;
  clearImagesButton.hidden = selectedImages.length === 0;

  selectedImages.forEach((imageData, index) => {
    const item = document.createElement("div");
    item.className = "image-preview";
    const image = document.createElement("img");
    image.src = imageData;
    image.alt = `Ảnh sản phẩm ${index + 1}`;
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", `Xóa ảnh ${index + 1}`);
    removeButton.addEventListener("click", () => {
      selectedImages.splice(index, 1);
      renderImagePreviews();
    });
    item.append(image, removeButton);
    imagePreviewGrid.appendChild(item);
  });
};

const addImageFiles = async (files) => {
  const candidates = Array.from(files)
    .filter((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type))
    .slice(0, Math.max(0, 3 - selectedImages.length));

  if (!candidates.length) {
    showToast("Chọn ảnh JPG, PNG hoặc WEBP");
    return;
  }

  const oversized = candidates.find((file) => file.size > 8 * 1024 * 1024);
  if (oversized) {
    showToast("Mỗi ảnh phải dưới 8 MB");
    return;
  }

  try {
    const compressed = await Promise.all(candidates.map(compressImage));
    selectedImages.push(...compressed);
    renderImagePreviews();
    showToast(`Đã thêm ${compressed.length} ảnh`);
  } catch (error) {
    showToast("Không đọc được ảnh này");
  }
};

const analyzeImagesWithApi = async () => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 30000);

  try {
    const response = await authorizedFetch("/api/analyze-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ images: selectedImages }),
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`Analyze failed: ${response.status}`);
    const data = await response.json();
    if (typeof data.remaining === "number") updateQuotaDisplay(data.remaining);
    return data;
  } finally {
    window.clearTimeout(timeoutId);
  }
};

const applyImageAnalysis = (analysis) => {
  const fieldMap = {
    productName: analysis.productName,
    customer: analysis.customer,
    painPoint: analysis.painPoint,
    benefits: analysis.benefits,
  };

  Object.entries(fieldMap).forEach(([name, value]) => {
    if (value && form.elements[name]) form.elements[name].value = value;
  });

  updateBriefQuality();
  analysisWarning.hidden = false;
};

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
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 12000);
  let response;

  try {
    response = await authorizedFetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new Error(`Generate failed: ${response.status}`);
  }

  const data = await response.json();
  if (typeof data.remaining === "number") updateQuotaDisplay(data.remaining);
  return data.content || data;
};

const buildVariants = (content, input) => {
  const benefits = splitBenefits(input.benefits);
  const benefitText = benefits.join(", ") || input.benefits;
  const firstBenefit = benefits[0] || input.benefits;

  return {
    caption: [
      content.caption,
      `Ai đang ${input.pain} thì xem thử ${input.product} này.\n\nĐiểm mình thích nhất là ${benefitText}.\n\nHợp với ${input.customer}. Cần shop tư vấn kỹ hơn thì comment "tư vấn" nhé.`,
      `${sentenceCase(input.product)} có gì đáng để cân nhắc?\n\n1. ${firstBenefit}.\n2. Hợp với ${input.customer}.\n3. Giải quyết nhu cầu: ${input.pain}.\n\nNhắn shop để xem mẫu phù hợp.`,
      `Đừng vội mua ${input.product} nếu chưa kiểm tra 3 điều này:\n\n- Có hợp với ${input.customer} không?\n- Có giải quyết được chuyện ${input.pain} không?\n- Điểm nổi bật có đúng nhu cầu: ${benefitText}?\n\nCần chọn nhanh, cứ nhắn shop.`,
      `Một món đáng lưu lại cho ${input.customer}: ${input.product}.\n\n${sentenceCase(input.pain)} là chuyện nhiều khách gặp. Mẫu này tập trung vào ${benefitText}.\n\nComment "mẫu" để shop gửi thông tin.`,
      `Review nhanh ${input.product}:\n\nƯu điểm: ${benefitText}.\nPhù hợp: ${input.customer}.\nNhu cầu chính: ${input.pain}.\n\nNếu bạn đang phân vân, inbox shop để được tư vấn đúng nhu cầu.`,
    ],
    description: [
      content.description,
      `${sentenceCase(input.product)}\n\nPHÙ HỢP CHO\n${input.customer}.\n\nĐIỂM NỔI BẬT\n${buildBullets(benefits, "-")}\n\nNHU CẦU SẢN PHẨM GIẢI QUYẾT\n${sentenceCase(input.pain)}.\n\nVui lòng nhắn shop nếu cần tư vấn thêm về mẫu, màu hoặc cách sử dụng.`,
      `${sentenceCase(input.product)} là lựa chọn dành cho ${input.customer}, đặc biệt khi bạn đang ${input.pain}.\n\nLợi ích chính:\n${buildBullets(benefits, "•")}\n\nTrước khi đặt hàng, khách nên kiểm tra kỹ phân loại, thông số và chính sách đổi trả của shop.`,
      `THÔNG TIN SẢN PHẨM\n\nTên: ${sentenceCase(input.product)}\nKhách hàng phù hợp: ${input.customer}\nĐiểm nổi bật: ${benefitText}\nNhu cầu: ${input.pain}\n\nShop hỗ trợ tư vấn trước khi đặt hàng để khách chọn đúng phiên bản phù hợp.`,
      `${sentenceCase(input.product)}\n\nVì sao sản phẩm này đáng cân nhắc?\n${buildBullets(benefits, "-")}\n\nSản phẩm phù hợp cho ${input.customer}. Nếu bạn đang ${input.pain}, hãy nhắn shop để được tư vấn trước khi mua.`,
      `MÔ TẢ NGẮN\n${sentenceCase(input.product)} dành cho ${input.customer}, nổi bật với ${benefitText}.\n\nLƯU Ý\nHình ảnh và màu sắc có thể khác nhẹ tùy thiết bị. Khách vui lòng đọc kỹ phân loại và liên hệ shop khi cần hỗ trợ.`,
    ],
    hooks: [
      content.hooks,
      `1. ${sentenceCase(input.pain)}? Có thể bạn đang chọn sai ${input.product}.\n\n2. Trước khi mua ${input.product}, nhớ kiểm tra điểm này.\n\n3. Đây là lý do ${input.customer} đang chú ý tới ${firstBenefit}.`,
      `1. Tôi ước mình biết điều này trước khi mua ${input.product}.\n\n2. 3 lỗi khiến bạn ${input.pain}.\n\n3. ${sentenceCase(firstBenefit)} có thật sự đáng tiền không?`,
      `1. Dừng lại 5 giây nếu bạn đang ${input.pain}.\n\n2. Đừng mua ${input.product} chỉ vì đang giảm giá.\n\n3. Cách chọn ${input.product} phù hợp cho ${input.customer}.`,
      `1. Trước và sau khi chọn đúng ${input.product} khác nhau thế nào?\n\n2. Vì sao nhiều người mua ${input.product} rồi vẫn không hài lòng?\n\n3. Một điểm nhỏ nhưng quyết định sản phẩm có hợp bạn hay không.`,
      `1. Shop test nhanh ${input.product} cho ai đang phân vân.\n\n2. Nếu bạn cần ${firstBenefit}, xem hết video này.\n\n3. Có nên mua ${input.product} không? Đây là câu trả lời ngắn gọn.`,
    ],
    live: [
      content.live,
      `MỞ LIVE\n"Ai đang ${input.pain} thì ở lại với shop một chút."\n\nGIỚI THIỆU\n"Hôm nay shop có ${input.product}, hợp với ${input.customer}. Điểm nổi bật là ${benefitText}."\n\nCTA\n"Comment 1 để shop tư vấn mẫu phù hợp."`,
      `HOOK\n"Đừng chốt ${input.product} chỉ vì giá rẻ nha."\n\nTƯ VẤN\n"Quan trọng nhất là sản phẩm phải hợp với ${input.customer} và nhu cầu ${input.pain}."\n\nCHỐT\n"Ai cần ${firstBenefit}, comment 'cần' để shop kiểm tra mẫu."`,
      `MỞ ĐẦU\n"Shop nói nhanh 3 lý do mẫu ${input.product} này đáng xem."\n\nLÝ DO\n"Thứ nhất: ${firstBenefit}. Thứ hai: hợp với ${input.customer}. Thứ ba: dễ tư vấn theo nhu cầu thật."\n\nCTA\n"Muốn xem cận sản phẩm thì comment số 2."`,
      `TÌNH HUỐNG\n"Nhiều khách nhắn shop vì ${input.pain}."\n\nGIẢI PHÁP\n"Mẫu ${input.product} tập trung vào ${benefitText}."\n\nCHỐT ĐƠN\n"Ai muốn shop chọn giúp thì để lại nhu cầu trong comment."`,
      `MỞ LIVE NGẮN\n"Ai mới vào live, shop đang giới thiệu ${input.product} cho ${input.customer}."\n\nĐIỂM CHÍNH\n"${sentenceCase(benefitText)}."\n\nKẾT\n"Comment 'giá' để shop gửi thông tin và phân loại hiện có."`,
    ],
  };
};

const renderVariantPlayer = () => {
  const variants = outputVariants[activeOutputType] || [""];
  activeVariantIndex = Math.min(activeVariantIndex, variants.length - 1);
  currentOutput.textContent = variants[activeVariantIndex];
  resultTypeLabel.textContent = outputLabels[activeOutputType];
  variantLabel.textContent = `Phương án ${activeVariantIndex + 1} / ${variants.length}`;

  document.querySelectorAll(".result-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.outputType === activeOutputType);
  });

  variantDots.replaceChildren();
  variants.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `variant-dot${index === activeVariantIndex ? " active" : ""}`;
    dot.setAttribute("aria-label", `Xem phương án ${index + 1}`);
    dot.addEventListener("click", () => {
      activeVariantIndex = index;
      renderVariantPlayer();
    });
    variantDots.appendChild(dot);
  });
};

const renderContent = (content) => {
  outputs.caption.textContent = content.caption;
  outputs.description.textContent = content.description;
  outputs.hooks.textContent = content.hooks;
  outputs.live.textContent = content.live;
  outputVariants = buildVariants(content, getFormData());
  activeVariantIndex = 0;
  renderVariantPlayer();
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
  generateButton.disabled = true;
  generateButton.querySelector("span").textContent = "Đang tạo nội dung...";

  try {
    const content = await generateWithApi(input);
    renderContent(content);
    showToast("Đã tạo bằng AI");
  } catch (error) {
    if (error.name === "AuthRequiredError") return;
    if (error.name === "QuotaExceededError") {
      showToast("Bạn đã dùng hết 5 lượt AI hôm nay");
      return;
    }
    renderContent(buildContent(input));
    showToast(error.name === "AbortError" ? "AI phản hồi chậm, đã dùng bản nhanh" : "Đã dùng bản dự phòng");
  } finally {
    loadingState.hidden = true;
    outputGrid.style.opacity = "1";
    generateButton.disabled = false;
    generateButton.querySelector("span").textContent = "Tạo bộ nội dung";
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

productImagesInput.addEventListener("change", async () => {
  await addImageFiles(productImagesInput.files);
  productImagesInput.value = "";
});

["dragenter", "dragover"].forEach((eventName) => {
  uploadZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    uploadZone.classList.add("dragging");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  uploadZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    uploadZone.classList.remove("dragging");
  });
});

uploadZone.addEventListener("drop", async (event) => {
  await addImageFiles(event.dataTransfer.files);
});

clearImagesButton.addEventListener("click", () => {
  selectedImages = [];
  analysisWarning.hidden = true;
  renderImagePreviews();
  showToast("Đã xóa ảnh");
});

analyzeImagesButton.addEventListener("click", async () => {
  if (!selectedImages.length) return;

  analyzeImagesButton.disabled = true;
  analysisStatus.hidden = false;
  analysisStatus.style.display = "flex";

  try {
    const result = await analyzeImagesWithApi();
    applyImageAnalysis(result.analysis || result);
    showToast(result.mode === "openai" ? "Đã phân tích ảnh" : "Đã điền brief mẫu");
  } catch (error) {
    if (error.name === "AuthRequiredError") return;
    if (error.name === "QuotaExceededError") {
      showToast("Bạn đã dùng hết 5 lượt AI hôm nay");
      return;
    }
    showToast(error.name === "AbortError" ? "Phân tích quá lâu, thử lại sau" : "Chưa phân tích được ảnh");
  } finally {
    analysisStatus.hidden = true;
    analysisStatus.style.display = "";
    analyzeImagesButton.disabled = selectedImages.length === 0;
  }
});

fillDemoButton.addEventListener("click", () => fillSample(samples.shirt));

clearFormButton.addEventListener("click", () => {
  form.reset();
  outputs.caption.textContent = 'Nhập sản phẩm rồi bấm "Tạo bộ nội dung".';
  outputs.description.textContent = "Mô tả sản phẩm sẽ nằm ở đây.";
  outputs.hooks.textContent = "App sẽ gợi ý 3-5 câu mở đầu video.";
  outputs.live.textContent = "Kịch bản live ngắn sẽ nằm ở đây.";
  outputVariants = {
    caption: [outputs.caption.textContent],
    description: [outputs.description.textContent],
    hooks: [outputs.hooks.textContent],
    live: [outputs.live.textContent],
  };
  activeOutputType = "caption";
  activeVariantIndex = 0;
  renderVariantPlayer();
  updateBriefQuality();
  showToast("Đã reset");
});

document.querySelectorAll("[data-sample]").forEach((button) => {
  button.addEventListener("click", () => fillSample(samples[button.dataset.sample]));
});

document.querySelectorAll("[data-template]").forEach((button) => {
  button.addEventListener("click", () => applyTemplate(button.dataset.template));
});

document.querySelectorAll(".result-tab").forEach((button) => {
  button.addEventListener("click", () => {
    activeOutputType = button.dataset.outputType;
    activeVariantIndex = 0;
    renderVariantPlayer();
  });
});

previousVariant.addEventListener("click", () => {
  const variants = outputVariants[activeOutputType];
  activeVariantIndex = (activeVariantIndex - 1 + variants.length) % variants.length;
  renderVariantPlayer();
});

nextVariant.addEventListener("click", () => {
  const variants = outputVariants[activeOutputType];
  activeVariantIndex = (activeVariantIndex + 1) % variants.length;
  renderVariantPlayer();
});

copyCurrentButton.addEventListener("click", () => {
  copyText(outputVariants[activeOutputType][activeVariantIndex]);
});

document.querySelectorAll(".copy-button").forEach((button) => {
  if (!button.dataset.copy) return;
  button.addEventListener("click", () => {
    const target = document.querySelector(`#${button.dataset.copy}`);
    copyText(target.textContent);
  });
});

copyAllButton.addEventListener("click", () => copyText(getAllOutput()));
copyAllTopButton.addEventListener("click", () => copyText(getAllOutput()));

loginButton.addEventListener("click", startGoogleLogin);

logoutButton.addEventListener("click", async () => {
  if (!authClient) return;
  await authClient.auth.signOut({ scope: "local" });
  updateAuthDisplay(null);
  showToast("Đã đăng xuất");
});

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
renderVariantPlayer();
initializeAuth();
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
productName, customer, painPoint, benefits, category, confidence, notes.
Mỗi value là string tiếng Việt. benefits là chuỗi 3-5 ý ngăn cách bằng dấu phẩy.
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


def supabase_is_configured():
    return bool(SUPABASE_URL and SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY)


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
    if not supabase_is_configured():
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
    try:
        result = request_json(
            f"{SUPABASE_URL}/rest/v1/rpc/{function_name}",
            method="POST",
            headers={
                "apikey": SUPABASE_SERVICE_ROLE_KEY,
                "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
                "Content-Type": "application/json",
            },
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
        raise ApiError("Bạn đã dùng hết 5 lượt AI hôm nay.", 429)
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

    content = [{"type": "input_text", "text": VISION_PROMPT}]
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
                    "authConfigured": supabase_is_configured(),
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

            user = verify_supabase_user(self.headers.get("Authorization"))
            remaining = consume_daily_quota(user["id"])

            if self.path == "/api/analyze-image":
                analysis, mode = call_openai_vision(payload)
                self.respond_json(
                    {
                        "mode": mode,
                        "analysis": analysis,
                        "remaining": remaining,
                    }
                )
                return

            content, mode = call_openai(payload)
            self.respond_json(
                {
                    "mode": mode,
                    "content": content,
                    "remaining": remaining,
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
```

### README.md

```markdown
# ShopContentVN AI MVP

App demo cho seller Viet:

- Nhap ten san pham.
- Chon kenh ban va tone.
- Tao caption, mo ta Shopee, hook video va kich ban livestream.
- Upload 1-3 anh san pham de AI goi y brief.
- Dang nhap Google de dung AI.
- Gioi han 5 luot AI moi ngay cho moi tai khoan.
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

Google login va quota can Supabase. Xem `SUPABASE_SETUP.md` va chay `supabase.sql`.
```

### SUPABASE_SETUP.md

```markdown
# Google Login + 5 AI Requests Per Day

## 1. Create Supabase project

Create a free project at:

```text
https://supabase.com/dashboard
```

## 2. Run database SQL

Open `SQL Editor`, paste all content from `supabase.sql`, then run it.

## 3. Enable Google login

In Supabase:

```text
Authentication -> Providers -> Google
```

Enable Google and enter the Google OAuth Client ID and Client Secret.

In Google Cloud, add the callback URL shown by Supabase. It normally looks like:

```text
https://YOUR_PROJECT.supabase.co/auth/v1/callback
```

In Supabase `Authentication -> URL Configuration`, add:

```text
https://shopcontentvn-ai.onrender.com
```

to the allowed redirect URLs.

## 4. Add Render environment variables

Open Render:

```text
shopcontentvn-ai -> Environment
```

Add:

```text
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-api-key
OPENAI_VISION_MODEL=gpt-4.1-mini
```

`SUPABASE_ANON_KEY` is public and is sent to the browser.

`SUPABASE_SERVICE_ROLE_KEY` and `OPENAI_API_KEY` must only exist in Render
environment variables. Never put them in GitHub or frontend JavaScript.

## 5. Redeploy

After saving environment variables, redeploy the Render service.

The server verifies every Supabase access token and allows five combined AI
requests per user per Vietnam calendar day. Both content generation and image
analysis consume one request.
```

### supabase.sql

```text
create table if not exists public.ai_daily_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  usage_date date not null,
  used_count integer not null default 0 check (used_count >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, usage_date)
);

alter table public.ai_daily_usage enable row level security;

create or replace function public.consume_daily_ai_quota(
  p_user_id uuid,
  p_daily_limit integer default 5
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  current_used integer;
  vietnam_date date := timezone('Asia/Ho_Chi_Minh', now())::date;
begin
  insert into public.ai_daily_usage (user_id, usage_date, used_count, updated_at)
  values (p_user_id, vietnam_date, 1, now())
  on conflict (user_id, usage_date)
  do update
    set used_count = public.ai_daily_usage.used_count + 1,
        updated_at = now()
    where public.ai_daily_usage.used_count < p_daily_limit
  returning used_count into current_used;

  if current_used is null then
    return -1;
  end if;

  return greatest(p_daily_limit - current_used, 0);
end;
$$;

create or replace function public.get_daily_ai_remaining(
  p_user_id uuid,
  p_daily_limit integer default 5
)
returns integer
language sql
security definer
set search_path = public
as $$
  select greatest(
    p_daily_limit - coalesce(
      (
        select used_count
        from public.ai_daily_usage
        where user_id = p_user_id
          and usage_date = timezone('Asia/Ho_Chi_Minh', now())::date
      ),
      0
    ),
    0
  );
$$;

revoke all on function public.consume_daily_ai_quota(uuid, integer) from public, anon, authenticated;
revoke all on function public.get_daily_ai_remaining(uuid, integer) from public, anon, authenticated;
grant execute on function public.consume_daily_ai_quota(uuid, integer) to service_role;
grant execute on function public.get_daily_ai_remaining(uuid, integer) to service_role;
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
      - key: OPENAI_VISION_MODEL
        value: gpt-4.1-mini
      - key: OPENAI_API_KEY
        sync: false
      - key: SUPABASE_URL
        sync: false
      - key: SUPABASE_ANON_KEY
        sync: false
      - key: SUPABASE_SERVICE_ROLE_KEY
        sync: false
```

### requirements.txt

```text
# No external Python dependencies are required.
```

