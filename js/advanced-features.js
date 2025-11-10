// ===== ADVANCED FEATURES JAVASCRIPT =====

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all advanced features
    initScrollAnimations();
    initParallaxEffect();
    initAdvancedSearch();
    initLiveChat();
    initRatingSystem();
    initFavorites();
    initNutritionCalculator();
    initVoiceSearch();
    initGeolocation();
    initPWAFeatures();
});

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for children
                const children = entry.target.querySelectorAll('.stagger-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.scroll-reveal, .text-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
        observer.observe(el);
    });

    // Text reveal animation for hero titles
    document.querySelectorAll('.text-reveal').forEach(title => {
        const words = title.textContent.split(' ');
        title.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
    });
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    if (parallaxElements.length === 0) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Throttled scroll event
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
}

// ===== PARTICLE SYSTEM =====
function createParticles(containerId, count = 50) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(225, 170, 100, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            pointer-events: none;
        `;
        container.appendChild(particle);
    }
}

// ===== ADVANCED SEARCH =====
function initAdvancedSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'advanced-search-container';
    searchContainer.innerHTML = `
        <div class="search-wrapper">
            <div class="search-input-container">
                <input type="text" id="advancedSearch" placeholder="Search menu, reviews, or ask questions...">
                <button class="voice-search-btn" id="voiceSearchBtn">
                    <i class="fas fa-microphone"></i>
                </button>
                <button class="search-btn">
                    <i class="fas fa-search"></i>
                </button>
            </div>
            <div class="search-filters">
                <button class="filter-btn" data-filter="menu">Menu</button>
                <button class="filter-btn" data-filter="reviews">Reviews</button>
                <button class="filter-btn" data-filter="info">Info</button>
                <button class="filter-btn" data-filter="nutrition">Nutrition</button>
            </div>
            <div class="search-results" id="searchResults"></div>
        </div>
    `;
    
    // Add to header
    const navbar = document.querySelector('.navbar .nav-container');
    if (navbar) {
        navbar.appendChild(searchContainer);
    }
    
    // Search functionality
    const searchInput = document.getElementById('advancedSearch');
    const searchResults = document.getElementById('searchResults');
    
    let searchTimeout;
    searchInput?.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performAdvancedSearch(e.target.value);
        }, 300);
    });
}

function performAdvancedSearch(query) {
    if (!query.trim()) {
        document.getElementById('searchResults').innerHTML = '';
        return;
    }
    
    // Mock search data - in real app, this would be an API call
    const searchData = [
        { type: 'menu', title: 'Butter Chicken', description: 'Creamy tomato-based curry with tender chicken', category: 'North Indian' },
        { type: 'menu', title: 'Masala Dosa', description: 'Crispy rice crepe with spiced potato filling', category: 'South Indian' },
        { type: 'info', title: 'Opening Hours', description: '7:00 AM - 11:00 PM daily', category: 'Information' },
        { type: 'review', title: 'Customer Review', description: 'Amazing food and great service!', category: 'Reviews' }
    ];
    
    const results = searchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No results found</div>';
        return;
    }
    
    searchResults.innerHTML = results.map(result => `
        <div class="search-result-item" data-type="${result.type}">
            <div class="result-icon">
                <i class="fas fa-${getResultIcon(result.type)}"></i>
            </div>
            <div class="result-content">
                <h4>${result.title}</h4>
                <p>${result.description}</p>
                <span class="result-category">${result.category}</span>
            </div>
        </div>
    `).join('');
}

function getResultIcon(type) {
    const icons = {
        menu: 'utensils',
        info: 'info-circle',
        review: 'star',
        nutrition: 'apple-alt'
    };
    return icons[type] || 'search';
}

// ===== VOICE SEARCH =====
function initVoiceSearch() {
    if (!('webkitSpeechRecognition' in window)) {
        console.log('Voice search not supported');
        return;
    }
    
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    const voiceBtn = document.getElementById('voiceSearchBtn');
    voiceBtn?.addEventListener('click', () => {
        recognition.start();
        voiceBtn.classList.add('listening');
    });
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('advancedSearch').value = transcript;
        performAdvancedSearch(transcript);
        voiceBtn.classList.remove('listening');
    };
    
    recognition.onerror = () => {
        voiceBtn.classList.remove('listening');
    };
}

// ===== LIVE CHAT SYSTEM =====
function initLiveChat() {
    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
        <div class="chat-button" id="chatButton">
            <i class="fas fa-comments"></i>
            <span class="chat-badge">1</span>
        </div>
        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                <h4>Live Support</h4>
                <button class="chat-close" id="chatClose">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="chat-message bot">
                    <div class="message-content">
                        Hello! How can I help you today? You can ask about our menu, make reservations, or get directions.
                    </div>
                    <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                </div>
            </div>
            <div class="chat-input-container">
                <input type="text" id="chatInput" placeholder="Type your message...">
                <button class="chat-send" id="chatSend">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
            <div class="quick-actions">
                <button class="quick-action" data-action="menu">View Menu</button>
                <button class="quick-action" data-action="reserve">Make Reservation</button>
                <button class="quick-action" data-action="directions">Get Directions</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(chatWidget);
    
    // Chat functionality
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    
    chatButton.addEventListener('click', () => {
        chatWindow.classList.add('active');
        chatButton.querySelector('.chat-badge').style.display = 'none';
    });
    
    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });
    
    async function sendMessage(message, isUser = true) {
        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        messageEl.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        `;
        
        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        if (isUser) {
            // Send chat message via EmailJS if available
            if (typeof emailService !== 'undefined') {
                try {
                    const messageData = {
                        message: message,
                        sessionId: Date.now().toString(),
                        page: window.location.pathname
                    };
                    await emailService.sendChatMessage(messageData);
                } catch (error) {
                    console.error('Failed to send chat message via email:', error);
                }
            }
            
            // Simulate bot response
            setTimeout(() => {
                const response = getBotResponse(message);
                sendMessage(response, false);
            }, 1000);
        }
    }
    
    chatSend.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            sendMessage(message, true);
            chatInput.value = '';
        }
    });
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatSend.click();
        }
    });
    
    // Quick actions
    document.querySelectorAll('.quick-action').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            handleQuickAction(action);
        });
    });
}

