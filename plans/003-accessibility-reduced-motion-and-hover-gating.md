# 003 — Accessibility: Reduced Motion & Hover Gating

- **Status**: DONE
- **Commit**: c182c20
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 1 file (`style.css`), ~70 lines changed

## Problem

1. **Missing `prefers-reduced-motion`**: Across 3,419 lines of CSS, there is zero handling for `prefers-reduced-motion`. Users with vestibular sensitivity or motion triggers are subjected to continuous infinite rotations and pulsing loops:
   - `digicamRecBlink 1.2s infinite` (`style.css:316`)
   - `blinkRec 1.4s infinite` (`style.css:1148`)
   - `pulseAnimation 2s infinite` (`style.css:1240`)
   - `pulseLed 1s infinite alternate` (`style.css:1289`, `style.css:2133`)
   - `spinIcon 1.5s linear infinite` (`style.css:2056`)
   - `cdSpin 1.4s linear infinite` (`style.css:2289`)
   - `laserPulse 0.4s infinite alternate` (`style.css:2252`)
2. **Ungated `:hover` motion**: Hover states apply `transform: translateY(-2px)`, `scale(1.08)`, and border glows without `@media (hover: hover) and (pointer: fine)`. On mobile touchscreens, tapping elements triggers "sticky" hover states that stay active until tapped elsewhere.

## Target

1. Implement comprehensive `@media (prefers-reduced-motion: reduce)` block:
   - Pause or disable continuous spins (`cdSpin`, `spinIcon`) and high-frequency flashing (`laserPulse`).
   - Replace movement-based animations with subtle opacity/color changes (`0.15s ease`).
   - Retain essential state communication without spatial disorientation.
2. Gate interactive `:hover` transforms behind `@media (hover: hover) and (pointer: fine)` so mobile tap interactions are clean and glitch-free.

```css
/* target reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Preserve subtle opacity/color cues for functional state */
  .hud-rec-dot,
  .terminal-cursor,
  .vis-bar,
  .btn,
  .modal-dialog,
  .primary-nav {
    transition: opacity 150ms ease, background-color 150ms ease, color 150ms ease !important;
    transform: none !important;
    animation: none !important;
  }

  .compact-disc.spinning {
    animation: none !important;
    border: 2px solid var(--accent-primary);
  }
}

/* target hover gating example */
@media (hover: hover) and (pointer: fine) {
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--accent-glow);
  }
  .skill-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
  .project-card.bbs-thread-card:hover {
    transform: translateY(-2px);
  }
}
```

## Repo conventions to follow

- Media queries are placed at the bottom of sections or grouped under the responsive block (`style.css:3340+`).

## Steps

1. In `style.css`, create a dedicated `Accessibility & Motion Preferences` section at the end of the stylesheet with `@media (prefers-reduced-motion: reduce)`.
2. Disable looping rotational animations (`cdSpin`, `spinIcon`, `laserPulse`, `pulseAnimation`) when `prefers-reduced-motion: reduce` is active, providing static visual indicators (e.g., solid accent border or badge) instead.
3. Wrap hover translateY and scale transforms for `.btn-primary:hover`, `.btn-outline:hover`, `.pillar-card:hover`, `.skill-card:hover`, `.project-card:hover`, and `.archival-poster-badge:hover` inside `@media (hover: hover) and (pointer: fine)`.
4. Leave mobile `:active` styles accessible to touch pointers.

## Boundaries

- Do NOT break visual contrast or color scheme switching in reduced motion mode.
- Do NOT alter functional click listeners or event dispatching.

## Verification

- **Mechanical**: Grep for `@media (prefers-reduced-motion: reduce)` in `style.css` and verify presence of all keyframe overrides.
- **Feel check**:
  - In Chrome DevTools -> Rendering -> Emulate CSS media feature `prefers-reduced-motion: reduce`:
    - Playing a track in the CD player does NOT spin the disc mesh or strobe the laser diode.
    - Modals and drawers appear smoothly via opacity without motion translation.
    - Recording dots display steady red without flashing.
  - In DevTools device mode (touch simulation), tap buttons and cards: verify they do not remain stuck in hover state after tapping.
- **Done when**: Website is fully accessible to vestibular-sensitive users with zero disorienting movement when reduced motion is preferred.
