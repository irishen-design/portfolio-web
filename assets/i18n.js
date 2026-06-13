(function () {
  const STORAGE_KEYS = { lang: "site:lang:v2" };
  const DEFAULT_LANG = "en";

  function safeGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (_) {
      // Local file previews may block storage; fail soft.
    }
  }

  function getStoredLang() {
    return safeGet(STORAGE_KEYS.lang) || DEFAULT_LANG;
  }

  function storeLang(lang) {
    safeSet(STORAGE_KEYS.lang, lang);
  }

  function getDictionary(lang) {
    const site = window.SiteContent && window.SiteContent.site;
    const ui = site && site.ui;
    return (ui && (ui[lang] || ui[DEFAULT_LANG])) || {};
  }

  async function translate(lang) {
    if (window.SiteContentReady && typeof window.SiteContentReady.then === "function") {
      try {
        await window.SiteContentReady;
      } catch (_) {
        // Continue with fallbacks if content loading failed.
      }
    }

    const dict = getDictionary(lang);
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const raw = dict[key];
      if (typeof raw !== "string") return;
      const text = raw.replace("{year}", new Date().getFullYear());
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.setAttribute("placeholder", text);
      } else {
        el.textContent = text;
      }
    });

    document.dispatchEvent(
      new CustomEvent("site:langchange", {
        detail: { lang },
      })
    );
  }

  window.SiteUI = {
    async init() {
      let lang = getStoredLang();
      const langSelect = document.getElementById("lang-select");
      if (langSelect) {
        langSelect.value = lang;
        langSelect.addEventListener("change", async () => {
          lang = langSelect.value;
          storeLang(lang);
          await translate(lang);
        });
      }
      await translate(lang);
    },
    getCurrentLang() {
      return document.documentElement.lang || getStoredLang() || DEFAULT_LANG;
    },
  };
})();
