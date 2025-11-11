// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initCarousel();
    initHeroSlider(); // Add hero slider initialization
    initLightbox();
    initMenuFilters();
    initContactForm();
    initScrollAnimations();
    initLazyLoading();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Register Service Worker for PWA
    initServiceWorker();
    
    // Initialize scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });
});

// Service Worker Registration
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW: Service Worker registered successfully:', registration.scope);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New version available
                                showUpdateNotification();
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.log('SW: Service Worker registration failed:', error);
                });
            
            // Listen for messages from SW
            navigator.serviceWorker.addEventListener('message', (event) => {
                const { type, data } = event.data;
                
                switch (type) {
                    case 'RESERVATION_SYNCED':
                        showNotification('Your reservation has been confirmed!', 'success');
                        break;
                }
            });
        });
    }
}

function showUpdateNotification() {
    const updateBanner = document.createElement('div');
    updateBanner.className = 'update-banner';
    updateBanner.innerHTML = `
        <div class="update-content">
            <i class="fas fa-sync-alt"></i>
            <span>New version available! Refresh to update.</span>
            <button class="update-btn" onclick="refreshApp()">Refresh</button>
            <button class="update-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(updateBanner);
    
    // Add styles
    const updateStyles = `
        <style>
        .update-banner {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: var(--primary-color);
            color: white;
            padding: 1rem;
            z-index: 10002;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        .update-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        .update-btn {
            background: white;
            color: var(--primary-color);
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
        }
        .update-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: auto;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', updateStyles);
}

function refreshApp() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then((registration) => {
            if (registration && registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
            }
        });
    }
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Update active nav link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Hero slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const navButtons = document.querySelectorAll('.hero-nav-btn');
    const prevButton = document.getElementById('heroPrev');
    const nextButton = document.getElementById('heroNext');
    
    // Debug: Check if elements are found
    console.log('Hero Slider Debug:', {
        slides: slides.length,
        navButtons: navButtons.length,
        prevButton: !!prevButton,
        nextButton: !!nextButton
    });
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    // Return early if no slides found
    if (slides.length === 0) {
        console.warn('No hero slides found');
        return;
    }
    
    // Update active slide and navigation
    function updateSlide(index) {
        // Ensure index is within bounds
        if (index < 0 || index >= slides.length) {
            console.warn('Invalid slide index:', index);
            return;
        }
        
        // Remove active class from all slides and nav buttons
        slides.forEach(slide => slide.classList.remove('active'));
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to current slide and nav button
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (navButtons[index]) {
            navButtons[index].classList.add('active');
        }
        
        currentSlide = index;
        console.log('Slide updated to:', index);
    }
    
    // Navigate to specific slide
    function goToSlide(index) {
        updateSlide(index);
        resetAutoSlide();
    }
    
    // Next slide
    function nextSlide() {
        console.log('Next slide clicked, current:', currentSlide);
        const next = (currentSlide + 1) % slides.length;
        updateSlide(next);
    }
    
    // Previous slide
    function prevSlide() {
        console.log('Previous slide clicked, current:', currentSlide);
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(prev);
    }
    
    // Auto-slide functionality
    function startAutoSlide() {
        if (slides.length > 1) {
            autoSlideInterval = setInterval(nextSlide, 6000);
        }
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Event listeners for navigation buttons
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Nav button clicked:', index);
            goToSlide(index);
        });
    });
    
    // Event listeners for arrow buttons
    if (prevButton) {
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Previous arrow clicked');
            prevSlide();
            resetAutoSlide();
        });
    } else {
        console.warn('Previous button not found');
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Next arrow clicked');
            nextSlide();
            resetAutoSlide();
        });
    } else {
        console.warn('Next button not found');
    }
    
    // Pause auto-slide on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        heroSection.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (heroSection) {
        heroSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        heroSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
            resetAutoSlide();
        }
    }
    
    // Initialize the first slide
    updateSlide(0);
    
    // Start auto-slide
    startAutoSlide();
    
    console.log('Hero slider initialized successfully');
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Add input validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', clearErrors);
        });
    }
}

