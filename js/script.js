
    // Theme toggle functionality
    function toggleTheme() {
        const body = document.body;
        const themeToggle = document.querySelector('.theme-toggle i');
        const navbar = document.querySelector('.navbar');
        
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            themeToggle.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
            // Update navbar background for light mode
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggle.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
            // Update navbar background for dark mode
            navbar.style.background = 'rgba(17, 24, 39, 0.95)';
        }
    }

    // Initialize theme
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const themeToggle = document.querySelector('.theme-toggle i');
        const navbar = document.querySelector('.navbar');
        
        // CAMBIO: Invertir la lógica - modo oscuro por defecto
        if (savedTheme === 'light') {
            // Solo modo claro si está guardado explícitamente
            document.body.removeAttribute('data-theme');
            themeToggle.className = 'fas fa-moon';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            // Modo oscuro por defecto (sin preferencia guardada o guardado como 'dark')
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.className = 'fas fa-sun';
            navbar.style.background = 'rgba(17, 24, 39, 0.95)';
            
            // Opcional: guardar la preferencia por defecto
            if (!savedTheme) {
                localStorage.setItem('theme', 'dark');
            }
        }
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        
        if (window.scrollY > 50) {
            if (isDark) {
                navbar.style.background = 'rgba(17, 24, 39, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            if (isDark) {
                navbar.style.background = 'rgba(17, 24, 39, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            navbar.style.boxShadow = 'none';
        }
    });

    // Form submission handler
    function handleSubmit(event) {
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link
        const mailtoLink = `mailto:lucharnoxview@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`)}`;
        
        // Open mail client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('¡Gracias por tu mensaje! Se abrirá tu cliente de correo para enviar el mensaje.');
        
        // Reset form
        event.target.reset();
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        
        // Animate skill cards
        document.querySelectorAll('.skill-category').forEach(card => {
            observer.observe(card);
        });
        
        // Animate project cards
        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });
        
        // Add loading animation to images
        document.querySelectorAll('img').forEach(img => {
            img.classList.add('loading');
            img.addEventListener('load', () => {
                img.classList.remove('loading');
            });
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add typing animation to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Mobile menu toggle (for future implementation)
    function toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    }

    // Add floating action button for quick contact
    function createFloatingButton() {
        const floatingBtn = document.createElement('div');
        floatingBtn.innerHTML = '<i class="fas fa-comments"></i>';
        floatingBtn.className = 'floating-btn';
        floatingBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 60px;
            height: 60px;
            background: var(--gradient-primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        floatingBtn.addEventListener('click', () => {
            document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
        });
        
        floatingBtn.addEventListener('mouseenter', () => {
            floatingBtn.style.transform = 'scale(1.1)';
        });
        
        floatingBtn.addEventListener('mouseleave', () => {
            floatingBtn.style.transform = 'scale(1)';
        });
        
        document.body.appendChild(floatingBtn);
    }

    // Initialize floating button
    document.addEventListener('DOMContentLoaded', () => {
        createFloatingButton();
    });

    // Add scroll to top functionality
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        const scrollBtn = document.querySelector('.scroll-top');
        if (window.pageYOffset > 300) {
            if (scrollBtn) scrollBtn.style.display = 'flex';
        } else {
            if (scrollBtn) scrollBtn.style.display = 'none';
        }
    });

    // Add Easter egg - Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });

    // Add rainbow animation for easter egg
    const rainbowKeyframes = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = rainbowKeyframes;
    document.head.appendChild(styleSheet);


//--------------------------------------------------------- Temperatura --------------------------------------------------------->

    async function updateNavbarTemperature() {
        const apiKey = 'f366fc991c319b46e080bf1fe44b7761';
        const ciudad = 'Corrientes,AR';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            const data = await response.json();
            document.getElementById('navbar-temperature').textContent = Math.round(data.main.temp);
        } catch (error) {
            document.getElementById('navbar-temperature').textContent = 'N/D';
            console.error('Error al obtener la temperatura:', error);
        }
    }

    // Ejecutar al cargar y cada 5 minutos (300000 ms)
    document.addEventListener('DOMContentLoaded', updateNavbarTemperature);
    setInterval(updateNavbarTemperature, 300000);


//--------------------------------------------------------- Ventana Carrusell --------------------------------------------------------->

    // Variables globales para el carrusel
    let currentImages = [];
    let currentIndex = 0;

    // Función para abrir el modal con contenido dinámico
    function openModal(images, title, subtitle) {
        const modal = document.getElementById('certificateModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalSubtitle = document.getElementById('modalSubtitle');
        
        // Asegurar que images sea un array
        currentImages = Array.isArray(images) ? images : [images];
        currentIndex = 0;
        
        // DEBUG: Verificar que las imágenes existan
        console.log('🎠 Imágenes a cargar:', currentImages);
        
        // Verificar cada imagen antes de generar el carrusel
        let loadedCount = 0;
        const totalImages = currentImages.length;
        
        currentImages.forEach((src, index) => {
            const testImg = new Image();
            testImg.onload = function() {
                console.log(`✅ Imagen ${index + 1} cargada: ${src} (${this.naturalWidth}x${this.naturalHeight})`);
                loadedCount++;
                if (loadedCount === totalImages) {
                    console.log('🎯 Todas las imágenes verificadas, generando carrusel...');
                }
            };
            testImg.onerror = function() {
                console.error(`❌ Error cargando imagen ${index + 1}: ${src}`);
                loadedCount++;
            };
            testImg.src = src;
        });
        
        // Actualizar contenido del modal
        modalTitle.textContent = title;
        modalSubtitle.textContent = subtitle;
        
        // Generar el carrusel
        generateCarousel();
        
        // Mostrar/ocultar controles según cantidad de imágenes
        const modalContent = modal.querySelector('.modal-content');
        if (currentImages.length === 1) {
            modalContent.classList.add('single-image');
        } else {
            modalContent.classList.remove('single-image');
        }
        
        // Mostrar modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Función para generar el carrusel - VERSIÓN MEJORADA
    function generateCarousel() {
        const carouselTrack = document.getElementById('carouselTrack');
        const indicatorsContainer = document.getElementById('carouselIndicators');
        const totalSlides = document.getElementById('totalSlides');
        
        // Limpiar contenido previo
        carouselTrack.innerHTML = '';
        indicatorsContainer.innerHTML = '';
        
        // Establecer propiedades del track
        const trackWidth = currentImages.length * 100;
        carouselTrack.style.width = `${trackWidth}%`;
        carouselTrack.style.display = 'flex';
        carouselTrack.style.position = 'relative';
        
        console.log(`🎠 Generando carrusel con ${currentImages.length} imágenes`);
        console.log(`📏 Ancho del track: ${trackWidth}%`);
        
        // Generar imágenes con mejor posicionamiento
        currentImages.forEach((imageSrc, index) => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'image-container';
            imgContainer.style.width = `${100 / currentImages.length}%`;
            imgContainer.style.position = 'relative';
            imgContainer.style.flexShrink = '0';
            imgContainer.style.display = 'flex';
            imgContainer.style.alignItems = 'center';
            imgContainer.style.justifyContent = 'center';
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `Certificado ${index + 1}`;
            img.className = 'certificate-image';
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '70vh';
            img.style.objectFit = 'contain';
            img.style.borderRadius = '12px';
            
            // Eventos de carga mejorados
            img.onload = function() {
                console.log(`✅ Imagen ${index + 1} renderizada: ${imageSrc}`);
                console.log(`📐 Dimensiones: ${this.naturalWidth}x${this.naturalHeight}`);
            };
            
            img.onerror = function() {
                console.error(`❌ Error renderizando imagen ${index + 1}: ${imageSrc}`);
                // Crear placeholder visual
                const placeholder = document.createElement('div');
                placeholder.style.width = '100%';
                placeholder.style.height = '300px';
                placeholder.style.backgroundColor = '#f5f5f5';
                placeholder.style.border = '2px dashed #ccc';
                placeholder.style.borderRadius = '12px';
                placeholder.style.display = 'flex';
                placeholder.style.alignItems = 'center';
                placeholder.style.justifyContent = 'center';
                placeholder.style.color = '#999';
                placeholder.style.fontSize = '16px';
                placeholder.textContent = `Imagen ${index + 1} no encontrada`;
                
                imgContainer.appendChild(placeholder);
                return;
            };
            
            imgContainer.appendChild(img);
            carouselTrack.appendChild(imgContainer);
        });
        
        // Generar indicadores
        currentImages.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.onclick = () => goToSlide(index);
            if (index === 0) indicator.classList.add('active');
            indicatorsContainer.appendChild(indicator);
        });
        
        // Actualizar contador
        totalSlides.textContent = currentImages.length;
        updateSlideCounter();
        updateNavigationButtons();
        
        // Posicionar en la primera imagen
        updateCarousel();
    }

    // Función para cambiar slide
    function changeSlide(direction) {
        const newIndex = currentIndex + direction;
        
        // Validar límites
        if (newIndex >= 0 && newIndex < currentImages.length) {
            currentIndex = newIndex;
            updateCarousel();
        }
    }

    // Función para ir a un slide específico
    function goToSlide(index) {
        if (index >= 0 && index < currentImages.length) {
            currentIndex = index;
            updateCarousel();
        }
    }

    // Función para actualizar el carrusel - MEJORADA
    function updateCarousel() {
        const carouselTrack = document.getElementById('carouselTrack');
        const indicators = document.querySelectorAll('.carousel-indicator');
        
        // Calcular desplazamiento
        const translateX = -currentIndex * (100 / currentImages.length);
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        carouselTrack.style.transition = 'transform 0.3s ease-in-out';
        
        console.log(`🎯 Moviendo a slide ${currentIndex + 1}, translateX: ${translateX}%`);
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Actualizar contador y botones
        updateSlideCounter();
        updateNavigationButtons();
    }

    // Función para actualizar el contador de slides
    function updateSlideCounter() {
        const currentSlide = document.getElementById('currentSlide');
        currentSlide.textContent = currentIndex + 1;
    }

    // Función para actualizar botones de navegación
    function updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === currentImages.length - 1;
    }

    // Función para cerrar el modal
    function closeModal() {
        document.getElementById('certificateModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Resetear variables
        currentImages = [];
        currentIndex = 0;
    }

    // Event listeners
    window.onclick = function(event) {
        const modal = document.getElementById('certificateModal');
        if (event.target == modal) {
            closeModal();
        }
    };

    // Event listeners para teclado
    document.addEventListener('keydown', function(event) {
        const modal = document.getElementById('certificateModal');
        
        if (modal.style.display === 'block') {
            switch(event.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    changeSlide(-1);
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    changeSlide(1);
                    break;
                case 'Home':
                    event.preventDefault();
                    goToSlide(0);
                    break;
                case 'End':
                    event.preventDefault();
                    goToSlide(currentImages.length - 1);
                    break;
            }
        }
    });

    // Soporte para gestos touch
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(event) {
        const modal = document.getElementById('certificateModal');
        if (modal.style.display === 'block') {
            touchStartX = event.changedTouches[0].screenX;
        }
    });

    document.addEventListener('touchend', function(event) {
        const modal = document.getElementById('certificateModal');
        if (modal.style.display === 'block') {
            touchEndX = event.changedTouches[0].screenX;
            handleSwipe();
        }
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                changeSlide(-1);
            } else {
                changeSlide(1);
            }
        }
    }

    // Función de debugging
    function debugCarousel() {
        console.log('=== DEBUG CARRUSEL ===');
        console.log('currentImages:', currentImages);
        console.log('currentIndex:', currentIndex);
        console.log('Cantidad de imágenes:', currentImages.length);
        
        const track = document.getElementById('carouselTrack');
        console.log('Track style:', {
            width: track.style.width,
            transform: track.style.transform
        });
        
        const containers = track.querySelectorAll('.image-container');
        containers.forEach((container, index) => {
            const img = container.querySelector('img');
            console.log(`Container ${index + 1}:`, {
                width: container.style.width,
                src: img ? img.src : 'No image',
                loaded: img ? img.complete : false
            });
        });
    }

//--------------------------------------------------------- Toggle del menú móvil --------------------------------------------------------->

    // Función para toggle del menú móvil
    function toggleMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    }

    // Cerrar menú móvil al hacer click en un link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Cerrar menú móvil al cambiar el tamaño de pantalla
    window.addEventListener('resize', () => {
        if (window.innerWidth > 767) { // Cambiado de 575 a 767
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
