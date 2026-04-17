// ==========================================
// CHRIS STYLIANOPOULOS — PORTFOLIO
// main.js
// ==========================================

// --- NAV SCROLL ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// --- MOBILE MENU ---
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

toggle.addEventListener('click', () => {
  menu.classList.toggle('open');
  // animate hamburger to X
  const spans = toggle.querySelectorAll('span');
  if (menu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    const spans = toggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// --- SCROLL REVEAL ---
const revealEls = document.querySelectorAll('.reveal, .reveal-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger reveal-cards if siblings
      const card = entry.target;
      const siblings = card.parentElement
        ? [...card.parentElement.querySelectorAll('.reveal-card')]
        : [];
      const idx = siblings.indexOf(card);
      if (idx > -1) {
        card.style.transitionDelay = `${idx * 0.1}s`;
      }
      card.classList.add('visible');
      observer.unobserve(card);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => observer.observe(el));

// --- HERO auto-reveal on load ---
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
  });
});

// --- ACTIVE NAV LINK on scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--accent)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
