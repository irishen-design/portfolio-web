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
  Language state and UI translation application. Reads generic UI strings from exported content.

- [assets/work-content.js](/Users/irisiri/portfolio-web/assets/work-content.js)
  Content loader. Reads exported content JSON and builds the runtime content structure used by the site.

- [assets/content.json](/Users/irisiri/portfolio-web/assets/content.json)
  Generated content file used by the website.

- [scripts/export_content.py](/Users/irisiri/portfolio-web/scripts/export_content.py)
  Spreadsheet export script. Converts the master workbook into JSON for the site.

## Editing Content

All website copy is managed from:
- [portfolio_content_master.xlsx](/Users/irisiri/portfolio-web/portfolio_content_master.xlsx)

Main sheets:
- `Site_Copy`
- `Projects`
- `Project_Texts`
- `Project_Images`
- `About_Content`
- `About_Timeline`
- `Contact`

For `Project_Images`, the key structural fields are:
- `image_role`
- `image_order`
- `display_variant`
- `image_path`

Workflow:
1. Edit [portfolio_content_master.xlsx](/Users/irisiri/portfolio-web/portfolio_content_master.xlsx)
2. Run:

```bash
/Users/irisiri/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 scripts/export_content.py
```

3. This regenerates:
   - [assets/content.json](/Users/irisiri/portfolio-web/assets/content.json)
   - [assets/content.generated.js](/Users/irisiri/portfolio-web/assets/content.generated.js)
4. Reload the site

The site should not require component edits for copy changes.

## Languages

Supported languages:
- English
- Japanese
- Simplified Chinese

English is the default language.

Language preference is saved in local storage with the current key:
- `site:lang:v2`

The language switcher reads the selected language from exported content and applies the matching translation automatically.

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

Notes:
- The site prefers [assets/content.json](/Users/irisiri/portfolio-web/assets/content.json)
- For direct `file://` previews, it can fall back to [assets/content.generated.js](/Users/irisiri/portfolio-web/assets/content.generated.js)

## Assets

Images live in [assets](/Users/irisiri/portfolio-web/assets).

Notable source files in the repo:
- [timeline.ai](/Users/irisiri/portfolio-web/timeline.ai)
- [portfolio_content_master.xlsx](/Users/irisiri/portfolio-web/portfolio_content_master.xlsx)
