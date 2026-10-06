# 002 — GPU Performance Refactor: Equalizer & Sled

- **Status**: DONE
- **Commit**: c182c20
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 2 files (`style.css`, `script.js`), ~45 lines changed

## Problem

The audio player console continuously animates geometry layout properties on every tick:
1. Equalizer bars (`.vis-bar`) animate `height` in CSS (`transition: height 0.08s ease;`) while JavaScript updates `bar.style.height = `${targetH}px`` every 50-80ms across 16-24 bars. Animating `height` forces continuous layout recalculation and paint cycles across the entire document during playback.
2. The laser sled (`.player-laser-sled`) animates `left` (`transition: left 0.4s ease;`) with `laserHead.style.left = `${sledPos}%`` in `script.js:634`, triggering layout reflows on each track progress step.
3. The site header (`.site-header`) uses `transition: top var(--transition-fast)` when hiding on scroll (`style.css:379`), triggering layout recalc on scroll events.

```css
/* style.css:2542 — current */
.vis-bar {
  width: 6px;
  height: 6px;
  background: var(--accent-primary);
  border-radius: 1px;
  transition: height 0.08s ease;
  opacity: 0.5;
}

/* style.css:2238 — current */
.player-laser-sled {
  /* ... */
  left: 20%;
  transform: translateY(-50%);
  transition: left 0.4s ease;
}

/* style.css:379 — current */
.site-header {
  /* ... */
  transition: top var(--transition-fast);
}
```

```javascript
/* script.js:585 — current */
bar.style.height = `${targetH}px`;

/* script.js:634 — current */
laserHead.style.left = `${sledPos}%`;
```

## Target

1. Move `.vis-bar` to full height (42px) with `transform-origin: bottom` and animate `transform: scaleY(...)` instead of `height`.
2. Move `.player-laser-sled` to use `transform: translate3d(var(--sled-x, 0), -50%, 0)` instead of transitioning `left`.
3. Move `.site-header` to use `transform: translateY(...)` instead of transitioning `top`.

```css
/* target CSS */
.vis-bar {
  width: 6px;
  height: 42px;
  background: var(--accent-primary);
  border-radius: 1px;
  transform-origin: bottom;
  transform: scaleY(0.14);
  transition: transform 80ms linear;
  will-change: transform;
  opacity: 0.5;
}

.player-laser-sled {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate3d(var(--sled-pos, 20%), -50%, 0);
  transition: transform 240ms var(--ease-out);
  will-change: transform;
}

.site-header {
  transition: transform 200ms var(--ease-out), background-color var(--transition-theme);
  transform: translateY(0);
}
.site-header.nav-up {
  transform: translateY(-100%);
}
```

```javascript
/* target JS in script.js */
// Equalizer bar scaling (0.14 to 1.0)
const scaleFactor = Math.max(0.14, targetH / 42);
bar.style.transform = `scaleY(${scaleFactor.toFixed(3)})`;

// Laser sled positioning
laserHead.style.setProperty('--sled-pos', `${sledPos}%`);
```

## Repo conventions to follow

- Visualizer bars reside in `.audio-visualizer-container` (`style.css:2530-2548`).
- JS equalizer loop lives in `updateVisualizer()` in `script.js:560-605`.
- Audio player sled is managed in `updateLaserSledPosition()` in `script.js:625-645`.

## Steps

1. In `style.css:2537-2545`, set `.vis-bar` fixed `height: 42px`, `transform-origin: bottom`, `transform: scaleY(0.14)`, `transition: transform 80ms linear`, and `will-change: transform`.
2. In `script.js:585`, change `bar.style.height = `${targetH}px`` to `bar.style.transform = `scaleY(${(Math.max(0.14, targetH / 42)).toFixed(3)})``.
3. In `script.js:591`, reset idle state with `bar.style.transform = 'scaleY(0.14)'`.
4. In `style.css:2230-2239`, replace `left: 20%; transition: left 0.4s ease;` on `.player-laser-sled` with `left: 0; transform: translate3d(var(--sled-pos, 20%), -50%, 0); transition: transform 240ms var(--ease-out); will-change: transform;`.
5. In `script.js:634`, replace `laserHead.style.left = `${sledPos}%`` with `laserHead.style.setProperty('--sled-pos', `${sledPos}%`)`. Also update line 814 initial state.
6. In `style.css:370-385`, replace `top: 0; transition: top var(--transition-fast);` and `.site-header.nav-up { top: -80px; }` with `transform: translateY(0); transition: transform 200ms var(--ease-out);` and `.site-header.nav-up { transform: translateY(-100%); }`.

## Boundaries

- Do NOT change visualizer frequency data calculations or audio node routing.
- Do NOT alter player audio controls or audio playback logic.
- Only transform and transition properties are modified.

## Verification

- **Mechanical**: Inspect Chrome DevTools "Rendering" -> "Paint flashing" during CD playback.
- **Feel check**:
  - Play any track in the Ether Discman player: the audio visualizer bars animate with zero frame drops and zero document reflows.
  - Seeking / track progression moves the laser sled smoothly across the CD spindle without jitter.
  - Scrolling down and up hides/shows the header instantly without triggering layout shifts.
- **Done when**: `Paint flashing` shows zero green boxes around the page body when the visualizer bars bounce.
