const sections = document.querySelectorAll('.section-animate');
const navLinks = document.querySelectorAll('nav a');
const menuButton = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');

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
