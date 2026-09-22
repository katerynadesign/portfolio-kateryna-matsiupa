# Design system

Source of truth for tokens: [`css/variables.css`](css/variables.css). This document explains the
role of each token and records the layout and typography rules that are otherwise only implicit in
the code. If code and this document disagree, fix whichever is wrong in the same commit.

## Direction

- **Light theme only, for now.** The dark theme is designed but parked (see "Parked: dark theme").
  `:root` sets `color-scheme: light`, so the site stays light even when the OS is in dark mode.
- **Palette:** one navy hue, `#000933`, used at three opacities instead of three different greys
  (the same approach as the original katerynamatsiupa.framer.website). One deliberate exception:
  `--color-card-milk`, a light neutral fill for the work preview and work list cards (see "Card
  tokens").
- **Elevation logic:** the page background is the darkest surface and cards sit on it one step
  lighter (white cards on `#f4f4f4`), separated by a very light shadow. The work preview and work
  list cards are the exception: a thin border instead of a shadow (see "Components").
- **Type pair (confirmed, do not change):** Raleway for headings, Karla for body text.
- **Character:** restrained, editorial, monochrome-in-navy. No accent colour.

## Colour tokens

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#f4f4f4` | Page background (the darkest surface), header, form field background. |
| `--color-surface` | `#ffffff` | Cards, one step lighter than the page. Used by the case cards. |
| `--color-text` | `#000933` | Primary text, headings, primary button fill, link underline, focus border. |
| `--color-text-muted` | `rgba(0, 9, 51, 0.65)` | Body paragraphs, eyebrow, secondary nav links, form status. |
| `--color-border` | `rgba(0, 9, 51, 0.08)` | Hairlines: section dividers, footer rule, input borders, the quick-facts rows, the work preview / work list card border. |
| `--color-inverse` | `#ffffff` | Text placed on a `--color-text` fill (primary button label). |

### Card tokens

| Token | Value | Role |
|---|---|---|
| `--shadow-card` | `0 1px 2px rgba(0,9,51,.06), 0 2px 8px rgba(0,9,51,.04)` | Very light shadow that lifts a card off the page. |
| `--border-card` | `transparent` | Card border colour. Only becomes visible in the parked dark theme. |
| `--color-card-milk` | `#fafafa` | **A deliberate one-off exception** to the neutral `--color-surface` white, at Kateryna's request, for the work preview and work list cards only (see "Components"). Contrast ratio against `--color-bg` (`#f4f4f4`) is `1.054:1` — still subtle; the card reads mainly by its border, not this fill. Not used anywhere else. |
| `--overlay-bg-100` | `rgba(255, 255, 255, 1)` | Translucent panel that fades in over a case card on hover: fully opaque white at the centre of its radial gradient, where the text sits. |
| `--overlay-bg-80` | `rgba(255, 255, 255, 0.8)` | The same panel, at halfway out. |
| `--overlay-bg-40` | `rgba(255, 255, 255, 0.4)` | The same panel, toward the corners: still translucent, never fully transparent, each declared with its own alpha so the fade never drifts through the `transparent` keyword's black. |

### Onboarding diagram tokens

For `.cs-callout` (currently unused — see its own comment in `case-study.css`): colours copied
from the Figma source it was built to annotate. Not used anywhere else.

| Token | Value | Role |
|---|---|---|
| `--color-flow-red` | `#de1c1c` | Annotation callout: a problem. |
| `--color-flow-green` | `#1fa103` | Annotation callout: a decision or guidance. |

### Contrast (WCAG 2.x, computed)

| Pair | Ratio | AA text (4.5:1) |
|---|---|---|
| `--color-text` on `--color-bg` | 17.57 | pass |
| `--color-text` on `--color-surface` | 19.32 | pass |
| `--color-text-muted` on `--color-bg` | 6.04 | pass |
| `--color-text-muted` on `--color-surface` | 6.27 | pass |
| Hover panel centre (100%): `--color-text` / `--color-text-muted`, worst case over any image | 19.32 / 6.27 | pass |
| Hover panel halfway (80%): `--color-text` / `--color-text-muted`, worst case over any image | 12.03 / 5.14 | pass |
| Hover panel toward the corners (40%): `--color-text` / `--color-text-muted`, worst case over any image | 3.37 / 2.46 | **fail** — see known gaps |
| `--color-surface` vs `--color-bg` | 1.10 | n/a: deliberately subtle, reinforced by the shadow |
| `--color-border` on `--color-bg` | ~1.2 | n/a, see known gaps |

"Worst case over any image" means the panel composited over a pure white and a pure black image
(the lower of the two results is shown), so the figures hold for any photo.

## Typography tokens

| Token | Value | Role |
|---|---|---|
| `--font-heading` | `"Raleway"`, system sans fallback | `h1`–`h3`, buttons, eyebrow, CV link, case year. |
| `--font-body` | `"Karla"`, system sans fallback | Everything else. |
| `--font-handwritten` | `"Solitreo"`, `cursive` | **Accent only, currently unused:** built for the hand-drawn callout labels on the AI Assistant Platform Process diagram's Onboarding flow, now two pairs of real images. Never body copy, headings or navigation. |
| `--fs-sm` | `0.875rem` | Nav, buttons, labels, card metadata. |
| `--fs-base` | `1rem` | Body text, form fields. |
| `--fs-lg` | `1.25rem` | Case title. |
| `--fs-xl` | `1.75rem` | Section titles. |
| `--fs-2xl` | `2.75rem` | Hero `h1` on the case study Hook (desktop). |
| `--tracking-wide` | `0.08em` | Letter-spacing on uppercase labels (section titles, eyebrow, case year). |

Fonts load from Google Fonts (`Raleway` 500/600/700, `Karla` 400/500/600) via `<link>` in each page;
nothing is self-hosted. `Solitreo` is loaded only by `ai-assistant-platform.html`. `Raleway` 400
(regular) is loaded only by `index.html`, for the home hero (see "Hero", below): the only place
Raleway is set lighter than 600.

## Spacing, layout, shape, motion tokens

| Token | Value | Role |
|---|---|---|
| `--space-1` … `--space-6` | `0.5rem`, `1rem`, `1.5rem`, `2.5rem`, `4rem`, `6rem` | Spacing scale. `--space-3` is the page side gutter. `--space-6` is the vertical padding of every section. |
| `--container-width` | `1120px` | Content width: 12 × 64px columns + 11 × 32px gutters. |
| `--container-max` | `calc(--container-width + 2 × --space-3)` = `1168px` | The containers' `max-width`, which includes their side gutters. |
| `--grid-gap` | `32px` | Column gutter of the 12-column grid. |
| `--radius` | `2px` | Corner radius for buttons, inputs, cards. Nav arrow buttons are circular (`50%`, not tokenised). |
| `--transition` | `0.2s ease` | Hover/focus transitions, including the case card reveal. |

The only shadow is `--shadow-card`. The (currently unused) `.carousel` has `8px` of top and bottom
padding so that shadow is not clipped by its horizontal `overflow`.

## Layout rules

### 12-column grid
- `.grid-12` is `repeat(12, 1fr)` with a `32px` gap, centred, with the `--space-3` side gutter.
  Its `max-width` is `--container-max` = `1120px + 2 × --space-3` = **`1168px`**, because
  `max-width` includes the padding. That leaves a `1120px` content box and columns of exactly
  **64px** (`(1120 − 11 × 32) / 12`), verified in the browser at 1400px and at 1168px. `.container`
  uses the same `--container-max`. Below 1168px the columns scale fluidly.
- At `max-width: 720px` the grid collapses to a single stacked column (the short description sits
  above the content).

### Section anatomy (About, Contact)
1. Title row: uppercase title, then a full-width divider (`<hr class="section-divider">`) directly
   under it.
2. **Content goes in columns 7–12** (`.section-content`).
3. **An optional short description goes in columns 1–6**, under the divider (`.section-aside`).
   Use it only where it helps: Contact has one, About does not.
- **Hero** has no divider and no section title. Its content (the name line and the two intro
  paragraphs) is limited to **8 of the 12 columns** on column 1 on desktop, full width at ≤720px
  (same formula and mobile override as the case study Hook: `.hero > *` caps `max-width` at 8
  columns + 7 gutters, fluid below 1168px). The name line is Raleway regular (400) at `1.2×` body
  size in `--color-text` (inherited, not set explicitly); the two paragraphs below it are also
  Raleway regular, at `1.4×` the name line's size, and also in `--color-text` (overriding the
  muted colour `p` gets by default, so the whole hero reads in one colour). Raleway regular is
  loaded only for this page (see "Typography tokens"). **On screens wider than 720px**, the hero
  (header + hero) fills nearly the viewport and its content centres vertically: `min-height:
  calc(100vh - 72px - var(--space-5))`, `72px` being the header's measured height (not tokenised,
  see "Known gaps"), so the gap left below (before Work starts) is exactly one `--space-5`. At
  ≤720px the hero keeps its original content-driven height, unchanged.

