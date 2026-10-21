---
name: Kriyvo AI
description: Websites, AI chatbots, WhatsApp bots and automation, shown working on their real screens.
colors:
  ground: "oklch(0.985 0.0015 90)"
  card: "oklch(1 0 0)"
  stone: "oklch(0.96 0.002 90)"
  border: "oklch(0.915 0.003 90)"
  input: "oklch(0.88 0.01 80)"
  ink: "oklch(0.18 0.006 70)"
  ink-foreground: "oklch(0.975 0.002 90)"
  foreground: "oklch(0.2 0.004 70)"
  muted-foreground: "oklch(0.47 0.01 70)"
  flame: "oklch(0.68 0.21 42)"
  accent: "oklch(0.53 0.18 40)"
  saffron: "oklch(0.8 0.15 60)"
typography:
  display:
    fontFamily: "Source Serif 4 Variable, Georgia, serif"
    fontSize: "68px"
    fontWeight: 360
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Source Serif 4 Variable, Georgia, serif"
    fontSize: "48px"
    fontWeight: 360
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Source Serif 4 Variable, Georgia, serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "Host Grotesk Variable, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "Host Grotesk Variable, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Host Grotesk Variable, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.4
  button:
    fontFamily: "Source Serif 4 Variable, Georgia, serif"
    fontSize: "16px"
    fontWeight: 500
    letterSpacing: "-0.005em"
  data:
    fontFamily: "Geist Mono Variable, ui-monospace, monospace"
    fontSize: "12.5px"
    fontWeight: 400
rounded:
  thumb: "8px"
  bubble: "16px"
  frame: "18px"
  panel-sm: "22px"
  panel: "24px"
  panel-lg: "28px"
  pill: "9999px"
spacing:
  gutter: "16px"
  gutter-sm: "24px"
  panel-pad: "28px"
  panel-pad-lg: "36px"
  section: "128px"
  section-md: "176px"
  container: "1240px"
components:
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ink-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "14.4px 24px"
  button-light:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "14.4px 24px"
  button-on-ink:
    backgroundColor: "{colors.ink-foreground}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "14.4px 24px"
  button-compact:
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  segmented:
    backgroundColor: "{colors.stone}"
    rounded: "{rounded.panel-sm}"
    padding: "6px"
  segmented-option-active:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  faq-item:
    backgroundColor: "{colors.stone}"
    rounded: "{rounded.panel-sm}"
    padding: "20px 28px"
  faq-item-open:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.panel-sm}"
  panel-stone:
    backgroundColor: "{colors.stone}"
    rounded: "{rounded.panel-lg}"
    padding: "36px"
  panel-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ink-foreground}"
    rounded: "{rounded.panel}"
    padding: "28px"
  tag-popular:
    backgroundColor: "{colors.saffron}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  chip:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

# Design System: Kriyvo AI

## Overview

**Creative North Star: "The Working Screen"**

