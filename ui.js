import { initPortfolio } from './portfolio.js';

const menu = document.getElementById('menu');
const menuOpenBtn = document.getElementById('menu-open');
const menuCloseBtn = document.getElementById('menu-close');
const menuBackdrop = document.getElementById('menu-backdrop');
const menuLinks = document.querySelectorAll('.menu__link');
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

function setMenu(open) {
  if (!menu || !menuOpenBtn) return;

  if (open) {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    menuOpenBtn.setAttribute('aria-expanded', 'true');
    if (menuCloseBtn) {
      menuCloseBtn.focus({ preventScroll: true });
    }
    document.body.style.overflow = 'hidden';
  } else {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menuOpenBtn.setAttribute('aria-expanded', 'false');
    menuOpenBtn.focus({ preventScroll: true });
    document.body.style.overflow = '';
  }
}

if (menuOpenBtn) {
  menuOpenBtn.addEventListener('click', () => setMenu(true));
}

if (menuCloseBtn) {
  menuCloseBtn.addEventListener('click', () => setMenu(false));
}

if (menuBackdrop) {
  menuBackdrop.addEventListener('click', () => setMenu(false));
}

menuLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    setMenu(false);
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (href === '#contact' || href === '#lets-work') {
          setTimeout(() => {
            const nameInput = document.getElementById('name');
            if (nameInput) nameInput.focus({ preventScroll: true });
          }, 500);
        }
      }
    }
  });
});

// Top bar and in-page "Let's work" / contact link handlers
const letsWorkLinks = document.querySelectorAll('a[href="#contact"], a[href="#lets-work"]');
letsWorkLinks.forEach((link) => {
  // If it's already a menuLink, the above handler handles menu closing
  if (!link.classList.contains('menu__link')) {
    link.addEventListener('click', (e) => {
      const target = document.getElementById('contact');
      if (target) {
        e.preventDefault();
        setMenu(false);
        target.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '#contact');
        setTimeout(() => {
          const nameInput = document.getElementById('name');
          if (nameInput) nameInput.focus({ preventScroll: true });
        }, 500);
      }
    });
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu && menu.classList.contains('is-open')) {
    setMenu(false);
  }
});

// Contact Form Handler
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn ? btn.innerHTML : 'Send Message';
    
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Transmitting...';
    }

    setTimeout(() => {
      contactForm.reset();
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
      if (contactSuccess) {
        contactSuccess.style.display = 'block';
        contactSuccess.setAttribute('aria-live', 'polite');
        setTimeout(() => {
          contactSuccess.style.display = 'none';
        }, 5000);
      }
    }, 800);
  });
}

// Initialize portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
});

// Fallback if DOM is already loaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initPortfolio();
}
