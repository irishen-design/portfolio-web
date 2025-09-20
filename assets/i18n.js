(function(){
  const STORAGE_KEYS = { lang: "site:lang", theme: "site:theme" };
  const DEFAULT_LANG = "en"; // 'en' | 'ja' | 'zh'
  const DICT = {
    en: {
      nav_work: "Works",
      nav_about: "About Me",
      brand: "Iris Shen",
      footer_copyright: "© {year} Iris Shen — All rights reserved.",
      theme_auto: "Auto",
      theme_light: "Light",
      theme_dark: "Dark",
      theme_toggle_label: "Theme",
      lang_label: "Language",
      modal_year: "Year",
      modal_location: "Location",
      modal_role: "Role",
      modal_experience: "Experience",
      modal_close: "Close",
      about_title: "About ME",
      about_body_1: "I’m a Tokyo-based architectural designer with experience at Tange Associates, Kengo Kuma & Associates, and KOOO Architects.",
      about_body_2: "This site is a curated selection of projects with a calm, grid-first presentation.",
      contact: "Contact",
      // Project-specific translations (by card data-id)
      projects: {
        zisha: {
          title: "UCCA Clay Museum",
          brief:
            "Public museum inspired by the local 'dragon kiln' form; ceramic facade developed with local makers.",
          location: "Yixing, China",
          role: "SD → DD → Construction Supervision"
        }
      }
    },
    ja: {
      nav_work: "Works",
      nav_about: "About Me",
      brand: "沈 屹雯",
      footer_copyright: "© {year} 沈 屹雯 — All rights reserved.",
      theme_auto: "自動",
      theme_light: "ライト",
      theme_dark: "ダーク",
      theme_toggle_label: "テーマ",
      lang_label: "言語",
      modal_year: "年",
      modal_location: "場所",
      modal_role: "担当",
      modal_experience: "経験",
      modal_close: "閉じる",
      about_title: "About ME",
      about_body_1: "丹下事務所、隈研吾建築都市設計事務所、KOOOでの経験を持つ、東京拠点の建築デザイナーです。",
      about_body_2: "このサイトは、落ち着いたグリッド重視の構成で厳選したプロジェクトを紹介します。",
      contact: "連絡先",
      // プロジェクトごとの翻訳（カードの data-id で参照）
      projects: {
        zisha: {
          // TODO: ここを日本語に書き換えてください
          title: "UCCA Clay Museum",
          brief:
            "Public museum inspired by the local 'dragon kiln' form; ceramic facade developed with local makers.",
          location: "Yixing, China",
          role: "SD → DD → Construction Supervision"
        }
      }
    },
    zh: {
      nav_work: "Works",
      nav_about: "About Me",
      brand: "沈屹雯",
      footer_copyright: "© {year} 沈屹雯 — All rights reserved.",
      theme_auto: "自动",
      theme_light: "亮色",
      theme_dark: "暗色",
      theme_toggle_label: "主题",
      lang_label: "语言",
      modal_year: "年份",
      modal_location: "地点",
      modal_role: "职责",
      modal_experience: "经历",
      modal_close: "关闭",
      about_title: "About ME",
      about_body_1: "常驻东京的建筑设计师，曾就职于丹下事务所、隈研吾建筑都市设计事务所与KOOO。",
      about_body_2: "本网站以清爽的网格排版呈现部分精选项目。",
      contact: "联系",
      // 项目翻译（通过卡片的 data-id 关联）
      projects: {
        zisha: {
          // TODO: 在此填写中文
          title: "UCCA Clay Museum",
          brief:
            "Public museum inspired by the local 'dragon kiln' form; ceramic facade developed with local makers.",
          location: "Yixing, China",
          role: "SD → DD → Construction Supervision"
        }
      }
    }
  };

  // THEME
  function applyTheme(t){
    if(!t || t === "auto"){
      document.documentElement.removeAttribute("data-theme");
    }else{
      document.documentElement.setAttribute("data-theme", t);
    }
  }
  function getStoredTheme(){ return localStorage.getItem(STORAGE_KEYS.theme) || "auto"; }
  function storeTheme(t){ localStorage.setItem(STORAGE_KEYS.theme, t); }

  // LANG
  function getStoredLang(){ return localStorage.getItem(STORAGE_KEYS.lang) || DEFAULT_LANG; }
  function storeLang(l){ localStorage.setItem(STORAGE_KEYS.lang, l); }

  function translate(lang){
    const dict = DICT[lang] || DICT[DEFAULT_LANG];
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const raw = dict[key];
      if(typeof raw === "string"){
        const text = raw.replace("{year}", new Date().getFullYear());
        if(el.tagName === "INPUT" || el.tagName === "TEXTAREA"){
          el.setAttribute("placeholder", text);
        }else{
          el.textContent = text;
        }
      }
    });
  }

  // Expose minimal API
  window.SiteUI = {
    init(){
      // theme init
      const t = getStoredTheme();
      applyTheme(t);
      const themeSelect = document.getElementById("theme-select");
      if(themeSelect){
        themeSelect.value = t;
        themeSelect.addEventListener("change", () => {
          const val = themeSelect.value;
          storeTheme(val);
          applyTheme(val);
        });
      }

      // lang init
      let lang = getStoredLang();
      const langSelect = document.getElementById("lang-select");
      if(langSelect){
        langSelect.value = lang;
        langSelect.addEventListener("change", () => {
          lang = langSelect.value;
          storeLang(lang);
          translate(lang);
        });
      }
      translate(lang);
    },
    dict: DICT
  };
})();
