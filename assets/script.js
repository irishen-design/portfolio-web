document.addEventListener("DOMContentLoaded", async () => {
  // Init theme + lang
  if (window.SiteContentReady && typeof window.SiteContentReady.then === "function") {
    try {
      await window.SiteContentReady;
    } catch (error) {
      console.warn("SiteContentReady failed; continuing with existing markup.", error);
    }
  }

  if (window.SiteUI && typeof window.SiteUI.init === "function") {
    try {
      await window.SiteUI.init();
    } catch (error) {
      console.warn("SiteUI.init failed; continuing with default UI state.", error);
    }
  }

  const modalBackdrop = document.getElementById("modal-backdrop");
  const modal = modalBackdrop ? modalBackdrop.querySelector(".modal") : null;
  const modalTitle = document.getElementById("modal-title");
  const modalYear = document.getElementById("modal-year");
  const modalLocation = document.getElementById("modal-location");
  const modalRole = document.getElementById("modal-role");
  const modalBrief = document.getElementById("modal-brief");
  const modalExperience = document.getElementById("modal-experience");
  const modalGallery = document.getElementById("modal-gallery");
  // Carousel elements
  const modalCarousel = document.getElementById("modal-carousel");
  const carouselImg = document.getElementById("carousel-image");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const closeBtn = document.getElementById("modal-close");
  // Lightbox elements
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-image");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const cursorEl = document.getElementById("cursor");
  const menuTrigger = document.getElementById("menu-trigger");
  const siteOverlay = document.getElementById("site-overlay");
  const landingPreviewKicker = document.getElementById("landing-preview-kicker");
  const landingPreviewTitle = document.getElementById("landing-preview-title");
  const landingPreviewText = document.getElementById("landing-preview-text");
  const landingPreviewImage = document.getElementById("landing-preview-image");
  const landingPreviewImageSecondary = document.getElementById(
    "landing-preview-image-secondary"
  );
  const landingPreviewMedia = document.querySelector(".landing-preview-media");
  const landingPreviewContact = document.getElementById("landing-preview-contact");
  const landingContactEmail = document.getElementById("landing-contact-email");
  const landingContactLinkedIn = document.getElementById("landing-contact-linkedin");
  const landingContactGitHub = document.getElementById("landing-contact-github");
  const landingLinks = document.querySelectorAll(".landing-link");
  const workMain = document.querySelector(".work-main");
  const aboutMain = document.querySelector(".about");

  function getCurrentLang() {
    return document.documentElement.lang || "en";
  }

  function getWorkContent(lang) {
    const store = window.SiteContent && window.SiteContent.work;
    if (!store) return null;
    return store[lang] || store.en || null;
  }

  function getAboutContent(lang) {
    const store = window.SiteContent && window.SiteContent.about;
    if (!store) return null;
    return store[lang] || store.en || null;
  }

  function getRawProject(projectId) {
    const projects = window.SiteContentRaw && Array.isArray(window.SiteContentRaw.projects)
      ? window.SiteContentRaw.projects
      : [];
    return projects.find((project) => project.id === projectId) || null;
  }

  function getLocalizedValue(value, lang) {
    if (typeof value === "string") return value;
    if (!value || typeof value !== "object") return "";
    return value[lang] || value.en || "";
  }

  function getProjectImages(projectId, lang) {
    const project = getRawProject(projectId);
    const gallery =
      project && project.images && Array.isArray(project.images.gallery)
        ? project.images.gallery
        : [];

    if (gallery.length) {
      return gallery.map((item) => ({
        src: item.path,
        alt: getLocalizedValue(item.alt, lang),
        caption: getLocalizedValue(item.caption, lang),
        variant: item.displayVariant || "",
        imageOrder: item.imageOrder || 0,
      }));
    }

    const fallback = projectId && GALLERIES[projectId] ? GALLERIES[projectId] : [];
    return fallback.map((item, index) => ({
      src: item.src,
      alt: item.alt || "",
      caption: item.caption || "",
      variant: item.variant || "",
      imageOrder: index * 10,
    }));
  }

  function setAboutText(key, value) {
    const node = document.querySelector(`[data-about="${key}"]`);
    if (node && typeof value === "string") {
      node.textContent = value;
    }
  }

  function applyLandingPreview(link) {
    if (
      !link ||
      !landingPreviewKicker ||
      !landingPreviewTitle ||
      !landingPreviewText ||
      !landingPreviewImage
    ) {
      return;
    }

    landingPreviewKicker.textContent =
      link.getAttribute("data-preview-kicker") || "";
    landingPreviewTitle.textContent =
      link.getAttribute("data-preview-title") || "";
    landingPreviewText.textContent =
      link.getAttribute("data-preview-text") || "";
    const target = link.getAttribute("data-preview-target") || "";
    const isContact = target === "contact";

    if (landingPreviewMedia && landingPreviewContact) {
      landingPreviewMedia.hidden = isContact;
      landingPreviewContact.hidden = !isContact;
    }

    if (!isContact && landingPreviewImage) {
      landingPreviewImage.src = link.getAttribute("data-preview-image") || "";
      landingPreviewImage.alt =
        link.getAttribute("data-preview-title") || "Preview image";
      const secondaryImage =
        link.getAttribute("data-preview-image-secondary") || "";

      if (landingPreviewMedia && landingPreviewImageSecondary) {
        const hasSecondary = Boolean(secondaryImage);
        landingPreviewMedia.classList.toggle("is-looping", hasSecondary);
        landingPreviewImageSecondary.hidden = !hasSecondary;
        landingPreviewImageSecondary.src = hasSecondary ? secondaryImage : "";
        landingPreviewImageSecondary.alt = hasSecondary
          ? landingPreviewImage.alt
          : "";
      }
    }

    if (isContact) {
      const email =
        link.getAttribute("data-contact-email") || "irishen16@outlook.com";
      const linkedin =
        link.getAttribute("data-contact-linkedin") || "linkedin.com/in/yourname";
      const github =
        link.getAttribute("data-contact-github") || "github.com/yourname";

      if (landingContactEmail) {
        landingContactEmail.href = `mailto:${email}`;
        const label = landingContactEmail.querySelector(".landing-contact-label");
        if (label && email && window.SiteContent && window.SiteContent.site) {
          const currentLang = document.documentElement.lang || "en";
          const item = (window.SiteContent.site.contact.items || []).find(
            (entry) => entry.id === "email"
          );
          label.textContent =
            (item &&
              item.label &&
              (item.label[currentLang] || item.label.en || item.id || "Email")) ||
            "Email";
        }
        const value = landingContactEmail.querySelector(".landing-contact-value");
        if (value) value.textContent = email;
      }
      if (landingContactLinkedIn) {
        landingContactLinkedIn.href = `https://${linkedin.replace(/^https?:\/\//, "")}`;
        const value = landingContactLinkedIn.querySelector(".landing-contact-value");
        if (value) value.textContent = linkedin;
      }
      if (landingContactGitHub) {
        landingContactGitHub.href = `https://${github.replace(/^https?:\/\//, "")}`;
        const value = landingContactGitHub.querySelector(".landing-contact-value");
        if (value) value.textContent = github;
      }
    }

    landingLinks.forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");
  }

  function initCursor() {
    if (!cursorEl) return;
    const supportsFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!supportsFinePointer || prefersReducedMotion) {
      cursorEl.style.display = "none";
      return;
    }

    const rootStyle = document.documentElement.style;
    let idleTimer = null;
    const IDLE_AFTER = 1200; // ms
    window.addEventListener(
      "mousemove",
      (e) => {
        // Center the 20px circle on the pointer
        const x = e.clientX - 12;
        const y = e.clientY - 12;
        rootStyle.setProperty("--cx", x + "px");
        rootStyle.setProperty("--cy", y + "px");
        // Idle handling
        cursorEl.classList.remove("is-idle");
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(
          () => cursorEl.classList.add("is-idle"),
          IDLE_AFTER
        );
      },
      { passive: true }
    );
  }

  function initLandingPreview() {
    if (
      !landingLinks.length ||
      !landingPreviewKicker ||
      !landingPreviewTitle ||
      !landingPreviewText ||
      !landingPreviewImage
    ) {
      return;
    }

    landingLinks.forEach((link, index) => {
      link.addEventListener("mouseenter", () => applyLandingPreview(link));
      link.addEventListener("focus", () => applyLandingPreview(link));

      if (index === 0) {
        applyLandingPreview(link);
      }
    });
  }

  function setProjectDataset(article, project) {
    if (!article || !project) return;
    article.setAttribute("data-title", project.title || "");
    article.setAttribute("data-year", project.year || "");
    article.setAttribute("data-location", project.location || "");
    article.setAttribute("data-role", project.role || "");
    article.setAttribute("data-experience", project.experience || "");
    article.setAttribute("data-brief", project.brief || "");
  }

  function renderCardHeading(heading, project) {
    if (!heading || !project) return;
    heading.innerHTML = "";
    const title = project.cardTitle || project.title || "";
    heading.appendChild(document.createTextNode(title));

    if (project.cardTitleSecondary) {
      const titleBreak = document.createElement("span");
      titleBreak.className = "title-break";
      titleBreak.appendChild(
        document.createTextNode(project.cardTitleSecondary + " ")
      );
      const year = document.createElement("span");
      year.className = "meta";
      year.textContent = project.year || "";
      titleBreak.appendChild(year);
      heading.appendChild(titleBreak);
      return;
    }

    const year = document.createElement("span");
    year.className = "meta";
    year.textContent = project.year || "";
    heading.appendChild(document.createTextNode(" "));
    heading.appendChild(year);
  }

  function renderWorkContent(lang) {
    if (!workMain) return;
    const content = getWorkContent(lang);
    if (!content) return;

    landingLinks.forEach((link) => {
      const target = link.getAttribute("data-preview-target");
      const preview = target && content.overlay ? content.overlay[target] : null;
      if (!preview) return;
      link.setAttribute("data-preview-kicker", preview.kicker || "");
      link.setAttribute("data-preview-title", preview.title || "");
      link.setAttribute("data-preview-text", preview.text || "");
      if (target === "contact" && window.SiteContent && window.SiteContent.site) {
        const items = window.SiteContent.site.contact.items || [];
        const email = items.find((item) => item.id === "email");
        const linkedin = items.find((item) => item.id === "linkedin");
        const github = items.find((item) => item.id === "github");
        if (email) link.setAttribute("data-contact-email", email.value || "");
        if (linkedin) link.setAttribute("data-contact-linkedin", linkedin.value || "");
        if (github) link.setAttribute("data-contact-github", github.value || "");
      }
    });
    applyLandingPreview(
      document.querySelector(".landing-link.is-active") || landingLinks[0]
    );

    const heroArticle = document.querySelector(".work-hero-card");
    const hero = content.hero;
    const heroProject =
      heroArticle && heroArticle.getAttribute("data-id")
        ? content.projects[heroArticle.getAttribute("data-id")]
        : null;
    if (heroArticle && heroProject && hero) {
      setProjectDataset(heroArticle, heroProject);
      const heroImg = heroArticle.querySelector(".work-hero-media img");
      if (heroImg) {
        if (heroProject.coverImage) heroImg.src = heroProject.coverImage;
        heroImg.alt = hero.imageAlt || heroProject.imageAlt || hero.title;
      }
      const heroKicker = heroArticle.querySelector(".section-kicker");
      const heroTitle = heroArticle.querySelector("#work-hero-title");
      const heroMeta = heroArticle.querySelector(".work-hero-meta");
      const heroBrief = heroArticle.querySelector(".work-hero-brief");
      const heroCta = heroArticle.querySelector(".work-hero-cta");
      if (heroKicker) heroKicker.textContent = hero.kicker || "";
      if (heroTitle) heroTitle.textContent = hero.title || heroProject.title || "";
      if (heroMeta) heroMeta.textContent = hero.meta || "";
      if (heroBrief) heroBrief.textContent = hero.brief || heroProject.brief || "";
      if (heroCta) heroCta.textContent = hero.cta || "";
    }

    const zhangyuanFeature = document.querySelector(
      '.work-feature[data-id="zhangyuan_museum"]'
    );
    const zhangyuanProject = content.projects.zhangyuan_museum;
    const zhangyuanFeatureContent = content.features.zhangyuan;
    if (zhangyuanFeature && zhangyuanProject && zhangyuanFeatureContent) {
      setProjectDataset(zhangyuanFeature, zhangyuanProject);
      const img = zhangyuanFeature.querySelector(".work-feature-media img");
      if (img) {
        if (zhangyuanProject.coverImage) img.src = zhangyuanProject.coverImage;
        img.alt =
          zhangyuanFeatureContent.imageAlt || zhangyuanProject.imageAlt || "";
      }
      const kicker = zhangyuanFeature.querySelector(".section-kicker");
      const title = zhangyuanFeature.querySelector("h2");
      const meta = zhangyuanFeature.querySelector(".work-feature-meta");
      const brief = zhangyuanFeature.querySelector(".work-feature-brief");
      const cta = zhangyuanFeature.querySelector(".work-feature-cta");
      if (kicker) kicker.textContent = zhangyuanFeatureContent.kicker || "";
      if (title)
        title.textContent =
          zhangyuanFeatureContent.title || zhangyuanProject.title || "";
      if (meta) meta.textContent = zhangyuanFeatureContent.meta || "";
      if (brief)
        brief.textContent =
          zhangyuanFeatureContent.brief || zhangyuanProject.brief || "";
      if (cta) cta.textContent = zhangyuanFeatureContent.cta || "";
    }

    document.querySelectorAll(".card[data-id]").forEach((article) => {
      const projectId = article.getAttribute("data-id");
      const project = projectId ? content.projects[projectId] : null;
      if (!project) return;
      setProjectDataset(article, project);
      const img = article.querySelector("img");
      if (img) {
        if (project.coverImage) img.src = project.coverImage;
        img.alt = project.imageAlt || project.title || "";
      }
      const heading = article.querySelector("h3");
      renderCardHeading(heading, project);
      const location = article.querySelector("p");
      if (location) location.textContent = project.location || "";
    });
  }

  function renderAboutContent(lang) {
    if (!aboutMain) return;
    const content = getAboutContent(lang);
    if (!content) return;

    setAboutText("summary", content.summary || "");
    if (content.born) {
      setAboutText("born.year", content.born.year || "");
      setAboutText("born.label", content.born.label || "");
    }
    if (content.timeline) {
      Object.keys(content.timeline).forEach((key) => {
        const entry = content.timeline[key];
        if (!entry) return;
        setAboutText(`timeline.${key}.year`, entry.year || "");
        const titleNode = document.querySelector(`[data-about="timeline.${key}.title"]`);
        if (titleNode) {
          titleNode.textContent = entry.title || "";
          titleNode.style.display = entry.title ? "" : "none";
        }
        const locationNode = document.querySelector(
          `[data-about="timeline.${key}.location"]`
        );
        if (locationNode) {
          locationNode.textContent = entry.location || "";
          locationNode.style.display = entry.location ? "" : "none";
        }
      });
    }
    if (content.present) {
      setAboutText("present.year", content.present.year || "");
    }
    if (content.future) {
      setAboutText("future.note", content.future.note || "");
    }
  }

  function initOverlay() {
    if (!menuTrigger || !siteOverlay) {
      return;
    }

    function setOverlayState(isOpen) {
      document.body.classList.toggle("overlay-open", isOpen);
      siteOverlay.classList.toggle("is-open", isOpen);
      siteOverlay.setAttribute("aria-hidden", isOpen ? "false" : "true");
      menuTrigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuTrigger.classList.toggle("is-open", isOpen);
      menuTrigger.setAttribute(
        "aria-label",
        isOpen ? "Close index menu" : "Open index menu"
      );
    }

    menuTrigger.addEventListener("click", () => {
      const nextState = !siteOverlay.classList.contains("is-open");
      setOverlayState(nextState);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && siteOverlay.classList.contains("is-open")) {
        setOverlayState(false);
      }
    });

    siteOverlay.addEventListener("click", (event) => {
      if (event.target === siteOverlay) {
        setOverlayState(false);
      }
    });

    landingLinks.forEach((link) => {
      link.addEventListener("click", () => {
        setOverlayState(false);
      });
    });
  }

  initLandingPreview();
  initOverlay();
  renderWorkContent(getCurrentLang());
  renderAboutContent(getCurrentLang());
  document.addEventListener("site:langchange", (event) => {
    const lang = (event.detail && event.detail.lang) || getCurrentLang();
    renderWorkContent(lang);
    renderAboutContent(lang);
  });

  // If the page doesn't include the project modal (e.g. static pages), skip modal wiring.
  if (!modalBackdrop) {
    initCursor();
    return;
  }

  // Project galleries (keyed by each card's data-id)
  const GALLERIES = {
    zisha_museum: [
      { src: "assets/img/zisha/site-1.jpg", alt: "Aerial site view", variant: "hero" },
      {
        src: "assets/img/zisha-ecosystem-diagram.svg",
        alt: "Ecosystem diagram for UCCA Clay Museum",
        variant: "diagram",
      },
      {
        src: "assets/img/zisha/interior-1.jpg",
        alt: "Interior view of the museum from 2F",
        variant: "wide",
      },
      {
        src: "assets/img/zisha/0923结构模型分析图.png",
        alt: "Exploded Axonometric Diagram",
        variant: "diagram",
      },
      {
        src: "assets/img/zisha/cave-1.jpg",
        alt: "Exterior view of the plaza",
        variant: "full",
      },
      { src: "assets/img/zisha/sketch-4.png", alt: "Concept sketch 1", variant: "narrow" },
      { src: "assets/img/zisha/sketch-5.png", alt: "Concept sketch 2", variant: "narrow" },
    ],
    visional_city: [
      {
        src: "assets/img/VC/axon.png",
        alt: "Axonometric Diagram",
      },
      {
        src: "assets/img/VC/Board.png",
        alt: "Final Board",
      },
      {
        src: "assets/img/VC/GF-Plan.png",
        alt: "Ground Floor Plan",
      },
      {
        src: "assets/img/VC/2F-Plan.png",
        alt: "2F Plan",
      },
      {
        src: "assets/img/VC/3F-Plan.png",
        alt: "3F Plan",
      },
      {
        src: "assets/img/VC/RF-Plan.png",
        alt: "Roof Plan",
      },
    ],
    if_eaves_dropped: [
      {
        src: "assets/img/if eaves dropped/section.gif",
        alt: "Rethinking Privacy — animated section",
      },
      {
        src: "assets/img/if eaves dropped/lo.jpg",
        alt: "Conventional understanding of ownership realized through buying property",
      },
      {
        src: "assets/img/if eaves dropped/lon.jpg",
        alt: "Redefinition of architectural ownership claimed by enclosing a space",
      },
      {
        src: "assets/img/if eaves dropped/BOOK_Page_21.png",
        alt: "Foraml Studies",
      },
      {
        src: "assets/img/if eaves dropped/BOOK_Page_22.png",
        alt: "Formal Studies",
      },
      {
        src: "assets/img/if eaves dropped/BOOK_Page_23.png",
        alt: "Model Shots",
      },
      {
        src: "assets/img/if eaves dropped/BOOK_Page_24.png",
        alt: "Model Shots",
      },
      {
        src: "assets/img/if eaves dropped/PUBLIC PLAN.png",
        alt: "Public Plan",
      },
      {
        src: "assets/img/if eaves dropped/Private Plan.png",
        alt: "Private Plan",
      },
    ],
    confusion_new_civic: [
      {
        src: "assets/img/dirty realism/cover.jpg",
        alt: "Conceptual Entry Render",
      },
      {
        src: "assets/img/dirty realism/plan.jpg",
        alt: "Conceptual Plan",
      },
      {
        src: "assets/img/dirty realism/section.jpg",
        alt: "Conceptual Section",
      },
      {
        src: "assets/img/dirty realism/pers-1.jpg",
        alt: "Conceptual Experiencial Render",
      },
      {
        src: "assets/img/dirty realism/pers-2.jpg",
        alt: "Conceptual Experiencial Render",
      },
      {
        src: "assets/img/dirty realism/pers-3.jpg",
        alt: "Conceptual Experiencial Render",
      },
    ],
    zhangyuan_museum: [
      {
        src: "assets/img/zhangyuan/cover.jpg",
        alt: "Bird's Eye View of Zhangyuan",
        variant: "hero",
      },
      {
        src: "assets/img/zhangyuan/Masterplan 1to500.jpg",
        alt: "Site Plan",
        variant: "diagram",
      },
      {
        src: "assets/img/zhangyuan/model.png",
        alt: "Model Shot",
        variant: "wide",
      },
      {
        src: "assets/img/zhangyuan/south1.jpg",
        alt: "South View",
        variant: "full",
      },
      {
        src: "assets/img/zhangyuan/211108 plaza 2-2.png",
        alt: "Sunken Plaza",
        variant: "narrow",
      },
    ],
    porosity_tama: [
      {
        src: "assets/img/tama/Tama_worm_s.jpg",
        alt: "Worm's Eye View",
      },
    ],
    wuxi_concert_hall: [
      {
        src: "assets/img/wuxi/cover.jpg",
        alt: "Main Concept",
      },
    ],
    fluid_yet_defined: [
      {
        src: "assets/img/boathouse/cover.jpg",
        alt: "Model Shot",
      },
    ],
    birkenstock_harajuku: [
      {
        src: "assets/img/birkenstock/cover2.png",
        alt: "Entrance Render",
      },
    ],
  };

  // In-modal carousel state
  let currentImages = [];
  let currentIndex = 0;
  let keyHandlerBound = null;
  let lightboxKeyHandler = null;
  const EDITORIAL_PROJECTS = new Set(["zisha_museum", "zhangyuan_museum"]);

  function renderMainImage(title) {
    if (!carouselImg || !currentImages.length) return;
    const item = currentImages[currentIndex];
    carouselImg.src = item.src;
    carouselImg.alt = item.alt || title || "";
    // Update selected thumb highlight
    if (modalGallery) {
      modalGallery.querySelectorAll(".item").forEach((node, i) => {
        if (i === currentIndex) node.classList.add("selected");
        else node.classList.remove("selected");
      });
    }
  }

  function go(delta, title) {
    if (!currentImages.length) return;
    currentIndex =
      (currentIndex + delta + currentImages.length) % currentImages.length;
    renderMainImage(title);
  }

  function renderLightbox(title) {
    if (!lightboxImg || !currentImages.length) return;
    const item = currentImages[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt || title || "";
    if (lightboxCaption) {
      lightboxCaption.textContent = item.alt || title || "";
    }
  }

  function openLightbox(title) {
    if (!lightbox || !currentImages.length) return;
    renderLightbox(title);
    lightbox.style.display = "flex";
    // Bind controls
    lightboxPrev &&
      (lightboxPrev.onclick = () => {
        go(-1, title);
        renderLightbox(title);
      });
    lightboxNext &&
      (lightboxNext.onclick = () => {
        go(+1, title);
        renderLightbox(title);
      });
    lightboxImg &&
      (lightboxImg.onclick = () => {
        go(+1, title);
        renderLightbox(title);
      });
    lightboxClose && (lightboxClose.onclick = closeLightbox);
    // Close on backdrop click
    const backdropHandler = (e) => {
      if (e.target === lightbox) closeLightbox();
    };
    lightbox.addEventListener("click", backdropHandler, { once: true });
    // Keyboard
    lightboxKeyHandler = (e) => {
      if (e.key === "ArrowLeft") {
        go(-1, title);
        renderLightbox(title);
      }
      if (e.key === "ArrowRight") {
        go(+1, title);
        renderLightbox(title);
      }
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", lightboxKeyHandler);
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.style.display = "none";
    if (lightboxKeyHandler) {
      document.removeEventListener("keydown", lightboxKeyHandler);
      lightboxKeyHandler = null;
    }
  }

  // Open modal and populate fields + gallery
  function openModal(data) {
    const lang = document.documentElement.lang || "en";
    const workContent = getWorkContent(lang);
    const proj =
      workContent && workContent.projects && data.id
        ? workContent.projects[data.id]
        : null;
    if (proj) {
      if (proj.title) data.title = proj.title;
      if (proj.year) data.year = proj.year;
      if (proj.brief) data.brief = proj.brief;
      if (proj.location) data.location = proj.location;
      if (proj.role) data.role = proj.role;
      if (proj.experience) data.experience = proj.experience;
    }

    modalTitle.textContent = data.title;
    modalYear.textContent = data.year;
    modalLocation.textContent = data.location;
    modalRole.textContent = data.role;
    modalBrief.textContent = data.brief;
    if (modalExperience) {
      modalExperience.textContent = data.experience || "—";
    }

    const isEditorial = !!(data.id && EDITORIAL_PROJECTS.has(data.id));
    if (modal) {
      modal.classList.toggle("modal--editorial", isEditorial);
    }

    // Populate gallery if available for this data.id
    if (modalGallery) {
      modalGallery.innerHTML = "";
      currentImages = data.id ? getProjectImages(data.id, lang) : [];
      currentIndex = 0;
      if (currentImages.length) {
        modalGallery.style.display = "";
        currentImages.forEach((img, i) => {
          const wrap = document.createElement(isEditorial ? "figure" : "div");
          wrap.className = `item${isEditorial ? ` item--stack item--${img.variant || "full"}` : ""}`;
          const el = document.createElement("img");
          el.loading = "lazy";
          el.src = img.src;
          el.alt = img.alt || data.title;
          wrap.addEventListener("click", () => {
            currentIndex = i;
            if (isEditorial) {
              openLightbox(data.title);
              return;
            }
            renderMainImage(data.title);
          });
          wrap.appendChild(el);
          if (isEditorial && img.caption) {
            const caption = document.createElement("figcaption");
            caption.className = "modal-media-caption";
            caption.textContent = img.caption;
            wrap.appendChild(caption);
          }
          modalGallery.appendChild(wrap);
        });
      } else {
        modalGallery.style.display = "none";
      }
    }

    // Setup carousel image and controls
    if (modalCarousel) {
      if (currentImages.length && !isEditorial) {
        modalCarousel.style.display = "";
        renderMainImage(data.title);
        // Bind nav buttons
        prevBtn && (prevBtn.onclick = () => go(-1, data.title));
        nextBtn && (nextBtn.onclick = () => go(+1, data.title));
        // Click main image to open fullscreen lightbox
        carouselImg && (carouselImg.onclick = () => openLightbox(data.title));
        // Keyboard navigation while modal open
        keyHandlerBound = (e) => {
          if (e.key === "ArrowLeft") go(-1, data.title);
          if (e.key === "ArrowRight") go(+1, data.title);
          if (e.key === "Escape") closeModal();
        };
        document.addEventListener("keydown", keyHandlerBound);
      } else {
        modalCarousel.style.display = "none";
        keyHandlerBound = (e) => {
          if (e.key === "Escape") closeModal();
        };
        document.addEventListener("keydown", keyHandlerBound);
      }
    }

    modalBackdrop.style.display = "flex";
  }

  function closeModal() {
    modalBackdrop.style.display = "none";
    if (modal) {
      modal.classList.remove("modal--editorial");
    }
    // Clean up key handler when closing
    if (keyHandlerBound) {
      document.removeEventListener("keydown", keyHandlerBound);
      keyHandlerBound = null;
    }
  }

  document.querySelectorAll("[data-card]").forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-haspopup", "dialog");

    const openCard = () => {
      // Collect structured data from the clicked card's data-* attributes
      const data = {
        title: card.getAttribute("data-title"),
        year: card.getAttribute("data-year"),
        location: card.getAttribute("data-location"),
        role: card.getAttribute("data-role"),
        brief: card.getAttribute("data-brief"),
        experience: card.getAttribute("data-experience"),
        id: card.getAttribute("data-id"),
      };
      openModal(data);
    };

    card.addEventListener("click", openCard);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCard();
      }
    });
  });

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  closeBtn.addEventListener("click", closeModal);

  // Lightweight custom cursor tracker (CSS-driven visuals)
  initCursor();
});