function getBotResponse(message) {
    const responses = {
        menu: "You can view our complete menu by clicking the 'Menu' button in the navigation. We serve North Indian, South Indian, Chinese, Continental, Fast Food, and Beverages!",
        reservation: "I'd be happy to help you make a reservation! Please click on 'Reserve' in the navigation to book your table.",
        hours: "We're open daily from 7:00 AM to 11:00 PM. We serve breakfast, lunch, and dinner!",
        location: "We're located near DSU in Harohalli. You can call us at 72046 11326 for directions.",
        default: "Thank you for your message! For immediate assistance, please call us at 72046 11326. Our team is here to help!"
    };
    
    message = message.toLowerCase();
    
    if (message.includes('menu') || message.includes('food')) return responses.menu;
    if (message.includes('book') || message.includes('reservation') || message.includes('table')) return responses.reservation;
    if (message.includes('hours') || message.includes('time') || message.includes('open')) return responses.hours;
    if (message.includes('location') || message.includes('address') || message.includes('where')) return responses.location;
    
    return responses.default;
}

function handleQuickAction(action) {
    switch (action) {
        case 'menu':
            window.location.href = 'menu.html';
            break;
        case 'reserve':
            window.location.href = 'reservation.html';
            break;
        case 'directions':
            window.open('https://www.google.com/maps/dir//No.+92%2F6,+MARALAVADI+HOBLI,+KANAKAPURA+MAIN,+ROAD,+HAROHALLI+TALUK,+JAKKASANDRA,+VILLAGE,+Harohalli,+Ramanagara,+Karnataka+562112/@12.6529214,77.3586284,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bae5b74e9ca973d:0x713c5aaf7608c916!2m2!1d77.4410303!2d12.6529341?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D', '_blank');
            break;
    }
}

// ===== RATING SYSTEM =====
function initRatingSystem() {
    const ratingContainer = document.createElement('div');
    ratingContainer.className = 'floating-rating';
    ratingContainer.innerHTML = `
        <div class="rating-prompt">
            <h4>Rate Your Experience</h4>
            <div class="stars" id="ratingStars">
                ${[1,2,3,4,5].map(i => `<span class="star" data-rating="${i}">★</span>`).join('')}
            </div>
            <button class="rating-close" id="ratingClose">×</button>
        </div>
    `;
    
    document.body.appendChild(ratingContainer);
    
    // Show rating after 30 seconds
    setTimeout(() => {
        ratingContainer.classList.add('show');
    }, 30000);
    
    // Rating functionality
    document.querySelectorAll('#ratingStars .star').forEach((star, index) => {
        star.addEventListener('click', () => {
            const rating = index + 1;
            submitRating(rating);
            ratingContainer.classList.remove('show');
        });
        
        star.addEventListener('mouseover', () => {
            document.querySelectorAll('#ratingStars .star').forEach((s, i) => {
                s.classList.toggle('hover', i <= index);
            });
        });
    });
    
    document.getElementById('ratingClose').addEventListener('click', () => {
        ratingContainer.classList.remove('show');
    });
}

async function submitRating(rating) {
    console.log('Rating submitted:', rating);
    
    try {
        // Send feedback via EmailJS if available
        if (typeof emailService !== 'undefined') {
            const feedbackData = {
                rating: rating,
                message: `Customer rated the restaurant ${rating} out of 5 stars`,
                name: 'Anonymous Customer',
                page: window.location.pathname
            };
            
            const result = await emailService.sendFeedback(feedbackData);
            if (result.success) {
                console.log('Rating feedback sent to restaurant team');
            }
        }
        
        // Show thank you message
        showNotification(`Thank you for rating us ${rating} stars!`, 'success');
        
    } catch (error) {
        console.error('Error submitting rating:', error);
        showNotification(`Thank you for rating us ${rating} stars!`, 'success');
    }
}

// ===== FAVORITES SYSTEM =====
function initFavorites() {
    // Add to existing menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(item, favoriteBtn);
        });
        
        item.appendChild(favoriteBtn);
    });
    
    // Load saved favorites
    loadFavorites();
}

