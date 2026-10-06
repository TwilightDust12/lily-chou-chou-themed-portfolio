# 001 — Motion Tokens and GPU-Only Transitions

- **Status**: DONE
- **Commit**: c182c20
- **Severity**: HIGH
- **Category**: Easing & duration / Performance
- **Estimated scope**: 1 file (`style.css`), ~60 lines changed

## Problem

The design system currently relies on sluggish tokens exceeding the 300ms UI budget (`--transition-normal: 0.35s`, `--transition-slow: 0.6s`), weak built-in easings (`ease`), and ubiquitous `transition: all` across buttons, cards, and toggles:

```css
/* style.css:58-61 — current */
  --transition-fast: 0.18s ease;
  --transition-normal: 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-theme: 0.45s cubic-bezier(0.4, 0, 0.2, 1);

/* style.css:474 — current */
.btn {
  /* ... */
  transition: all var(--transition-normal);
}

/* style.css:1620 — current */
.skill-card {
  /* ... */
  transition: all var(--transition-normal);
}
```

Furthermore, clickable buttons (`.btn`, `.ctrl-btn`, `.preset-chip`) lack physical `:active` press feedback (`scale(0.97)`), making the interface feel floaty and unresponsive.

## Target

1. Introduce Emil Kowalski-aligned custom cubic-bezier tokens under 300ms:
   - `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` (strong ease-out for entering elements and feedback)
   - `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` (strong ease-in-out for on-screen movement)
   - `--duration-fast: 160ms`
   - `--duration-normal: 240ms`
   - `--duration-modal: 280ms`
2. Replace `transition: all` on interactive elements with explicit GPU properties (`transform`, `opacity`, `background-color`, `border-color`, `box-shadow`).
3. Add tactile press feedback (`transform: scale(0.97)`) on `:active` with 120ms duration.

```css
/* target tokens */
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
  --duration-fast: 160ms;
  --duration-normal: 240ms;
  --duration-modal: 280ms;

  --transition-fast: var(--duration-fast) var(--ease-out);
  --transition-normal: var(--duration-normal) var(--ease-out);
  --transition-slow: 380ms var(--ease-out);
}

/* target button feedback */
.btn {
  transition: transform var(--duration-fast) var(--ease-out),
              background-color var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out);
}
.btn:active {
  transform: scale(0.97);
  transition-duration: 100ms;
}
```

## Repo conventions to follow

- Tokens live in `:root` inside `style.css:58-62`.
- Components consume variables via `var(--token-name)`.

## Steps

1. In `style.css:58`, replace the transition token definitions with the calibrated `--ease-out`, `--ease-in-out`, and `--duration-*` variables.
2. In `style.css:474`, update `.btn` to explicitly animate `transform, background-color, border-color, box-shadow, color`. Add `.btn:active { transform: scale(0.97); transition-duration: 100ms; }`.
3. In `style.css:660`, update `.theme-toggle` to replace `transition: all` with `transition: transform 160ms var(--ease-out), border-color 160ms var(--ease-out), box-shadow 160ms var(--ease-out), color 160ms var(--ease-out);`.
4. In `style.css:1423`, `style.css:1565`, `style.css:1620`, and `style.css:1716`, replace `transition: all var(--transition-normal);` on `.archival-poster-badge`, `.pillar-card`, `.skill-card`, and `.project-card.bbs-thread-card` with `transition: transform var(--duration-normal) var(--ease-out), border-color var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal) var(--ease-out), background-color var(--duration-normal) var(--ease-out);`.
5. In `style.css:2571`, update `.ctrl-btn` to replace `transition: all` with explicit properties and add `.ctrl-btn:active { transform: scale(0.94); transition-duration: 100ms; }`.

## Boundaries

- Do NOT alter element layouts, margins, or padding.
- Do NOT remove existing color themes or aesthetic styles.
- Only modify transition properties, timings, and `:active` scale states.

## Verification

- **Mechanical**: Inspect `style.css` to verify 0 occurrences of `transition: all` in updated blocks.
- **Feel check**:
  - Click on hero CTA buttons and CD player controls: button should responsively compress (`scale(0.97)`) on mousedown and spring back immediately without sluggishness.
  - Hover across skill cards and BBS threads: transitions feel instant and crisp rather than dragging at 350ms.
  - In Chrome DevTools Animations panel (set to 25% speed), verify transitions use `cubic-bezier(0.23, 1, 0.32, 1)` and finish within 240ms.
- **Done when**: All button clicks provide sub-160ms tactile press feedback, and no audited component uses `transition: all`.
