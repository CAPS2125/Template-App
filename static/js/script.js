// Navegación suave para enlaces internos
document.addEventListener('DOMContentLoaded', function() {
    // Navegación suave
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Menú hamburguesa para móviles
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Animación de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animateElements = document.querySelectorAll('.service-card, .gallery-item, .contact-item');
    animateElements.forEach(el => observer.observe(el));

    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validación básica
            if (!name || !email || !message) {
                showNotification('Por favor, completa todos los campos', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            // Simular envío
            showNotification('Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            this.reset();
        });
    }

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para mostrar notificaciones
    function showNotification(message, type) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Colores según el tipo
        if (type === 'success') {
            notification.style.background = '#000';
        } else {
            notification.style.background = '#e74c3c';
        }
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Mostrar notificación
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Ocultar después de 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Efecto parallax sutil en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Animación de contador para precios
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animatePrice(price);
                    observer.unobserve(price);
                }
            });
        });
        observer.observe(price);
    });

    function animatePrice(priceElement) {
        const text = priceElement.textContent;
        const number = text.match(/\$(\d+)/);
        
        if (number) {
            const targetNumber = parseInt(number[1]);
            let currentNumber = 0;
            const increment = targetNumber / 20;
            
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                    currentNumber = targetNumber;
                    clearInterval(timer);
                }
                
                priceElement.textContent = text.replace(/\$\d+/, `$${Math.floor(currentNumber)}`);
            }, 50);
        }
    }

    // Efecto hover en las tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Lazy loading para imágenes de galería (cuando se agreguen)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Aquí se puede implementar un lightbox para ver las imágenes
            console.log('Galería item clicked');
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #000;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // Funcionalidad del botón
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Efecto hover en el botón
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#333';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#000';
    });
});

// Agregar estilos CSS adicionales para animaciones
const additionalStyles = `
    .service-card, .gallery-item, .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card.animate-in, .gallery-item.animate-in, .contact-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 2rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex !important;
        }
    }
`;

// Insertar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Funcionalidad para formularios de autenticación y citas
document.addEventListener('DOMContentLoaded', function() {
    // Formulario de registro
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const fechaNacimiento = document.getElementById('fechaNacimiento').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terminos = document.getElementById('terminos').checked;
            
            // Validaciones
            if (!nombre || !email || !telefono || !fechaNacimiento || !password || !confirmPassword) {
                showNotification('Por favor, completa todos los campos obligatorios', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Las contraseñas no coinciden', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
                return;
            }
            
            if (!terminos) {
                showNotification('Debes aceptar los términos y condiciones', 'error');
                return;
            }
            
            // Simular registro exitoso
            showNotification('¡Registro exitoso! Bienvenido a nuestro salón', 'success');
            
            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }

    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validaciones básicas
            if (!email || !password) {
                showNotification('Por favor, completa todos los campos', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            // Simular login exitoso
            showNotification('¡Inicio de sesión exitoso! Redirigiendo...', 'success');
            
            // Redirigir a la página de citas después de 2 segundos
            setTimeout(() => {
                window.location.href = 'citas.html';
            }, 2000);
        });
    }

    // Formulario de citas
    const citaForm = document.getElementById('citaForm');
    if (citaForm) {
        citaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const servicio = document.getElementById('servicio').value;
            const especialista = document.getElementById('especialista').value;
            const fecha = document.getElementById('fecha').value;
            const hora = document.getElementById('hora').value;
            const duracion = document.getElementById('duracion').value;
            const notas = document.getElementById('notas').value;
            const confirmacion = document.getElementById('confirmacion').checked;
            
            // Validaciones
            if (!servicio || !fecha || !hora || !duracion) {
                showNotification('Por favor, completa todos los campos obligatorios', 'error');
                return;
            }
            
            if (!confirmacion) {
                showNotification('Debes aceptar la política de cancelación', 'error');
                return;
            }
            
            // Validar que la fecha no sea anterior a hoy
            const fechaSeleccionada = new Date(fecha);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            
            if (fechaSeleccionada < hoy) {
                showNotification('No puedes agendar citas en fechas pasadas', 'error');
                return;
            }
            
            // Simular agendamiento exitoso
            showNotification('¡Cita agendada con éxito! Te enviaremos una confirmación por email', 'success');
            
            // Limpiar formulario
            citaForm.reset();
        });

        // Configurar fecha mínima (hoy)
        const fechaInput = document.getElementById('fecha');
        if (fechaInput) {
            const hoy = new Date().toISOString().split('T')[0];
            fechaInput.min = hoy;
        }

        // Actualizar duración según el servicio seleccionado
        const servicioSelect = document.getElementById('servicio');
        const duracionSelect = document.getElementById('duracion');
        
        if (servicioSelect && duracionSelect) {
            servicioSelect.addEventListener('change', function() {
                const servicio = this.value;
                let duracionRecomendada = '';
                
                switch(servicio) {
                    case 'corte':
                        duracionRecomendada = '60';
                        break;
                    case 'peinado':
                        duracionRecomendada = '90';
                        break;
                    case 'unas':
                        duracionRecomendada = '60';
                        break;
                    case 'coloracion':
                        duracionRecomendada = '180';
                        break;
                    case 'tratamiento':
                        duracionRecomendada = '120';
                        break;
                    case 'maquillaje':
                        duracionRecomendada = '90';
                        break;
                }
                
                if (duracionRecomendada) {
                    duracionSelect.value = duracionRecomendada;
                }
            });
        }
    }

    // Validación de contraseña en tiempo real
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (passwordInput && confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const password = passwordInput.value;
            const confirmPassword = this.value;
            
            if (password !== confirmPassword && confirmPassword.length > 0) {
                this.style.borderColor = '#e74c3c';
                this.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
            } else {
                this.style.borderColor = '#e0e0e0';
                this.style.boxShadow = 'none';
            }
        });
    }

    // Validación de teléfono
    const telefonoInput = document.getElementById('telefono');
    if (telefonoInput) {
        telefonoInput.addEventListener('input', function() {
            // Solo permitir números y algunos caracteres especiales
            this.value = this.value.replace(/[^0-9+\-\(\)\s]/g, '');
        });
    }

    // Mostrar/ocultar contraseña
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            
            const icon = this.querySelector('i');
            icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        });
    });
});
