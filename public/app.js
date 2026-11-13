const loginView = document.querySelector("#login-view");
const portalView = document.querySelector("#portal-view");
const loginForm = document.querySelector("#login-form");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector("#password-toggle");
const loginButton = document.querySelector("#login-button");
const loginError = document.querySelector("#login-error");
const logoutButton = document.querySelector("#logout-button");
const productGrid = document.querySelector("#product-grid");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search-input");
const languageFilters = document.querySelector("#language-filters");
const clearFiltersButton = document.querySelector("#clear-filters");
const productCount = document.querySelector("#product-count");
const languageCount = document.querySelector("#language-count");
const manualDialog = document.querySelector("#manual-dialog");
const dialogClose = document.querySelector("#dialog-close");
const manualTitle = document.querySelector("#manual-title");
const manualMeta = document.querySelector("#manual-meta");
const manualContent = document.querySelector("#manual-content");
const manualLanguage = document.querySelector("#manual-language");
const manualDownload = document.querySelector("#manual-download");
const toast = document.querySelector("#toast");

const state = {
  products: [],
  activeLanguage: "all",
  search: "",
  selectedProduct: null,
  selectedLanguage: null,
  requestSequence: 0,
  toastTimer: null
};

function createSvg(paths, viewBox = "0 0 24 24") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", viewBox);
  svg.setAttribute("aria-hidden", "true");
  for (const pathData of paths) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    svg.append(path);
  }
  return svg;
}

function showToast(message) {
  clearTimeout(state.toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  state.toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.message || "请求失败，请稍后重试。");
    error.status = response.status;
    error.code = payload.error;
    throw error;
  }
  return payload;
}

function setLoginLoading(loading) {
  loginButton.classList.toggle("is-loading", loading);
  loginButton.disabled = loading;
  usernameInput.disabled = loading;
  passwordInput.disabled = loading;
  passwordToggle.disabled = loading;
}

function showLogin() {
  portalView.hidden = true;
  loginView.hidden = false;
  window.scrollTo({ top: 0, behavior: "instant" });
  if (manualDialog.open) manualDialog.close();
  setTimeout(() => usernameInput.focus(), 30);
}

function showPortal(user) {
  loginView.hidden = true;
  portalView.hidden = false;
  const name = user?.displayName || "Portal Admin";
  document.querySelector("#user-name").textContent = name;
  document.querySelector("#user-avatar").textContent = name.slice(0, 1).toUpperCase();
  loginError.textContent = "";
  loginForm.reset();
  passwordInput.type = "password";
  passwordToggle.classList.remove("is-visible");
  passwordToggle.setAttribute("aria-pressed", "false");
  window.scrollTo({ top: 0, behavior: "instant" });
}

async function loadCatalog() {
  const payload = await api("/api/catalog");
  state.products = payload.products;
  productCount.textContent = String(state.products.length).padStart(2, "0");

  const languages = new Map();
  state.products.forEach((product) => {
    product.languages.forEach((language) => languages.set(language.code, language));
  });
  languageCount.textContent = String(languages.size).padStart(2, "0");
  renderLanguageFilters([...languages.values()]);
  renderProducts();
}

function renderLanguageFilters(languages) {
  languageFilters.replaceChildren();
  const allButton = document.createElement("button");
  allButton.className = "language-pill";
  allButton.type = "button";
  allButton.dataset.language = "all";
  allButton.textContent = "全部语言";
  languageFilters.append(allButton);

  languages.forEach((language) => {
    const button = document.createElement("button");
    button.className = "language-pill";
    button.type = "button";
    button.dataset.language = language.code;
    button.textContent = language.label;
    button.title = language.label;
    languageFilters.append(button);
  });
  syncFilterButtons();
}

function syncFilterButtons() {
  languageFilters.querySelectorAll(".language-pill").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.language === state.activeLanguage);
  });
}

function filteredProducts() {
  const query = state.search.trim().toLocaleLowerCase();
  return state.products.filter((product) => {
    const hasLanguage =
      state.activeLanguage === "all" ||
      product.languages.some((language) => language.code === state.activeLanguage);
    const haystack = [product.model, product.series, product.category, product.rating]
      .join(" ")
      .toLocaleLowerCase();
    return hasLanguage && (!query || haystack.includes(query));
  });
}

