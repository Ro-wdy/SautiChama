/* app.js — UI interactions for Sauti-Chama */
'use strict';

(() => {
  // Short helper for document.querySelector
  const $ = (s) => document.querySelector(s);

  document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = $('#mobileToggle');
    const siteLinks = $('#site-links');
    const voiceBtn = $('#voice-demo-btn');
    const contactForm = $('#contactForm');
    const contactMsg = $('#contactMsg');

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Close mobile menu if open
        if (siteLinks && siteLinks.classList.contains('show')) {
          siteLinks.classList.remove('show');
          if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Mobile menu toggle
    if (mobileToggle && siteLinks) {
      mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
        siteLinks.classList.toggle('show');
      });
    }

    // Close mobile menu with Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteLinks && siteLinks.classList.contains('show')) {
        siteLinks.classList.remove('show');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Voice demo (Text-to-Speech)
    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        const tts = window.speechSynthesis;
        if (!tts) {
          alert('Text-to-Speech is not supported in this browser.');
          return;
        }
        if (tts.speaking) tts.cancel();
        const demoText = "Sauti-Chama voice verification demo. This sample simulates a confirmation by the member saying: 'I confirm the withdrawal of eight thousand shillings'.";
        const u = new SpeechSynthesisUtterance(demoText);
        u.lang = 'en-GB';
        u.pitch = 1;
        u.rate = 0.95;
        tts.speak(u);
      });
    }

    // Contact form handling
    if (contactForm) {
      contactForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const name = (document.getElementById('name')?.value || '').trim();
        const phone = (document.getElementById('phone')?.value || '').trim();
        const message = (document.getElementById('message')?.value || '').trim();
        if (!name || !phone || !message) {
          if (contactMsg) {
            contactMsg.style.display = 'block';
            contactMsg.style.color = 'crimson';
            contactMsg.textContent = 'Please fill all fields before sending.';
          } else {
            alert('Please fill all fields before sending.');
          }
          return;
        }
        if (contactMsg) {
          contactMsg.style.display = 'block';
          contactMsg.textContent = 'Sending...';
        }
        setTimeout(() => {
          if (contactMsg) {
            contactMsg.style.color = '#0b6b3a';
            contactMsg.textContent = `Thank you, ${name.split(' ')[0] || name}! Your demo request has been submitted.`;
          }
          contactForm.reset();
        }, 650);
      });
    }
  });
})();
/* app.js — UI interactions for Sauti-Chama */
'use strict';

(() => {
  // Helper: safe query
  const $ = (sel) => document.querySelector(sel);

  document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = $('#mobileToggle');
    const siteLinks = $('#site-links');
    const voiceBtn = $('#voice-demo-btn');
    const contactForm = $('#contactForm');
    const contactMsg = $('#contactMsg');

    // Smooth scroll for internal anchors
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (siteLinks && siteLinks.classList.contains('show')) {
          siteLinks.classList.remove('show');
          if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Mobile toggle
    if (mobileToggle && siteLinks) {
      mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
        siteLinks.classList.toggle('show');
      });
    }

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteLinks && siteLinks.classList.contains('show')) {
        siteLinks.classList.remove('show');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Voice demo
    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        const tts = window.speechSynthesis;
        if (!tts) {
          alert('Text-to-Speech is not supported in this browser.');
          return;
        }
        if (tts.speaking) tts.cancel();
        const demoText = "Sauti-Chama voice verification demo. This sample simulates a confirmation by the member saying: 'I confirm the withdrawal of eight thousand shillings'.";
        const utterance = new SpeechSynthesisUtterance(demoText);
        utterance.lang = 'en-GB';
        utterance.pitch = 1;
        utterance.rate = 0.95;
        tts.speak(utterance);
      });
    }

    // Contact form
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (document.getElementById('name')?.value || '').trim();
        const phone = (document.getElementById('phone')?.value || '').trim();
        const message = (document.getElementById('message')?.value || '').trim();

        if (!name || !phone || !message) {
          if (contactMsg) {
            contactMsg.style.display = 'block';
            contactMsg.style.color = 'crimson';
            contactMsg.textContent = 'Please fill all fields before sending.';
          } else {
            alert('Please fill in all fields.');
          }
          return;
        }

        if (contactMsg) {
          contactMsg.style.display = 'block';
          contactMsg.style.color = 'var(--green-700)';
          contactMsg.textContent = 'Sending...';
        }

        setTimeout(() => {
          if (contactMsg) {
            contactMsg.style.color = '#0b6b3a';
            contactMsg.textContent = `Thank you, ${name.split(' ')[0] || name}! Your demo request has been submitted.`;
          }
          contactForm.reset();
        }, 650);
      });
    }
  });
})();
/* app.js — UI interactions for Sauti-Chama */
'use strict';

