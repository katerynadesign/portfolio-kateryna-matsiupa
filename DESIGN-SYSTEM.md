# Design system

Source of truth for tokens: [`css/variables.css`](css/variables.css). This document explains the
role of each token and records the layout and typography rules that are otherwise only implicit in
the code. If code and this document disagree, fix whichever is wrong in the same commit.

## Direction

- **Light theme only, for now.** The dark theme is designed but parked (see "Parked: dark theme").
  `:root` sets `color-scheme: light`, so the site stays light even when the OS is in dark mode.
- **Palette:** one navy hue, `#000933`, used at three opacities instead of three different greys
  (the same approach as the original katerynamatsiupa.framer.website).
- **Elevation logic:** the page background is the darkest surface and cards sit on it one step
  lighter (white cards on `#f4f4f4`), separated by a very light shadow.
- **Type pair (confirmed, do not change):** Raleway for headings, Karla for body text.
- **Character:** restrained, editorial, monochrome-in-navy. No accent colour.

## Colour tokens

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#f4f4f4` | Page background (the darkest surface), header, form field background. |
| `--color-surface` | `#ffffff` | Cards, one step lighter than the page. Used by the case cards. |
| `--color-text` | `#000933` | Primary text, headings, primary button fill, link underline, focus border. |
| `--color-text-muted` | `rgba(0, 9, 51, 0.65)` | Body paragraphs, eyebrow, secondary nav links, form status. |
| `--color-border` | `rgba(0, 9, 51, 0.12)` | Hairlines: section dividers, footer rule, input borders, the quick-facts rows. |
| `--color-inverse` | `#ffffff` | Text placed on a `--color-text` fill (primary button label). |

### Card tokens

| Token | Value | Role |
|---|---|---|
| `--shadow-card` | `0 1px 2px rgba(0,9,51,.06), 0 2px 8px rgba(0,9,51,.04)` | Very light shadow that lifts a card off the page. |
| `--border-card` | `transparent` | Card border colour. Only becomes visible in the parked dark theme. |
| `--overlay-bg` | `rgba(255, 255, 255, 0.88)` | Translucent panel that fades in over a case card on hover. |

### Contrast (WCAG 2.x, computed)

| Pair | Ratio | AA text (4.5:1) |
|---|---|---|
| `--color-text` on `--color-bg` | 17.57 | pass |
| `--color-text` on `--color-surface` | 19.32 | pass |
| `--color-text-muted` on `--color-bg` | 6.04 | pass |
| `--color-text-muted` on `--color-surface` | 6.27 | pass |
| Hover panel: `--color-text`, worst case over any image | 14.69 | pass |
| Hover panel: `--color-text-muted`, worst case over any image | 5.62 | pass |
| `--color-surface` vs `--color-bg` | 1.10 | n/a: deliberately subtle, reinforced by the shadow |
| `--color-border` on `--color-bg` | ~1.3 | n/a, see known gaps |

"Worst case over any image" means the panel composited over a pure white and a pure black image
(the lower of the two results is shown), so the figures hold for any photo.

## Typography tokens

| Token | Value | Role |
|---|---|---|
| `--font-heading` | `"Raleway"`, system sans fallback | `h1`–`h3`, buttons, logo, eyebrow, CV link, case year. |
| `--font-body` | `"Karla"`, system sans fallback | Everything else. |
| `--font-handwritten` | `"Caveat"`, `cursive` | **Accent only:** the hand-drawn callout labels on the AI Assistant Platform Process diagram. Never body copy, headings or navigation. The one font added beyond the Raleway + Karla pair. |
| `--fs-sm` | `0.875rem` | Nav, buttons, labels, card metadata. |
| `--fs-base` | `1rem` | Body text, form fields. |
| `--fs-lg` | `1.25rem` | Hero paragraph, logo, case title. |
| `--fs-xl` | `1.75rem` | Section titles; hero `h1` on mobile. |
| `--fs-2xl` | `2.75rem` | Hero `h1` on desktop. |
| `--tracking-wide` | `0.08em` | Letter-spacing on uppercase labels (section titles, eyebrow, case year). |

Fonts load from Google Fonts (`Raleway` 500/600/700, `Karla` 400/500/600) via `<link>` in each page;
nothing is self-hosted. `Caveat` (500/600) is loaded only by `ai-assistant-platform.html`.