function renderProducts() {
  const products = filteredProducts();
  productGrid.replaceChildren();
  emptyState.hidden = products.length > 0;
  productGrid.hidden = products.length === 0;

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.accent = product.accent;

    const visual = document.createElement("div");
    visual.className = "product-visual";
    visual.setAttribute("aria-hidden", "true");
    const inverter = document.createElement("div");
    inverter.className = "inverter-object";
    inverter.append(document.createElement("span"));
    const modelNumber = document.createElement("span");
    modelNumber.className = "model-number";
    modelNumber.textContent = `${product.model} SERIES`;
    visual.append(inverter, modelNumber);

    const content = document.createElement("div");
    content.className = "product-content";
    const topLine = document.createElement("div");
    topLine.className = "product-topline";
    const category = document.createElement("span");
    category.className = "product-category";
    category.textContent = product.category;
    topLine.append(category);
    if (product.featured) {
      const badge = document.createElement("span");
      badge.className = "featured-badge";
      badge.textContent = "NEW REVISION";
      topLine.append(badge);
    }

    const title = document.createElement("h3");
    title.textContent = `${product.model} · ${product.series}`;
    const description = document.createElement("p");
    description.textContent = `额定范围 ${product.rating} · 最新版本 v${product.version}`;
    const details = document.createElement("div");
    details.className = "product-details";
    const updated = document.createElement("span");
    updated.append(
      createSvg(["M5 5h14v14H5V5Z", "M8 3v4M16 3v4M5 9h14"]),
      document.createTextNode(product.updated.replaceAll("-", "."))
    );
    const languagesLabel = document.createElement("span");
    languagesLabel.append(
      createSvg(["M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18", "M4 7h16M4 17h16"]),
      document.createTextNode(`${product.languages.length} 种语言`)
    );
    details.append(updated, languagesLabel);

    const languageList = document.createElement("div");
    languageList.className = "language-list";
    languageList.setAttribute("aria-label", `${product.model} 可用语言`);
    product.languages.forEach((language) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "language-chip";
      button.dataset.productId = product.id;
      button.dataset.language = language.code;
      button.textContent = language.short;
      button.title = `查看${language.label}版`;
      button.setAttribute("aria-label", `查看${product.model} ${language.label}说明书`);
      languageList.append(button);
    });

    content.append(topLine, title, description, details, languageList);
    card.append(visual, content);
    productGrid.append(card);
  });
}

function setManualLoading(loading) {
  if (loading) {
    manualTitle.textContent = "正在加载说明书…";
    manualMeta.replaceChildren();
    manualContent.replaceChildren();
    const loadingPaper = document.createElement("div");
    loadingPaper.className = "loading-paper";
    loadingPaper.textContent = "读取受保护文档";
    manualContent.append(loadingPaper);
  }
}

async function openManual(product, languageCode) {
  state.selectedProduct = product;
  state.selectedLanguage = languageCode;
  state.requestSequence += 1;
  const requestId = state.requestSequence;

  if (!manualDialog.open) manualDialog.showModal();
  setManualLoading(true);
  manualLanguage.replaceChildren();
  product.languages.forEach((language) => {
    const option = document.createElement("option");
    option.value = language.code;
    option.textContent = language.label;
    option.selected = language.code === languageCode;
    manualLanguage.append(option);
  });
  manualDownload.href = `/api/manuals/${encodeURIComponent(product.id)}/${encodeURIComponent(languageCode)}/download`;

  try {
    const payload = await api(
      `/api/manuals/${encodeURIComponent(product.id)}/${encodeURIComponent(languageCode)}`
    );
    if (requestId !== state.requestSequence) return;
    renderManual(payload.manual);
  } catch (error) {
    if (requestId !== state.requestSequence) return;
    if (error.status === 401) {
      if (manualDialog.open) manualDialog.close();
      showLogin();
      showToast("登录状态已失效，请重新登录。");
      return;
    }
    manualTitle.textContent = "说明书无法加载";
    manualContent.replaceChildren();
    const message = document.createElement("div");
    message.className = "loading-paper";
    message.textContent = error.message;
    manualContent.append(message);
  }
}

