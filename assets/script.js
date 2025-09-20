document.addEventListener("DOMContentLoaded", () => {
  // Init theme + lang
  if (window.SiteUI && typeof window.SiteUI.init === "function") {
    window.SiteUI.init();
  }

  const modalBackdrop = document.getElementById("modal-backdrop");
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

  // Project galleries (keyed by each card's data-id)
  const GALLERIES = {
    zisha: [
      { src: "assets/img/zisha/cover.jpg", alt: "UCCA Clay Museum cover" },
      { src: "assets/img/zisha/site-1.jpg", alt: "Site view" },
      { src: "assets/img/zisha/interior-1.jpg", alt: "Interior view" },
      { src: "assets/img/zisha/cave-1.jpg", alt: "Cave-like gallery space" },
      { src: "assets/img/zisha/IMG_5753_p.jpg", alt: "Ceramic detail" },
      { src: "assets/img/zisha/sketch-4.png", alt: "Concept sketch 1" },
      { src: "assets/img/zisha/sketch-5.png", alt: "Concept sketch 2" },
    ],
    vc: [
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
    thesis: [
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
    dirtyrealism: [
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
    zhangyuan: [
      {
        src: "assets/img/zhangyuan/cover.jpg",
        alt: "Bird's Eye View of Zhangyuan",
      },
      {
        src: "assets/img/zhangyuan/Masterplan 1to500.jpg",
        alt: "Site Plan",
      },
      {
        src: "assets/img/zhangyuan/model.jpg",
        alt: "Model Shot",
      },
      {
        src: "assets/img/zhangyuan/south1.jpg",
        alt: "South View",
      },
      {
        src: "assets/img/zhangyuan/211108 plaza 2-2.png",
        alt: "Sunken Plaza",
      },
    ],
  };

  // In-modal carousel state
  let currentImages = [];
  let currentIndex = 0;
  let keyHandlerBound = null;
  let lightboxKeyHandler = null;

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
    // Resolve language-specific overrides from DICT.projects[projectId]
    const lang = document.documentElement.lang || "en";
    const dict =
      (window.SiteUI && window.SiteUI.dict && window.SiteUI.dict[lang]) || null;
    const proj =
      dict && dict.projects && data.id ? dict.projects[data.id] : null;
    if (proj) {
      // Only override fields that exist and are non-empty
      if (proj.title) data.title = proj.title;
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

    // Populate gallery if available for this data.id
    if (modalGallery) {
      modalGallery.innerHTML = "";
      // Look up the gallery array by the project's id
      const images = data.id && GALLERIES[data.id] ? GALLERIES[data.id] : null;
      currentImages = images || [];
      currentIndex = 0;
      if (currentImages.length) {
        modalGallery.style.display = "";
        currentImages.forEach((img, i) => {
          const wrap = document.createElement("div");
          wrap.className = "item";
          const el = document.createElement("img");
          el.loading = "lazy";
          el.src = img.src;
          el.alt = img.alt || data.title;
          // Clicking a thumbnail jumps main viewer to that image
          wrap.addEventListener("click", () => {
            currentIndex = i;
            renderMainImage(data.title);
          });
          wrap.appendChild(el);
          modalGallery.appendChild(wrap);
        });
      } else {
        modalGallery.style.display = "none";
      }
    }

    // Setup carousel image and controls
    if (modalCarousel) {
      if (currentImages.length) {
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
      }
    }

    modalBackdrop.style.display = "flex";
  }

  function closeModal() {
    modalBackdrop.style.display = "none";
    // Clean up key handler when closing
    if (keyHandlerBound) {
      document.removeEventListener("keydown", keyHandlerBound);
      keyHandlerBound = null;
    }
  }

  document.querySelectorAll("[data-card]").forEach((card) => {
    card.addEventListener("click", () => {
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
    });
  });

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  closeBtn.addEventListener("click", closeModal);

  // Lightweight custom cursor tracker (CSS-driven visuals)
  const cursorEl = document.getElementById("cursor");
  if (cursorEl) {
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
});