## Spacing, layout, shape, motion tokens

| Token | Value | Role |
|---|---|---|
| `--space-1` … `--space-6` | `0.5rem`, `1rem`, `1.5rem`, `2.5rem`, `4rem`, `6rem` | Spacing scale. `--space-3` is the page side gutter. `--space-6` is the vertical padding of every section. |
| `--container-width` | `1120px` | Content width: 12 × 64px columns + 11 × 32px gutters. |
| `--container-max` | `calc(--container-width + 2 × --space-3)` = `1168px` | The containers' `max-width`, which includes their side gutters. |
| `--grid-gap` | `32px` | Column gutter of the 12-column grid. |
| `--radius` | `2px` | Corner radius for buttons, inputs, cards. Nav arrow buttons are circular (`50%`, not tokenised). |
| `--transition` | `0.2s ease` | Hover/focus transitions, including the case card reveal. |

The only shadow is `--shadow-card`. `.carousel` has `8px` of top and bottom padding so that shadow
is not clipped by its horizontal `overflow`.

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
- **Work** has the same title and divider, but its content is the carousel, which is not confined
  to columns 7–12. Its prev/next buttons sit on the same row as the title.
- **Hero** has no divider and no section title.

### Alignment to the grid
- The hero and every section title/divider start at the left edge of column 1.
- The first carousel item also starts at column 1: `.carousel` sets `--carousel-inset:
  max(--space-3, (100% − --container-width) / 2)` and uses it as both `padding-left` **and**
  `scroll-padding-left`. The scroll-padding is essential: without it, scroll-snap scrolls the
  strip right by the padding on load and the first card sits flush with the screen edge (this was
  the case until it was measured and fixed). Its right side bleeds to the viewport edge so the
  next card peeks in.