function renderManual(manual) {
  manualTitle.textContent = manual.title;
  manualMeta.replaceChildren();
  [
    `${manual.model} 系列`,
    `版本 v${manual.version}`,
    manual.rating,
    manual.language.label
  ].forEach((item) => {
    const span = document.createElement("span");
    span.textContent = item;
    manualMeta.append(span);
  });
  manualDownload.href = `/api/manuals/${encodeURIComponent(manual.id)}/${encodeURIComponent(manual.language.code)}/download`;

  const paper = document.createElement("article");
  paper.className = "manual-paper";
  const summary = document.createElement("p");
  summary.className = "manual-summary";
  summary.textContent = manual.summary;
  paper.append(summary);

  manual.sections.forEach((section, index) => {
    const sectionElement = document.createElement("section");
    sectionElement.className = "manual-section";
    const heading = document.createElement("h3");
    const number = document.createElement("span");
    number.textContent = String(index + 1).padStart(2, "0");
    heading.append(number, document.createTextNode(section.title));
    sectionElement.append(heading);
    section.body.forEach((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      sectionElement.append(paragraph);
    });
    paper.append(sectionElement);
  });

  const disclaimer = document.createElement("div");
  disclaimer.className = "manual-disclaimer";
  disclaimer.textContent =
    "示例资料：当前版本用于展示资料中心功能。投入实际安装、维护或培训前，请替换为经产品与安全团队审核的正式说明书。";
  paper.append(disclaimer);
  manualContent.replaceChildren(paper);
  manualContent.scrollTop = 0;
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginError.textContent = "";
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  if (!username || !password) {
    loginError.textContent = "请输入账号和密码。";
    (!username ? usernameInput : passwordInput).focus();
    return;
  }

  setLoginLoading(true);
  try {
    const payload = await api("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    showPortal(payload.user);
    await loadCatalog().catch((error) => {
      if (error.status === 401) showLogin();
      else showToast(error.message);
    });
  } catch (error) {
    loginError.textContent = error.message;
    passwordInput.select();
  } finally {
    setLoginLoading(false);
  }
});

passwordToggle.addEventListener("click", () => {
  const visible = passwordInput.type === "text";
  passwordInput.type = visible ? "password" : "text";
  passwordToggle.classList.toggle("is-visible", !visible);
  passwordToggle.setAttribute("aria-pressed", String(!visible));
  passwordToggle.setAttribute("aria-label", visible ? "显示密码" : "隐藏密码");
  passwordInput.focus();
});

usernameInput.addEventListener("input", () => {
  loginError.textContent = "";
});

passwordInput.addEventListener("input", () => {
  loginError.textContent = "";
});

logoutButton.addEventListener("click", async () => {
  logoutButton.disabled = true;
  try {
    await api("/api/logout", { method: "POST" });
    state.products = [];
    showLogin();
    showToast("已安全退出。");
  } catch {
    showToast("退出失败，请刷新页面后重试。");
  } finally {
    logoutButton.disabled = false;
  }
});

searchInput.addEventListener("input", () => {
  state.search = searchInput.value;
  renderProducts();
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k" && !portalView.hidden) {
    event.preventDefault();
    searchInput.focus();
  }
});

languageFilters.addEventListener("click", (event) => {
  const button = event.target.closest(".language-pill");
  if (!button) return;
  state.activeLanguage = button.dataset.language;
  syncFilterButtons();
  renderProducts();
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".language-chip");
  if (!button) return;
  const product = state.products.find((item) => item.id === button.dataset.productId);
  if (product) openManual(product, button.dataset.language);
});

clearFiltersButton.addEventListener("click", () => {
  state.activeLanguage = "all";
  state.search = "";
  searchInput.value = "";
  syncFilterButtons();
  renderProducts();
});

manualLanguage.addEventListener("change", () => {
  if (state.selectedProduct) {
    openManual(state.selectedProduct, manualLanguage.value);
  }
});

dialogClose.addEventListener("click", () => manualDialog.close());

manualDialog.addEventListener("click", (event) => {
  if (event.target === manualDialog) manualDialog.close();
});

manualDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  manualDialog.close();
});

async function initialize() {
  try {
    const session = await api("/api/session");
    if (!session.authenticated) {
      showLogin();
      return;
    }
    showPortal(session.user);
    await loadCatalog();
  } catch {
    showLogin();
    showToast("暂时无法连接资料服务器，请稍后刷新。");
  }
}

initialize();
