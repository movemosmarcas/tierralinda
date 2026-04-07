document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const stickyBar = document.querySelector('.sticky-bar');
    
    // Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        let sliderInterval = setInterval(nextSlide, 2500);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(sliderInterval);
                currentSlide = index;
                showSlide(currentSlide);
                sliderInterval = setInterval(nextSlide, 5000);
            });
        });
    }

    // Scroll Effects (Minimal)
    // Scroll Trigger for Sticky Bar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            stickyBar.classList.add('visible');
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.amenity-block, .quote-card, .section-replica, .modern-grid').forEach(el => {
        observer.observe(el);
    });

    // Conversion Popup logic (15 seconds)
    setTimeout(() => {
        const popup = document.getElementById('offer-popup');
        if (popup) {
            popup.style.display = 'flex';
            setTimeout(() => {
                popup.classList.add('active');
            }, 10);
        }
    }, 15000);

    // Global Close Popup function
    window.closePopup = function() {
        const popup = document.getElementById('offer-popup');
        if (popup) {
            popup.classList.remove('active');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 500);
        }
    };
});
