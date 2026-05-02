// ── Menú hamburguesa ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }
});