Kriyvo is presented with the calm polish of an AI product company. The page itself stays quiet: a near-white neutral ground, warm stone panels, near-black ink panels, a light serif display and a plain grotesk body. The noise is reserved for proof. Every service is drawn on the real screen it lives on (a laptop running the client's site, a chat widget, WhatsApp Web, an n8n canvas, a call console, a log stream) and those screens move, type and fill in as the visitor watches.

Density is generous. Sections sit 128–176px apart inside a 1240px container, headings are short and set in a regular-weight serif, and most surfaces are soft rounded panels separated by tone rather than lines or shadows. Orange is the brand, but it appears as signal, never as paint: a progress line, a filled timeline step, a rating star, a link, a check mark, the focus ring.

Motion is the second voice. Headline lines rise out of a blur one after another, sections settle from blur as they enter, the process timeline fills on scroll, project images tilt toward the cursor, and both button styles carry a soft light that follows the pointer. Everything respects `prefers-reduced-motion`.

**Key Characteristics:**
- Neutral near-white ground with stone and ink panels; tone carries the hierarchy.
- Source Serif 4 at about 360 for display, Host Grotesk for everything read, Geist Mono only for real data.
- Orange held to signal; saffron for small highlights, mostly on ink.
- Pill buttons in two finishes (dark gradient, light ringed) with a cursor-following light.
- Product proof drawn as real interface fragments, marked with `data-ui`.
- Heroes are type, two buttons and a quiet proof line: no glow blobs, no eyebrow pills.

## Colors

A neutral, very slightly warm achromatic system with one orange family used sparingly.

### Primary
- **Flame** (flame): the live-state orange. Fills the scroll-driven process timeline and its reached steps, the progress line under the playing demo tab, rating stars, the text caret, and the voice and status dots inside interface fragments.
- **Burnt Accent** (accent): the darker, text-safe orange. Inline links ("Real project: …"), check marks in plan lists and scope scenes, the open FAQ numeral, the active mobile nav item, and the 2px focus outline.

### Secondary
- **Saffron** (saffron): small warm highlights, almost always on ink: the "Popular" plan tag, plan check marks on the ink card, the launch-day chip in the week card, the "Claim it" link in the announcement bar, principle numerals and icon accents in about-page scenes.

### Neutral
- **Ground** (ground): the page. A near-white with a trace of warmth (hue 90).
- **Card White** (card): raised surfaces that sit on stone or ground: the open FAQ item, the active segmented option, the WhatsApp mock in the project CTA, testimonial card, laptop screen.
- **Stone** (stone): the main panel tone: demo stage, project CTA, plan cards, FAQ items at rest, stack cards, chips and round icon buttons.
- **Ink** (ink): near-black panels and bands: the announcement bar, the popular plan, the ask card, the week card, the one dark band on a page. Also primary text on light buttons' opposite.
- **Paper on Ink** (ink-foreground): text on ink, and the fill of the light button used on ink.
- **Body Ink** (foreground): running text. Secondary copy is this colour at 70–80% opacity rather than a separate grey.
- **Muted** (muted-foreground): labels, metadata, footer links, fact-strip terms.
- **Hairline** (border): rules in fact strips, service index rows and the scrolled header; also the 1px inset ring on cards.

### Named Rules
**The Signal Orange Rule.** Flame and accent mark state, progress and links only. They never fill a panel, a section band or a headline, and never colour a primary button.

**The Saffron on Ink Rule.** Saffron is a highlight for small things (a tag, a chip, a numeral, an icon) and lives mostly on ink, where it reads warm without competing with flame.

**The Tone Not Grey Rule.** Secondary text is the body colour at reduced opacity (70%, 75%, 80%); on ink it is paper at 55–65%. Do not introduce new greys.

## Typography

**Display Font:** Source Serif 4 Variable (with Georgia, serif)
**Body Font:** Host Grotesk Variable (with system-ui, sans-serif)
**Data Font:** Geist Mono Variable (with ui-monospace, monospace)

**Character:** A light, optically sized serif that reads editorial and calm against a neutral, slightly technical grotesk. The serif is never bold; weight contrast comes from size and tone.

### Hierarchy
- **Display** (360, 68px desktop, 1.08, -0.025em): page h1s, set in two lines that rise from blur in sequence. Steps down to 60px at the small breakpoint and 32–41.6px on phones.
- **Headline** (360, 48px desktop, 1.08): section h2s via the section head; 38.4px and 30.4px on smaller screens. 56px is the h1 for long detail-page titles (services, case studies, portfolio, blog, local pages).
- **Title** (400, 28–36px): serif h3s in index rows, timeline steps, discipline and principle cards, bento captions. Service index rows go to 48px.
- **Body** (400, 18px, 1.625): lead paragraphs and section intros, max-width about 36rem. 16px for card and answer text.
- **Label** (400, 13–15px): navigation (15px), metadata, chips and fact-strip terms (14px), legal line and tags (13px). Sentence case, no tracking.
- **Data** (Geist Mono, 12.5–13px): log rows, call timers, code output. Nothing else.
- **Button** (Source Serif 4, 500, 16px; 15px in compact pills): the serif carries into the buttons.

Headline scale used across the build, in px: 13 / 14 / 15 / 16 / 18 / 20 / 24 / 28 / 36 / 48 / 56 / 68.

### Named Rules
**The Quiet Serif Rule.** h1 and h2 are Source Serif 4 at 360 with tight tracking and balanced wrapping. Never set display type bold, uppercase or tracked out.

**The Real Data Mono Rule.** Geist Mono appears only where the content is actual machine output: logs, timers, code. It is never a decorative label face.

**The Tabular Figures Rule.** Prices, counts, step numbers and pagers use tabular figures so they do not jitter as they change.

## Layout

A centred 1240px container with 16px side padding (24px from the small breakpoint). Sections are separated by 128px on phones and 176px from the medium breakpoint; the footer sits the same distance below the last section. There are no section dividers: space and panel tone do the separation.

Section heads are left-aligned (centred only for single-subject sections like reviews), capped at about 42rem with the intro under it. Two-column content uses an asymmetric split, roughly 0.8fr heading to 1.2fr content, with the left column sticky at 112px from the top on large screens (FAQ, process timeline). Lists of things are ruled rows (service index, fact strip) or a bento grid (six columns, 300px rows, the flagship spanning four by two). Panels pad 28px on phones and 36px or more on desktop.

**The One Dark Band Rule.** A page carries at most one full-bleed ink band (the about page's principles, a case study's results). Ink otherwise appears as contained panels.

**The Settle Rule.** Content enters by settling: 28px rise, 8px blur to sharp, opacity 0 to 1 over one second on an expo-out curve, staggered 50–120ms between siblings. Anything not revealed within 2.5s is shown regardless.

## Elevation & Depth

Depth is tonal first: ground, then stone panels, then white cards on stone. Shadows are rare, long, soft and warm-tinted, with a strongly negative spread so they read as lift rather than outline. They appear on things that are raised or active: the open FAQ item, the active demo tab, the segmented option, the CTA chat card, the hover state of project images and the floating service preview. A 1px inset hairline ring stands in for borders on white cards.

### Shadow Vocabulary
- **Hairline ring** (`inset 0 0 0 1px var(--border)`): white cards on the ground (testimonial, image frames, rating chip).
- **Active chip** (`0 6px 16px -10px oklch(0.2 0.02 70 / 0.5)`): the selected segmented option.
- **Raised card** (`0 24px 60px -30px oklch(0.2 0.02 60 / 0.35)`): an opened FAQ item, paired with the hairline ring.
- **Lifted panel** (`0 30px 60px -36px oklch(0.25 0.03 60 / 0.45)`): cards resting on stone, such as the CTA chat card.
- **Float** (`0 40px 80px -30px oklch(0.2 0.02 60 / 0.55)`): things hovering above the page: the service preview, project images on hover.

### Named Rules
**The Tonal First Rule.** Reach for a tone step (ground, stone, card, ink) before a shadow. A shadow means "raised or active", never "this is a box".

## Shapes

Two shapes only: pills and soft panels. Every button, tag, chip, nav item, round icon button and segmented option is fully rounded. Panels round at 22px (FAQ items, stack cards, segmented track), 24px (bento tiles, ink panels, image frames) and 28px (demo stage, plan cards, project CTA, testimonial card). Nested frames inside a panel step down to 18px, chat bubbles to 16px with one tightened corner on the speaker's side, thumbnails to 8px.

**The Pill and Panel Rule.** Interactive controls are pills; containers are 22–28px panels. Do not mix in square-cornered boxes or small 4–8px card radii outside thumbnails and interface fragments.

## Components

### Buttons
Tactile, quiet pills with a light that follows the cursor.
- **Shape:** fully rounded pill, 14.4px by 24px padding, serif label at 500.
- **Dark:** a vertical gradient from warm charcoal to ink, a 1px top highlight and a tiny contact shadow. On hover the shadow lengthens and a soft white light (22%) follows the pointer.
- **Light:** white to stone gradient with a 1px inset ink ring at 14%. On hover the ring firms to 30% and a warm saffron light follows the pointer.
- **On ink:** paper fill with ink text, for buttons inside ink panels and bands.
- **Compact:** 8px by 16px, 15px label, used in the header and on bento tiles.
- **Press:** every pill scales to 0.97 on press. Transitions run 350ms on a fast-out curve.
- Pairing: a hero or CTA offers one dark and one light button, dark first.

### Segmented control
A stone track (22px radius, 6px padding) of pill options. The selected option lifts to white with the active-chip shadow; others are muted text that darkens on hover. Optional tabular counts sit after the label. Used for the pricing toggle and portfolio and blog filters.

### FAQ
The single FAQ pattern for pricing, service and local pages. Heading and intro on the left (sticky on desktop) with an ink "ask the builder" card; questions on the right as stone cards (22px). Each row is an inline serif index (01, 02…), the question, and a round plus button. Opening a row turns it white with the raised-card shadow, the index to accent, and the plus into an ink circle rotated 45°; the answer opens by animating the grid row over 500ms. The first item starts open.

### Cards and panels
- **Stone panel:** the default container (demo stage, CTA, plan cards, stack cards).
- **Ink panel:** one emphasised item in a set (the popular plan, the ask card, the week summary, the "tool not listed" card).
- **White card:** something raised off stone or the ground; carries the hairline ring or a lift shadow.
- **Plan card:** 28px, name as a serif h3 with an optional saffron "Popular" pill, the old price struck through beside a 60px light tabular price, a delivery line, check-mark features, and a full-width pill CTA pinned to the bottom.

### Navigation
A transparent sticky header that turns to ground at 92% with backdrop blur and a hairline underline once scrolled. Links are 15px pills at 70% body colour; the current page sits on a stone pill. Compact light "Get estimate" and dark "Chat on WhatsApp" buttons sit at the right. On mobile a round stone menu button opens a ruled list of 24px light links. Above it, a slim ink announcement bar rotates offers every 4.5s with a saffron link and can be dismissed for the visit.

### Section head, split and fact strip
- **Section head:** serif h2 and an optional 18px intro at 70%; left-aligned by default.
- **Split:** a ruled two-column block, heading left, 18px prose right at 1.75 line height.
- **Fact strip:** a ruled `dl` of up to four facts, muted 14px terms over 16px values.
- **Back link:** 15px muted link with a left arrow that nudges left on hover.

### Interface fragments (signature)
Product proof is drawn, not described. Each fragment is a faithful, small rendition of the real app, marked with the `data-ui` attribute: the homepage laptop (ink bezel, 22px top corners, a macOS address bar, a screen drawn at desktop size and scaled to fit) cycling through scripted samples, and the about page's principle scenes (chat thread, log stream, signed scope, handover files) on an 18px near-ink frame.

**The Real Screen Rule.** Inside a `data-ui` fragment the depicted app's own styling governs: WhatsApp greens and bubble shadows, macOS window dots, a client site's tracked caps, 11–12px UI labels, mono log rows. Site-level rules about tracking, hex colours and the type scale apply outside fragments, not inside them.

### Signature layouts
- **Demo stage:** a 28px stone panel with a vertical tab list (round icon marker, serif 20px label, note and flame progress line on the playing item) beside the laptop; horizontal pill tabs on phones; a ruled footer line with the price, delivery time and an accent link to the real project.
- **Service index:** large ruled rows (serif 30–48px name, muted line, round stone arrow button that turns ink on hover). Hovering one dims the others to 35% and floats the real project's screenshot at the cursor.
- **Work bento:** six image tiles on ink, 24px corners. Pictures stay clean; on hover a dark gradient and caption rise in with a light "Try it now" pill and a frosted "View project" pill. On touch screens the caption is always shown.
- **Process timeline:** a sticky ink week card beside a vertical timeline whose flame line fills on scroll and lights each step.
- **Testimonials:** one Google review at a time in a 28px white card, rotating every 7s and pausing on hover, with ringed light pager buttons.
- **Footer wordmark:** an oversized lowercase "kriyvo" in Host Grotesk at 25vw, filled with a project photograph under a saffron to flame gradient and panning slowly.

## Do's and Don'ts

### Do:
- **Do** separate surfaces by tone (ground, stone, white, ink) before reaching for a border or shadow.
- **Do** keep orange to signal: progress, live states, stars, links, check marks, focus.
- **Do** open heroes with a serif headline of one or two lines, one sentence with real prices, a dark and a light pill, and a quiet proof line.
- **Do** show a service on its real screen as a `data-ui` fragment rather than with an icon or an adjective.
- **Do** use pills for every control and 22–28px radii for every panel.
- **Do** let content settle from blur, stagger siblings by 50–120ms, and honour reduced motion.

### Don't:
- **Don't** place glow blobs, gradient orbs or blurred colour fields behind a hero.
- **Don't** put eyebrow pills, kickers or tracked uppercase labels above headings.
- **Don't** build grids of cards headed by icon tiles; show the work instead.
- **Don't** fill panels, bands or primary buttons with flame or accent.
- **Don't** set the display serif bold, uppercase or letter-spaced.
- **Don't** use Geist Mono for labels, tags or decoration.
- **Don't** use more than one full-bleed ink band on a page.
