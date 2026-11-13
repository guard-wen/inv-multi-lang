const manuals = {
  en: {
    htmlLang: "en",
    selectorLabel: "Manual language",
    selectorHint: "说明书语言",
    code: "EN",
    caption: "English edition",
    edition: "ENGLISH EDITION",
    placeholderTitle: "Manual image placeholder",
    placeholderHint: "Replace this area with the English manual image.",
    slotNote: "Reserved space for the instruction manual image",
    image: "assets/manuals/150w-en.jpg"
  },
  "zh-CN": {
    htmlLang: "zh-CN",
    selectorLabel: "说明书语言",
    selectorHint: "Manual language",
    code: "简",
    caption: "简体中文版",
    edition: "简体中文版",
    placeholderTitle: "说明书图片预留位",
    placeholderHint: "此处将显示简体中文版说明书图片。",
    slotNote: "说明书图片预留位",
    image: "assets/manuals/150w-zh-CN.jpg"
  },
  "zh-TW": {
    htmlLang: "zh-Hant",
    selectorLabel: "說明書語言",
    selectorHint: "Manual language",
    code: "繁",
    caption: "繁體中文版",
    edition: "繁體中文版",
    placeholderTitle: "說明書圖片預留位",
    placeholderHint: "此處將顯示繁體中文版說明書圖片。",
    slotNote: "說明書圖片預留位",
    image: "assets/manuals/150w-zh-TW.jpg"
  },
  de: {
    htmlLang: "de",
    selectorLabel: "Sprache der Anleitung",
    selectorHint: "说明书语言",
    code: "DE",
    caption: "Deutsche Ausgabe",
    edition: "DEUTSCHE AUSGABE",
    placeholderTitle: "Platzhalter für Anleitungsbild",
    placeholderHint: "Hier wird das Bild der deutschen Anleitung eingefügt.",
    slotNote: "Reservierter Bereich für das Anleitungsbild",
    image: "assets/manuals/150w-de.jpg"
  },
  es: {
    htmlLang: "es",
    selectorLabel: "Idioma del manual",
    selectorHint: "说明书语言",
    code: "ES",
    caption: "Edición en español",
    edition: "EDICIÓN EN ESPAÑOL",
    placeholderTitle: "Espacio para la imagen del manual",
    placeholderHint: "Aquí se mostrará la imagen del manual en español.",
    slotNote: "Espacio reservado para la imagen del manual",
    image: "assets/manuals/150w-es.jpg"
  }
};

const elements = {
  selector: document.querySelector("#language-select"),
  label: document.querySelector("#language-label"),
  hint: document.querySelector(".language-label-group small"),
  code: document.querySelector("#language-code"),
  caption: document.querySelector("#figure-caption"),
  edition: document.querySelector("#cover-edition"),
  placeholderTitle: document.querySelector("#placeholder-title"),
  placeholderHint: document.querySelector("#placeholder-hint"),
  slotNote: document.querySelector("#slot-note"),
  image: document.querySelector("#manual-image"),
  placeholder: document.querySelector("#image-placeholder")
};

let imageRequest = 0;

function selectedLanguage() {
  const requested = new URLSearchParams(window.location.search).get("lang");
  return manuals[requested] ? requested : "en";
}

function updateLanguage(language, updateUrl = true) {
  const manual = manuals[language];
  if (!manual) return;

  elements.selector.value = language;
  elements.label.textContent = manual.selectorLabel;
  elements.hint.textContent = manual.selectorHint;
  elements.code.textContent = manual.code;
  elements.caption.textContent = manual.caption;
  elements.edition.textContent = manual.edition;
  elements.placeholderTitle.textContent = manual.placeholderTitle;
  elements.placeholderHint.textContent = manual.placeholderHint;
  elements.slotNote.textContent = manual.slotNote;
  elements.placeholder.lang = manual.htmlLang;
  elements.image.alt = manual.caption;

  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    window.history.replaceState({}, "", url);
  }

  imageRequest += 1;
  const requestId = imageRequest;
  elements.image.hidden = true;
  elements.image.removeAttribute("src");
  elements.placeholder.hidden = false;

  const image = new Image();
  image.addEventListener("load", () => {
    if (requestId !== imageRequest) return;
    elements.image.src = manual.image;
    elements.image.hidden = false;
    elements.placeholder.hidden = true;
  });
  image.src = manual.image;
}

elements.selector.addEventListener("change", () => {
  updateLanguage(elements.selector.value);
});

updateLanguage(selectedLanguage(), false);
