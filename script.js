/* =============================================
   MICHELLE ARSOBAL — PORTFOLIO JS
   ============================================= */

'use strict';

/* ── NAVBAR SCROLL EFFECT ── */
const navbar  = document.getElementById('navbar');
const navProgress = document.getElementById('scrollProgress');

function updateNavbar() {
  const scrolled = window.scrollY > 40;
  navbar.classList.toggle('scrolled', scrolled);
}

/* ── SCROLL PROGRESS BAR ── */
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress  = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  navProgress.style.width = progress + '%';
}

/* ── MOBILE NAV TOGGLE ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navToggle.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

/* ── SMOOTH SCROLLING (for CTA / logo links) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── BACK TO TOP ── */
const backTopBtn = document.getElementById('backTopBtn');
if (backTopBtn) {
  backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── REVEAL ON SCROLL ── */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── IMAGE / WORK MODAL ── */
const imageModal = document.getElementById('imageModal');
const modalImg   = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');

function openModal(src, title) {
  modalImg.src = src;
  modalImg.alt = title || '';
  modalTitle.textContent = title || '';
  imageModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  imageModal.classList.remove('active');
  document.body.style.overflow = '';
  modalImg.src = '';
}

// Work cards — click to open modal
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', () => {
    const src   = card.dataset.img;
    const title = card.dataset.title;
    if (src) openModal(src, title);
  });
  // Keyboard accessibility
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// Certificate buttons — click to open modal
document.querySelectorAll('.cert-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const src   = btn.dataset.img;
    const title = btn.dataset.title;
    if (src) openModal(src, title);
  });
});

// Close button
modalClose.addEventListener('click', closeModal);

// Click outside inner to close
imageModal.addEventListener('click', (e) => {
  if (e.target === imageModal) closeModal();
});

// ESC key to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && imageModal.classList.contains('active')) closeModal();
});

/* ── LAZY LOADING FALLBACK (for browsers without native lazy) ── */
if ('IntersectionObserver' in window) {
  const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        lazyObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  lazyImgs.forEach(img => lazyObserver.observe(img));
}

/* ── ACTIVE NAV LINK HIGHLIGHT ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function highlightNav() {
  let current = '';
  sections.forEach(sec => {
    const top    = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    if (window.scrollY >= top && window.scrollY < top + height) {
      current = sec.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--accent)';
    }
  });
}

/* ── SCROLL EVENT AGGREGATOR ── */
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateNavbar();
      updateProgress();
      highlightNav();
      ticking = false;
    });
    ticking = true;
  }
});

/* ── INIT ── */
updateNavbar();
updateProgress();
highlightNav();
