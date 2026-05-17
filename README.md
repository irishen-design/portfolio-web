# Iris Shen Portfolio

Static portfolio site for Iris Shen.

Live site:
- [https://irishen-design.github.io/portfolio-web/](https://irishen-design.github.io/portfolio-web/)

## Structure

- [index.html](/Users/irisiri/portfolio-web/index.html)
  Home / selected works page. Also contains the full-screen index overlay.

- [about.html](/Users/irisiri/portfolio-web/about.html)
  About page with intro, profile image, and timeline.

- [assets/style.css](/Users/irisiri/portfolio-web/assets/style.css)
  All layout, typography, color, overlay, desktop/mobile, and interaction styling.

- [assets/script.js](/Users/irisiri/portfolio-web/assets/script.js)
  Overlay behavior, language switching hooks, work-page rendering, modal/gallery behavior, and light interaction logic.

- [assets/i18n.js](/Users/irisiri/portfolio-web/assets/i18n.js)
  Generic UI strings only, such as navigation labels and shared interface text.

- [assets/work-content.js](/Users/irisiri/portfolio-web/assets/work-content.js)
  Editable page content for work and about sections across English, Japanese, and Chinese.

## Editing Content

Use [assets/work-content.js](/Users/irisiri/portfolio-web/assets/work-content.js) for:
- home/work page hero text
- project card text
- feature project text
- about page intro
- about page timeline text

Use [assets/i18n.js](/Users/irisiri/portfolio-web/assets/i18n.js) for:
- `Selected Works`
- `About ME`
- `Get in touch`
- overlay heading / generic labels
- shared UI terms

## Languages

Supported languages:
- English
- Japanese
- Simplified Chinese

English is the default language.

Language preference is saved in local storage with the current key:
- `site:lang:v2`

## Styling Notes

The site is intentionally different on desktop and mobile:
- desktop keeps the editorial overlay preview and staggered work layout
- mobile simplifies navigation and stacks content more directly

Most responsive behavior is handled in:
- [assets/style.css](/Users/irisiri/portfolio-web/assets/style.css)

Key areas to look at:
- header / trigger
- overlay menu
- work hero and feature rows
- about timeline
- touch-specific overrides

## Local Use

This is a static site. There is no build step.

Open locally:
- [index.html](/Users/irisiri/portfolio-web/index.html)
- [about.html](/Users/irisiri/portfolio-web/about.html)

Or use file URLs:
- `file:///Users/irisiri/portfolio-web/index.html`
- `file:///Users/irisiri/portfolio-web/about.html`

## Assets

Images live in [assets](/Users/irisiri/portfolio-web/assets).

Notable source files in the repo:
- [timeline.ai](/Users/irisiri/portfolio-web/timeline.ai)
- [portfolio_content_master.xlsx](/Users/irisiri/portfolio-web/portfolio_content_master.xlsx)
