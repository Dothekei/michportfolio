/* ============================================================
   script.js — Michelle Arsobal Portfolio
   ============================================================ */
(function () {
  'use strict';

  /* ── Navbar ──────────────────────────────────────── */
  const navbar     = document.getElementById('navbar');
  const navToggle  = document.getElementById('navToggle');
  const navLinks   = document.getElementById('navLinks');
  const allLinks   = document.querySelectorAll('.nav-link');

  // Scrolled shadow
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    toggleBackToTop();
    highlightNavLink();
  }, { passive: true });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click (mobile)
  allLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  /* ── Active navbar highlight ─────────────────────── */
  const sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop    = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        current = section.getAttribute('id');
      }
    });
    allLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  /* ── Scroll reveal ───────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Modal system ────────────────────────────────── */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose   = document.getElementById('modalClose');
  const modalTitle   = document.getElementById('modalTitle');
  const modalImg     = document.getElementById('modalImg');

  function openModal(imgSrc, title) {
    modalImg.src   = imgSrc;
    modalImg.alt   = title;
    modalTitle.textContent = title;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    // Clear src after transition so old image doesn't flash
    setTimeout(() => { modalImg.src = ''; }, 300);
  }

  // Trigger buttons
  document.querySelectorAll('.modal-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const img   = btn.dataset.img;
      const title = btn.dataset.title || '';
      openModal(img, title);
    });
  });

  // Close button
  modalClose.addEventListener('click', closeModal);

  // Click outside modal box
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  /* ── Back to top ─────────────────────────────────── */
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Smooth scroll for anchor links ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Init ────────────────────────────────────────── */
  highlightNavLink();
  toggleBackToTop();

})();