(function () {
  // Wait until DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const mobileToggle = document.getElementById('mobileToggle');
    const siteLinks = document.getElementById('site-links');
    const voiceBtn = document.getElementById('voice-demo-btn');
    const contactForm = document.getElementById('contactForm');
    const contactMsg = document.getElementById('contactMsg');

    // Smooth scroll for anchor links (internal page links starting with '#')
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // If there is a valid target, smoothly scroll
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Close mobile menu if open
        if (siteLinks && siteLinks.classList.contains('show')) {
          siteLinks.classList.remove('show');
          if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Mobile menu toggle
    if (mobileToggle && siteLinks) {
      mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
        siteLinks.classList.toggle('show');
      });
    }

    // Close mobile menu with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteLinks && siteLinks.classList.contains('show')) {
        siteLinks.classList.remove('show');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Voice demo (Text-to-Speech)
    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        const tts = window.speechSynthesis;
        if (!tts) {
          // Fall back gracefully if speech synthesis is not available
          alert('Text-to-Speech is not supported in this browser.');
          return;
        }
        // Stop current speech if any
        if (tts.speaking) tts.cancel();

        const demoText = "Sauti-Chama voice verification demo. This sample simulates a confirmation by the member saying: 'I confirm the withdrawal of eight thousand shillings'.";
        const utterance = new SpeechSynthesisUtterance(demoText);
        utterance.lang = 'en-GB';
        utterance.pitch = 1;
        utterance.rate = 0.95;
        tts.speak(utterance);
      });
    }

    // Contact form handling (client-side only)
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameEl = document.getElementById('name');
        const phoneEl = document.getElementById('phone');
        const messageEl = document.getElementById('message');

        const name = nameEl ? nameEl.value.trim() : '';
        const phone = phoneEl ? phoneEl.value.trim() : '';
        const message = messageEl ? messageEl.value.trim() : '';

        if (!name || !phone || !message) {
          if (contactMsg) {
            contactMsg.style.display = 'block';
            contactMsg.style.color = 'crimson';
            contactMsg.textContent = 'Please fill all fields before sending.';
          } else {
            alert('Please fill all fields before sending.');
          }
          return;
        }

        // Simulate submission and show a friendly message
        if (contactMsg) {
          contactMsg.style.display = 'block';
          contactMsg.style.color = 'var(--green-700)';
          contactMsg.textContent = 'Sending...';
        }

        setTimeout(() => {
          if (contactMsg) {
            // Use only simple text for color; some browsers may not resolve CSS var() when used for inline style
            contactMsg.style.color = '#0b6b3a';
            contactMsg.textContent = `Thank you, ${name.split(' ')[0] || name}! Your demo request has been submitted. We will reach out shortly.`;
          }
          contactForm.reset();
        }, 650);
      });
    }
  });
})();

/* app.js — UI interactions for Sauti-Chama */
'use strict';

(function () {
  // Wait until DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const mobileToggle = document.getElementById('mobileToggle');
    const siteLinks = document.getElementById('site-links');
    const voiceBtn = document.getElementById('voice-demo-btn');
    const contactForm = document.getElementById('contactForm');
    const contactMsg = document.getElementById('contactMsg');

    // Smooth scroll for anchor links (internal page links starting with '#')
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // If there is a valid target, smoothly scroll
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Close mobile menu if open
        if (siteLinks && siteLinks.classList.contains('show')) {
          siteLinks.classList.remove('show');
          if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Mobile menu toggle
    if (mobileToggle && siteLinks) {
      mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
        siteLinks.classList.toggle('show');
      });
    }

    // Close mobile menu with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteLinks && siteLinks.classList.contains('show')) {
        siteLinks.classList.remove('show');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Voice demo (Text-to-Speech)
    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        const tts = window.speechSynthesis;
        if (!tts) {
          // Fall back gracefully if speech synthesis is not available
          alert('Text-to-Speech is not supported in this browser.');
          return;
        }
        // Stop current speech if any
        if (tts.speaking) tts.cancel();

        const demoText = "Sauti-Chama voice verification demo. This sample simulates a confirmation by the member saying: 'I confirm the withdrawal of eight thousand shillings'.";
        const utterance = new SpeechSynthesisUtterance(demoText);
        utterance.lang = 'en-GB';
        utterance.pitch = 1;
        utterance.rate = 0.95;
        tts.speak(utterance);
      });
    }

    // Contact form handling (client-side only)
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameEl = document.getElementById('name');
        const phoneEl = document.getElementById('phone');
        const messageEl = document.getElementById('message');

        const name = nameEl ? nameEl.value.trim() : '';
        const phone = phoneEl ? phoneEl.value.trim() : '';
        const message = messageEl ? messageEl.value.trim() : '';

        if (!name || !phone || !message) {
          if (contactMsg) {
            contactMsg.style.display = 'block';
            contactMsg.style.color = 'crimson';
            contactMsg.textContent = 'Please fill all fields before sending.';
          } else {
            alert('Please fill all fields before sending.');
          }
          return;
        }

        // Simulate submission and show a friendly message
        if (contactMsg) {
          contactMsg.style.display = 'block';
          contactMsg.style.color = 'var(--green-700)';
          contactMsg.textContent = 'Sending...';
        }

        setTimeout(() => {
          if (contactMsg) {
            // Use only simple text for color; some browsers may not resolve CSS var() when used for inline style
            contactMsg.style.color = '#0b6b3a';
            contactMsg.textContent = `Thank you, ${name.split(' ')[0] || name}! Your demo request has been submitted. We will reach out shortly.`;
          }
          contactForm.reset();
        }, 650);
      });
    }
  });
})();
