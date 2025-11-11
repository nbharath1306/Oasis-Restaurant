// Multi-language Support System with Cultural Adaptations
class MultiLanguageSystem {
    constructor() {
        this.currentLanguage = 'en';
        this.supportedLanguages = {
            'en': {
                name: 'English',
                nativeName: 'English',
                flag: 'flag-en',
                direction: 'ltr',
                theme: 'theme-english',
                fontClass: 'lang-en'
            },
            'hi': {
                name: 'Hindi',
                nativeName: 'हिन्दी',
                flag: 'flag-hi',
                direction: 'ltr',
                theme: 'theme-hindi',
                fontClass: 'lang-hi'
            },
            'kn': {
                name: 'Kannada',
                nativeName: 'ಕನ್ನಡ',
                flag: 'flag-kn',
                direction: 'ltr',
                theme: 'theme-kannada',
                fontClass: 'lang-kn'
            }
        };
        
        this.translations = {};
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        this.loadTranslations();
        this.createLanguageSelector();
        this.bindEvents();
        this.applyStoredLanguage();
    }
    
    createLanguageSelector() {
        const selector = document.createElement('div');
        selector.className = 'language-selector';
        selector.id = 'language-selector';
        
        selector.innerHTML = `
            <div class="language-toggle" id="language-toggle">
                <i class="fas fa-globe"></i>
                <span id="current-language">${this.supportedLanguages[this.currentLanguage].nativeName}</span>
                <i class="fas fa-chevron-down" style="font-size: 0.8rem; margin-left: 5px;"></i>
            </div>
            
            <div class="language-dropdown" id="language-dropdown">
                ${Object.entries(this.supportedLanguages).map(([code, lang]) => `
                    <div class="language-option ${code === this.currentLanguage ? 'active' : ''}" data-lang="${code}">
                        <div class="language-flag ${lang.flag}"></div>
                        <span>${lang.nativeName}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        document.body.appendChild(selector);
    }
    
