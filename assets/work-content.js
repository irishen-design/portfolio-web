(function () {
  const WORK_EN = {
    overlay: {
      work: {
        kicker: "Portfolio",
        title: "Selected Works",
        text: "Architecture, interiors, visualization, and design research.",
      },
      about: {
        kicker: "Background",
        title: "About ME",
        text: "Thoughts, experiences, and interests shaping my approach to space and design.",
      },
      contact: {
        kicker: "Direct",
        title: "Contact",
        text: "For projects, collaborations, or simply exchanging ideas.",
      },
    },
    hero: {
      kicker: "Selected Work",
      title: "UCCA Clay Museum",
      meta: "2020–2024 · Yixing, China",
      brief:
        "Inspired by the local “dragon kiln,” the museum reinterprets Yixing’s clay culture through form, materiality, and public space.",
      cta: "Open project",
      imageAlt: "UCCA Clay Museum",
    },
    features: {
      zhangyuan: {
        kicker: "Selected Work",
        title: "Zhangyuan Museum of Art",
        meta: "2021–Present · Shanghai, China",
        brief:
          "Terraced massing frames layered views through a historic longtang, with a below-grade arrival sequence linking hotel, retail, and museum spaces.",
        cta: "Open project",
        imageAlt: "Zhangyuan Museum cover",
      },
    },
    projects: {
      zisha: {
        title: "UCCA Clay Museum",
        year: "2020–2024",
        location: "Yixing, China",
        role: "SD → DD → Construction Supervision",
        experience: "Kengo Kuma and Associates, Shanghai",
        brief:
          "Public museum inspired by the local dragon kiln form; ceramic facade developed with local makers.",
        imageAlt: "UCCA Clay Museum",
      },
      birkenstock: {
        title: "Birkenstock Harajuku Concept Store",
        year: "2022-2023",
        location: "Harajuku, Tokyo, Japan",
        role: "Visualization",
        experience: "",
        brief: "Photo-realistic renderings to push the design process further.",
        imageAlt: "Entrance Render",
      },
      thesis: {
        title: "If Eaves Dropped: Rethinking Privacy NOW",
        cardTitle: "If Eaves Dropped:",
        cardTitleSecondary: "Rethinking Privacy NOW",
        year: "2019-2020",
        location: "Oomori, Tokyo, Japan",
        role: "Thesis Project (Honorable Mention)",
        experience: "Pratt Institute",
        brief:
          "Our project provokes a new sense of privacy: transient privacy, in other words, privacy without ownership.",
        imageAlt: "Animated Sections",
      },
      zhangyuan: {
        title: "Zhangyuan Museum of Art",
        year: "2021–Present",
        location: "Shanghai, China",
        role: "Concept Design → Schematic Design",
        experience: "Kengo Kuma and Associates, Shanghai",
        brief:
          "Terraced massing frames layered views through a historic longtang; B1 entry links hotel and retail via sunken plaza.",
        imageAlt: "Zhangyuan Museum cover",
      },
      dirtyrealism: {
        title: "Confusion and the New Civic",
        year: "2019",
        location: "Shinjuku, Tokyo, Japan",
        role: "Concept Design",
        experience: "",
        brief:
          "Mall concept that introduces a solid volume to create curiosity and a distinct brand atmosphere.",
        imageAlt: "DR cover",
      },
      tama: {
        title: "Porosity: Tama Art University Library Analysis",
        year: "2019",
        location: "Hachioji, Japan",
        role: "Analysis",
        experience: "",
        brief:
          "Explores the idea of porosity through Toyo Ito's Tama Art University Library. Graphic style influenced by Akira and Ghost in the Shell.",
        imageAlt: "Worm's Eye View",
      },
      vc: {
        title: "Closer, not further.",
        year: "2025",
        location: "Meguro, Tokyo, Japan",
        role: "Concept Design",
        experience: "Personal",
        brief:
          "Architectural thesis exploring transient privacy through curvilinear spaces, partial enclosures, and new forms of closeness.",
        imageAlt: "Closer, not further.",
      },
      wuxi: {
        title: "Wuxi Concert Hall and Commercial Complex",
        year: "2022",
        location: "Wuxi, Jiangsu, China",
        role: "Concept Design",
        experience: "",
        brief:
          "The site itself acts as a large concert hall where people can enjoy music events and other cultural activities regardless of being inside or outside.",
        imageAlt: "Main Concept",
      },
      boathouse: {
        title: "Fluid yet Defined: Columbia University Baker Athletic Complex",
        year: "2018",
        location: "Inwood, New York, USA",
        role: "Concept",
        experience: "",
        brief:
          "Taking the idea of fluidity, the key to rowing, we began to study arches as the primary structural scheme for the project.",
        imageAlt: "Model Shot",
      },
    },
  };

  // Edit work-page/project wording here. Generic UI terms still live in assets/i18n.js.
  const ABOUT_EN = {
    summary:
      "Architectural designer currently based in Tokyo, working across architecture, interiors, visualization, and emerging design technologies. Drawn to projects that connect culture, memory, and public life, while constantly exploring how digital tools can reshape the way spaces are imagined and produced.",
    born: {
      year: "1996",
      label: "Born in Shanghai, China",
    },
    present: {
      year: "Present",
    },
    future: {
      note: "Where to NEXT?",
    },
    timeline: {
      pratt_start: {
        year: "2015",
        title: "",
      },
      pratt_end: {
        year: "2020",
        title: "Pratt Institute, Bachelor of Architecture",
        location: "New York City",
      },
      kengo_end: {
        year: "2022",
        title: "Kengo Kuma and Associates",
        location: "Shanghai",
      },
      makethouse: {
        year: "2024",
        title: "MakeHouse",
        location: "Tokyo",
      },
      tange_start: {
        year: "2024",
        title: "Tange Associates",
        location: "Tokyo",
      },
    },
  };

  const ABOUT_JA = {
    summary:
      "東京を拠点に、公共建築や商業複合施設の設計、ビジュアライゼーション、そして新たなデザインテクノロジーの領域を横断して活動する建築デザイナー。文化、記憶、公共空間の関係性に関心を持ちながら、テクノロジーを通して空間と人との関係をどのように再構築できるかを探求している。",
    born: {
      year: "1996",
      label: "Born in Shanghai, China",
    },
    present: {
      year: "Present",
    },
    future: {
      note: "Where to NEXT?",
    },
    timeline: {
      pratt_start: {
        year: "2015",
        title: "",
      },
      pratt_end: {
        year: "2020",
        title: "Pratt Institute, Bachelor of Architecture",
        location: "New York City",
      },
      kengo_end: {
        year: "2022",
        title: "Kengo Kuma and Associates",
        location: "Shanghai",
      },
      makethouse: {
        year: "2024",
        title: "MakeHouse",
        location: "Tokyo",
      },
      tange_start: {
        year: "2024",
        title: "Tange Associates",
        location: "Tokyo",
      },
    },
  };

  const ABOUT_ZH = {
    summary:
      "现居东京的建筑设计师，工作涵盖公共建筑、商业综合体、可视化以及新兴设计科技领域。对于文化、记忆与公共空间之间的联系，同时乐于探索如何运用科技重新塑造空间与人的关系。",
    born: {
      year: "1996",
      label: "Born in Shanghai, China",
    },
    present: {
      year: "Present",
    },
    future: {
      note: "Where to NEXT?",
    },
    timeline: {
      pratt_start: {
        year: "2015",
        title: "",
      },
      pratt_end: {
        year: "2020",
        title: "Pratt Institute, Bachelor of Architecture",
        location: "New York City",
      },
      kengo_end: {
        year: "2022",
        title: "Kengo Kuma and Associates",
        location: "Shanghai",
      },
      makethouse: {
        year: "2024",
        title: "MakeHouse",
        location: "Tokyo",
      },
      tange_start: {
        year: "2024",
        title: "Tange Associates",
        location: "Tokyo",
      },
    },
  };

  window.SiteContent = {
    work: {
      en: WORK_EN,
      ja: JSON.parse(JSON.stringify(WORK_EN)),
      zh: JSON.parse(JSON.stringify(WORK_EN)),
    },
    about: {
      en: ABOUT_EN,
      ja: ABOUT_JA,
      zh: ABOUT_ZH,
    },
  };
})();