async function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Use EmailJS integration if available
        if (typeof emailService !== 'undefined') {
            const contactData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };
            
            const result = await emailService.sendContactMessage(contactData);
            
            if (result.success) {
                showNotification(result.message, 'success');
                form.reset();
            } else {
                showNotification(result.message, 'error');
            }
        } else {
            // Fallback simulation
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
                form.reset();
            }, 2000);
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification('Failed to send message. Please try again or call us directly.', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!validateInput({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    input.classList.remove('error');
    removeErrorMessage(input);
    
    // Required field validation
    if (input.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }
    
    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    
    // Phone validation
    if (input.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            errorMessage = 'Please enter a valid phone number';
            isValid = false;
        }
    }
    
    // Show error if validation failed
    if (!isValid) {
        showInputError(input, errorMessage);
    }
    
    return isValid;
}

function showInputError(input, message) {
    input.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'input-error';
    errorElement.textContent = message;
    
    input.parentNode.appendChild(errorElement);
}

function removeErrorMessage(input) {
    const errorElement = input.parentNode.querySelector('.input-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function clearErrors(e) {
    const input = e.target;
    input.classList.remove('error');
    removeErrorMessage(input);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.cuisine-card, .review-card, .feature, .about-image, .contact-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Phone number click tracking
function trackPhoneClick(phoneNumber) {
    // Analytics tracking can be added here
    console.log(`Phone number clicked: ${phoneNumber}`);
    
    // Example: Google Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_click', {
            phone_number: phoneNumber
        });
    }
}

// WhatsApp click tracking
function trackWhatsAppClick() {
    console.log('WhatsApp button clicked');
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
            event_category: 'engagement',
            event_label: 'whatsapp_contact'
        });
    }
}

// Menu item click tracking
function trackMenuClick(cuisineType) {
    console.log(`Menu clicked: ${cuisineType}`);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'menu_view', {
            event_category: 'engagement',
            event_label: cuisineType
        });
    }
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.fetchStart;
            
            console.log(`Page load time: ${loadTime}ms`);
            
            // Track slow loading pages
            if (loadTime > 3000) {
                console.warn('Slow page load detected');
            }
        }, 0);
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Utility functions
const utils = {
    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format phone number
    formatPhoneNumber: function(phoneNumber) {
        const cleaned = phoneNumber.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{5})$/);
        if (match) {
            return `+91 ${match[1]} ${match[2]} ${match[3]}`;
        }
        return phoneNumber;
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Lightbox functionality
function openLightbox(imageSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightboxImg.src = imageSrc;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Track lightbox view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'lightbox_view', {
            event_category: 'engagement',
            event_label: caption
        });
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close lightbox on escape key or background click
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

document.addEventListener('click', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Export utilities for external use
window.OasisRestaurant = {
    utils,
    trackPhoneClick,
    trackWhatsAppClick,
    trackMenuClick,
    showNotification,
    openLightbox,
    closeLightbox
};

// CSS for notifications and form validation
const additionalStyles = `
.notification {
    position: fixed;
    top: 90px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    z-index: 1001;
    max-width: 400px;
    animation: slideInRight 0.3s ease;
}

.notification-success {
    border-left: 4px solid var(--success-color);
}

.notification-error {
    border-left: 4px solid var(--error-color);
}

.notification-content {
    padding: 15px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.notification-success .fas {
    color: var(--success-color);
}

.notification-error .fas {
    color: var(--error-color);
}

.notification-close {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    font-size: 0.9rem;
    margin-left: auto;
}

.input-error {
    color: var(--error-color);
    font-size: 0.85rem;
    margin-top: 5px;
}

.contact-form input.error,
.contact-form select.error,
.contact-form textarea.error {
    border-color: var(--error-color);
    background-color: rgba(220, 53, 69, 0.05);
}

.animate-in {
    animation: fadeInUp 0.6s ease forwards;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@media (max-width: 480px) {
    .notification {
        right: 15px;
        left: 15px;
        max-width: none;
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);