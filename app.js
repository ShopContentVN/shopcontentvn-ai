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

let selectedImages = [];

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
    const response = await fetch("/api/analyze-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ images: selectedImages }),
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`Analyze failed: ${response.status}`);
    return response.json();
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
    response = await fetch("/api/generate", {
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