### Alignment to the grid
- The hero and every section title/divider start at the left edge of column 1.

### Section separation
- Sections are separated by space only: `.section` has `padding: var(--space-6) 0` and **no
  borders between sections**. (The footer's top rule remains; it frames the page and does not separate sections. The header has no border and no shadow: just the page background colour, `--color-bg`, with nothing lifting it off the page below. It slides out of view while scrolling down and returns on scroll up (`js/main.js`; always visible near the top of the page, while the mobile menu is open and while it has keyboard focus).)

## Typography rules

- **Section titles:** uppercase (`text-transform: uppercase`, `--tracking-wide`), Raleway.
- **Buttons, navigation and link-style calls to action: lowercase**, with no `text-transform`. The
  markup itself is written in lowercase (`send message`, `download cv →`, `view case study →`,
  `work / about / contact`). Do not capitalise them.
- **Uppercase labels that are not buttons:** the hero eyebrow, the case year and the case niche
  are uppercase via CSS. This is intentional; the lowercase rule applies to actionable elements.
- Headings other than section titles keep normal capitalisation.

## Components

- **Header (`.nav`):** logo on the left, the nav links (or, on a phone, the menu toggle) on the
  right (`justify-content: space-between`), vertically centred as a row (`align-items: center`).
  The links carry `margin-bottom: var(--space-3)` (24px): with the logo now taller, this nudges
  their own centre up within the row instead of leaving them centred on its full height. No
  bottom padding (`padding: var(--space-2) var(--space-3) 0`): the header ends exactly where the
  logo, its tallest item, ends. No border, no shadow: just `--color-bg`. It slides out of view
  while scrolling down and returns on scroll up (see "Section separation").
  - **Current page or section stays underlined** (`.nav-links a.is-active`, set by
    `js/main.js`): the same look `:hover` already has — full-strength text, the underline grown
    in — left on instead of triggered by the pointer. `work` is active on `work.html` and on
    every case study page (they live under Work, even though none of them is `work.html`
    itself). On the home page, `about` and `contact` instead follow scroll position, via an
    `IntersectionObserver` on the two sections with a thin band across the viewport's middle
    20% (`rootMargin: "-40% 0px -40% 0px"`) deciding which one counts as current; at the Hero,
    neither is active. Each link's `data-nav` attribute (`work` / `about` / `contact`) is what
    the script matches against, not its `href`, since `href` differs by page (`{{home}}`).
- **Logo (`.logo`):** the hand-drawn wordmark, not text. `assets/images/logo.png` is the export as
  given (black ink, transparent background, `3578×3578`, a lot of margin); `logo-mark.png` is it
  cropped tight to the ink and recoloured to `--color-text` (navy, not black, to keep the one-hue
  palette), used in the header at `3.5rem` tall (sized up from an initial `2.5rem`: its thin
  strokes were getting lost), width following its own ratio (about `1.02:1`), with no padding of
  its own around it.
  The `<img>`'s `alt` stays `"Kateryna"`, the accessible name a text logo would have had.
- **Mobile menu icon (`.nav-toggle`):** three 2px bars in `--color-text` at 80% (`color-mix`), a step lighter than the text.
- **Buttons (`.btn`):** Raleway 600, `--fs-sm`, 1px border in `--color-text`. `.btn-primary` is
  filled (`--color-text` fill, `--color-inverse` label) and inverts on hover; `.btn-outline` is the
  reverse.
- **Links:** `--color-text`, no underline at rest, a 1px underline that grows in on hover.
- **Work preview (`.work-preview`, home page):** one card, full grid width, same image / content
  split and card treatment as the work list card below, but it is a **teaser for `work.html` as a
  whole**, not any one case — content is a sentence plus `.case-cta` ("view all case studies →"),
  the same link (and the same "whole card is the link" mechanism, via `position: relative` on
  `.work-preview`) as a work list card, not a `.btn`. **The image is meant to cycle through case
  study thumbnails** (a small rotator); not built yet, so it is a static placeholder with a label,
  the same convention as an unexported case study image (see "AI Assistant Platform case").
  Everything else — the card fill and border, the split, the padding, the alignment — is the same
  rule as the work list card below. On a phone (`≤720px`) the split stacks: image full width,
  content below.
- **Work list card (`.work-item`, `work.html`):** a card — `--color-card-milk` fill, `1px solid
  var(--color-border)`, `--radius` corners, no shadow — split into a square image (`.work-media`,
  columns 1–8, `object-fit: cover`; an empty `aria-hidden` div until a project has one, filled
  `--color-surface` so the placeholder still reads against the milk card) and its content
  (`.work-content`, columns 9–12) — the card's own nested `repeat(12, 1fr)` grid, so the split,
  and the `32px` gap between image and content, line up exactly with the page grid.
  **Image always on the left, content always on the right** — no alternating. Content reuses the
  year/title/niche/description/CTA classes below unchanged, **always visible** (not a hover
  reveal), `padding: var(--space-5) var(--space-4) var(--space-5) 0` (64px top and bottom;
  nothing on the left, since the column-gap already separates it from the image; 40px, not 64px,
  on the right — the narrow (4-column) content box needs the extra width or the CTA wraps as it
  narrows further). Vertically centred, horizontally left — but **stretched**, not shrink-wrapped:
  `align-items: stretch` (not `flex-start`) on the content column itself, so the title and description each
  take the full width remaining after the padding and wrap from there, rather than sizing to
  their own shortest content; `.case-desc`'s usual `36ch` cap is lifted here (`.work-content
  .case-desc { max-width: none }`) so its line length follows that stretched width instead.
  **The CTA is the one exception**: `align-self: flex-start` keeps it at its own content width,
  because the general link style's hover underline (`a { background-size }`, in `css/base.css`)
  is sized as a percentage of the link's own box — stretched, it would grow under the empty space
  past the arrow, not just under "view case study →". The content column's height still follows
  the square image beside it. On a phone (`≤720px`) the split stacks: image full width, content
  below, matching how the rest of the site collapses to one column.
  - **The whole card is the link**, the same mechanism as the case card below: the `view case
    study →` link's `::after` stretches over `.work-item` (its `position: relative` containing
    block), so a click anywhere on the card follows it (one tab stop, one accessible name).
    Keyboard focus outlines the whole card.
- **Case year / title / niche / description / CTA (`.case-year`, `.case-title`, `.case-niche`,
  `.case-desc`, `.case-cta`):** plain typographic classes, not scoped to one card type — the work
  preview, the work list card, and the (currently unused) case card below all use them unchanged
  (bar the `max-width` override on `.case-desc` noted above).
- **Case card (`.case-item`, currently unused):** square, image at rest, content on hover. Built
  for the home page carousel; both moved off the home page to `work.html` (the work list card,
  above), so nothing currently renders this component, but it is kept, working, in case a
  carousel is wanted again (see "Known gaps"). At rest it is just the image (an `<img
  class="case-media">`, `object-fit: cover`) on a `--color-surface` card with `--shadow-card`.
  Year, title, niche, description and CTA live in `.case-overlay`, which covers the whole card and
  fades in (`opacity 0 → 1`, `--transition`) on hover. Content is centred both ways, on a
  three-stop radial gradient: `--overlay-bg-100` (white, fully opaque) at the centre,
  `--overlay-bg-80` at halfway out, `--overlay-bg-40` toward the corners — still translucent
  there, never fully transparent, so the image reads through most where the text never reaches. No
  background blur; legibility comes from the panel's own opacity.
  - **The card itself must not move or resize on hover.** There is no `transform` on the card.
  - **The whole card is the link.** The `view case study →` link is the only anchor; its `::after`
    stretches over `.case-overlay`, which covers the card, so a click anywhere on the card
    follows it (one tab stop, one accessible name). Keyboard focus outlines the whole card.
  - **Never hover-only:** `:focus-within` also reveals the panel (keyboard users reach the CTA), and
    devices without hover (`@media (hover: none)`) always show it. With
    `prefers-reduced-motion: reduce` the fade is instant.
- **Contact form:** name, email, message, labelled fields, 480px max width. Not connected to a
  backend yet (GitHub Pages cannot process forms server-side).

## Page structure

The home page is **Hero → Work → About → Contact**, and no other sections are added. Its Work
section is the [work preview](#components): one flat block, not a list, teasing
[`work.html`](work.html) (see "The work list page" below), which holds the actual 3–5 flagship
cases and is also linked from the header nav directly. Lighter, secondary work gets no section,
page or UI block anywhere on the site; it is at most one sentence inside a flagship case (see
[`CASE-STUDY-TEMPLATE.md`](CASE-STUDY-TEMPLATE.md), "Portfolio architecture"). The navigation is
therefore `work / about / contact`.

### The work list page (`work.html`)

Built from `src/work.html`, loading `css/case-study.css` in addition to the site-wide sheets, for
two components it borrows: the Hook (below, without its background-image variant) and Contents.
After Contents comes the case list: one full-width [work list card](#components) per case,
identical content to what the (currently unused) home carousel card would have shown, just always
visible instead of hover-revealed. Adding, removing or reordering a case here needs three edits
kept in sync: the Contents entry, the `.work-item`, and — for a real case — the actual case study
page (see README, "Adding a case study").

## Case study page

Template: [`case-study-template.html`](case-study-template.html), built from
`src/case-study-template.html` (see README, "Building pages"). Each case listed on
[`work.html`](work.html) has its own page:
[`ai-assistant-platform.html`](ai-assistant-platform.html) is the first real case,
and `case-study-2.html` … `4.html` are placeholders started from the template. Styles are in
[`css/case-study.css`](css/case-study.css) (loaded after `style.css`, only by case pages). It
composes existing tokens and adds no colours or radii; the only new font is the hand-drawn
callout face (see "AI Assistant Platform case"). The header, footer and section
title/divider pattern are identical to the rest of the site. What each section should contain,
and when a project earns a full case at all, is in
[`CASE-STUDY-TEMPLATE.md`](CASE-STUDY-TEMPLATE.md).

### The nine blocks, in this order
Hook → Context & Ownership → Problem → Discovery → Process → Solution → Evolution → Impact →
Reflection & What's next. Do not reorder them. The Hook is the one block without a title and
divider (like the home hero); the other eight each get the standard uppercase title with a
full-width divider.

### Layout rules
- **Hook:** the largest type on the page, `--fs-2xl × 1.15`, one or two sentences, directly under
  the nav with a small eyebrow (`case study · year · niche`). Nothing else on the page may be
  larger (on mobile: `--fs-xl × 1.2`). Two variants, both `.cs-hook`: the background-image one
  (`.cs-hook--bg`, "AI Assistant Platform case" below) and a plain one with no image, used by
  `work.html` — `.cs-hook`'s own padding provides all the spacing there, since the background
  variant's overlap and scrim rules are scoped to `.cs-hook--bg` specifically.
- **Quick facts:** a definition list in **columns 1–4** right after the Hook (role, engagement,
  team, tools). All values share one weight; no row is emphasised. Case study pages only —
  `work.html`'s Hook goes straight to Contents, since there is no single case's facts to show.
- **Contents:** directly under the Hook (under Quick facts, on a case study page), not floating:
  lowercase links scrolling to an anchor further down the same page. On a case study page, one per
  section that has a title (eight: Context & Ownership … Reflection & What's next); **the Hook is
  not listed**, because it is the top of the page and has no title. On `work.html`, one per case
  study card below. Entries fill three columns top to bottom. **The numbers are derived, not
  typed:** a CSS counter numbers the `<li>`s in list order, starting at `01`, so adding, removing
  or reordering an entry never needs manual renumbering.
- **Text column:** prose sits in **columns 5–10** (6 of 12, `544px` on the 64px grid), which
  measures 65–75 characters per line in Karla 16px (all 17 measured lines, average 71.5). Seven
  columns measured 79–84 on the earlier 60px grid, which is too long.
  Prose paragraphs and bullet lists use `--color-text-muted`, the same lighter tone as the Hook
  subtitle (6.04:1 on the page background, AA). Headings, labels, quotes and card titles stay
  `--color-text`.
- **Visual widths, all outside the text column:** default = columns 5–12 (`.cs-figure`), wide =
  columns 1–12 (`.cs-wide`), full-bleed = edge to edge (`.cs-figure--bleed`).
- **Rhythm:** sections use the site-wide `.section` padding (`--space-6`), with no extra rules or
  background panels.

### Visuals per section (do not add more)
| Section | Visual | Width |
|---|---|---|
| Context | one "before" image or diagram | default |
| Problem | one artefact that makes the problem tangible | full-bleed |
| Discovery | one or two insight → decision diagrams | wide, side by side |
| Process | two or three options with a verdict under each; the chosen one is outlined | wide (the most room) |
| Solution | three to five screens in device frames, each with an annotation | wide |
| Evolution | a flat horizontal timeline, three or more milestones | wide |
| Impact | one `.cs-impact` block: a big number (metric variant) or, with no metrics, a stated piece of evidence (evidence variant) | default |
| Hook, Reflection | none | – |

Every non-trivial visual has a one-sentence caption that states the decision, not the obvious:
"wireframe v2 — filters moved to a permanent side panel because usability testing showed people
skipped the collapsed one", not "wireframe v2".

### Components
- **`.cs-row`:** a grid of equal columns that fills by item count (`grid-auto-flow: column`), so
  2–3 variants, 1–2 diagrams, 3–5 screens or 3–4 milestones need no CSS change. It stacks on mobile.
- **Quick facts list (`.cs-facts-list`):** `dl` of `dt`/`dd` pairs, `dt` in uppercase muted
  `--fs-sm` (a label, not a button), hairline between rows.
- **Contents (`.cs-toc`):** ordered list numbered with a CSS counter; links are lowercase like all
  navigation.
- **Option comparison (`.cs-variant`):** `figure` with a 4:3 image and a caption made of an
  uppercase label (`Option B · chosen`) and a one-sentence verdict. `.is-chosen` adds a `1px`
  `--color-text` outline (a box-shadow, so nothing shifts).
- **Device frame (`.cs-device`):** `1px --color-text` border, `--radius` corners, 9:19 ratio,
  `--color-surface` bezel around a `--color-bg` screen. The annotation under it has a bold title
  (`.cs-note-title`) and one sentence.
- **Timeline (`.cs-timeline`):** a hairline with a `9px` square marker per milestone, uppercase
  time label, short title, thumbnail, caption. Deliberately unlike the device row: no frames, and
  the connecting line signals change over time.
- **Impact (`.cs-impact`): one component, three variants.** `--metric` and `--evidence` use the
  same three slots and the same width (columns 5–12), so every case looks alike. The template shows
  both; keep one per case and delete the other. `--tiles` (below the table) shows several
  before → after figures side by side.

  | Slot | `--metric` (there is a number) | `--evidence` (no metrics) |
  |---|---|---|
  | `.cs-impact-kind` | not used | uppercase label naming the kind of proof: trust and continuation, adoption by other teams, stakeholder confirmation, or still in production |
  | `.cs-impact-lead` | the number, `--fs-2xl` | a short claim, `--fs-xl` |
  | `.cs-impact-body` | what it measures, `--fs-lg` | the plain statement of what can be confirmed, `--fs-base` |
  | `.cs-impact-quote` | not used | optional attributed quote, with a `1px` `--color-text` rule (for the stakeholder-confirmation kind) |
  | `.cs-impact-note` | labelled **How it was measured** | labelled **Why this evidence** |

  The lead stays below the Hook in every variant. The wording rules (never invent a number, say
  plainly that there are no metrics) are in `CASE-STUDY-TEMPLATE.md`, part 2. The `--metric`
  variant without its note also serves as the plain **stat callout** in Problem.
- **Impact tiles (`.cs-impact--tiles`):** three or so `.cs-impact-tile`s across columns 1–12, each
  a `--fs-xl` `.cs-impact-lead` and a one-line `.cs-impact-body` in the muted colour. Usually a
  `from → to` figure (the arrow at 0.5625 of the figure size, weight 500, in
  `--color-text-muted`), but the lead can be a short evidence statement instead ("Same system,
  second product") when the tile is naming a kind of proof rather than a measured change — the
  two share one component and one row; nothing distinguishes them but the lead's own content. No
  divider above the tiles. They stack on mobile. Used when a case has several approved figures;
  the lead stays below the Hook.
- **Pull quote (`.cs-quote`):** the quote style shared by user-research quotes (Problem) and
  stakeholder confirmation (Impact evidence): a `1px --color-text` rule, `--fs-lg` text, and a small
  attribution in `footer`.

### AI Assistant Platform case

[`ai-assistant-platform.html`](ai-assistant-platform.html) follows the nine sections with the reviewed,
approved copy from its brief (do not paraphrase it or add facts; new material goes through Kateryna
first). Components built for it, all in `css/case-study.css`:

| Component | Where | What it is |
|---|---|---|
| `.cs-hook-subtitle` | under the Hook | Optional subtitle: Karla at `--fs-lg` in the muted colour (the hero paragraph style), so the Hook stays the largest type. The Hook headline is the first sentence; the subtitle carries the rest of the approved hook copy. |
| `.cs-hook--bg` | the Hook section | The hero image (`hero-alt.png`, 1440×993, blue gradient fading to white at the bottom) is the **background of the Hook section**, the same at every width. It is in normal flow at its own aspect ratio, so its height follows the width (259px at 375px, 965px at 1400px, 1324px at 1920px) and it is **never cropped**. The text block is pulled up over it (`--hook-overlap: 24%` of the width, so it scales with the picture): it starts at 65% of the image height, on the lower part of the laptop, on column 1 and limited to **8 of the 12 columns** on desktop (full width at ≤720px), and runs down past the bottom of the image. A scrim in the page background colour (`--color-bg` at the bottom of the image, opaque up to 30%, transparent at 65%; never white) keeps the text readable over the laptop and joins the image to the page below. `hero-desktop.png` and `hero-mobile.png` currently hold the same picture and are not referenced. |
| Quick facts | after the Hook | The four facts of the Context brief (role, team, duration, engagement). It is not repeated as a second fact strip in Context. |
| `.cs-quotes` | Problem | Two user-research quotes stacked in columns 5–12, attributed "User research". |
| `.cs-findings` | Discovery | Five numbered cards (`01`–`05`, CSS counter) in an auto-fit grid, three across on desktop: title plus one sentence. The card is `--color-surface` with `--shadow-card`. |
| `.cs-onboarding` | Process | The Onboarding flow, old and improved, two pairs of real images (below). |
| `.cs-ia` | Solution | Grouped boxes: Assistant tools (columns 1–4), Business tools (5–9), and a smaller Account / utility group (10–12), the last with an outline and no shadow. Layout only, not a screenshot. |
| `.cs-devices` | Solution | Three placeholders (`solution-screens-1…3.png`) in device frames, each with its caption. |
| `.cs-impact--tiles` | Impact | Five tiles: three before → after figures, then two evidence statements ("Same system, second product", "Shipped and stayed"). |

**Process visual: the Onboarding flow, old and improved (`.cs-onboarding`).** Two real exported
image pairs — a wide "horizontal" one (steps left to right) and a tall "vertical" one (steps top
to bottom) for each of old and after — picked per viewport with no JS, via `<picture>` /
`<source media="(min-width: 721px)">`: horizontal above `721px`, vertical at or below `720px`,
matching the site's one breakpoint. **The two flows are never stacked one after another; they
always sit together, and always start together:**
- **Desktop (horizontal images):** `.cs-onb-flows` is a flex column, `align-items: flex-start`,
  so both images stack vertically but stay **left-aligned to column 1**. Neither image is
  stretched to the column's width (`width: auto; height: clamp(6rem, 16vw, 13rem)`): both share
  one height, so each keeps its own natural width at that height, and the shorter flow's image is
  visibly narrower — measured at 1400px, `820px` (old) vs `790px` (improved), both starting at
  the same left edge.
- **Mobile (`≤720px`, vertical images):** `.cs-onb-flows` switches to a flex row instead, both
  images **top-aligned** side by side (`flex: 1 1 0` each) — never stacked sequentially — so the
  shorter flow's image visibly ends sooner vertically instead.
- Above both sits one heading, "onboarding" (`.cs-onb-title`, aligned to column 1): 25% smaller
  than a section title (`calc(--fs-xl * 0.75)`), the same weight (600), lowercase — unlike a
  section title, which is uppercase, because this is a label inside Process, not a section of its
  own.
- Below each image, its caption (`.cs-onb-caption`, `--fs-sm`, `--color-text-muted`): "old flow" /
  "improved flow", aligned to column 1 on desktop (the figure's own left edge), centred on a
  phone. Only onboarding gets a diagram; the prose above names the other flows redesigned the
  same way (assistant management, channel connections, chats, leads) without showing them.

This is the third build of this one diagram (hand-built CSS boxes, then a live port of the Figma
source, now real images again); the CSS for the second attempt (`.cs-onb-shape`, `.cs-onb-steps`,
the clip-path shapes, `--font-diagram`) has been removed, since none of it is reusable for
anything else on the site. `.cs-callout` (the hand-drawn accent) is kept, parked, unused — see
"Known gaps".

Text in these blocks is copied from the brief. The IA diagram has no caption of its own, because its
group titles label it and the Solution paragraph explains it. Placeholders still to replace with
exported images: `solution-screens-1.png` … `3.png`, and optionally
`evolution-whitelabel-1.png` / `2.png` (Evolution stays text-only until those exist).

### Mobile (≤ 720px)
One column. The reading gutter is `--space-2` (the rest of the site uses `--space-3`) and the text
runs the full available width. Images go edge to edge. Options in Process stack vertically.
Contents becomes one column. The timeline turns vertical.

**Solution becomes one horizontal strip** (so five phones are not five screens of scrolling):
- **A peek of the next screen is always visible.** Each screen is `min(16rem, 100vw − --space-2 −
  --space-3 − --space-5)` wide: at most 16rem, and never so wide that fewer than 4rem of the next
  one shows. At 375px that is a 256px screen with 79px of the next one in view.
- **Snapping is mandatory and respects the gutter.** `scroll-snap-type: x mandatory` with
  `scroll-padding-inline: --space-2`, so a screen never rests half off-screen and rests at the
  reading gutter (not against the edge). The last screen rests against the right gutter.
- **Captions stay readable.** A caption is as wide as its screen and travels with it, so the
  snapped screen's whole caption is always in view; only the peeking next one is cut by the edge.
  Measured at 375px: after each swipe the snapped screen's caption is fully visible.

## Parked: dark theme

Disabled for now; the CSS is kept, commented out, at the bottom of `css/variables.css`. To restore
it, uncomment that block and remove `color-scheme: light` from `:root`. The design logic mirrors
the light theme: darkest surface is the page, cards one step lighter, one pale ink at three
opacities, and depth from a hairline border instead of a shadow.

| Token | Dark value |
|---|---|
| `--color-bg` | `#02040f` (black with a blue tint, not a saturated navy) |
| `--color-surface` | `#090d22` |
| `--color-text` | `#eef0ff` |
| `--color-text-muted` | `rgba(238, 240, 255, 0.65)` |
| `--color-border` | `rgba(238, 240, 255, 0.14)` |
| `--color-inverse` | `#02040f` |
| `--shadow-card` | `none` |
| `--border-card` | `rgba(238, 240, 255, 0.14)` |
| `--overlay-bg-100` | `rgba(22, 28, 58, 1)` |
| `--overlay-bg-80` | `rgba(22, 28, 58, 0.8)` (lighter than the card) |
| `--overlay-bg-40` | `rgba(22, 28, 58, 0.4)` |

Computed contrast for this set: text 18.06 / 16.98 on bg / surface, muted 7.63 / 7.47, hover panel
worst case over any image: centre (100%) 14.7 / 6.89, halfway (80%) 7.77 / 4.36, toward the
corners (40%) 2.19 / 1.7 (text / muted). Both stops past the centre fall under AA for at least one
of the two, and the 40% stop fails badly for both. Not a live issue — this theme is disabled —
but the panel would need reworking, not just an opacity bump, if it is ever restored as-is (see
"Known gaps").

## Known gaps

These are current facts, not decisions:

- **The carousel component is unused.** `.case-item`, `.case-overlay`, `.carousel`,
  `.carousel-track` and the prev/next buttons in `css/style.css`, and the matching block in
  `js/main.js`, no longer render on any page — Work moved off the home page to `work.html`, which
  uses the work list card (`.work-item`) instead. Kept working (the JS guards itself on
  `#carousel` not existing) in case a carousel is wanted again; ask before deleting it.
- **`onboarding-flow-before.png` and `-after.png` (the original, no-suffix pair) are
  unreferenced**, superseded by the `-horizontal` / `-vertical` pairs `.cs-onboarding` now uses.
  Still in `assets/images/projects/`, unused. Kept, not deleted; ask before removing them.
- **The hand-drawn callout component is unused**, for the same reason as `--font-diagram` no
  longer exists at all: `.cs-callout` and its Solitreo font `<link>` in
  `ai-assistant-platform.html`'s `<head>` were built for the second attempt at the Process
  diagram (a live port of its Figma source), now real images again. Kept, not deleted; ask before
  removing either.
- **`work.html`'s Hook, and the home page Work preview's sentence, are placeholder copy**, same
  status as the rest of the site's unfinished text (see README, "To do").
- **The Work preview's image does not actually rotate yet.** It is a static placeholder with a
  label saying what it is meant to become; the rotation mechanism (what drives it, how often, from
  which images) is undecided and not built.
- **The case card's hover panel fails AA toward the corners.** Its 40% stop (`--overlay-bg-40`),
  composited over a pure black image, gives 3.37:1 for `--color-text` and 2.46:1 for
  `--color-text-muted` — both under the 4.5:1 target (see "Contrast"). In practice the card's
  content is a short, centred block (year, title, niche, description, CTA), so it mostly sits
  within the 80–100% zone and only its outermost lines risk the 40% zone over a very dark part of
  an image; this has not been checked against the real project images once they replace the
  placeholders.

- **The favicon is a full, detailed signature** (`favicon.png`, from the same mark as the header
  logo), not a simplified mark built for tiny sizes. At the 16–32px a browser tab actually
  renders, thin cursive strokes are likely to read as a blur rather than a recognisable icon. A
  favicon-specific simplification (an initial, or a bolder reduction of the mark) would read
  better small; not done here because it would mean designing new content, not just placing the
  given file.

- **Borders are decorative-strength.** `--color-border` is about 1.2:1 against the background. That
  is fine for hairline dividers, but form field borders are UI boundaries and would need about 3:1
  under WCAG 1.4.11 if the form becomes a real interaction.
- **1px frame around images.** `.case-item` has a `1px` transparent border (used by the parked dark
  theme) over a white fill, so a full-bleed image would show a 1px white edge. Decide how to handle
  this when real images arrive.
- **Values outside the token file:** the `720px` breakpoint, the card width `clamp()`, the form's
  `480px` max width, the `2.25rem` carousel button size, the `50%` radius, the `12px` panel blur,
  the `36ch` description width, and the header's measured `72px` height (used by the hero's
  `min-height` on wide screens).
- **Device frames are square-cornered.** The only radius token is `--radius: 2px`, so a phone frame
  cannot have rounded corners without a new radius token.
- **Case study sizes derived from tokens, not tokens themselves:** the Hook (`--fs-2xl × 1.15`),
  the mobile Hook and stat multiples, the `6.5rem` label column of Quick facts, the `9px` timeline
  marker and the `9 / 19` device ratio.
- **The Impact lead is at most `--fs-2xl`** (the number) or `--fs-xl` (an evidence claim), smaller
  than a "hero stat" usually is. A larger one would outrank the Hook, which must stay the largest
  type on the page.
- **Three of the four case pages are placeholders** (`case-study-2.html` … `4.html`): copies of the
  template with a different title, year and eyebrow, repeating the same placeholder text. They are
  published and linked, so they show that text to visitors. The AI Assistant Platform page is real,
  apart from its image placeholders.
- **The AI Assistant Platform Impact has no "how it was measured" note**, because the brief supplies
  none and the copy may not be invented. Add one when the method is known.
- **Head is not shared.** Only the header and footer come from partials. Each page keeps its own
  `<head>` (fonts, stylesheet links), so a new stylesheet has to be added to every page.
