# Portfolio site

Personal portfolio built with plain HTML, CSS and JavaScript: no framework, no npm, no
dependencies. A small Python script (`build.py`) puts the shared header and footer into every
page.

## Where things are

```
portfolio-site/
├── index.html                  BUILT  home: hero, work carousel, about, contact
├── ai-assistant-platform.html  BUILT  the first real case study
├── case-study-2.html … 4.html  BUILT  placeholder case studies on the home carousel
├── case-study-template.html    BUILT  the template every case page starts from (noindex)
├── build.py                    the page builder (see "Building pages")
├── src/                        WHERE YOU EDIT PAGES
│   ├── index.html
│   ├── ai-assistant-platform.html
│   ├── case-study-2.html … 4.html
│   ├── case-study-template.html
│   └── partials/
│       ├── header.html         shared by every page
│       └── footer.html         shared by every page
├── css/
│   ├── variables.css           design tokens: colours, type, spacing, grid
│   ├── base.css                reset and base element styles
│   ├── components.css          buttons and nav
│   ├── style.css               page layout, sections, carousel, contact form
│   └── case-study.css          case study pages only
├── js/
│   └── main.js                 see below
├── assets/
│   └── images/
│       ├── favicon.svg
│       └── projects/           project images go here
├── DESIGN-SYSTEM.md            tokens, layout and typography rules, components
└── CASE-STUDY-TEMPLATE.md      what a case study contains and which projects get one
```

Files marked BUILT are generated. **Edit the matching file in `src/` and rebuild; do not edit a
built page directly**, because the next build overwrites it.

### What `js/main.js` does

It is shared by every page, and each part runs only if its markup is on the page:

- mobile navigation toggle
- footer year
- contact form: a placeholder that only shows a message, because GitHub Pages cannot process
  form submissions (see "To do")
- the Work carousel: previous/next buttons that scroll one card and disable at the ends

## Building pages

Needs Python 3.8 or newer. Nothing to install.

```bash
python3 build.py            # build every page in src/ into the repository root
python3 build.py --check    # write nothing; exit 1 if a built page is out of date
```

The built pages are written to the repository root because that is what GitHub Pages serves, so
**commit `src/` and the built pages together**. Run `--check` before committing to make sure
nothing was forgotten.

In a page or partial:

| Syntax | Meaning |
|---|---|
| `<!-- @include header -->` | insert `src/partials/header.html` here (the same for `footer`), keeping the indentation |
| `{{home}}` | `""` on `index.html`, `index.html` on every other page, so the shared header links to `#work` on the home page and to `index.html#work` elsewhere |

The `<head>`, the page content and the `<script>` tag stay in each page. Only the header and
footer are shared.

### Adding a case study

1. Copy `src/case-study-template.html` to `src/case-study-5.html`.
2. Remove the `noindex` meta tag, then fill in the content (the file's comments explain each
   block; the content rules are in `CASE-STUDY-TEMPLATE.md`).
3. Add a card to the carousel in `src/index.html` and point its `view case study →` link at the
   new page.
4. Run `python3 build.py`.

The Work carousel holds 3–5 flagship cases. A project that does not earn a full case does not get
a section, a page or a card: it is at most one sentence ("In parallel, I also …") inside a
flagship case, in Process or Evolution, or it is not shown. The rule for choosing is in
`CASE-STUDY-TEMPLATE.md`.

The home page is Hero → Work → About → Contact; do not add sections to it.

## Local development

Build, then serve the repository root:

```bash
python3 build.py
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Opening the built `index.html` directly also works.

## Design rules

- Tokens, grid, typography rules and components: [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md).
- The light theme is the only one for now; the dark theme is written but disabled (see
  `DESIGN-SYSTEM.md`, "Parked").

## Deployment

GitHub Pages, served from the `main` branch root: Settings → Pages → Source: `main` / `root`.

## To do

- [ ] Replace the placeholder name, bio and role
- [ ] Fill in `case-study-2.html` … `4.html` (placeholders that repeat the template)
- [ ] Export the images the AI Assistant Platform page is waiting for: `hero.png`,
      `solution-screens-1.png` … `3.png` (and optionally `evolution-whitelabel-1.png` / `2.png`),
      into `assets/images/projects/`
- [ ] Add project images to `assets/images/projects/` and use them on the carousel cards
- [ ] Add `assets/cv.pdf` (the "download cv" link points at it and the file does not exist yet)
- [ ] Update the email and social links in Contact
- [ ] Connect the contact form to a form backend (for example Formspree)
- [ ] Decide where video is hosted (YouTube or Vimeo unlisted, Mux, Cloudinary); do not commit
      raw video files
- [ ] Enable GitHub Pages
