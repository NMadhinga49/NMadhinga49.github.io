// 1. Dynamic footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 2. Dark / Light Theme Switcher with persistence
const themeToggle = document.getElementById('themeToggle');
const themeLabel = themeToggle?.querySelector('.theme-label');
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  if (themeLabel) themeLabel.textContent = 'Light';
}

themeToggle?.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('portfolio-theme', 'light');
    if (themeLabel) themeLabel.textContent = 'Dark';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('portfolio-theme', 'dark');
    if (themeLabel) themeLabel.textContent = 'Light';
  }
});

// 3. Mobile Navigation Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// 4. Subtle Scroll Reveal Animation
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach(section => observer.observe(section));