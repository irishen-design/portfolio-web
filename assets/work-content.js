(function () {
  const DEFAULT_LANG = "en";
  const CONTENT_URL = "assets/content.json";
  const CONTENT_FALLBACK_URL = "assets/content.generated.js";
  const LANGS = ["en", "ja", "zh"];

  function splitTitle(title) {
    if (!title || typeof title !== "string") return {};
    const match = title.match(/^([^:]+:)\s+(.+)$/);
    if (!match) return {};
    return {
      cardTitle: match[1],
      cardTitleSecondary: match[2],
    };
  }

  function getLangValue(value, lang) {
    if (typeof value === "string") return value;
    if (!value || typeof value !== "object") return "";
    return value[lang] || value[DEFAULT_LANG] || "";
  }

  function getCopy(raw, section, key, lang) {
    const value =
      raw &&
      raw.site &&
      raw.site.copy &&
      raw.site.copy[section] &&
      raw.site.copy[section][key];
    return getLangValue(value, lang);
  }

  function projectMeta(project, field, lang) {
    return getLangValue(project && project[field], lang);
  }

  function projectTranslation(project, lang) {
    const translations = (project && project.translations) || {};
    const base = translations[DEFAULT_LANG] || {};
    const selected = translations[lang] || {};
    const merged = {};
    const keys = new Set([...Object.keys(base), ...Object.keys(selected)]);
    keys.forEach((key) => {
      merged[key] = selected[key] || base[key] || "";
    });
    return merged;
  }

  function projectImageAlt(project, lang) {
    const cover = project && project.images && project.images.cover;
    const alt = cover && cover.alt;
    return getLangValue(alt, lang) || "";
  }

  function buildUiDictionary(raw, lang) {
    const footer = getCopy(raw, "footer", "copyright", lang) || "© {year} Iris Shen";
    return {
      brand: getCopy(raw, "global", "brand", lang) || getCopy(raw, "global", "site_title", lang),
      lang_label: getCopy(raw, "global", "lang_label", lang) || "Language",
      footer_copyright: footer.includes("{year}") ? footer : `${footer} {year}`,
      modal_year: getCopy(raw, "project", "year", lang) || "Year",
      modal_location: getCopy(raw, "project", "location", lang) || "Location",
      modal_role: getCopy(raw, "project", "role", lang) || "Role",
      modal_experience: getCopy(raw, "project", "experience", lang) || "Experience",
      modal_close: getCopy(raw, "project", "close", lang) || "Close",
      landing_kicker: getCopy(raw, "overlay", "index_kicker", lang) || "Index",
      landing_heading: getCopy(raw, "overlay", "index_heading", lang) || "Spatial practices.",
      landing_work: getCopy(raw, "nav", "work", lang) || "Selected Works",
      landing_about: getCopy(raw, "nav", "about", lang) || "About ME",
      about_title: getCopy(raw, "about", "title", lang) || "About ME",
      contact: getCopy(raw, "nav", "contact", lang) || "Get in touch",
    };
  }

  function buildProjectRuntime(project, lang) {
    const translation = projectTranslation(project, lang);
    const title = translation.cardTitle || translation.detailTitle || project.id;
    const split = splitTitle(title);
    return {
      title,
      cardTitle: split.cardTitle,
      cardTitleSecondary: split.cardTitleSecondary,
      year: translation.metaYear || project.yearDisplay || "",
      location: translation.metaLocation || projectMeta(project, "location", lang),
      role: translation.metaRole || projectMeta(project, "role", lang),
      experience: project.collaboratingFirm || "",
      brief: translation.detailIntro || translation.cardDescription || "",
      imageAlt: projectImageAlt(project, lang),
      coverImage: project.images && project.images.cover ? project.images.cover.path : "",
    };
  }

  function buildRuntimeContent(raw) {
    const projects = Array.isArray(raw && raw.projects) ? raw.projects : [];
    const projectMap = Object.fromEntries(projects.map((project) => [project.id, project]));
    const featuredProject =
      projects.find((project) => project.featured) || projectMap["zisha_museum"] || projects[0];
    const zhangyuanProject = projectMap["zhangyuan_museum"];
    const aboutRaw = (raw && raw.site && raw.site.about) || {};
    const contactItems =
      raw && raw.site && raw.site.contact && Array.isArray(raw.site.contact.items)
        ? raw.site.contact.items
        : [];

    const runtime = {
      raw,
      site: {
        ui: {},
        contact: { items: contactItems },
      },
      work: {},
      about: {},
    };

    LANGS.forEach((lang) => {
      const ui = buildUiDictionary(raw, lang);
      runtime.site.ui[lang] = ui;

      const overlay = {
        work: {
          kicker: getCopy(raw, "overlay", "work_kicker", lang),
          title: getCopy(raw, "overlay", "work_title", lang),
          text: getCopy(raw, "overlay", "work_text", lang),
        },
        about: {
          kicker: getCopy(raw, "overlay", "about_kicker", lang),
          title: getCopy(raw, "overlay", "about_title", lang),
          text: getCopy(raw, "overlay", "about_text", lang),
        },
        contact: {
          kicker: getCopy(raw, "overlay", "contact_kicker", lang),
          title: getCopy(raw, "overlay", "contact_title", lang),
          text: getCopy(raw, "overlay", "contact_text", lang),
        },
      };

      const featuredTranslation = projectTranslation(featuredProject, lang);
      const zhangyuanTranslation = projectTranslation(zhangyuanProject, lang);

      runtime.work[lang] = {
        overlay,
        hero: {
          kicker: featuredTranslation.cardKicker || "Selected Work",
          title:
            featuredTranslation.detailTitle ||
            featuredTranslation.cardTitle ||
            featuredProject.id,
          meta: `${featuredTranslation.metaYear || featuredProject.yearDisplay || ""} · ${
            featuredTranslation.metaLocation ||
            projectMeta(featuredProject, "location", lang)
          }`,
          brief:
            featuredTranslation.detailIntro ||
            featuredTranslation.cardDescription ||
            "",
          cta:
            featuredTranslation.ctaLabel ||
            getCopy(raw, "project", "open_project", lang) ||
            "Open project",
          imageAlt: projectImageAlt(featuredProject, lang),
        },
        features: {
          zhangyuan: zhangyuanProject
            ? {
                kicker: zhangyuanTranslation.cardKicker || "Selected Work",
                title:
                  zhangyuanTranslation.detailTitle ||
                  zhangyuanTranslation.cardTitle ||
                  zhangyuanProject.id,
                meta: `${
                  zhangyuanTranslation.metaYear || zhangyuanProject.yearDisplay || ""
                } · ${
                  zhangyuanTranslation.metaLocation ||
                  projectMeta(zhangyuanProject, "location", lang)
                }`,
                brief:
                  zhangyuanTranslation.cardDescription ||
                  zhangyuanTranslation.detailIntro ||
                  "",
                cta:
                  zhangyuanTranslation.ctaLabel ||
                  getCopy(raw, "project", "open_project", lang) ||
                  "Open project",
                imageAlt: projectImageAlt(zhangyuanProject, lang),
              }
            : null,
        },
        projects: Object.fromEntries(
          projects.map((project) => [project.id, buildProjectRuntime(project, lang)])
        ),
      };

      const timelineEntries = Array.isArray(aboutRaw.timeline) ? aboutRaw.timeline : [];
      runtime.about[lang] = {
        summary: getLangValue(aboutRaw.summary, lang),
        born: {
          year: getLangValue(aboutRaw.born && aboutRaw.born.year, lang),
          label: getLangValue(aboutRaw.born && aboutRaw.born.label, lang),
        },
        present: {
          year: getLangValue(aboutRaw.present && aboutRaw.present.year, lang),
        },
        future: {
          note: getLangValue(aboutRaw.future && aboutRaw.future.note, lang),
        },
        timeline: Object.fromEntries(
          timelineEntries.map((entry) => [
            entry.id,
            {
              year: entry.year || "",
              title: getLangValue(entry.title, lang),
              location: getLangValue(entry.location, lang),
            },
          ])
        ),
      };
    });

    return runtime;
  }

  function applyRuntimeContent(raw) {
    window.SiteContentRaw = raw;
    window.SiteContent = buildRuntimeContent(raw);
    return window.SiteContent;
  }

  async function loadScriptFallback() {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = CONTENT_FALLBACK_URL;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    if (!window.__SITE_CONTENT_JSON__) {
      throw new Error("Fallback content script loaded but no content payload was found.");
    }
    return window.__SITE_CONTENT_JSON__;
  }

  async function loadContent() {
    try {
      const response = await fetch(CONTENT_URL, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Failed to load content.json (${response.status})`);
      }
      return await response.json();
    } catch (error) {
      return await loadScriptFallback().catch((fallbackError) => {
        console.warn("Content JSON load failed.", error);
        console.warn("Fallback content script load failed.", fallbackError);
        throw fallbackError;
      });
    }
  }

  window.SiteContentReady = loadContent().then(applyRuntimeContent);
})();