### Section separation
- Sections are separated by space only: `.section` has `padding: var(--space-6) 0` and **no
  borders between sections**. (The footer's top rule remains; it frames the page and does not separate sections. The header has no border: it is lifted off the page by a very light shadow, `--shadow-card`. It slides out of view while scrolling down and returns on scroll up (`js/main.js`; always visible near the top of the page, while the mobile menu is open and while it has keyboard focus).)

## Typography rules

- **Section titles:** uppercase (`text-transform: uppercase`, `--tracking-wide`), Raleway.
- **Buttons, navigation and link-style calls to action: lowercase**, with no `text-transform`. The
  markup itself is written in lowercase (`view my work`, `get in touch`, `send message`,
  `download cv →`, `view case study →`, `work / about / contact`). Do not capitalise them.
- **Uppercase labels that are not buttons:** the hero eyebrow, the case year and the case niche
  are uppercase via CSS. This is intentional; the lowercase rule applies to actionable elements.
- The logo (`Kateryna`) and headings other than section titles keep normal capitalisation.

## Components

- **Mobile menu icon (`.nav-toggle`):** three 2px bars in `--color-text` at 80% (`color-mix`), a step lighter than the text.
- **Buttons (`.btn`):** Raleway 600, `--fs-sm`, 1px border in `--color-text`. `.btn-primary` is
  filled (`--color-text` fill, `--color-inverse` label) and inverts on hover; `.btn-outline` is the
  reverse.
- **Links:** `--color-text`, no underline at rest, a 1px underline that grows in on hover.
- **Work carousel:** square cards, `clamp(390px, 48vw, 630px)` wide (`78vw` at ≤720px), horizontal
  scroll with snap, no visible scrollbar. Prev/next buttons scroll by one card and disable at the
  ends. At rest the first card is on column 1 at `scrollLeft: 0`, and every snapped card lands on
  column 1 (see "Alignment to the grid").
- **Case card:** at rest it is just the image on a `--color-surface` card with `--shadow-card`.
  Year, title, niche, description and CTA live in `.case-overlay`, which covers the whole card and
  fades in (`opacity 0 → 1`, `--transition`) on hover. Content is centred both ways, in
  `--color-text` / `--color-text-muted` on `--overlay-bg` with a 12px backdrop blur.
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

The home page is **Hero → Work → About → Contact**, and no other sections are added. Work holds 3–5
flagship cases. Lighter, secondary work gets no section, page or UI block anywhere on the site; it
is at most one sentence inside a flagship case (see
[`CASE-STUDY-TEMPLATE.md`](CASE-STUDY-TEMPLATE.md), "Portfolio architecture"). The navigation is
therefore `work / about / contact`.

## Case study page

Template: [`case-study-template.html`](case-study-template.html), built from
`src/case-study-template.html` (see README, "Building pages"). Each case on the home carousel has
its own page: [`ai-assistant-platform.html`](ai-assistant-platform.html) is the first real case,
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
  larger (on mobile: `--fs-xl × 1.2`).
- **Quick facts:** a definition list in **columns 1–4** right after the Hook (role, engagement,
  team, tools). All values share one weight; no row is emphasised.
- **Contents:** directly under Quick facts, not floating: lowercase links, one per section that has
  a title (eight: Context & Ownership … Reflection & What's next), scrolling to each section's
  anchor. **The Hook is not listed**, because it is the top of the page and has no title; its
  content is unchanged. Entries fill three columns top to bottom. **The numbers are derived, not
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
- **Impact tiles (`.cs-impact--tiles`):** three or so `.cs-impact-tile`s across columns 1–12, each a
  `--fs-xl` `from → to` figure (the arrow at 0.5625 of the figure size, weight 500, in `--color-text-muted`) and a one-line
  label in the muted colour. No divider above the tiles. They stack on mobile. Used when a case has several approved figures; the lead stays
  below the Hook.
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
| `.cs-flow` | Process | The Before / After diagram (below). |
| `.cs-ia` | Solution | Grouped boxes: Assistant tools (columns 1–4), Business tools (5–9), and a smaller Account / utility group (10–12), the last with an outline and no shadow. Layout only, not a screenshot. |
| `.cs-devices` | Solution | Three placeholders (`solution-screens-1…3.png`) in device frames, each with its caption. |
| `.cs-impact--tiles` | Impact | Three before → after tiles. |

**Process diagram (`.cs-flow`).** Two columns of step cards joined by arrows: Before (7 steps) in
columns 1–4 and After (6 steps) in columns 5–8. Each step is a `.cs-flow-box` (`--color-surface`,
`--shadow-card`); the arrow between steps is decorative generated content (`↓`, with an empty alt
text). Sub-lists (Upload Content: Website, Text, Files, FAQ) sit inside the box. The three hand-drawn
callouts belong to the After column only, and sit in the free columns 9–12, each vertically centred
on the step it points at.

**The hand-drawn accent (the one deliberate exception to the flat system).** A callout is a wobbly
ink-coloured SVG arrow (1.5px stroke, irregular control points, no standard arrowhead) plus a short
label in `--font-handwritten` (Caveat 500, `--fs-lg`). Rules:
- The handwriting face is used **only** in `.cs-callout-text`, never for body copy, headings or
  navigation (verified: no other element on the page computes to it).
- The arrow is decoration (`aria-hidden`); the label is real text inside its step, so a screen reader
  reads it with the step it annotates.
- Caveat is loaded only by this page (its own `<link>`), not by the other pages.
- On mobile the columns stack and each callout sits inside its step card under the step name, its
  arrow turned to point up at the name.
- Keep it sparing. It may be extended to the Solution IA diagram or the Impact tiles later if
  Kateryna asks; do not spread it further.

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
| `--overlay-bg` | `rgba(22, 28, 58, 0.88)` (lighter than the card) |

Computed contrast for this set: text 18.06 / 16.98 on bg / surface, muted 7.63 / 7.47, hover panel
worst case over any image 10.26 (text) and 5.37 (muted). All pass AA.

## Known gaps

These are current facts, not decisions:

- **Borders are decorative-strength.** `--color-border` is about 1.3:1 against the background. That
  is fine for hairline dividers, but form field borders are UI boundaries and would need about 3:1
  under WCAG 1.4.11 if the form becomes a real interaction.
- **1px frame around images.** `.case-item` has a `1px` transparent border (used by the parked dark
  theme) over a white fill, so a full-bleed image would show a 1px white edge. Decide how to handle
  this when real images arrive.
- **Values outside the token file:** the `720px` breakpoint, the card width `clamp()`, the form's
  `480px` max width, the `2.25rem` carousel button size, the `50%` radius, the `12px` panel blur and
  the `36ch` description width.
- **Favicon** (`assets/images/favicon.svg`) still uses `#111111`, not the navy.
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
