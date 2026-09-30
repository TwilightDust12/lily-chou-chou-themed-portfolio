/**
 * Lily Chou-Chou — The Ether Sanctuary
 * Vanilla Modern JavaScript (ES6+)
 * Accessible, Event-Driven, Scoped Architecture with Seamless Theme Engine
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
     3. Interactive Component: Archive Filtering
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const archiveCards = document.querySelectorAll('.interactive-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update button active state & aria-pressed
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
     4. Interactive Component: Simulated Disc Player & Visualizer
     ========================================================================== */
  const playerConsole = document.querySelector('.player-console');
  const ctrlPlay = document.getElementById('ctrl-play');
  const ctrlPrev = document.getElementById('ctrl-prev');
  const ctrlNext = document.getElementById('ctrl-next');
  const playerStatusText = document.getElementById('player-status-text');
  const playerTimeDisplay = document.getElementById('player-time-display');
  const trackScrubber = document.getElementById('track-scrubber');
  const iconPlay = document.querySelector('.icon-play');
  const iconPause = document.querySelector('.icon-pause');
  const currentTrackName = document.getElementById('current-track-name');
  const currentTrackAlbum = document.getElementById('current-track-album');
  const screenTrackIndicator = document.querySelector('.screen-track-indicator');

  const playlist = [
    { title: 'Glide', album: 'Kokyuu (呼吸) • Track 01', duration: 221 },
    { title: 'Kyoumei (Resonance)', album: 'Maxi Single • Track 01', duration: 245 },
    { title: 'Kaifuku Suru Kizu', album: 'Kokyuu (呼吸) • Track 04', duration: 182 },
    { title: 'Tsubasa wo Kudasai', album: 'Reinterpretation • Track 01', duration: 204 },
    { title: 'Houwa (Saturation)', album: 'Kokyuu (呼吸) • Track 03', duration: 278 }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  let playbackTimer = null;
  let currentSeconds = 0;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const updatePlayerDisplay = () => {
    const track = playlist[currentTrackIndex];
    if (currentTrackName) currentTrackName.textContent = `${track.title} — Lily Chou-Chou`;
    if (currentTrackAlbum) currentTrackAlbum.textContent = track.album;
    if (playerTimeDisplay) {
      playerTimeDisplay.textContent = `${formatTime(currentSeconds)} / ${formatTime(track.duration)}`;
    }
    if (trackScrubber) {
      const progressPercent = (currentSeconds / track.duration) * 100;
      trackScrubber.value = progressPercent;
      trackScrubber.setAttribute('aria-valuenow', Math.round(progressPercent));
    }
    if (screenTrackIndicator) {
      screenTrackIndicator.textContent = `TRACK 0${currentTrackIndex + 1}: ${track.title.toUpperCase()} • 44.1kHz DIGITAL ETHER`;
    }
  };

  const togglePlay = () => {
    isPlaying = !isPlaying;
    if (playerConsole) {
      playerConsole.classList.toggle('playing', isPlaying);
    }
    if (iconPlay && iconPause) {
      iconPlay.style.display = isPlaying ? 'none' : 'block';
      iconPause.style.display = isPlaying ? 'block' : 'none';
    }
    if (ctrlPlay) {
      ctrlPlay.setAttribute('aria-label', isPlaying ? 'Pause current track' : 'Play current track');
    }
    if (playerStatusText) {
      playerStatusText.textContent = isPlaying ? 'PLAYING: THE ETHER' : 'PAUSED';
    }

    if (isPlaying) {
      playbackTimer = setInterval(() => {
        const track = playlist[currentTrackIndex];
        if (currentSeconds < track.duration) {
          currentSeconds += 1;
          updatePlayerDisplay();
        } else {
          // Auto advance to next track
          currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
          currentSeconds = 0;
          updatePlayerDisplay();
        }
      }, 1000);
    } else {
      clearInterval(playbackTimer);
    }
  };

  if (ctrlPlay) {
    ctrlPlay.addEventListener('click', togglePlay);
  }

  if (ctrlNext) {
    ctrlNext.addEventListener('click', () => {
      currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
      currentSeconds = 0;
      updatePlayerDisplay();
      if (!isPlaying) togglePlay();
    });
  }

  if (ctrlPrev) {
    ctrlPrev.addEventListener('click', () => {
      currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
      currentSeconds = 0;
      updatePlayerDisplay();
      if (!isPlaying) togglePlay();
    });
  }

  if (trackScrubber) {
    trackScrubber.addEventListener('input', (e) => {
      const track = playlist[currentTrackIndex];
      const newPercent = parseFloat(e.target.value);
      currentSeconds = Math.floor((newPercent / 100) * track.duration);
      updatePlayerDisplay();
    });
  }

  /* ==========================================================================
     5. Interactive Component: FAQ / Lore Accordion
     ========================================================================== */
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);

      // Close all other accordions for clean single-expand experience
      accordionTriggers.forEach(otherTrigger => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          const otherPanelId = otherTrigger.getAttribute('aria-controls');
          const otherPanel = document.getElementById(otherPanelId);
          if (otherPanel) otherPanel.hidden = true;
        }
      });

      // Toggle current panel
      trigger.setAttribute('aria-expanded', String(!isExpanded));
      if (panel) {
        panel.hidden = isExpanded;
      }
    });
  });

  /* ==========================================================================
     6. Liner Notes Modal Dialog
     ========================================================================== */
  const modalBackdrop = document.getElementById('track-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBodyContent = document.getElementById('modal-body-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalFooterClose = document.getElementById('modal-footer-close');
  const openModalButtons = document.querySelectorAll('.open-modal-btn');

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

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const trackKey = btn.getAttribute('data-track');
      openModal(trackKey);
    });
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
     7. Contact Form Validation & Submission
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
     8. Footer Dynamic Year
     ========================================================================== */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
