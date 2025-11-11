// Professional UI Enhancement JavaScript
class ProfessionalUI {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupEnhancedNavigation();
        this.setupParallaxEffects();
        this.setupScrollAnimations();
        this.setupFormEnhancements();
        this.setupInteractiveElements();
        this.setupLoadingAnimations();
    }

    // Enhanced Smooth Scrolling
    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Smooth scroll to top on page load
        window.addEventListener('load', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Enhanced Navigation with Professional Effects
    setupEnhancedNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!navbar) return;

        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Add/remove scrolled class
            if (scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Clear existing timeout
            clearTimeout(scrollTimeout);
            
            // Add scrolling class
            navbar.classList.add('scrolling');
            
            // Remove scrolling class after scrolling stops
            scrollTimeout = setTimeout(() => {
                navbar.classList.remove('scrolling');
            }, 150);
        });

        // Active link highlighting based on scroll position
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Parallax Effects for Professional Depth
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-content, .section-title');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                if (element.getBoundingClientRect().top < window.innerHeight) {
                    element.style.transform = `translateY(${rate}px)`;
                }
            });
        });
    }

    // Professional Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animation for child elements
                    const children = entry.target.querySelectorAll('.menu-item, .service-card, .gallery-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animateElements = document.querySelectorAll(
            '.menu-category, .about-content, .service-card, .gallery-item, .contact-item, .hero-content'
        );
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Enhanced Form Interactions
    setupFormEnhancements() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                // Floating labels effect
                this.setupFloatingLabels(input);
                
                // Real-time validation
                this.setupRealTimeValidation(input);
                
                // Professional focus effects
                this.setupFocusEffects(input);
            });
            
            // Form submission enhancement
            this.setupFormSubmission(form);
        });
    }

    setupFloatingLabels(input) {
        const wrapper = input.closest('.form-group');
        if (!wrapper) return;
        
        const label = wrapper.querySelector('label');
        if (!label) return;

        // Check if input has value on load
        if (input.value) {
            wrapper.classList.add('has-value');
        }

        input.addEventListener('focus', () => {
            wrapper.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            wrapper.classList.remove('focused');
            if (input.value) {
                wrapper.classList.add('has-value');
            } else {
                wrapper.classList.remove('has-value');
            }
        });

        input.addEventListener('input', () => {
            if (input.value) {
                wrapper.classList.add('has-value');
            } else {
                wrapper.classList.remove('has-value');
            }
        });
    }

    setupRealTimeValidation(input) {
        input.addEventListener('blur', () => {
            this.validateField(input);
        });

        input.addEventListener('input', () => {
            // Clear error state while typing
            input.classList.remove('invalid');
            const errorElement = input.parentNode.querySelector('.form-error');
            if (errorElement) {
                errorElement.remove();
            }
        });
    }

    validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Email validation
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (input.type === 'tel') {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (value && !phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Required field validation
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Update UI based on validation
        if (isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            this.removeErrorMessage(input);
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
            this.showErrorMessage(input, errorMessage);
        }

        return isValid;
    }

    showErrorMessage(input, message) {
        this.removeErrorMessage(input);
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        input.parentNode.appendChild(errorElement);
    }

    removeErrorMessage(input) {
        const errorElement = input.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    setupFocusEffects(input) {
        input.addEventListener('focus', () => {
            input.parentNode.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentNode.classList.remove('focused');
        });
    }

    setupFormSubmission(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate all fields
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            let isFormValid = true;
            
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                this.submitForm(form);
            } else {
                // Scroll to first error
                const firstError = form.querySelector('.invalid');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
    }

    async submitForm(form) {
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.classList.add('loading');

        try {
            // Simulate form submission (replace with actual EmailJS call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success state
            this.showFormSuccess(form);
            form.reset();
            
        } catch (error) {
            // Show error state
            this.showFormError(form, 'Failed to submit form. Please try again.');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');
        }
    }

    showFormSuccess(form) {
        const message = document.createElement('div');
        message.className = 'form-success-message';
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h4>Thank You!</h4>
            <p>Your message has been sent successfully. We'll get back to you soon.</p>
        `;
        
        form.parentNode.insertBefore(message, form);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    showFormError(form, errorMsg) {
        const message = document.createElement('div');
        message.className = 'form-error-message';
        message.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <p>${errorMsg}</p>
        `;
        
        form.parentNode.insertBefore(message, form);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    // Interactive Element Enhancements
    setupInteractiveElements() {
        // Button hover effects
        const buttons = document.querySelectorAll('.btn, .cta-button, .menu-filter-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', this.addRippleEffect);
        });

        // Card hover effects
        const cards = document.querySelectorAll('.menu-item, .service-card, .gallery-item');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Image lazy loading with fade-in effect
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    addRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Loading Animations
    setupLoadingAnimations() {
        // Page load animation
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Stagger animation for hero elements
            const heroElements = document.querySelectorAll('.hero-content > *');
            heroElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('animate-in');
                }, index * 200);
            });
        });

        // Loading skeleton for dynamic content
        this.setupSkeletonLoading();
    }

    setupSkeletonLoading() {
        const skeletonElements = document.querySelectorAll('.skeleton');
        
        // Simulate content loading
        setTimeout(() => {
            skeletonElements.forEach(skeleton => {
                skeleton.classList.remove('skeleton');
                skeleton.classList.add('content-loaded');
            });
        }, 1500);
    }
}

// Initialize Professional UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalUI();
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for additional professional effects
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .form-success-message,
    .form-error-message {
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 20px;
        text-align: center;
        animation: slideInDown 0.5s ease;
    }

    .form-success-message {
        background: linear-gradient(135deg, #d4edda, #c3e6cb);
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .form-error-message {
        background: linear-gradient(135deg, #f8d7da, #f5c6cb);
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .form-success-message i,
    .form-error-message i {
        font-size: 24px;
        margin-bottom: 10px;
        display: block;
    }

    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
    }

    @keyframes loading {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }

    .content-loaded {
        animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);