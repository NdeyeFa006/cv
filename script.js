const sections = document.querySelectorAll('.section-animate');
const navLinks = document.querySelectorAll('nav a');
const menuButton = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');

// Page-load animations: split name into letters and stagger animations
document.addEventListener('DOMContentLoaded', () => {
  const nameEl = document.querySelector('.name');
  if (nameEl) {
    const letters = nameEl.textContent.trim().split('');
    nameEl.textContent = '';
    letters.forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      nameEl.appendChild(span);
      setTimeout(() => span.classList.add('visible'), 80 * i);
    });
  }

  // Stagger nav link entrance
  navLinks.forEach((link, i) => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(-8px)';
    link.style.transition = 'transform 420ms cubic-bezier(.2,.8,.2,1), opacity 420ms ease';
    setTimeout(() => { link.style.opacity = '1'; link.style.transform = 'translateY(0)'; }, 300 + i * 80);
  });

  // Slight entrance for profile card
  const profileCard = document.querySelector('.profile-card');
  if (profileCard) {
    profileCard.style.opacity = '0';
    profileCard.style.transform = 'translateY(18px)';
    setTimeout(() => { profileCard.style.opacity = '1'; profileCard.style.transform = 'translateY(0)'; }, 700);
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const sectionId = entry.target.id;
      if (sectionId) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    }
  });
}, {
  threshold: 0.2,
});

sections.forEach(section => observer.observe(section));

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open');
});

window.addEventListener('click', (event) => {
  if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
    nav.classList.remove('open');
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});
