# Animation Implementation Plans

This directory contains prioritized, self-contained animation improvement plans derived from the **`review-animations`** and **`improve-animations`** audit based on Emil Kowalski's motion philosophy.

## Implementation Roadmap

| Plan | Title | Severity | Category | Status |
| --- | --- | --- | --- | --- |
| [001](001-motion-tokens-and-gpu-transitions.md) | Motion Tokens and GPU-Only Transitions | **HIGH** | Easing & duration / Performance | DONE |
| [002](002-gpu-performance-refactor-equalizer-and-sled.md) | GPU Performance Refactor: Equalizer & Sled | **HIGH** | Performance | DONE |
| [003](003-accessibility-reduced-motion-and-hover-gating.md) | Accessibility: Reduced Motion & Hover Gating | **HIGH** | Accessibility | DONE |
| [004](004-theme-transition-and-icon-timing.md) | Theme Transition Optimization & Icon Choreography | **HIGH** | Performance / Cohesion | DONE |
| [005](005-dialog-and-mobile-drawer-interruptibility.md) | Dialog and Mobile Drawer Exit & Interruptibility | **MEDIUM** | Interruptibility / Physicality | DONE |

## Recommended Execution Order

1. **`001` first**: Establishes global custom cubic-bezier tokens (`--ease-out`, `--ease-in-out`, `--ease-drawer`), removes `transition: all` anti-pattern, and adds `:active` button press feedback.
2. **`002` second**: Fixes layout-thrashing animations in the audio visualizer (`scaleY` instead of `height`) and laser sled (`transform` instead of `left`).
3. **`003` third**: Guarantees full accessibility for users with vestibular sensitivity (`prefers-reduced-motion: reduce`) and gates hover states on touch screens.
4. **`004` fourth**: Removes universal wildcard `*` recalc storms on theme change and tightens theme-icon toggle response to 200ms.
5. **`005` fifth**: Polishes modal dialog and mobile drawer exit visibility transitions using physical drawer curves.
