/* LÓGICA PARA EL MENÚ RESPONSIVE Y EFECTOS VISUALES */

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav');

    // 1. Menú desplegable para móviles
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            navToggle.classList.toggle('toggle-active');
        });
    }

    // 2. Cambio de estilo al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
            nav.style.padding = '1rem 0';
        } else {
            nav.style.boxShadow = 'none';
            nav.style.padding = '1.5rem 0';
        }
    });

    // 3. Cerrar menú al hacer clic en un enlace (móviles)
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            navToggle.classList.remove('toggle-active');
        });
    });
});