function toggleFavorite(item, btn) {
    const itemName = item.querySelector('h3').textContent;
    let favorites = JSON.parse(localStorage.getItem('oasisFavorites') || '[]');
    
    if (favorites.includes(itemName)) {
        favorites = favorites.filter(fav => fav !== itemName);
        btn.innerHTML = '<i class="far fa-heart"></i>';
        btn.classList.remove('active');
    } else {
        favorites.push(itemName);
        btn.innerHTML = '<i class="fas fa-heart"></i>';
        btn.classList.add('active');
    }
    
    localStorage.setItem('oasisFavorites', JSON.stringify(favorites));
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('oasisFavorites') || '[]');
    
    document.querySelectorAll('.menu-item').forEach(item => {
        const itemName = item.querySelector('h3').textContent;
        const favoriteBtn = item.querySelector('.favorite-btn');
        
        if (favorites.includes(itemName)) {
            favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
            favoriteBtn.classList.add('active');
        }
    });
}

// ===== NUTRITION CALCULATOR =====
function initNutritionCalculator() {
    const nutritionData = {
        'Butter Chicken': { calories: 438, protein: 25, carbs: 12, fat: 32 },
        'Masala Dosa': { calories: 168, protein: 4, carbs: 33, fat: 2 },
        'Hakka Noodles': { calories: 290, protein: 8, carbs: 45, fat: 12 },
        'Paneer Tikka': { calories: 260, protein: 14, carbs: 8, fat: 20 }
    };
    
    // Add nutrition info to menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        const itemName = item.querySelector('h3').textContent;
        const nutrition = nutritionData[itemName];
        
        if (nutrition) {
            const nutritionInfo = document.createElement('div');
            nutritionInfo.className = 'nutrition-info';
            nutritionInfo.innerHTML = `
                <div class="nutrition-toggle">
                    <i class="fas fa-info-circle"></i> Nutrition Facts
                </div>
                <div class="nutrition-details">
                    <div class="nutrition-item">
                        <span>Calories:</span> <strong>${nutrition.calories}</strong>
                    </div>
                    <div class="nutrition-item">
                        <span>Protein:</span> <strong>${nutrition.protein}g</strong>
                    </div>
                    <div class="nutrition-item">
                        <span>Carbs:</span> <strong>${nutrition.carbs}g</strong>
                    </div>
                    <div class="nutrition-item">
                        <span>Fat:</span> <strong>${nutrition.fat}g</strong>
                    </div>
                </div>
            `;
            
            item.appendChild(nutritionInfo);
            
            // Toggle functionality
            nutritionInfo.querySelector('.nutrition-toggle').addEventListener('click', () => {
                nutritionInfo.classList.toggle('expanded');
            });
        }
    });
}

// ===== GEOLOCATION & DIRECTIONS =====
function initGeolocation() {
    if (!navigator.geolocation) return;
    
    const directionsBtn = document.createElement('button');
    directionsBtn.className = 'floating-directions';
    directionsBtn.innerHTML = '<i class="fas fa-directions"></i>';
    directionsBtn.title = 'Get Directions';
    
    document.body.appendChild(directionsBtn);
    
    directionsBtn.addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const destination = "No.+92%2F6,+MARALAVADI+HOBLI,+KANAKAPURA+MAIN,+ROAD,+HAROHALLI+TALUK,+JAKKASANDRA,+VILLAGE,+Harohalli,+Ramanagara,+Karnataka+562112";
                const url = `https://www.google.com/maps/dir/${latitude},${longitude}/${destination}`;
                window.open(url, '_blank');
            },
            (error) => {
                console.error('Geolocation error:', error);
                // Fallback to general directions
                window.open('https://www.google.com/maps/dir//No.+92%2F6,+MARALAVADI+HOBLI,+KANAKAPURA+MAIN,+ROAD,+HAROHALLI+TALUK,+JAKKASANDRA,+VILLAGE,+Harohalli,+Ramanagara,+Karnataka+562112/@12.6529214,77.3586284,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bae5b74e9ca973d:0x713c5aaf7608c916!2m2!1d77.4410303!2d12.6529341?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D', '_blank');
            }
        );
    });
}

// ===== PWA FEATURES =====
function initPWAFeatures() {
    // Install prompt
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallPrompt();
    });
    
    function showInstallPrompt() {
        const installBanner = document.createElement('div');
        installBanner.className = 'install-banner';
        installBanner.innerHTML = `
            <div class="install-content">
                <i class="fas fa-mobile-alt"></i>
                <div>
                    <h4>Install Oasis Restaurant</h4>
                    <p>Get quick access to our menu and reservations</p>
                </div>
                <button class="install-btn" id="installBtn">Install</button>
                <button class="install-close" id="installClose">×</button>
            </div>
        `;
        
        document.body.appendChild(installBanner);
        
        document.getElementById('installBtn').addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log('Install outcome:', outcome);
                deferredPrompt = null;
                installBanner.remove();
            }
        });
        
        document.getElementById('installClose').addEventListener('click', () => {
            installBanner.remove();
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Loading screen management
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }
});