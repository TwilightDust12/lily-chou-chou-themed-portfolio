# 005 — Dialog and Mobile Drawer Exit & Interruptibility

- **Status**: DONE
- **Commit**: c182c20
- **Severity**: MEDIUM
- **Category**: Interruptibility / Physicality & origin
- **Estimated scope**: 1 file (`style.css`), ~50 lines changed

## Problem

1. **Abrupt Visibility Snapping**: Both the modal backdrop (`style.css:3200-3228`) and the mobile navigation menu (`style.css:3345-3367`) use `visibility: hidden; opacity: 0; transition: all var(--transition-normal);`. When closing, `visibility: hidden` applies immediately in browsers, cutting off the exit animation mid-motion and causing a jarring visual pop.
2. **Generic Easing on Drawer**: The mobile drawer drops down with a slow 350ms standard bezier (`cubic-bezier(0.4, 0, 0.2, 1)`), rather than an authentic, physical iOS-like drawer curve (`cubic-bezier(0.32, 0.72, 0, 1)`).
3. **Modal Dialog Exit**: `.modal-dialog` animates `transform: translateY(20px) scale(0.97)` on open, but on close, because `visibility: hidden` snaps, the exit translate cannot be seen.

```css
/* style.css:3204-3207 — current */
.modal-backdrop {
  /* ... */
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-normal);
}
.modal-backdrop.is-open {
  opacity: 1;
  visibility: visible;
}

/* style.css:3356-3360 — current */
.primary-nav {
  /* ... */
  transform: translateY(-120%);
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-normal);
}
```

## Target

1. Use explicit transition property lists with `transition-delay` on `visibility` so the exit animation plays smoothly to completion before hiding:
```css
/* target modal transition */
.modal-backdrop {
  opacity: 0;
  visibility: hidden;
  transition: opacity 220ms var(--ease-out),
              visibility 0s linear 220ms;
}
.modal-backdrop.is-open {
  opacity: 1;
  visibility: visible;
  transition: opacity 220ms var(--ease-out),
              visibility 0s linear 0s;
}

.modal-dialog {
  transform: translateY(14px) scale(0.97);
  opacity: 0.8;
  transition: transform 240ms var(--ease-out),
              opacity 240ms var(--ease-out);
}
.modal-backdrop.is-open .modal-dialog {
  transform: translateY(0) scale(1);
  opacity: 1;
}
```

2. Refactor mobile drawer to use `--ease-drawer` (`cubic-bezier(0.32, 0.72, 0, 1)`) and delayed visibility on exit:
```css
/* target mobile drawer */
.primary-nav {
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: transform 260ms var(--ease-drawer),
              opacity 200ms var(--ease-out),
              visibility 0s linear 260ms;
}
.primary-nav.nav-open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
  transition: transform 260ms var(--ease-drawer),
              opacity 200ms var(--ease-out),
              visibility 0s linear 0s;
}
```

## Repo conventions to follow

- Modal styling is located in `style.css:3200-3240`.
- Mobile responsive navigation is located in `style.css:3345-3375`.

## Steps

1. In `style.css:3204-3211`, replace `.modal-backdrop` and `.modal-backdrop.is-open` transitions with delayed visibility and GPU-only opacity rules.
2. In `style.css:3222-3227`, configure `.modal-dialog` with `240ms var(--ease-out)` on transform and opacity.
3. In `style.css:3356-3366`, replace `.primary-nav` and `.primary-nav.nav-open` with `--ease-drawer` curve, 260ms duration, and visibility exit delay.

## Boundaries

- Do NOT alter modal accessibility attributes (`role="dialog"`, `aria-modal="true"`).
- Do NOT alter JavaScript click event handling for backdrop closes (`script.js:1080-1120`).

## Verification

- **Feel check**:
  - Open project modal / poster modal: dialog smoothly floats in from `translateY(14px) scale(0.97)` to center in 240ms.
  - Press `Escape` or click backdrop: dialog and backdrop smoothly fade out together over 220ms without snapping or popping.
  - In mobile view (< 640px), toggle hamburger menu: menu glides down and up with an authentic iOS drawer feel (`cubic-bezier(0.32, 0.72, 0, 1)`).
- **Done when**: No visual pop or snap occurs during modal or mobile menu close transitions.
