# Portfolio Starter (Light/Dark + EN/JA/ZH)

Static portfolio starter with:
- **Light/Dark mode** toggle (Auto respects system preference)
- **Language switcher** (English default, 日本語, 简体中文)
- Grid-first layout with a small modal for project details
- VS Code workspace settings included

## How to use
Open `index.html` in your browser. The theme and language choices are saved in `localStorage`.

### Theme
- Auto (follows your OS)
- Light
- Dark

### Language
Top-right selector switches UI text. You can add more keys in `assets/i18n.js` under `DICT`.

## Customize
- Replace sample project cards in `index.html` with your images and text.  
- Translate any additional strings by adding `data-i18n="your_key"` in HTML and corresponding entries in `DICT`.
- The About page text is also wired to i18n keys.

## Upgrade path
When you move to Next.js, keep the same keys and dictionaries. Hydrate language from cookies or route `/en`, `/ja`, `/zh`.