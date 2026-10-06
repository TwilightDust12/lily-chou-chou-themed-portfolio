# 004 — Theme Transition Optimization & Icon Choreography

- **Status**: DONE
- **Commit**: c182c20
- **Severity**: HIGH
- **Category**: Performance / Cohesion & tokens
- **Estimated scope**: 1 file (`style.css`), ~40 lines changed

## Problem

1. **Universal Style Recalculation Storm**: The theme toggle transition (`style.css:125-139`) applies `!important` transition rules to every element, pseudo-element, and descendant in the DOM tree:
```css
/* style.css:125-139 — current */
.theme-in-transition,
.theme-in-transition *,
.theme-in-transition *::before,
.theme-in-transition *::after {
  transition: background-color var(--transition-theme),
              background-image var(--transition-theme),
              color var(--transition-theme),
              border-color var(--transition-theme),
              fill var(--transition-theme),
              stroke var(--transition-theme),
              box-shadow var(--transition-theme),
              filter var(--transition-theme),
              opacity var(--transition-theme) !important;
  transition-delay: 0s !important;
}
```
This forces browser layout and repaint passes across thousands of DOM nodes simultaneously upon clicking the theme toggle, resulting in dropped frames on mid-range devices.

2. **Dizzying Theme Icon Animation**: The theme icon uses a 500ms duration with an extreme overshoot curve `cubic-bezier(0.34, 1.56, 0.64, 1)` and scales down to `scale(0.3)` while spinning 90 degrees (`style.css:684-708`):
```css
/* style.css:684-686 — current */
.theme-icon {
  position: absolute;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 0.35s ease;
}
```
For a 22px micro-icon, a 500ms duration with spring bounce feels sluggish and disconnected from the instant theme toggle response.

## Target

1. Scope the theme transition only to primary container surfaces (body, header, sections, cards, inputs) and eliminate the universal wildcard `*` selector:
```css
/* target scoped theme transition */
.theme-in-transition body,
.theme-in-transition .site-header,
.theme-in-transition .hero-section,
.theme-in-transition .about-section,
.theme-in-transition .skills-section,
.theme-in-transition .projects-section,
.theme-in-transition .contact-section,
.theme-in-transition .site-footer,
.theme-in-transition .skill-card,
.theme-in-transition .project-card,
.theme-in-transition .pillar-card,
.theme-in-transition .modal-dialog {
  transition: background-color 220ms var(--ease-out),
              border-color 220ms var(--ease-out),
              color 220ms var(--ease-out),
              box-shadow 220ms var(--ease-out) !important;
}
```

2. Refactor `.theme-icon` to a crisp 200ms ease-out curve (`cubic-bezier(0.23, 1, 0.32, 1)`) with subtle scale (`scale(0.85)` + opacity):
```css
/* target theme icon animation */
.theme-icon {
  position: absolute;
  transition: transform 200ms var(--ease-out),
              opacity 160ms var(--ease-out);
}

:not([data-theme="light"]) .sun-icon {
  transform: rotate(0deg) scale(1);
  opacity: 1;
}
:not([data-theme="light"]) .moon-icon {
  transform: rotate(-45deg) scale(0.85);
  opacity: 0;
}

[data-theme="light"] .sun-icon {
  transform: rotate(45deg) scale(0.85);
  opacity: 0;
}
[data-theme="light"] .moon-icon {
  transform: rotate(0deg) scale(1);
  opacity: 1;
}
```

## Repo conventions to follow

- Theme engine lives in `style.css:122-150`.
- Icon toggle classes live in `style.css:673-709`.

## Steps

1. In `style.css:125-139`, remove `.theme-in-transition *` universal selectors and scope only to top-level structural containers and card surfaces.
2. Change the duration of the theme color swap from `0.45s` to `220ms var(--ease-out)`.
3. In `style.css:684-686`, change `.theme-icon` transition to `transform 200ms var(--ease-out), opacity 160ms var(--ease-out)`.
4. In `style.css:695` and `style.css:700`, change rotation from `90deg` to `45deg` and scale from `0.3` to `0.85`.

## Boundaries

- Do NOT change color values or variable definitions in `:root` and `[data-theme="light"]`.
- Do NOT alter the JavaScript theme switching timeout (`script.js:96`).

## Verification

- **Mechanical**: Verify absence of `*` inside `.theme-in-transition` rule in `style.css`.
- **Feel check**:
  - Click theme toggle button: icon switches with a crisp, refined rotation (200ms) without dizzying bounce.
  - Page colors crossfade cleanly without stutter or layout lag.
  - In DevTools Performance tab, record a theme switch: confirm `Recalculate Style` takes < 2ms (previously > 15ms).
- **Done when**: Theme toggle responds cleanly under 220ms without style recalculation spikes.
