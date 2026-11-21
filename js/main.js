document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Dark / Light Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = themeToggle ? themeToggle.querySelector('.theme-label') : null;
  const savedTheme = localStorage.getItem('nm-theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    if (themeLabel) themeLabel.textContent = 'Light';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('nm-theme', isDark ? 'dark' : 'light');
      if (themeLabel) themeLabel.textContent = isDark ? 'Light' : 'Dark';
    });
  }

  // 3. Mobile Navigation Drawer
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // 4. Category Filter Tabs for Maps & Projects
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const match = category === 'all' || card.getAttribute('data-category') === category;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  // 5. Full-Screen Map Lightbox
  const lightbox = document.getElementById('mapLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg && lightboxCaption) {
    document.querySelectorAll('.project-img[data-lightbox-src]').forEach(frame => {
      frame.addEventListener('click', () => {
        lightboxImg.src = frame.getAttribute('data-lightbox-src');
        lightboxCaption.textContent = frame.getAttribute('data-lightbox-caption') || '';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  }

  // 6. Scroll Reveal Animation
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  reveals.forEach(el => observer.observe(el));
});