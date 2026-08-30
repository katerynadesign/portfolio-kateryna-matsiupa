# Portfolio Site

Personal portfolio built with plain HTML, CSS, and JavaScript — no build tools, no frameworks.

## Structure

```
portfolio-site/
├── index.html              # Single-page site: hero, about, work, skills, contact
├── css/
│   ├── variables.css       # Design tokens: colors, spacing, typography
│   ├── base.css            # Reset + base element styles
│   ├── components.css      # Reusable UI: buttons, nav, cards, skills tags
│   └── style.css           # Page layout, sections, responsive rules
├── js/
│   └── main.js              # Mobile nav toggle, footer year
└── assets/
    └── images/
        ├── favicon.svg
        └── projects/         # Project screenshots go here
```

## Local development

No build step needed — open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

Hosted on GitHub Pages, served from the `main` branch root.
Settings → Pages → Source: `main` / `root`.

## To do

- [ ] Replace placeholder name, bio, and role in `index.html`
- [ ] Add real project entries (title, summary, link, screenshot) under Work
- [ ] Update skills list
- [ ] Add real email and social links in Contact
- [ ] Add project screenshots to `assets/images/projects/`
