// Minimalist Portfolio JavaScript
// Implements all interactive quirks as described

// 1. Smooth Scrolling for nav links and hero button
function enableSmoothScroll() {
  const links = document.querySelectorAll('a.nav-link, #view-work-btn');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      let targetId;
      if (this.id === 'view-work-btn') {
        targetId = 'projects';
      } else {
        targetId = this.getAttribute('href').slice(1);
      }
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// 2. Highlight active nav link on scroll
function highlightNavOnScroll() {
  const sections = document.querySelectorAll('section.section');
  const navLinks = document.querySelectorAll('a.nav-link');
  function onScroll() {
    let scrollPos = window.scrollY + 100; // Offset for header
    let currentId = '';
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll(); // Initial call
}

// 3. Subtle hover effect on project cards (JS-driven)
function enableProjectCardHover() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 4px 24px rgba(0, 119, 255, 0.10)';
      card.style.borderColor = 'var(--accent)';
      card.style.background = '#f0f6ff';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
      card.style.borderColor = '';
      card.style.background = '';
    });
  });
}

// 4. Contact form validation
function enableContactFormValidation() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    let valid = true;
    // Name
    const name = form.name.value.trim();
    const nameError = document.getElementById('name-error');
    if (!name) {
      nameError.textContent = 'Name is required.';
      valid = false;
    } else {
      nameError.textContent = '';
    }
    // Email
    const email = form.email.value.trim();
    const emailError = document.getElementById('email-error');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      emailError.textContent = 'Email is required.';
      valid = false;
    } else if (!emailPattern.test(email)) {
      emailError.textContent = 'Enter a valid email.';
      valid = false;
    } else {
      emailError.textContent = '';
    }
    // Message
    const message = form.message.value.trim();
    const messageError = document.getElementById('message-error');
    if (!message) {
      messageError.textContent = 'Message is required.';
      valid = false;
    } else {
      messageError.textContent = '';
    }
    if (!valid) {
      e.preventDefault();
    }
  });
}

// 5. Dynamic current year and last updated date in footer
function updateFooterDates() {
  const yearSpan = document.getElementById('current-year');
  const updatedSpan = document.getElementById('last-updated');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  if (updatedSpan) {
    const now = new Date();
    updatedSpan.textContent = `Last updated: ${now.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}`;
  }
}

// 6. Custom mouse cursor effect (updated: minimal accent ring)
function enableCustomCursor() {
  // Create cursor element
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  document.body.appendChild(cursor);

  // Style is now handled by CSS

  // Move cursor
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Interactive elements
  const interactiveSelectors = 'a, button, .project-split-card, input, textarea, label';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      document.body.setAttribute('data-cursor-hover', 'true');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      document.body.removeAttribute('data-cursor-hover');
    }
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
}

// 7. Animate headings and cards on scroll (fade/slide in)
function animateOnScroll() {
  const fadeUpEls = document.querySelectorAll('#about h2, #projects h2, #contact h2, #hero h2');
  const fadeInEls = document.querySelectorAll('.project-card');

  fadeUpEls.forEach(el => {
    el.classList.add('fade-in-up');
  });
  fadeInEls.forEach(el => {
    el.classList.add('fade-in');
  });

  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = '0.1s';
        entry.target.classList.add('animated');
        entry.target.style.opacity = 1;
      }
    });
  }, { threshold: 0.2 });

  fadeUpEls.forEach(el => observer.observe(el));
  fadeInEls.forEach((el, i) => {
    el.style.animationDelay = `${0.1 + i * 0.08}s`;
    observer.observe(el);
  });
}

// 8. Dark/Light mode toggle
function enableDarkModeToggle() {
  const toggleBtn = document.getElementById('mode-toggle');
  const icon = toggleBtn.querySelector('.mode-icon');
  const html = document.documentElement;
  // Set initial mode from localStorage or system
  const userPref = localStorage.getItem('theme');
  const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  function setTheme(mode) {
    html.setAttribute('data-theme', mode);
    icon.textContent = mode === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', mode);
  }
  setTheme(userPref || systemPref);
  toggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// 9. Mobile nav toggle
function enableMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!navToggle || !navContainer) return;
  navToggle.addEventListener('click', () => {
    navContainer.classList.toggle('nav-open');
  });
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navContainer.classList.remove('nav-open');
    });
  });
}

// Initialize all features on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  enableDarkModeToggle();
  enableMobileNav();
  enableSmoothScroll();
  highlightNavOnScroll();
  enableProjectCardHover();
  enableContactFormValidation();
  updateFooterDates();
  enableCustomCursor(); // Bonus: custom cursor
  animateOnScroll(); // Animate headings/cards
}); 