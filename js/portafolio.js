document.addEventListener('DOMContentLoaded', function () {

 const enlacesNav = document.querySelectorAll('a.nav-link, a.btn[href^="#"]');

    enlacesNav.forEach(function (enlace) {
        enlace.addEventListener('click', function (evento) {
            const href = this.getAttribute('href');

            if (href && href.startsWith('#')) {
                evento.preventDefault();

                const destino = document.querySelector(href);
                if (destino) {
                    const offset = 70;
                    const posicion = destino.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: posicion,
                        behavior: 'smooth'
                    });

                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        });
    });

    const navbar = document.getElementById('mainNav');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-shrink');
        } else {
            navbar.classList.remove('navbar-shrink');
        }
    });

    const formulario = document.getElementById('contactForm');

    if (formulario) {
        formulario.addEventListener('submit', function (evento) {
            evento.preventDefault();

            const nombre = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('message').value.trim();

            if (nombre === '' || email === '' || mensaje === '') {
                alert('Por favor, completa todos los campos.');
                return;
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            const boton = document.getElementById('submitButton');
            boton.disabled = true;
            boton.textContent = 'Enviando...';

            setTimeout(function () {
                alert('¡Mensaje enviado! Gracias por contactarme, ' + nombre + '.');
                formulario.reset();
                boton.disabled = false;
                boton.textContent = 'Enviar';
            }, 1500);
        });
    }

    const elementosAnimados = document.querySelectorAll('.skill-card, .portfolio-item');

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    elementosAnimados.forEach(function (elemento) {
        observer.observe(elemento);
    });

    const footer = document.querySelector('.footer');
    if (footer) {
        const añoActual = new Date().getFullYear();
        const copyright = document.createElement('p');
        copyright.className = 'text-muted small mt-4 mb-0';
        copyright.textContent = '© ' + añoActual + ' [Tu Nombre]. Todos los derechos reservados.';
        footer.querySelector('.container').appendChild(copyright);
    }

});