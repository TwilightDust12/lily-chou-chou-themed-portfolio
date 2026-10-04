# The Ether (エーテル) — Lily Chou-Chou Themed Portfolio

> *"The Ether is infinite. When you surrender your thoughts to the vibration, even solitude feels sacred."*  
> — **Philia**, Lilyholic BBS Archive #012

An immersive, zero-dependency personal portfolio and digital sanctuary inspired by Shunji Iwai’s 2001 cinematic masterpiece ***All About Lily Chou-Chou*** (リリイ・シュシュのすべて) and Noboru Shinoda’s landmark digital cinematography.

🌐 **Live Demo:** [https://twilightdust12.github.io/lily-chou-chou-themed-portfolio/](https://twilightdust12.github.io/lily-chou-chou-themed-portfolio/)

---

## 📽️ Aesthetic & Cinematographic Philosophy

In *All About Lily Chou-Chou*, teenager Hasumi Yuichi retreats from adolescent alienation into sun-drenched Tochigi rice fields, seeking communion with the "Ether" (エーテル) through his portable Discman and the anonymous cyber-solitude of the Lilyholic BBS forum.

This portfolio translates that atmosphere into a tactile web experience:
* **The Ether Spectrum Palette:** Dual-mode design system contrasting the overexposed solar brilliance of daytime Tochigi rice paddies with the dark, glowing cathode-ray phosphors of the nocturnal Lilyholic BBS.
* **Noboru Shinoda Net-Filter Optics:** 2.39:1 widescreen anamorphic framing, subtle CRT scanlines, and digital bloom homage.
* **Tactile Hardware Romance:** A functional, simulated 2001 portable optical Discman with realistic mechanical tactile feedback, spinning physical media, and live CRT oscilloscope instrumentation.

---

## 💿 Key Features

### 1. Tactile Discman Optical System (Sony D-E01 Homage)
* **3-Way Hardware Viewport Switching:**
  * **CD Spindle Drive (`CD SPINDLE DRIVE`):** Physical spinning compact disc with dynamic holographic rainbow diffraction sheen, silk-screen disc typography, and real-time rotational physics.
  * **CRT Motion Screen (`CRT MOTION SCREEN`):** Archival 24fps kinetic vignette (`hi.gif`) showing Tsuda gliding in windswept fields with scanlines and track telemetry.
  * **Live Oscilloscope (`LIVE OSCILLOSCOPE`):** Phosphor trace canvas rendered via Web Audio `AnalyserNode` with persistent phosphor trail decay. Clicking the screen cycles between **P31 Ether Green**, **P4 Concert Blue**, and **P12 Solar Amber** phosphor beams.
* **Radial Optical Laser Pickup Sled:** The laser head (`#laser-head`) moves continuously across the disc radius from inner hub to outer rim tracking playback time.
* **Mechanical Eject / Latch Mechanism:** Clicking **OPEN LID** (`▲`) tilts and ejects the physical CD, shuts off the spindle motor, drains the ESP anti-shock buffer, and triggers a synthesized dual-stage mechanical spring unlatch sound.
* **Disc Vault Jewel Case Rack:** 5 selectable CDs (`Kokyuu`, `Kyoumei`, `Kaifuku Suru Kizu`, `Tsubasa wo Kudasai`, `Houwa`). Clicking any jewel case loads the CD, updates the silk-screen label, and spins up the drive.
* **Direct Touch Controls:** Click directly on the compact disc to play/pause or close the door. Click the CRT monitor to toggle playback.
* **Hardware Volume Slider:** Tactile slider controlling synthesized master gain.

### 2. Generative Web Audio Synthesizer (Debussy Pentatonics)
* **Claude Debussy Arabesque Harmonics:** Generative Web Audio oscillator engine playing resonant pentatonic chimes (*E3, B3, E4, G#4, B4, C#5, E5*) through a warm 1400Hz low-pass resonant filter.
* **Pure Zero-File Synthesis:** Audio and sound FX are generated programmatically—zero MP3/WAV dependencies.
* **Hardware Mechanical Sound FX:** Procedural synthesis of mechanical unlatch clicks, lid snap latches, spindle motor acceleration ramps, and optical stepper motor seek chirps.

### 3. CineAlta 24p Camera HUD & Horizon Tuner
* **Sony HDW-F900 Telemetry:** Real-time 24fps timecode counter (`TC HH:MM:SS:FF`) matching CineAlta cadence (41.6ms).
* **Horizon Frequency Tuner:** 5 selectable scenery presets updating background textures and color temperatures:
  1. *[FREQ A]* Verdant Solitude (`background.jpg` — Summer Rice Field)
  2. *[FREQ B]* Concert Sanctuary (`background2.jpg` — The Glowing Screen)
  3. *[FREQ C]* Twilight Plain (`background3.png` — Wounded Autumn)
  4. *[FREQ D]* Rural Pathway (`background4.jpg` — Youth & Distance)
  5. *[FREQ E]* Transmission Tower (`background5.png` — Celestial Antenna)

### 4. Lilyholic 2000 Live BBS Intertitle Feed
* Recreates the film's iconic typewriter text intertitles across black screens.
* Features typewriter animation, blinking cursor, and transmission browsing controls.

---

## 🛠️ Technical Stack & Constraints

Strictly engineered according to the zero-dependency specification in [`AGENTS.md`](./AGENTS.md):

* **Language:** Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`)
* **Styling:** Vanilla CSS3 with CSS Custom Properties (`:root`), Flexbox, CSS Grid, and GPU-accelerated keyframe animations. Zero third-party CSS frameworks (no Tailwind, Bootstrap, or Bulma).
* **Scripting:** Modular Vanilla JavaScript (ES6+), event-driven, cleanly scoped without global namespace pollution. Zero JavaScript libraries (no React, jQuery, or Vue).
* **Audio & Visuals:** Web Audio API (`AudioContext`, `BiquadFilterNode`, `AnalyserNode`, `GainNode`) and HTML5 `<canvas>`.
* **Hosting Compatibility:** 100% relative file paths (`./assets/...`, `./style.css`, `./script.js`) for seamless GitHub Pages subdirectory deployment.

---

## 📂 Directory Structure

```text
lily-chou-chou-themed-portfolio/
├── .gitignore          # Repository ignore rules (tools, OS metadata, IDE configs)
├── AGENTS.md           # Architecture rules & design specification guidelines
├── README.md           # Project documentation & feature manual
├── index.html          # Semantic HTML5 markup with accessible ARIA landmarks
├── style.css           # Pure CSS3 design system with Ether Spectrum tokens
├── script.js           # Vanilla ES6+ Web Audio engine, oscilloscope, and player
└── assets/             # Cinematographic stills, emblems, and media
    ├── logo.png        # Stylized Ç insignia emblem
    ├── hero.png        # Hasumi in summer rice fields (2.39:1 CineAlta letterbox)
    ├── hero2.png       # Lily Chou-Chou typography study artwork
    ├── hi.gif          # 24fps film excerpt: Tsuda gliding in the grass
    ├── background.jpg  # Scene 01: Verdant Solitude UHD
    ├── background2.jpg # Scene 02: Concert Sanctuary
    ├── background3.png # Scene 03: Wounded Autumn
    ├── background4.jpg # Scene 04: Rural Pathway
    └── background5.png # Scene 05: The Celestial Antenna
```

---

## 🎨 Color Palette (The Ether Spectrum)

| Mode | Token | Hex Value | Semantic Role |
| :--- | :--- | :--- | :--- |
| **Nocturnal (BBS)** | `--bg-primary` | `#090d12` | Obsidian CRT monitor backdrop |
| **Nocturnal (BBS)** | `--accent-primary` | `#8fa85b` | Verdant Ether green / Phosphor beam |
| **Nocturnal (BBS)** | `--accent-secondary` | `#38bdf8` | Cyber sanctuary cyan / Blue Cat resonance |
| **Nocturnal (BBS)** | `--accent-warm` | `#f59e0b` | Sunset orange / Door warning indicator |
| **Solar (Daylight)** | `--bg-primary` | `#f6f8f1` | Overexposed sunlight white |
| **Solar (Daylight)** | `--accent-primary` | `#496d29` | Deep saturated chlorophyll green |

---

## 🚀 Running Locally

Because this project is built entirely with vanilla web standards and zero external build steps, you can run it immediately on any machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TwilightDust12/lily-chou-chou-themed-portfolio.git
   cd lily-chou-chou-themed-portfolio
   ```

2. **Serve with any local HTTP server:**
   * Using Python:
     ```bash
     python3 -m http.server 8000
     ```
   * Using Node.js (npx):
     ```bash
     npx serve .
     ```
   * Or simply double-click and open `index.html` in any modern web browser.

3. **Navigate to:**
   `http://localhost:8000`

---

## 📜 Credits & Lore

* **Director & Concept:** Shunji Iwai (*All About Lily Chou-Chou*, 2001)
* **Cinematography Homage:** Noboru Shinoda (Sony HDW-F900 24p CineAlta pioneer)
* **Music & Harmonics:** Takeshi Kobayashi, Salyu, and Claude Debussy
* **Portfolio & Development:** Philia / [TwilightDust12](https://github.com/TwilightDust12)

---

> *"Breathe. The Ether is listening."*