    bindEvents() {
        const toggle = document.getElementById('language-toggle');
        const dropdown = document.getElementById('language-dropdown');
        
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdown.classList.remove('show');
        });
        
        // Language selection
        dropdown.addEventListener('click', (e) => {
            const option = e.target.closest('.language-option');
            if (option) {
                const langCode = option.dataset.lang;
                this.switchLanguage(langCode);
                dropdown.classList.remove('show');
            }
        });
    }
    
    loadTranslations() {
        // English (default)
        this.translations.en = {
            // Navigation
            'nav.home': 'Home',
            'nav.about': 'About Us',
            'nav.menu': 'Menu',
            'nav.gallery': 'Gallery',
            'nav.contact': 'Contact',
            'nav.reservations': 'Reservations',
            
            // Hero Section
            'hero.welcome': 'Welcome to Oasis Restaurant',
            'hero.subtitle': 'Authentic Multi-Cuisine Experience in the Heart of Harohalli',
            'hero.description': 'Experience the finest flavors from across India and beyond. Our master chefs bring you traditional recipes with a modern touch.',
            'hero.cta.menu': 'Explore Menu',
            'hero.cta.reserve': 'Reserve Table',
            
            // About Section
            'about.title': 'About Oasis Restaurant',
            'about.subtitle': 'Where Tradition Meets Excellence',
            'about.description': 'Established with a passion for authentic flavors, Oasis Restaurant has been serving the finest multi-cuisine dishes in Harohalli. Our commitment to quality ingredients and traditional cooking methods ensures every meal is a memorable experience.',
            
            // Menu Cultural Headers
            'menu.cultural.greeting': 'Welcome to Our Culinary Journey',
            'menu.cultural.subtitle': 'Discover Authentic Flavors',
            
            // Kitchen Status
            'kitchen.title': 'Live Kitchen Status',
            'kitchen.subtitle': 'Real-time kitchen activity and preparation updates',
            'kitchen.orders.active': 'Active Orders',
            'kitchen.orders.completed': 'Completed Today',
            'kitchen.orders.average': 'Avg. Prep Time',
            'kitchen.orders.efficiency': 'Kitchen Efficiency',
            
            // Virtual Tour
            'tour.title': 'Virtual Restaurant Tour',
            'tour.subtitle': 'Take a 360° journey through our restaurant and explore every corner before your visit',
            'tour.explore': 'Explore Areas',
            'tour.table.preview': 'Table Preview',
            'tour.reserve.table': 'Reserve Table',
            
            // Smart Reservation
            'reservation.title': 'Smart Reservation System',
            'reservation.subtitle': 'AI-powered table recommendations and intelligent booking system',
            'reservation.book.table': 'Book Your Table',
            'reservation.ai.recommendations': 'AI Recommendations',
            'reservation.guest.count': 'Number of Guests',
            'reservation.special.occasion': 'Special Occasion',
            'reservation.available.slots': 'Available Time Slots',
            'reservation.complete': 'Complete Reservation',
            
            // Reviews
            'reviews.title': 'Customer Reviews',
            'reviews.subtitle': 'What our guests say about their dining experience',
            'reviews.write': 'Write a Review',
            'reviews.all': 'All Reviews',
            'reviews.recent': 'Recent Reviews',
            
            // Contact
            'contact.title': 'Contact Us',
            'contact.subtitle': 'Get in touch with us for reservations, inquiries, or feedback',
            'contact.location': 'Location',
            'contact.phone': 'Phone Numbers',
            'contact.hours': 'Opening Hours',
            'contact.online': 'Order Online',
            'contact.message': 'Send us a Message',
            
            // Common
            'common.loading': 'Loading...',
            'common.submit': 'Submit',
            'common.cancel': 'Cancel',
            'common.close': 'Close',
            'common.select': 'Select',
            'common.available': 'Available',
            'common.occupied': 'Occupied',
            'common.reserved': 'Reserved'
        };
        
        // Hindi translations
        this.translations.hi = {
            // Navigation
            'nav.home': 'होम',
            'nav.about': 'हमारे बारे में',
            'nav.menu': 'मेन्यू',
            'nav.gallery': 'गैलरी',
            'nav.contact': 'संपर्क',
            'nav.reservations': 'आरक्षण',
            
            // Hero Section
            'hero.welcome': 'ओएसिस रेस्टोरेंट में आपका स्वागत है',
            'hero.subtitle': 'हरोहल्ली के हृदय में प्रामाणिक बहु-व्यंजन अनुभव',
            'hero.description': 'भारत और विदेश के बेहतरीन स्वादों का अनुभव करें। हमारे मास्टर शेफ आपके लिए पारंपरिक व्यंजनों को आधुनिक अंदाज में पेश करते हैं।',
            'hero.cta.menu': 'मेन्यू देखें',
            'hero.cta.reserve': 'टेबल बुक करें',
            
            // About Section
            'about.title': 'ओएसिस रेस्टोरेंट के बारे में',
            'about.subtitle': 'जहाँ परंपरा मिलती है उत्कृष्टता से',
            'about.description': 'प्रामाणिक स्वादों के जुनून के साथ स्थापित, ओएसिस रेस्टोरेंट हरोहल्ली में बेहतरीन बहु-व्यंजन परोस रहा है। गुणवत्तापूर्ण सामग्री और पारंपरिक खाना पकाने की विधियों के प्रति हमारी प्रतिबद्धता यह सुनिश्चित करती है कि हर भोजन एक यादगार अनुभव हो।',
            
            // Menu Cultural Headers
            'menu.cultural.greeting': 'हमारी पाक यात्रा में आपका स्वागत है',
            'menu.cultural.subtitle': 'प्रामाणिक स्वादों की खोज करें',
            
            // Kitchen Status
            'kitchen.title': 'लाइव रसोई स्थिति',
            'kitchen.subtitle': 'वास्तविक समय रसोई गतिविधि और तैयारी अपडेट',
            'kitchen.orders.active': 'सक्रिय ऑर्डर',
            'kitchen.orders.completed': 'आज पूर्ण',
            'kitchen.orders.average': 'औसत तैयारी समय',
            'kitchen.orders.efficiency': 'रसोई दक्षता',
            
            // Virtual Tour
            'tour.title': 'वर्चुअल रेस्टोरेंट टूर',
            'tour.subtitle': 'अपनी यात्रा से पहले हमारे रेस्टोरेंट की 360° यात्रा करें और हर कोने को देखें',
            'tour.explore': 'क्षेत्र देखें',
            'tour.table.preview': 'टेबल पूर्वावलोकन',
            'tour.reserve.table': 'टेबल आरक्षित करें',
            
            // Smart Reservation
            'reservation.title': 'स्मार्ट आरक्षण प्रणाली',
            'reservation.subtitle': 'एआई-संचालित टेबल सिफारिशें और बुद्धिमान बुकिंग सिस्टम',
            'reservation.book.table': 'अपनी टेबल बुक करें',
            'reservation.ai.recommendations': 'एआई सिफारिशें',
            'reservation.guest.count': 'मेहमानों की संख्या',
            'reservation.special.occasion': 'विशेष अवसर',
            'reservation.available.slots': 'उपलब्ध समय स्लॉट',
            'reservation.complete': 'आरक्षण पूरा करें',
            
            // Reviews
            'reviews.title': 'ग्राहक समीक्षाएं',
            'reviews.subtitle': 'हमारे मेहमान अपने भोजन अनुभव के बारे में क्या कहते हैं',
            'reviews.write': 'समीक्षा लिखें',
            'reviews.all': 'सभी समीक्षाएं',
            'reviews.recent': 'हाल की समीक्षाएं',
            
            // Contact
            'contact.title': 'संपर्क करें',
            'contact.subtitle': 'आरक्षण, पूछताछ या फीडबैक के लिए हमसे संपर्क करें',
            'contact.location': 'स्थान',
            'contact.phone': 'फोन नंबर',
            'contact.hours': 'खुलने का समय',
            'contact.online': 'ऑनलाइन ऑर्डर',
            'contact.message': 'हमें संदेश भेजें',
            
            // Common
            'common.loading': 'लोडिंग...',
            'common.submit': 'सबमिट',
            'common.cancel': 'रद्द करें',
            'common.close': 'बंद करें',
            'common.select': 'चुनें',
            'common.available': 'उपलब्ध',
            'common.occupied': 'व्यस्त',
            'common.reserved': 'आरक्षित'
        };
        
        // Kannada translations
        this.translations.kn = {
            // Navigation
            'nav.home': 'ಮುಖ್ಯ',
            'nav.about': 'ನಮ್ಮ ಬಗ್ಗೆ',
            'nav.menu': 'ಮೆನು',
            'nav.gallery': 'ಗ್ಯಾಲರಿ',
            'nav.contact': 'ಸಂಪರ್ಕ',
            'nav.reservations': 'ಕಾಯ್ದಿರಿಸುವಿಕೆ',
            
            // Hero Section
            'hero.welcome': 'ಓಯಸಿಸ್ ರೆಸ್ಟೋರೆಂಟ್‌ಗೆ ಸ್ವಾಗತ',
            'hero.subtitle': 'ಹರೋಹಳ್ಳಿಯ ಹೃದಯದಲ್ಲಿ ಪ್ರಾಮಾಣಿಕ ಬಹು-ಪಾಕಶಾಸ್ತ್ರ ಅನುಭವ',
            'hero.description': 'ಭಾರತ ಮತ್ತು ವಿದೇಶಗಳ ಅತ್ಯುತ್ತಮ ರುಚಿಗಳನ್ನು ಅನುಭವಿಸಿ. ನಮ್ಮ ಮಾಸ್ಟರ್ ಚೆಫ್‌ಗಳು ಆಧುನಿಕ ಸ್ಪರ್ಶದೊಂದಿಗೆ ಸಾಂಪ್ರದಾಯಿಕ ಪಾಕವಿಧಾನಗಳನ್ನು ತರುತ್ತಾರೆ.',
            'hero.cta.menu': 'ಮೆನು ವೀಕ್ಷಿಸಿ',
            'hero.cta.reserve': 'ಟೇಬಲ್ ಕಾಯ್ದಿರಿಸಿ',
            
            // About Section
            'about.title': 'ಓಯಸಿಸ್ ರೆಸ್ಟೋರೆಂಟ್ ಬಗ್ಗೆ',
            'about.subtitle': 'ಸಂಪ್ರದಾಯ ಮತ್ತು ಉತ್ಕೃಷ್ಟತೆ ಮಿಳನವಾಗುವ ಸ್ಥಳ',
            'about.description': 'ಪ್ರಾಮಾಣಿಕ ರುಚಿಗಳ ಉತ್ಸಾಹದೊಂದಿಗೆ ಸ್ಥಾಪಿಸಲಾದ ಓಯಸಿಸ್ ರೆಸ್ಟೋರೆಂಟ್ ಹರೋಹಳ್ಳಿಯಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಬಹು-ಪಾಕಶಾಸ್ತ್ರ ಭಕ್ಷ್ಯಗಳನ್ನು ಬಡಿಸುತ್ತಿದೆ. ಗುಣಮಟ್ಟದ ಪದಾರ್ಥಗಳು ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಅಡುಗೆ ವಿಧಾನಗಳಿಗೆ ನಮ್ಮ ಬದ್ಧತೆ ಪ್ರತಿ ಊಟ ಸ್ಮರಣೀಯ ಅನುಭವವಾಗಿದೆ ಎಂದು ಖಚಿತಪಡಿಸುತ್ತದೆ.',
            
            // Menu Cultural Headers
            'menu.cultural.greeting': 'ನಮ್ಮ ಪಾಕಶಾಸ್ತ್ರ ಪ್ರಯಾಣಕ್ಕೆ ಸ್ವಾಗತ',
            'menu.cultural.subtitle': 'ಪ್ರಾಮಾಣಿಕ ರುಚಿಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
            
            // Kitchen Status
            'kitchen.title': 'ಲೈವ್ ಅಡುಗೆಮನೆ ಸ್ಥಿತಿ',
            'kitchen.subtitle': 'ನೈಜ ಸಮಯದ ಅಡುಗೆಮನೆ ಚಟುವಟಿಕೆ ಮತ್ತು ತಯಾರಿಕೆ ಅಪ್‌ಡೇಟ್‌ಗಳು',
            'kitchen.orders.active': 'ಸಕ್ರಿಯ ಆದೇಶಗಳು',
            'kitchen.orders.completed': 'ಇಂದು ಪೂರ್ಣಗೊಂಡಿದೆ',
            'kitchen.orders.average': 'ಸರಾಸರಿ ತಯಾರಿಕೆ ಸಮಯ',
            'kitchen.orders.efficiency': 'ಅಡುಗೆಮನೆ ದಕ್ಷತೆ',
            
            // Virtual Tour
            'tour.title': 'ವರ್ಚುವಲ್ ರೆಸ್ಟೋರೆಂಟ್ ಪ್ರವಾಸ',
            'tour.subtitle': 'ನಿಮ್ಮ ಭೇಟಿಯ ಮೊದಲು ನಮ್ಮ ರೆಸ್ಟೋರೆಂಟ್‌ನ 360° ಪ್ರಯಾಣ ಮಾಡಿ ಮತ್ತು ಪ್ರತಿ ಮೂಲೆಯನ್ನು ಅನ್ವೇಷಿಸಿ',
            'tour.explore': 'ಪ್ರದೇಶಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
            'tour.table.preview': 'ಟೇಬಲ್ ಪೂರ್ವವೀಕ್ಷಣೆ',
            'tour.reserve.table': 'ಟೇಬಲ್ ಕಾಯ್ದಿರಿಸಿ',
            
            // Smart Reservation
            'reservation.title': 'ಸ್ಮಾರ್ಟ್ ಕಾಯ್ದಿರಿಸುವಿಕೆ ವ್ಯವಸ್ಥೆ',
            'reservation.subtitle': 'AI-ಚಾಲಿತ ಟೇಬಲ್ ಶಿಫಾರಸುಗಳು ಮತ್ತು ಬುದ್ಧಿವಂತ ಬುಕಿಂಗ್ ಸಿಸ್ಟಮ್',
            'reservation.book.table': 'ನಿಮ್ಮ ಟೇಬಲ್ ಬುಕ್ ಮಾಡಿ',
            'reservation.ai.recommendations': 'AI ಶಿಫಾರಸುಗಳು',
            'reservation.guest.count': 'ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ',
            'reservation.special.occasion': 'ವಿಶೇಷ ಸಂದರ್ಭ',
            'reservation.available.slots': 'ಲಭ್ಯವಿರುವ ಸಮಯ ಸ್ಲಾಟ್‌ಗಳು',
            'reservation.complete': 'ಕಾಯ್ದಿರಿಸುವಿಕೆ ಪೂರ್ಣಗೊಳಿಸಿ',
            
            // Reviews
            'reviews.title': 'ಗ್ರಾಹಕ ವಿಮರ್ಶೆಗಳು',
            'reviews.subtitle': 'ನಮ್ಮ ಅತಿಥಿಗಳು ತಮ್ಮ ಭೋಜನ ಅನುಭವದ ಬಗ್ಗೆ ಏನು ಹೇಳುತ್ತಾರೆ',
            'reviews.write': 'ವಿಮರ್ಶೆ ಬರೆಯಿರಿ',
            'reviews.all': 'ಎಲ್ಲಾ ವಿಮರ್ಶೆಗಳು',
            'reviews.recent': 'ಇತ್ತೀಚಿನ ವಿಮರ್ಶೆಗಳು',
            
            // Contact
            'contact.title': 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
            'contact.subtitle': 'ಕಾಯ್ದಿರಿಸುವಿಕೆ, ವಿಚಾರಣೆಗಳು ಅಥವಾ ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
            'contact.location': 'ಸ್ಥಳ',
            'contact.phone': 'ಫೋನ್ ಸಂಖ್ಯೆಗಳು',
            'contact.hours': 'ತೆರೆಯುವ ಸಮಯ',
            'contact.online': 'ಆನ್‌ಲೈನ್ ಆರ್ಡರ್',
            'contact.message': 'ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ',
            
            // Common
            'common.loading': 'ಲೋಡಿಂಗ್...',
            'common.submit': 'ಸಲ್ಲಿಸಿ',
            'common.cancel': 'ರದ್ದುಮಾಡಿ',
            'common.close': 'ಮುಚ್ಚಿ',
            'common.select': 'ಆಯ್ಕೆಮಾಡಿ',
            'common.available': 'ಲಭ್ಯ',
            'common.occupied': 'ಆಕ್ರಮಿತ',
            'common.reserved': 'ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ'
        };
    }
    
    switchLanguage(langCode) {
        if (this.isLoading || langCode === this.currentLanguage) return;
        
        this.showTranslationLoading();
        this.currentLanguage = langCode;
        
        // Store preference
        localStorage.setItem('oasis-language', langCode);
        
        // Apply language changes
        setTimeout(() => {
            this.applyLanguage(langCode);
            this.updateLanguageSelector();
            this.hideTranslationLoading();
        }, 1000);
    }
    
    applyLanguage(langCode) {
        const lang = this.supportedLanguages[langCode];
        const translations = this.translations[langCode];
        
        // Apply theme
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(lang.theme);
        
        // Apply font class
        document.body.className = document.body.className.replace(/lang-\w+/g, '');
        document.body.classList.add(lang.fontClass);
        
        // Apply text direction
        document.body.className = document.body.className.replace(/\b(rtl|ltr)\b/g, '');
        document.body.classList.add(lang.direction);
        
        // Translate all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
        
        // Add cultural patterns for non-English languages
        this.applyCulturalElements(langCode);
        
        // Add animation classes
        const animationClass = lang.direction === 'rtl' ? 'fade-in-rtl' : 'fade-in-ltr';
        document.body.classList.add(animationClass);
        setTimeout(() => {
            document.body.classList.remove(animationClass);
        }, 500);
    }
    
    applyCulturalElements(langCode) {
        // Add cultural greeting to menu sections
        this.addCulturalGreetings(langCode);
        
        // Apply cultural patterns
        if (langCode === 'hi') {
            document.body.classList.add('pattern-hindi');
        } else if (langCode === 'kn') {
            document.body.classList.add('pattern-kannada');
        } else {
            document.body.classList.remove('pattern-hindi', 'pattern-kannada');
        }
    }
    
    addCulturalGreetings(langCode) {
        const translations = this.translations[langCode];
        
        // Add cultural header to menu sections if they exist
        const menuSections = document.querySelectorAll('.menu-section, .advanced-menu-section');
        menuSections.forEach(section => {
            let culturalHeader = section.querySelector('.menu-cultural-header');
            if (!culturalHeader && langCode !== 'en') {
                culturalHeader = document.createElement('div');
                culturalHeader.className = 'menu-cultural-header';
                culturalHeader.innerHTML = `
                    <div class="cultural-greeting">${translations['menu.cultural.greeting']}</div>
                    <div class="cultural-subtitle">${translations['menu.cultural.subtitle']}</div>
                `;
                section.insertBefore(culturalHeader, section.firstChild);
            } else if (culturalHeader && langCode === 'en') {
                culturalHeader.remove();
            }
        });
    }
    
    updateLanguageSelector() {
        const currentLangSpan = document.getElementById('current-language');
        const options = document.querySelectorAll('.language-option');
        
        if (currentLangSpan) {
            currentLangSpan.textContent = this.supportedLanguages[this.currentLanguage].nativeName;
        }
        
        options.forEach(option => {
            option.classList.toggle('active', option.dataset.lang === this.currentLanguage);
        });
    }
    
    showTranslationLoading() {
        this.isLoading = true;
        
        const loading = document.createElement('div');
        loading.className = 'translation-loading show';
        loading.id = 'translation-loading';
        loading.innerHTML = `
            <span>Translating content...</span>
        `;
        
        document.body.appendChild(loading);
    }
    
    hideTranslationLoading() {
        this.isLoading = false;
        
        const loading = document.getElementById('translation-loading');
        if (loading) {
            loading.classList.remove('show');
            setTimeout(() => loading.remove(), 300);
        }
    }
    
    applyStoredLanguage() {
        const storedLang = localStorage.getItem('oasis-language');
        if (storedLang && this.supportedLanguages[storedLang]) {
            this.currentLanguage = storedLang;
            this.applyLanguage(storedLang);
            this.updateLanguageSelector();
        }
    }
    
    // Helper method to get translation
    translate(key) {
        return this.translations[this.currentLanguage]?.[key] || key;
    }
    
    // Method to add translation attributes to elements
    addTranslationAttributes() {
        // Add data-translate attributes to key elements
        document.addEventListener('DOMContentLoaded', () => {
            // Navigation items
            const navItems = {
                'Home': 'nav.home',
                'About Us': 'nav.about',
                'Menu': 'nav.menu',
                'Gallery': 'nav.gallery',
                'Contact': 'nav.contact'
            };
            
            Object.entries(navItems).forEach(([text, key]) => {
                const elements = document.querySelectorAll(`a[href*="${text.toLowerCase().replace(' ', '')}"], a:contains("${text}")`);
                elements.forEach(el => {
                    if (el.textContent.trim() === text) {
                        el.dataset.translate = key;
                    }
                });
            });
        });
    }
}

// Initialize Multi-language System when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure other systems are loaded
    setTimeout(() => {
        window.multiLanguage = new MultiLanguageSystem();
    }, 2000);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MultiLanguageSystem;
}