# Portfolio site

Personal portfolio built with plain HTML, CSS and JavaScript: no framework, no npm, no
dependencies. A small Python script (`build.py`) puts the shared header and footer into every
page.

## Where things are

```
portfolio-site/
├── index.html                  BUILT  home: hero, about, contact
├── work.html                   BUILT  every case study: Hook, Contents, then the cards
├── ai-assistant-platform.html  BUILT  the first real case study
├── case-study-2.html … 4.html  BUILT  placeholder case studies listed on work.html
├── case-study-template.html    BUILT  the template every case page starts from (noindex)
├── build.py                    the page builder (see "Building pages")
├── src/                        WHERE YOU EDIT PAGES
│   ├── index.html
│   ├── work.html
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
│   ├── style.css               page layout, sections, work list, contact form
│   └── case-study.css          case study pages, and the Hook/Contents on work.html
├── js/
│   └── main.js                 see below
├── assets/
│   └── images/
│       ├── logo.png            the hand-drawn wordmark, as exported (untouched source)
│       ├── logo-mark.png       logo.png cropped tight and recoloured navy, used in the header
│       ├── favicon.png         the favicon (logo-mark.png centred on a square canvas)
│       ├── favicon.svg         unused now; kept, not referenced by any page
│       └── projects/           project images go here
├── DESIGN-SYSTEM.md            tokens, layout and typography rules, components
└── CASE-STUDY-TEMPLATE.md      what a case study contains and which projects get one
```

Files marked BUILT are generated. **Edit the matching file in `src/` and rebuild; do not edit a
built page directly**, because the next build overwrites it.

### What `js/main.js` does

It is shared by every page, and each part runs only if its markup is on the page:

- mobile navigation toggle
- the site header: slides away while scrolling down and returns on scroll up
- nav links: underlines the current page (`work`) or, on the home page, whichever of `about` /
  `contact` is scrolled into view
- footer year
- contact form: a placeholder that only shows a message, because GitHub Pages cannot process
  form submissions (see "To do")

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
| `{{home}}` | `""` on `index.html`, `index.html` on every other page, so the shared header links to `#about` on the home page and to `index.html#about` elsewhere. `work` in the nav is a plain link to `work.html`, the same from every page. |

The `<head>`, the page content and the `<script>` tag stay in each page. Only the header and
footer are shared.

### Adding a case study

1. Copy `src/case-study-template.html` to `src/case-study-5.html`.
2. Remove the `noindex` meta tag, then fill in the content (the file's comments explain each
   block; the content rules are in `CASE-STUDY-TEMPLATE.md`).
3. Add a card to `src/work.html`: an entry in the Contents list, and a `.work-item` in the case
   list, pointing its `view case study →` link at the new page.
4. Run `python3 build.py`.

`work.html` holds 3–5 flagship cases. A project that does not earn a full case does not get
a section, a page or a card: it is at most one sentence ("In parallel, I also …") inside a
flagship case, in Process or Evolution, or it is not shown. The rule for choosing is in
`CASE-STUDY-TEMPLATE.md`.

The home page is Hero → Work → About → Contact; do not add sections to it. Its Work section is a
single flat preview block (image half, text and a button half, no card chrome), linking to
`work.html`, which holds the actual list.

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
- [ ] Write the real Hook copy for `work.html`, and the Work preview sentence on the home page
      (currently placeholder text)
- [ ] Decide how the home page Work preview's image should actually rotate through case study
      thumbnails (currently a static placeholder)
- [ ] Fill in `case-study-2.html` … `4.html` (placeholders that repeat the template)
- [ ] Export the one image the AI Assistant Platform page is still waiting for, optional:
      `evolution-whitelabel-1.png` / `2.png`, into `assets/images/projects/`
- [ ] Add `assets/cv.pdf` (the "download cv" link points at it and the file does not exist yet)
- [ ] Update the email and social links in Contact
- [ ] Connect the contact form to a form backend (for example Formspree)
- [ ] Decide where video is hosted (YouTube or Vimeo unlisted, Mux, Cloudinary); do not commit
      raw video files
- [ ] Enable GitHub Pages
