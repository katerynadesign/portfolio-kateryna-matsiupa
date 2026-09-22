# Case study template

The decisions behind how a project becomes (or does not become) a case study on this site. It
starts with the shape of the whole portfolio, then three parts: the structure of a flagship case,
how to write **Impact** when there are no metrics, and how to choose which template a project gets.

The page itself is [`case-study-template.html`](case-study-template.html) (built from
`src/case-study-template.html`; see the README for how to add a case); its layout and
components are documented in [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md#case-study-page). This file is
about content and judgement, not CSS.

---

## Portfolio architecture

The home page has four sections and no others:

**Hero → Work → About → Contact**

- **Work** is a single flat preview block (an image half, a text-and-button half, no card chrome),
  not a list — a teaser for [`work.html`](work.html), linked from the header nav too. That page
  lists **3–5 flagship cases**, each a full case study page with the nine sections in part 1: a
  Hook-style intro, a Contents list linking to each card, then the cards themselves, full width,
  image and summary side by side, always visible, left-aligned, alternating sides (see
  `DESIGN-SYSTEM.md`, "The work list page").
- **About** holds the bio and the CV link. **Contact** holds the form and the links.
- There is no Skills section and no section for smaller work.

**Lighter, secondary work gets no section, no page and no UI block anywhere on the site.** It has
exactly two possible outcomes:

1. **One sentence inside the relevant flagship case**, in **Process** or **Evolution**: "In
   parallel, I also …". This is the main outcome. It is a sentence in the prose, never a list,
   card, heading or block.
2. **It is not shown in the portfolio at all.**

---

## 1. The flagship structure: nine sections

A full case has these nine blocks, in this order. Do not reorder or skip them. The Hook is the
only one without a section title. Roughly 1,000 words in total is the length the template is
built around; the visuals do the rest.

| # | Section | What goes in it |
|---|---|---|
| 1 | **Hook** | One or two sentences that carry the whole case on their own: what was broken, what changed, and the result. It is the first thing read and maybe the only thing, so it must stand alone. No heading. |
| 2 | **Context & Ownership** | The product, the team and where things stood when you arrived, in just enough detail to follow the rest. Then what you owned, plainly: which decisions were yours, which were shared, which were made above you. For long-term work, say so here (embedded, how long, still ongoing). One "before" visual. |
| 3 | **Problem** | The problem as the user experienced it, then as the business experienced it. If a number made the team take it seriously, give it and its source. One artefact that makes the problem tangible (an old flow, a ticket chart). |
| 4 | **Discovery** | What you did to understand the problem and what you learned. Lead with the insight, then the decision it changed; method is supporting detail. One or two insight → decision diagrams. |
| 5 | **Process** | The options you seriously considered and why you chose one. Two or three options side by side, each with a real verdict, including what was rejected and why. This is the most important block for senior work. |
| 6 | **Solution** | The final state and how it answers the problem. Three to five screens, each with an annotation that says what it is and which decision it shows (not "screen 3"). |
| 7 | **Evolution** | What changed after launch and why: the design over time, not its final state. A timeline (or a before/after pair in identical framing) of what real use taught you. |
| 8 | **Impact** | The evidence that it worked. A metric if you have one; an honest, named alternative if you do not (part 2). |
| 9 | **Reflection & What's next** | One specific thing you would do differently or now believe that you did not before. Then what comes next: the next problem, what will be measured, what is still unknown. |

Rules that apply to all nine:

- **Lighter parallel work is one sentence, and only in Process or Evolution.** If smaller work
  belongs to this story, write "In parallel, I also …" in the prose there (see "Portfolio
  architecture"). Not a list, not a heading, not a visual.
- **Captions state the decision**, not the obvious: "wireframe v2 — filters moved to a permanent
  side panel because usability testing showed people skipped the collapsed one", not "wireframe v2".
- **No more visuals than listed.** More screenshots do not persuade; they only add scrolling.
- **Claims match evidence.** Correlation is not causation; say what you do not know.

---

## 2. Impact when there are no metrics

Access to metrics is not guaranteed. On embedded or staff-augmentation work the client often does
not share analytics after launch. That is normal, and it is not a reason to invent a number.

**Rule: never invent or estimate a number.** An honest statement of what you can confirm is
stronger than a fabricated figure, and reviewers can tell the difference.

| You have | Show |
|---|---|
| A real number and how it was measured | **Metric** variant: the number, what it measures, how it was measured. |
| No metrics | **Evidence** variant: exactly one of the four kinds below, stated honestly. |

The four kinds of evidence when there is no metric:

1. **Trust and continuation.** You were asked to stay on, or given more scope. For long-term work
   this is a strong signal, because clients do not extend people whose work is not landing.
2. **Adoption by other teams.** Other teams picked up the solution, the pattern or the component
   without being made to.
3. **A stakeholder quote or confirmation.** Someone who owns the outcome says it worked. Attribute
   it (a name and role if allowed, a role if not), and get permission and check the NDA first.
4. **Still in production, not rolled back.** The weakest signal, but an honest one. Use it only when
   nothing stronger is true, and do not dress it up.

Whichever you use, say plainly that there are no metrics. A direct sentence is fine and encouraged:

> The client did not share analytics after launch, but here is what I can confirm: [X].

The Evidence variant also carries a short note labelled **Why this evidence**: one sentence on why
this is the kind of proof available (for example, the engagement is ongoing and analytics stay
with the client). The Metric variant carries the matching **How it was measured** note. Both are
one component with two variants in the template, so the two cases look alike and neither is
one-off HTML.

---

## 3. Choosing which template a project gets

Ask three questions, in order, about each project.

1. **Is there a real decision or fork?** Not straight execution of a brief: a moment where you
   weighed options and chose.
2. **Is there any evidence of a result?** A metric, a qualitative signal, adoption by others, or
   trust and continuation (the kinds in part 2). Any honest evidence counts; none does not.
3. **Does it add something different from the other flagship cases, or does it repeat what is
   already shown?** Two cases that prove the same skill are one case too many.

| Answers | Outcome |
|---|---|
| Strong **yes** to 1 and 2, and it passes 3 | **Full case**: all nine sections, a flagship listed on `work.html` (3–5 in total). |
| Real work, but weak on evidence, or it duplicates another case | **Not a case.** One sentence inside the relevant flagship case (Process or Evolution), or not shown. |
| No decision and no evidence | **Leave it out.** Fewer cases beat one weak case. |

Anything that is not a full case has only the two outcomes in "Portfolio architecture": a
sentence inside a flagship case, or nothing. It never gets a section, a page or a block of its
own, and that includes a project with a good result but no real decision (pure execution).
