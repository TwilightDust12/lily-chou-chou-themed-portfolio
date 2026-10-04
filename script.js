/**
 * Lily Chou-Chou — The Ether Sanctuary
 * Vanilla Modern JavaScript (ES6+)
 * Accessible, Event-Driven, Scoped Architecture with Seamless Theme & Scenery Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Navigation & Mobile Menu Toggle
     ========================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const primaryNav = document.getElementById('primary-navigation');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      primaryNav.classList.toggle('nav-open');
    });

    // Close mobile menu on clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (primaryNav.classList.contains('nav-open')) {
          primaryNav.classList.remove('nav-open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!primaryNav.contains(e.target) && !menuToggle.contains(e.target)) {
        if (primaryNav.classList.contains('nav-open')) {
          primaryNav.classList.remove('nav-open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // Active link highlighter on scroll
  const sections = document.querySelectorAll('section[id]');
  const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* ==========================================================================
     2. Light / Dark Theme Mode Toggle (Seamless Smooth Transition Engine)
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('ether-theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  const updateToggleLabels = (isLight) => {
    if (!themeToggle) return;
    const label = isLight 
      ? 'Switch to nocturnal ether mode' 
      : 'Switch to sunlit day mode';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
  };

  const applyTheme = (theme, enableTransition = false) => {
    if (enableTransition) {
      document.documentElement.classList.add('theme-in-transition');
    }

    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      updateToggleLabels(true);
    } else {
      document.documentElement.removeAttribute('data-theme');
      updateToggleLabels(false);
    }

    if (enableTransition) {
      setTimeout(() => {
        document.documentElement.classList.remove('theme-in-transition');
      }, 480);
    }
  };

  // Initial theme application (instant without transition to avoid flash on load)
  if (savedTheme) {
    applyTheme(savedTheme, false);
  } else if (systemPrefersLight) {
    applyTheme('light', false);
  } else {
    updateToggleLabels(false);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isCurrentLight = document.documentElement.getAttribute('data-theme') === 'light';
      const newTheme = isCurrentLight ? 'dark' : 'light';
      applyTheme(newTheme, true);
      localStorage.setItem('ether-theme', newTheme);
    });
  }

  /* ==========================================================================
     3. Cinematic Horizon / Scenery Switcher
     Supports backgrounds 1, 2, 3, 4, and 5 with persistence & live updates
     ========================================================================== */
  const sceneryPills = document.querySelectorAll('.scenery-pill');
  const heroSceneryName = document.getElementById('hero-scenery-name');
  const applyBgButtons = document.querySelectorAll('.apply-bg-btn');

  const setHeroHorizon = (bgUrl, bgName) => {
    document.documentElement.style.setProperty('--active-hero-bg', `url('${bgUrl}')`);
    if (heroSceneryName && bgName) {
      heroSceneryName.textContent = bgName;
    }
    sceneryPills.forEach(pill => {
      const isMatch = pill.getAttribute('data-bg') === bgUrl;
      pill.classList.toggle('active', isMatch);
      pill.setAttribute('aria-checked', String(isMatch));
    });
    localStorage.setItem('ether-horizon-bg', bgUrl);
    if (bgName) localStorage.setItem('ether-horizon-name', bgName);
  };

  sceneryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const bgUrl = pill.getAttribute('data-bg');
      const bgName = pill.getAttribute('data-name');
      setHeroHorizon(bgUrl, bgName);
    });
  });

  applyBgButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const bgUrl = btn.getAttribute('data-bg');
      const bgName = btn.getAttribute('data-name');
      setHeroHorizon(bgUrl, bgName);
      const heroSection = document.getElementById('hero');
      if (heroSection) heroSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const savedHorizonBg = localStorage.getItem('ether-horizon-bg');
  const savedHorizonName = localStorage.getItem('ether-horizon-name');
  if (savedHorizonBg) {
    setHeroHorizon(savedHorizonBg, savedHorizonName);
  }

  /* ==========================================================================
     4. Interactive Component: Archive & Scenery Filtering
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const archiveCards = document.querySelectorAll('.interactive-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filterValue = btn.getAttribute('data-filter');

      archiveCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ==========================================================================
     5. Interactive Component: Simulated Disc Player & Visualizer
     Enhanced Dynamic Optical Disc System (Sony D-E01 Homage)
     ========================================================================== */
  const playerConsole = document.querySelector('.player-console');
  const ctrlPlay = document.getElementById('ctrl-play');
  const ctrlPrev = document.getElementById('ctrl-prev');
  const ctrlNext = document.getElementById('ctrl-next');
  const ctrlStop = document.getElementById('ctrl-stop');
  const ctrlPlayLabel = document.getElementById('ctrl-play-label');
  const playerStatusText = document.getElementById('player-status-text');
  const playerTimeDisplay = document.getElementById('player-time-display');
  const trackScrubber = document.getElementById('track-scrubber');
  const iconPlay = document.querySelector('.icon-play');
  const iconPause = document.querySelector('.icon-pause');
  const currentTrackName = document.getElementById('current-track-name');
  const currentTrackAlbum = document.getElementById('current-track-album');
  const screenTrackIndicator = document.querySelector('.screen-track-indicator');
  const motionTrackIndicator = document.getElementById('motion-track-indicator');

  // Dynamic Optical Hardware Elements
  const physicalCompactDisc = document.getElementById('physical-compact-disc');
  const laserHead = document.getElementById('laser-head');
  const btnDiscEject = document.getElementById('btn-disc-eject');
  const ejectBtnLabel = document.getElementById('eject-btn-label');
  const cdLidOpenIndicator = document.getElementById('cd-lid-open-indicator');
  const discSpinIndicator = document.getElementById('disc-spin-indicator');
  const espStatusBadge = document.getElementById('esp-status-badge');
  const cdPrintAlbum = document.getElementById('cd-print-album');
  const cdPrintTrack = document.getElementById('cd-print-track');
  const discmanVolume = document.getElementById('discman-volume');
  const volumeValDisplay = document.getElementById('volume-val-display');

  // Viewport Switcher Tabs & Panels
  const viewportTabs = document.querySelectorAll('.viewport-tab');
  const viewportPanels = document.querySelectorAll('.viewport-panel');

  // Disc Vault Jewel Cases
  const jewelCases = document.querySelectorAll('.jewel-case');

  // Real-time Oscilloscope & Visualizer
  const oscilloscopeCanvas = document.getElementById('discman-oscilloscope');
  const oscilloscopeScreen = document.querySelector('.oscilloscope-screen');
  const scopeTelemetryTag = document.querySelector('.scope-telemetry-tag');
  const visBars = document.querySelectorAll('#audio-visualizer .vis-bar');
  const cdSpindleBay = document.getElementById('cd-spindle-bay');
  const playerVisualScreen = document.getElementById('player-visual-screen');

  const phosphorModes = [
    { color: '#8fa85b', name: 'P31 ETHER GREEN' },
    { color: '#38bdf8', name: 'P4 CONCERT BLUE' },
    { color: '#fbbf24', name: 'P12 SOLAR AMBER' }
  ];
  let currentPhosphorIndex = 0;

  const playlist = [
    { title: 'Glide', album: 'Kokyuu (呼吸)', printAlbum: 'KOKYUU', printTrack: 'GLIDE', duration: 221 },
    { title: 'Kyoumei (Resonance)', album: 'Maxi Single', printAlbum: 'KYOU MEI', printTrack: 'RESONANCE', duration: 245 },
    { title: 'Kaifuku Suru Kizu', album: 'Kokyuu (呼吸)', printAlbum: 'KOKYUU', printTrack: 'KAIFUKU', duration: 182 },
    { title: 'Tsubasa wo Kudasai', album: 'Reinterpretation', printAlbum: 'TSUBASA', printTrack: 'PRAYER', duration: 204 },
    { title: 'Houwa (Saturation)', album: 'Kokyuu (呼吸)', printAlbum: 'HOUWA', printTrack: 'SATURATION', duration: 278 }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  let isLidOpen = false;
  let playbackTimer = null;
  let currentSeconds = 0;

  /* Web Audio API: Generative Ambient Ether Chimes + Dynamic Analyser */
  let audioCtx = null;
  let synthMasterGain = null;
  let analyser = null;
  let ambientInterval = null;
  let oscilloscopeAnimId = null;

  const arabesqueScale = [164.81, 246.94, 329.63, 415.30, 493.88, 554.37, 659.25]; // E3, B3, E4, G#4, B4, C#5, E5

  const initAudioEngine = () => {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
        synthMasterGain = audioCtx.createGain();

        // Connect master volume
        const volVal = discmanVolume ? (parseInt(discmanVolume.value, 10) / 100) : 0.75;
        synthMasterGain.gain.setValueAtTime(volVal * 0.12, audioCtx.currentTime);

        // Real-time FFT Analyser
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.82;

        synthMasterGain.connect(analyser);
        analyser.connect(audioCtx.destination);

        startVisualizerLoop();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  /* Mechanical Discman Sound Effects (Tactile Hardware Emulation) */
  const playMechanicalSound = (type) => {
    initAudioEngine();
    if (!audioCtx) return;
    try {
      const now = audioCtx.currentTime;

      if (type === 'eject') {
        // Mechanical chassis latch release
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.connect(gain);
        gain.connect(synthMasterGain);
        osc.start(now);
        osc.stop(now + 0.09);

        const snapOsc = audioCtx.createOscillator();
        const snapGain = audioCtx.createGain();
        snapOsc.type = 'square';
        snapOsc.frequency.setValueAtTime(950, now + 0.02);
        snapOsc.frequency.exponentialRampToValueAtTime(280, now + 0.07);
        snapGain.gain.setValueAtTime(0.05, now + 0.02);
        snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
        snapOsc.connect(snapGain);
        snapGain.connect(synthMasterGain);
        snapOsc.start(now + 0.02);
        snapOsc.stop(now + 0.08);
      } else if (type === 'close') {
        // Mechanical lid click latch
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.06);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
        osc.connect(gain);
        gain.connect(synthMasterGain);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === 'spinup') {
        // Spindle motor frequency ramp
        const motorOsc = audioCtx.createOscillator();
        const motorGain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();
        motorOsc.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(380, now);

        motorOsc.frequency.setValueAtTime(75, now);
        motorOsc.frequency.exponentialRampToValueAtTime(480, now + 0.32);

        motorGain.gain.setValueAtTime(0.001, now);
        motorGain.gain.linearRampToValueAtTime(0.035, now + 0.08);
        motorGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

        motorOsc.connect(filter);
        filter.connect(motorGain);
        motorGain.connect(synthMasterGain);
        motorOsc.start(now);
        motorOsc.stop(now + 0.33);

        // Laser pickup seek chirp
        [0.06, 0.18].forEach((offset, idx) => {
          const chirpOsc = audioCtx.createOscillator();
          const chirpGain = audioCtx.createGain();
          chirpOsc.type = 'sine';
          chirpOsc.frequency.setValueAtTime(idx === 0 ? 2100 : 2750, now + offset);
          chirpGain.gain.setValueAtTime(0.02, now + offset);
          chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.025);
          chirpOsc.connect(chirpGain);
          chirpGain.connect(synthMasterGain);
          chirpOsc.start(now + offset);
          chirpOsc.stop(now + offset + 0.03);
        });
      } else if (type === 'seek') {
        // Quick optical sled micro-seek chirp
        const seekOsc = audioCtx.createOscillator();
        const seekGain = audioCtx.createGain();
        seekOsc.type = 'sine';
        seekOsc.frequency.setValueAtTime(2300, now);
        seekGain.gain.setValueAtTime(0.025, now);
        seekGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);
        seekOsc.connect(seekGain);
        seekGain.connect(synthMasterGain);
        seekOsc.start(now);
        seekOsc.stop(now + 0.03);
      }
    } catch {
      // Audio safeguard
    }
  };

  const playChimeNote = (freq, duration = 3.5) => {
    if (!audioCtx || !synthMasterGain) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(2.5, now);

      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.05, now + 0.35);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(synthMasterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // Audio context policy guard
    }
  };

  const startAmbientEtherSynth = () => {
    initAudioEngine();
    if (!audioCtx) return;
    playChimeNote(arabesqueScale[0], 4.2);
    playChimeNote(arabesqueScale[2], 3.8);
    playChimeNote(arabesqueScale[3], 3.6);

    if (ambientInterval) clearInterval(ambientInterval);
    ambientInterval = setInterval(() => {
      if (!isPlaying || isLidOpen) return;
      const randIdx = Math.floor(Math.random() * arabesqueScale.length);
      const randIdx2 = (randIdx + 2) % arabesqueScale.length;
      playChimeNote(arabesqueScale[randIdx], 3.4);
      setTimeout(() => {
        if (isPlaying && !isLidOpen) playChimeNote(arabesqueScale[randIdx2], 3.0);
      }, 700);
    }, 3400);
  };

  const stopAmbientEtherSynth = () => {
    if (ambientInterval) {
      clearInterval(ambientInterval);
      ambientInterval = null;
    }
  };

  /* Real-time Oscilloscope Beam & Dynamic EQ Visualizer Loop */
  const startVisualizerLoop = () => {
    if (oscilloscopeAnimId) return;

    const canvas = oscilloscopeCanvas;
    const ctx = canvas ? canvas.getContext('2d') : null;
    const bufferLength = analyser ? analyser.frequencyBinCount : 128;
    const timeData = new Uint8Array(bufferLength);
    const freqData = new Uint8Array(bufferLength);

    const render = () => {
      oscilloscopeAnimId = requestAnimationFrame(render);

      // 1. Live CRT Phosphor Trace on Oscilloscope Canvas
      if (ctx && canvas) {
        const width = canvas.width;
        const height = canvas.height;

        // Persistent phosphor trail decay
        ctx.fillStyle = 'rgba(2, 4, 6, 0.22)';
        ctx.fillRect(0, 0, width, height);

        const activePhosphor = phosphorModes[currentPhosphorIndex];

        if (analyser && isPlaying && !isLidOpen) {
          analyser.getByteTimeDomainData(timeData);

          ctx.lineWidth = 2.0;
          ctx.strokeStyle = activePhosphor.color;
          ctx.shadowColor = activePhosphor.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();

          const sliceWidth = width / bufferLength;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const v = timeData[i] / 128.0;
            const y = (v * height) / 2;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else {
          // Idling baseline phosphor flutter
          ctx.lineWidth = 1.2;
          ctx.strokeStyle = activePhosphor.color;
          ctx.shadowColor = activePhosphor.color;
          ctx.shadowBlur = 4;
          ctx.beginPath();
          const midY = height / 2;
          const jitter = (Math.random() - 0.5) * 1.5;
          ctx.moveTo(0, midY + jitter);
          ctx.lineTo(width, midY + jitter);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // 2. Real-Time Dynamic Frequency Visualizer Bars
      if (visBars && visBars.length > 0) {
        const activeColor = phosphorModes[currentPhosphorIndex].color;
        if (analyser && isPlaying && !isLidOpen) {
          analyser.getByteFrequencyData(freqData);
          const barStep = Math.max(1, Math.floor(bufferLength / visBars.length));
          visBars.forEach((bar, idx) => {
            const val = freqData[idx * barStep] || 0;
            const targetH = Math.max(5, Math.round((val / 255) * 36));
            bar.style.height = `${targetH}px`;
            bar.style.backgroundColor = activeColor;
            bar.style.boxShadow = `0 0 6px ${activeColor}`;
          });
        } else {
          visBars.forEach(bar => {
            bar.style.height = '6px';
            bar.style.backgroundColor = '';
            bar.style.boxShadow = '';
          });
        }
      }
    };

    render();
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const updatePlayerDisplay = () => {
    const track = playlist[currentTrackIndex];
    if (currentTrackName) currentTrackName.textContent = `${track.title} — Lily Chou-Chou`;
    if (currentTrackAlbum) currentTrackAlbum.textContent = `Album: ${track.album} • Track 0${currentTrackIndex + 1}`;
    if (playerTimeDisplay) {
      playerTimeDisplay.textContent = `${formatTime(currentSeconds)} / ${formatTime(track.duration)}`;
    }
    if (trackScrubber) {
      const progressPercent = (currentSeconds / track.duration) * 100;
      trackScrubber.value = progressPercent;
      trackScrubber.setAttribute('aria-valuenow', Math.round(progressPercent));
    }
    const indicatorText = `TRACK 0${currentTrackIndex + 1}: ${track.title.toUpperCase()} • 44.1kHz DIGITAL ETHER`;
    if (screenTrackIndicator) {
      screenTrackIndicator.textContent = indicatorText;
    }
    if (motionTrackIndicator) {
      motionTrackIndicator.textContent = indicatorText;
    }
    if (cdPrintAlbum) cdPrintAlbum.textContent = track.printAlbum || track.album.toUpperCase();
    if (cdPrintTrack) cdPrintTrack.textContent = track.printTrack || track.title.toUpperCase();

    // Laser pickup sled position along radial optical track
    if (laserHead) {
      const progress = track.duration > 0 ? (currentSeconds / track.duration) : 0;
      const sledPos = 16 + (progress * 26);
      laserHead.style.left = `${sledPos}%`;
    }
  };

  /* Discman Door Open / Eject Toggle */
  const toggleLid = () => {
    isLidOpen = !isLidOpen;
    playMechanicalSound(isLidOpen ? 'eject' : 'close');

    if (isLidOpen) {
      if (isPlaying) {
        togglePlay(); // Pause playback immediately
      }
      if (cdLidOpenIndicator) cdLidOpenIndicator.hidden = false;
      if (physicalCompactDisc) {
        physicalCompactDisc.classList.add('ejected');
        physicalCompactDisc.classList.remove('spinning');
      }
      if (btnDiscEject) btnDiscEject.classList.add('open');
      if (ejectBtnLabel) ejectBtnLabel.textContent = 'CLOSE LID';
      if (playerStatusText) playerStatusText.textContent = 'LID OPEN: MOTOR OFF';
      if (espStatusBadge) espStatusBadge.textContent = 'ESP: DRAINED [□□□□□□□□□□]';
      if (discSpinIndicator) {
        discSpinIndicator.textContent = '( - )';
        discSpinIndicator.style.color = 'var(--accent-warm)';
      }
    } else {
      if (cdLidOpenIndicator) cdLidOpenIndicator.hidden = true;
      if (physicalCompactDisc) {
        physicalCompactDisc.classList.remove('ejected');
      }
      if (btnDiscEject) btnDiscEject.classList.remove('open');
      if (ejectBtnLabel) ejectBtnLabel.textContent = 'OPEN LID';
      if (playerStatusText) playerStatusText.textContent = 'DISC LOADED: READY';
      if (espStatusBadge) espStatusBadge.textContent = 'ESP: 45s BUFFER [■■■■■■■■□□]';
      if (discSpinIndicator) {
        discSpinIndicator.textContent = '( ( ◎ ) )';
        discSpinIndicator.style.color = 'var(--accent-primary)';
      }
      playMechanicalSound('spinup');
    }
  };

  if (btnDiscEject) {
    btnDiscEject.addEventListener('click', toggleLid);
  }

  /* Disc Loading via Jewel Case Rack */
  const loadTrackByIndex = (index, autoPlay = true) => {
    if (index < 0 || index >= playlist.length) return;
    currentTrackIndex = index;
    currentSeconds = 0;

    // Update active state in rack
    jewelCases.forEach(jc => {
      const isMatch = parseInt(jc.getAttribute('data-track-index'), 10) === currentTrackIndex;
      jc.classList.toggle('active', isMatch);
      jc.setAttribute('aria-checked', String(isMatch));
    });

    // Auto-close lid if loading a new disc
    if (isLidOpen) {
      toggleLid();
    }

    updatePlayerDisplay();
    playMechanicalSound('spinup');

    // ESP buffer simulation
    if (espStatusBadge) {
      espStatusBadge.textContent = 'ESP: SEEKING [■■■■■□□□□□]';
      setTimeout(() => {
        if (espStatusBadge && !isLidOpen) {
          espStatusBadge.textContent = 'ESP: 45s BUFFER [■■■■■■■■□□]';
        }
      }, 450);
    }

    if (autoPlay && !isPlaying) {
      togglePlay();
    } else if (isPlaying) {
      playChimeNote(arabesqueScale[currentTrackIndex % arabesqueScale.length], 3.8);
    }
  };

  jewelCases.forEach(jc => {
    jc.addEventListener('click', () => {
      const trackIdx = parseInt(jc.getAttribute('data-track-index'), 10);
      loadTrackByIndex(trackIdx, true);
    });
  });

  /* Viewport Switcher Tabs */
  viewportTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPanelId = tab.getAttribute('aria-controls');

      viewportTabs.forEach(t => {
        const isSelected = t === tab;
        t.classList.toggle('active', isSelected);
        t.setAttribute('aria-selected', String(isSelected));
      });

      viewportPanels.forEach(panel => {
        if (panel.id === targetPanelId) {
          panel.classList.add('active');
          panel.hidden = false;
        } else {
          panel.classList.remove('active');
          panel.hidden = true;
        }
      });
    });
  });

  /* Play / Pause Toggle */
  const togglePlay = () => {
    if (isLidOpen) {
      toggleLid(); // Close lid first
    }

    isPlaying = !isPlaying;
    if (playerConsole) {
      playerConsole.classList.toggle('playing', isPlaying);
    }
    if (iconPlay && iconPause) {
      iconPlay.style.display = isPlaying ? 'none' : 'inline-block';
      iconPause.style.display = isPlaying ? 'inline-block' : 'none';
    }
    if (ctrlPlayLabel) {
      ctrlPlayLabel.textContent = isPlaying ? 'PAUSE' : 'PLAY';
    }
    if (ctrlPlay) {
      ctrlPlay.setAttribute('aria-label', isPlaying ? 'Pause current track' : 'Play current track');
    }
    if (playerStatusText) {
      playerStatusText.textContent = isPlaying ? `PLAYING: ${playlist[currentTrackIndex].title.toUpperCase()}` : 'PAUSED';
    }

    // Physical Disc & Icon spinning state
    if (physicalCompactDisc) {
      physicalCompactDisc.classList.toggle('spinning', isPlaying);
    }
    if (discSpinIndicator) {
      discSpinIndicator.textContent = isPlaying ? '( ( ◎ ) )' : '( ◎ )';
      discSpinIndicator.style.color = isPlaying ? 'var(--accent-primary)' : 'var(--text-muted)';
    }

    if (isPlaying) {
      playMechanicalSound('spinup');
      startAmbientEtherSynth();
      playbackTimer = setInterval(() => {
        const track = playlist[currentTrackIndex];
        if (currentSeconds < track.duration) {
          currentSeconds += 1;
          updatePlayerDisplay();
        } else {
          currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
          currentSeconds = 0;
          updatePlayerDisplay();
          playMechanicalSound('spinup');
        }
      }, 1000);
    } else {
      stopAmbientEtherSynth();
      clearInterval(playbackTimer);
    }
  };

  if (ctrlPlay) {
    ctrlPlay.addEventListener('click', togglePlay);
  }

  if (ctrlStop) {
    ctrlStop.addEventListener('click', () => {
      if (isPlaying) {
        togglePlay();
      }
      currentSeconds = 0;
      updatePlayerDisplay();
      if (laserHead) laserHead.style.left = '16%';
      if (physicalCompactDisc) physicalCompactDisc.classList.remove('spinning');
      if (playerStatusText) {
        playerStatusText.textContent = 'DISC STOPPED: READY';
      }
    });
  }

  if (ctrlNext) {
    ctrlNext.addEventListener('click', () => {
      playMechanicalSound('seek');
      const nextIndex = (currentTrackIndex + 1) % playlist.length;
      loadTrackByIndex(nextIndex, isPlaying);
    });
  }

  if (ctrlPrev) {
    ctrlPrev.addEventListener('click', () => {
      playMechanicalSound('seek');
      const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
      loadTrackByIndex(prevIndex, isPlaying);
    });
  }

  if (trackScrubber) {
    trackScrubber.addEventListener('input', (e) => {
      const track = playlist[currentTrackIndex];
      const newPercent = parseFloat(e.target.value);
      currentSeconds = Math.floor((newPercent / 100) * track.duration);
      updatePlayerDisplay();
      playMechanicalSound('seek');
    });
  }

  /* Output Volume Slider */
  if (discmanVolume) {
    discmanVolume.addEventListener('input', (e) => {
      const vol = parseInt(e.target.value, 10);
      if (volumeValDisplay) volumeValDisplay.textContent = `${vol}%`;
      if (synthMasterGain && audioCtx) {
        synthMasterGain.gain.setValueAtTime((vol / 100) * 0.12, audioCtx.currentTime);
      }
    });
  }

  /* Direct Tactile Hardware Interactions */
  if (cdSpindleBay) {
    cdSpindleBay.style.cursor = 'pointer';
    cdSpindleBay.setAttribute('title', 'Click to toggle play/pause or insert disc');
    cdSpindleBay.addEventListener('click', (e) => {
      // Don't intercept if clicking the eject button itself
      if (e.target.closest('#btn-disc-eject')) return;
      if (isLidOpen) {
        toggleLid();
      } else {
        togglePlay();
      }
    });
  }

  if (playerVisualScreen) {
    playerVisualScreen.style.cursor = 'pointer';
    playerVisualScreen.setAttribute('title', 'Click CRT monitor to toggle play/pause');
    playerVisualScreen.addEventListener('click', togglePlay);
  }

  if (oscilloscopeScreen) {
    oscilloscopeScreen.style.cursor = 'pointer';
    oscilloscopeScreen.setAttribute('title', 'Click to cycle phosphor trace beam mode');
    oscilloscopeScreen.addEventListener('click', () => {
      currentPhosphorIndex = (currentPhosphorIndex + 1) % phosphorModes.length;
      playMechanicalSound('seek');
      if (scopeTelemetryTag) {
        scopeTelemetryTag.textContent = `LIVE FFT // ${phosphorModes[currentPhosphorIndex].name}`;
      }
    });
  }

  // Initialize player UI telemetry on page boot
  updatePlayerDisplay();
  startVisualizerLoop();

  /* ==========================================================================
     6. Interactive Component: FAQ / Lore Accordion
     ========================================================================== */
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);

      accordionTriggers.forEach(otherTrigger => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          const otherPanelId = otherTrigger.getAttribute('aria-controls');
          const otherPanel = document.getElementById(otherPanelId);
          if (otherPanel) otherPanel.hidden = true;
        }
      });

      trigger.setAttribute('aria-expanded', String(!isExpanded));
      if (panel) {
        panel.hidden = isExpanded;
      }
    });
  });

  /* ==========================================================================
     7. Liner Notes & Cinematography Modal Dialog
     ========================================================================== */
  const modalBackdrop = document.getElementById('track-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBodyContent = document.getElementById('modal-body-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalFooterClose = document.getElementById('modal-footer-close');

  const linerNotesData = {
    'glide': {
      title: 'Kokyuu (呼吸 / Breathe) — Liner Notes',
      body: `
        <p><strong>Release:</strong> October 17, 2001 | <strong>Format:</strong> Studio CD &amp; Analogue LP</p>
        <p style="margin-top: 0.75rem;">Produced by Takeshi Kobayashi with Shunji Iwai. <em>Kokyuu</em> represents a metaphysical diary of adolescent vulnerability. From the gentle acoustic murmur of "Glide" to the thunderous catharsis of "Ai no Jikken," each piece was orchestrated to capture the pure resonance known as the Ether.</p>
        <p style="margin-top: 0.75rem; font-style: italic; color: var(--accent-primary);">&ldquo;When the soul has nowhere to breathe in society, it seeks sanctuary in the frequency between sounds.&rdquo;</p>
      `
    },
    'glide-single': {
      title: 'Glide Single — Archival Commentary',
      body: `
        <p><strong>Lead Vocalist:</strong> Salyu (as Lily Chou-Chou)</p>
        <p style="margin-top: 0.75rem;">The single that established the mythos. Sung in ethereal English and Japanese, the refrain explores the desire to lose one's physical form and transform into an unbroken melody traveling across the horizon.</p>
      `
    },
    'kyoumei': {
      title: 'Kyoumei (共鳴) — Sonic Analysis',
      body: `
        <p><strong>Themes:</strong> Dissonance, yearning, internet-age alienation.</p>
        <p style="margin-top: 0.75rem;">Featuring heavy distorted guitars meeting acoustic cellos, "Kyoumei" is celebrated for its explosive emotional contrast. It represents the cry of teenagers desperately searching for like-minded souls across cyberspace.</p>
      `
    },
    'kaifuku': {
      title: 'Kaifuku Suru Kizu — Restorative Composition',
      body: `
        <p><strong>Arrangement:</strong> Solo Upright Piano &amp; Ambient Room Noise</p>
        <p style="margin-top: 0.75rem;">Known as the healing hymn of the Ether. The piece is structured around meditative, repetitive piano motifs that provide comfort during moments of overwhelming emotional trauma.</p>
      `
    },
    'tsubasa': {
      title: 'Tsubasa wo Kudasai — Modern Reinterpretation',
      body: `
        <p><strong>Composition:</strong> Kunihiko Murai / Arranged by Takeshi Kobayashi</p>
        <p style="margin-top: 0.75rem;">A radically intimate deconstruction of Japan's classic school choral hymn. Salyu's whispered vocals transform the anthem from communal optimism into a quiet, personal prayer for flight.</p>
      `
    },
    'houwa': {
      title: 'Houwa (飽和) — Ambient Soundscape',
      body: `
        <p><strong>Texture:</strong> Sub-bass synthesis and celestial chorus</p>
        <p style="margin-top: 0.75rem;">An exploration of sensory saturation, capturing the experience of drowning in emotion until total peace is attained.</p>
      `
    },
    'bg1': {
      title: 'Cinematography Study: Scene 01 — Verdant Solitude',
      body: `
        <p><strong>Asset:</strong> <code>assets/background.jpg</code> (3840 &times; 2160 UHD)</p>
        <p style="margin-top: 0.75rem;"><strong>Cinematographer:</strong> Noboru Shinoda | <strong>Camera:</strong> Sony HDW-700 24P</p>
        <p style="margin-top: 0.75rem;">Captured during golden hour in the rice paddies of Tochigi Prefecture. Shinoda pushed the digital camcorder exposure curve to create a radiant, overexposed sky while preserving hyper-saturated verdant greens. Hasumi stands solitary with his Discman, completely enveloped by Salyu's vocals.</p>
        <p style="margin-top: 0.75rem; font-style: italic; color: var(--accent-primary);">Symbolism: Solitude transformed into spiritual communion via the Ether.</p>
      `
    },
    'bg2': {
      title: 'Cinematography Study: Scene 02 — Concert Sanctuary',
      body: `
        <p><strong>Asset:</strong> <code>assets/background2.jpg</code> (1280 &times; 720)</p>
        <p style="margin-top: 0.75rem;"><strong>Lighting Key:</strong> Monochromatic CRT Phosphor Grid &bull; Obsidian Night</p>
        <p style="margin-top: 0.75rem;">The defining moment where the virtual Ether sanctuary confronts physical reality. Hasumi stands beneath the towering stadium video screen displaying the glowing cathode-ray glyphs "Lily Chou-Chou". The shot explores the overwhelming scale of collective teenage longing in an anonymous metropolis.</p>
      `
    },
    'bg3': {
      title: 'Cinematography Study: Scene 03 — Wounded Autumn',
      body: `
        <p><strong>Asset:</strong> <code>assets/background3.png</code> (1280 &times; 720)</p>
        <p style="margin-top: 0.75rem;"><strong>Palette:</strong> Desaturated Lilac, Earth Umber, Dusky Lavender</p>
        <p style="margin-top: 0.75rem;">In stark contrast to the vivid green summer, this winter sequence depicts Hasumi in a duffle coat and school bag standing in harvested, furrowed earth. The sunset sky glows with melancholic pink and violet hues, visually framing the emotional wounds and loss of innocence.</p>
      `
    },
    'bg4': {
      title: 'Cinematography Study: Scene 04 — Rural Pathway',
      body: `
        <p><strong>Asset:</strong> <code>assets/background4.jpg</code> (1920 &times; 1080)</p>
        <p style="margin-top: 0.75rem;"><strong>Style:</strong> Handheld Kinetic Tracking &bull; Overcast Daylight</p>
        <p style="margin-top: 0.75rem;">A spontaneous, intimate tracking shot following Tsuda (Yu Aoi) and Hasumi walking home along a narrow asphalt country path. Tsuda playfully swings her feet and school bag, creating a fleeting moment of fragile happiness before tragedy ensues.</p>
      `
    },
    'bg5': {
      title: 'Cinematography Study: Scene 05 — The Celestial Antenna',
      body: `
        <p><strong>Asset:</strong> <code>assets/background5.png</code> (1920 &times; 1080)</p>
        <p style="margin-top: 0.75rem;"><strong>Visual Motif:</strong> Prismatic Rainbow Flare &bull; Telecommunications Tower &bull; Kites</p>
        <p style="margin-top: 0.75rem;">The soaring lattice antenna piercing a deep cerulean sky with vapor trails. Red geometric kites swoop around the mast while a circular chromatic aberration lens flare washes over the frame. Represents the physical transmitter of the Ether—sending and receiving invisible frequencies of human heartache.</p>
      `
    }
  };

  let lastActiveElement = null;

  const openModal = (trackKey) => {
    const data = linerNotesData[trackKey] || linerNotesData['glide'];
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalBodyContent) modalBodyContent.innerHTML = data.body;

    lastActiveElement = document.activeElement;
    if (modalBackdrop) {
      modalBackdrop.classList.add('is-open');
      modalBackdrop.setAttribute('aria-hidden', 'false');
      if (modalCloseBtn) modalCloseBtn.focus();
    }
  };

  const closeModal = () => {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('is-open');
      modalBackdrop.setAttribute('aria-hidden', 'true');
      if (lastActiveElement) lastActiveElement.focus();
    }
  };

  // Delegate clicks for open-modal-btn (including dynamically rendered buttons)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-modal-btn');
    if (btn) {
      const trackKey = btn.getAttribute('data-track');
      openModal(trackKey);
    }
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalFooterClose) modalFooterClose.addEventListener('click', closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  /* ==========================================================================
     8. Contact Form Validation & Submission
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const topicInput = document.getElementById('contact-topic');
    const messageInput = document.getElementById('contact-message');
    const consentInput = document.getElementById('contact-consent');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const topicError = document.getElementById('topic-error');
    const messageError = document.getElementById('message-error');
    const consentError = document.getElementById('consent-error');

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Name validation
      if (!nameInput.value.trim()) {
        nameInput.classList.add('invalid');
        if (nameError) nameError.textContent = 'Please enter your handle or name.';
        isValid = false;
      } else {
        nameInput.classList.remove('invalid');
        if (nameError) nameError.textContent = '';
      }

      // Email validation
      if (!emailInput.value.trim()) {
        emailInput.classList.add('invalid');
        if (emailError) emailError.textContent = 'Please enter your email address.';
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailInput.classList.add('invalid');
        if (emailError) emailError.textContent = 'Please provide a valid email format.';
        isValid = false;
      } else {
        emailInput.classList.remove('invalid');
        if (emailError) emailError.textContent = '';
      }

      // Topic validation
      if (!topicInput.value) {
        topicInput.classList.add('invalid');
        if (topicError) topicError.textContent = 'Please select an inquiry category.';
        isValid = false;
      } else {
        topicInput.classList.remove('invalid');
        if (topicError) topicError.textContent = '';
      }

      // Message validation
      if (!messageInput.value.trim()) {
        messageInput.classList.add('invalid');
        if (messageError) messageError.textContent = 'Transmission message cannot be blank.';
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageInput.classList.add('invalid');
        if (messageError) messageError.textContent = 'Message should contain at least 10 characters.';
        isValid = false;
      } else {
        messageInput.classList.remove('invalid');
        if (messageError) messageError.textContent = '';
      }

      // Consent validation
      if (!consentInput.checked) {
        if (consentError) consentError.textContent = 'You must agree to the sanctuary code.';
        isValid = false;
      } else {
        if (consentError) consentError.textContent = '';
      }

      // Form result feedback
      if (isValid) {
        const submitBtn = document.getElementById('form-submit-btn');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Dispatching to the Ether...';
        }

        setTimeout(() => {
          if (formStatus) {
            formStatus.className = 'form-status-alert success';
            formStatus.textContent = 'Transmission received. Your resonance has been logged into the Ether archive.';
          }
          contactForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
              <span>Dispatch Transmission</span>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            `;
          }
        }, 800);
      } else {
        if (formStatus) {
          formStatus.className = 'form-status-alert error';
          formStatus.textContent = 'Please rectify the highlighted transmission fields above.';
        }
      }
    });
  }

  /* ==========================================================================
     9. Signature Feature: Lilyholic 2000 Live BBS Intertitle Feed
     Recreates the rhythmic mechanical typewriter intertitles from the film
     ========================================================================== */
  const bbsTransmissions = [
    { sender: '[Philia]', text: 'The Ether is all around us... When Lily sings, the wound doesn’t disappear—it vibrates at a higher frequency.' },
    { sender: '[Blue Cat]', text: 'Do you exist in the real world? Or are you just phosphors glowing on my cathode ray tube monitor?' },
    { sender: '[Philia]', text: 'Debussy understood the Ether before anyone else. In 1890, he was already transmitting Arabesque into eternity.' },
    { sender: '[Corine]', text: 'When I listen to "Glide" with my Discman turned to maximum volume, gravity stops existing.' },
    { sender: '[Rasen]', text: 'August 31, 2001. The sky over the Tochigi rice fields is turning white. Summer is ending.' },
    { sender: '[Philia]', text: 'I don’t want words anymore. I only want the pure frequency of the sanctuary.' }
  ];

  let currentBbsIndex = 0;
  const bbsSenderEl = document.getElementById('bbs-sender');
  const bbsTextEl = document.getElementById('bbs-text');
  const btnPrevQuote = document.getElementById('btn-prev-quote');
  const btnNextQuote = document.getElementById('btn-next-quote');
  let typeTimer = null;

  const typeBbsMessage = (index) => {
    if (!bbsSenderEl || !bbsTextEl) return;
    const item = bbsTransmissions[index];
    bbsSenderEl.textContent = `${item.sender}:`;
    bbsTextEl.textContent = '';
    
    if (typeTimer) clearTimeout(typeTimer);

    let charIdx = 0;
    const typeNextChar = () => {
      if (charIdx < item.text.length) {
        bbsTextEl.textContent += item.text.charAt(charIdx);
        charIdx++;
        const delay = 22 + Math.random() * 30;
        typeTimer = setTimeout(typeNextChar, delay);
      }
    };
    typeNextChar();
  };

  typeBbsMessage(0);

  let autoAdvanceTimer = setInterval(() => {
    currentBbsIndex = (currentBbsIndex + 1) % bbsTransmissions.length;
    typeBbsMessage(currentBbsIndex);
  }, 10000);

  if (btnNextQuote) {
    btnNextQuote.addEventListener('click', () => {
      clearInterval(autoAdvanceTimer);
      currentBbsIndex = (currentBbsIndex + 1) % bbsTransmissions.length;
      typeBbsMessage(currentBbsIndex);
    });
  }

  if (btnPrevQuote) {
    btnPrevQuote.addEventListener('click', () => {
      clearInterval(autoAdvanceTimer);
      currentBbsIndex = (currentBbsIndex - 1 + bbsTransmissions.length) % bbsTransmissions.length;
      typeBbsMessage(currentBbsIndex);
    });
  }

  /* 24fps Live CineAlta Camera Timecode (Noboru Shinoda Sony HDW-F900 HUD) */
  const cameraTimecodeEl = document.getElementById('camera-timecode');
  if (cameraTimecodeEl) {
    setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const f = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, '0');
      cameraTimecodeEl.textContent = `TC ${h}:${m}:${s}:${f}`;
    }, 41); // 24fps CineAlta cadence (41.6ms)
  }

  /* ==========================================================================
     10. Footer Dynamic Year
     ========================================================================== */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
