// Advanced Menu Features JavaScript
class AdvancedMenuSystem {
    constructor() {
        this.menuItems = [];
        this.filteredItems = [];
        this.currentFilters = {
            category: 'all',
            dietary: 'all',
            priceRange: 'all',
            spiceLevel: 'all',
            cookingTime: 'all'
        };
        this.searchTerm = '';
        this.init();
    }

    init() {
        this.loadMenuData();
        this.setupSearchFunctionality();
        this.setupFilters();
        this.setupMenuModal();
        this.initializeRatings();
        console.log('Advanced Menu System initialized');
    }

    // Enhanced menu data with nutritional info, ratings, etc.
    loadMenuData() {
        this.menuItems = [
            {
                id: 1,
                name: "Hyderabadi Biryani",
                category: "biryani",
                price: 320,
                image: "assets/Images/Biryani.jpg",
                description: "Aromatic basmati rice cooked with tender mutton pieces, saffron, and traditional spices in authentic Hyderabadi style.",
                dietary: ["non-veg"],
                spiceLevel: 3,
                cookingTime: 45,
                rating: 4.8,
                reviewCount: 147,
                calories: 650,
                protein: 35,
                carbs: 78,
                fat: 18,
                isChefRecommendation: true,
                isPopular: true,
                ingredients: ["Basmati Rice", "Mutton", "Saffron", "Fried Onions", "Yogurt", "Mint", "Traditional Spices"],
                allergens: ["Dairy"],
                preparationTime: "45 mins",
                servingSize: "1 plate (400g)"
            },
            {
                id: 2,
                name: "Paneer Butter Masala",
                category: "north-indian",
                price: 280,
                image: "assets/Images/A dish.jpg",
                description: "Soft cottage cheese cubes in rich, creamy tomato-based gravy with butter and aromatic spices.",
                dietary: ["vegetarian"],
                spiceLevel: 2,
                cookingTime: 25,
                rating: 4.6,
                reviewCount: 203,
                calories: 420,
                protein: 18,
                carbs: 25,
                fat: 28,
                isChefRecommendation: false,
                isPopular: true,
                ingredients: ["Paneer", "Tomatoes", "Cream", "Butter", "Onions", "Ginger-Garlic", "Spices"],
                allergens: ["Dairy"],
                preparationTime: "25 mins",
                servingSize: "1 bowl (300g)"
            },
            {
                id: 3,
                name: "Grilled Fish Tikka",
                category: "seafood",
                price: 380,
                image: "assets/Images/kebabs.jpg",
                description: "Fresh fish marinated in yogurt and spices, grilled to perfection in our tandoor oven.",
                dietary: ["non-veg", "gluten-free"],
                spiceLevel: 3,
                cookingTime: 20,
                rating: 4.7,
                reviewCount: 89,
                calories: 320,
                protein: 42,
                carbs: 8,
                fat: 12,
                isChefRecommendation: true,
                isPopular: false,
                ingredients: ["Fresh Fish", "Yogurt", "Lemon", "Ginger-Garlic", "Tandoor Spices", "Mint Chutney"],
                allergens: ["Fish", "Dairy"],
                preparationTime: "20 mins",
                servingSize: "6 pieces (250g)"
            },
            {
                id: 4,
                name: "Vegan Buddha Bowl",
                category: "healthy",
                price: 220,
                image: "assets/Images/Corn.jpg",
                description: "Nutritious bowl with quinoa, roasted vegetables, avocado, and tahini dressing.",
                dietary: ["vegan", "gluten-free"],
                spiceLevel: 1,
                cookingTime: 15,
                rating: 4.4,
                reviewCount: 56,
                calories: 380,
                protein: 12,
                carbs: 45,
                fat: 16,
                isChefRecommendation: false,
                isPopular: false,
                ingredients: ["Quinoa", "Avocado", "Roasted Vegetables", "Tahini", "Mixed Greens", "Seeds"],
                allergens: ["Sesame"],
                preparationTime: "15 mins",
                servingSize: "1 bowl (350g)"
            },
            {
                id: 5,
                name: "Tandoori Chicken",
                category: "tandoor",
                price: 340,
                image: "assets/Images/Tandoori.jpg",
                description: "Half chicken marinated in yogurt and spices, cooked in traditional tandoor oven.",
                dietary: ["non-veg", "gluten-free"],
                spiceLevel: 4,
                cookingTime: 35,
                rating: 4.9,
                reviewCount: 312,
                calories: 540,
                protein: 48,
                carbs: 6,
                fat: 22,
                isChefRecommendation: true,
                isPopular: true,
                ingredients: ["Chicken", "Yogurt", "Tandoor Spices", "Lemon", "Ginger-Garlic", "Red Chili"],
                allergens: ["Dairy"],
                preparationTime: "35 mins",
                servingSize: "Half chicken (400g)"
            }
        ];

        this.filteredItems = [...this.menuItems];
        this.renderMenuItems();
    }

    setupSearchFunctionality() {
        const searchInput = document.querySelector('.menu-search-input');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.applyFilters();
            });

            // Add search suggestions
            this.setupSearchSuggestions(searchInput);
        }
    }

    setupSearchSuggestions(searchInput) {
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        searchInput.parentNode.appendChild(suggestionsContainer);

        searchInput.addEventListener('focus', () => {
            this.showSearchSuggestions(suggestionsContainer);
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });
    }

    showSearchSuggestions(container) {
        const suggestions = [
            'Biryani', 'Tandoori', 'Vegetarian', 'Spicy', 'Quick meals', 
            'Chef\'s special', 'Low calorie', 'High protein'
        ];

        container.innerHTML = suggestions.map(suggestion => 
            `<div class="suggestion-item" onclick="advancedMenu.selectSuggestion('${suggestion}')">${suggestion}</div>`
        ).join('');
        
        container.style.display = 'block';
    }

    selectSuggestion(suggestion) {
        const searchInput = document.querySelector('.menu-search-input');
        searchInput.value = suggestion;
        this.searchTerm = suggestion.toLowerCase();
        this.applyFilters();
        document.querySelector('.search-suggestions').style.display = 'none';
    }

    setupFilters() {
        // Category filter
        const categoryFilter = document.querySelector('#categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.applyFilters();
            });
        }

        // Dietary filter
        const dietaryFilter = document.querySelector('#dietaryFilter');
        if (dietaryFilter) {
            dietaryFilter.addEventListener('change', (e) => {
                this.currentFilters.dietary = e.target.value;
                this.applyFilters();
            });
        }

        // Price range filter
        const priceFilter = document.querySelector('#priceFilter');
        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                this.currentFilters.priceRange = e.target.value;
                this.applyFilters();
            });
        }

        // Spice level filter
        const spiceFilter = document.querySelector('#spiceFilter');
        if (spiceFilter) {
            spiceFilter.addEventListener('change', (e) => {
                this.currentFilters.spiceLevel = e.target.value;
                this.applyFilters();
            });
        }
    }

    applyFilters() {
        this.filteredItems = this.menuItems.filter(item => {
            // Search term filter
            const matchesSearch = !this.searchTerm || 
                item.name.toLowerCase().includes(this.searchTerm) ||
                item.description.toLowerCase().includes(this.searchTerm) ||
                item.ingredients.some(ingredient => 
                    ingredient.toLowerCase().includes(this.searchTerm)
                ) ||
                item.category.toLowerCase().includes(this.searchTerm);

            // Category filter
            const matchesCategory = this.currentFilters.category === 'all' || 
                item.category === this.currentFilters.category;

            // Dietary filter
            const matchesDietary = this.currentFilters.dietary === 'all' || 
                item.dietary.includes(this.currentFilters.dietary);

            // Price range filter
            const matchesPrice = this.matchesPriceRange(item.price);

            // Spice level filter
            const matchesSpice = this.currentFilters.spiceLevel === 'all' || 
                this.matchesSpiceLevel(item.spiceLevel);

            return matchesSearch && matchesCategory && matchesDietary && matchesPrice && matchesSpice;
        });

        this.renderMenuItems();
        this.updateSearchCount();
    }

    matchesPriceRange(price) {
        switch (this.currentFilters.priceRange) {
            case 'budget': return price <= 200;
            case 'mid': return price > 200 && price <= 350;
            case 'premium': return price > 350;
            default: return true;
        }
    }

    matchesSpiceLevel(level) {
        switch (this.currentFilters.spiceLevel) {
            case 'mild': return level <= 2;
            case 'medium': return level === 3;
            case 'hot': return level >= 4;
            default: return true;
        }
    }

    renderMenuItems() {
        const container = document.querySelector('.menu-items-grid');
        if (!container) return;

        if (this.filteredItems.length === 0) {
            container.innerHTML = this.renderNoResults();
            return;
        }

        container.innerHTML = this.filteredItems.map(item => this.renderMenuItem(item)).join('');
        
        // Add event listeners to new items
        this.attachMenuItemListeners();
    }

    renderMenuItem(item) {
        const dietaryBadges = item.dietary.map(diet => {
            const badgeClass = diet === 'vegetarian' ? 'badge-veg' : 
                             diet === 'non-veg' ? 'badge-non-veg' :
                             diet === 'vegan' ? 'badge-vegan' :
                             diet === 'gluten-free' ? 'badge-gluten-free' : '';
            return `<span class="dietary-badge ${badgeClass}">${diet}</span>`;
        }).join('');

        const spiceIcons = '🌶️'.repeat(item.spiceLevel);
        const ratingStars = this.renderStars(item.rating);

        return `
            <div class="menu-item-enhanced" data-item-id="${item.id}">
                ${item.isChefRecommendation ? '<div class="chef-recommendation">👨‍🍳 Chef\'s Choice</div>' : ''}
                <div class="menu-item-image-container">
                    <img src="${item.image}" alt="${item.name}" class="menu-item-image" loading="lazy">
                    <div class="image-overlay"></div>
                    <div class="quick-actions">
                        <button class="quick-action-btn" title="View Details" onclick="advancedMenu.openMenuModal(${item.id})">
                            <i class="fas fa-info"></i>
                        </button>
                        <button class="quick-action-btn" title="Add to Favorites" onclick="advancedMenu.toggleFavorite(${item.id})">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="quick-action-btn" title="Share" onclick="advancedMenu.shareItem(${item.id})">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
                </div>
                <div class="menu-item-content">
                    <div class="dietary-badges">${dietaryBadges}</div>
                    <div class="menu-item-header">
                        <h3 class="menu-item-title">${item.name}</h3>
                        <span class="menu-item-price">₹${item.price}</span>
                    </div>
                    <div class="menu-item-rating">
                        <div class="rating-stars">${ratingStars}</div>
                        <span class="rating-count">(${item.reviewCount} reviews)</span>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    <div class="menu-item-details">
                        <div class="detail-row">
                            <span class="detail-label">Spice Level:</span>
                            <span class="detail-value">${spiceIcons} (${item.spiceLevel}/5)</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Prep Time:</span>
                            <span class="detail-value">${item.cookingTime} mins</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Calories:</span>
                            <span class="detail-value">${item.calories} kcal</span>
                        </div>
                    </div>
                    <div class="nutrition-info">
                        <div class="nutrition-title">Nutritional Info (per serving)</div>
                        <div class="nutrition-grid">
                            <div class="nutrition-item">Protein: <span class="nutrition-value">${item.protein}g</span></div>
                            <div class="nutrition-item">Carbs: <span class="nutrition-value">${item.carbs}g</span></div>
                            <div class="nutrition-item">Fat: <span class="nutrition-value">${item.fat}g</span></div>
                            <div class="nutrition-item">Calories: <span class="nutrition-value">${item.calories}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star star filled"></i>';
        }

        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt star filled"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star star"></i>';
        }

        return stars;
    }

    renderNoResults() {
        return `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <div class="no-results-text">No dishes found</div>
                <div class="no-results-suggestion">Try adjusting your search or filters</div>
            </div>
        `;
    }

    updateSearchCount() {
        const countElement = document.querySelector('.search-count');
        if (countElement) {
            const total = this.menuItems.length;
            const showing = this.filteredItems.length;
            countElement.textContent = `Showing ${showing} of ${total} dishes`;
        }
    }

    attachMenuItemListeners() {
        const menuItems = document.querySelectorAll('.menu-item-enhanced');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.quick-actions')) {
                    const itemId = parseInt(item.dataset.itemId);
                    this.openMenuModal(itemId);
                }
            });
        });
    }

    setupMenuModal() {
        // Create modal if it doesn't exist
        if (!document.querySelector('.menu-modal')) {
            const modal = document.createElement('div');
            modal.className = 'menu-modal';
            modal.innerHTML = '<div class="menu-modal-content"></div>';
            document.body.appendChild(modal);

            // Close modal on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeMenuModal();
                }
            });
        }
    }

    openMenuModal(itemId) {
        const item = this.menuItems.find(i => i.id === itemId);
        if (!item) return;

        const modal = document.querySelector('.menu-modal');
        const content = modal.querySelector('.menu-modal-content');

        content.innerHTML = `
            <button class="modal-close" onclick="advancedMenu.closeMenuModal()">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-header">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 300px; object-fit: cover;">
                ${item.isChefRecommendation ? '<div class="chef-recommendation">👨‍🍳 Chef\'s Choice</div>' : ''}
            </div>
            <div class="modal-body" style="padding: 2rem;">
                <h2 style="font-family: var(--font-primary); margin-bottom: 1rem;">${item.name}</h2>
                <div class="dietary-badges" style="margin-bottom: 1rem;">
                    ${item.dietary.map(diet => `<span class="dietary-badge badge-${diet}">${diet}</span>`).join('')}
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <div class="rating-stars">${this.renderStars(item.rating)}</div>
                    <div class="price" style="font-size: 2rem; font-weight: bold; color: var(--primary-color);">₹${item.price}</div>
                </div>
                <p style="margin-bottom: 1.5rem; line-height: 1.6;">${item.description}</p>
                
                <h3>Ingredients</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                    ${item.ingredients.map(ingredient => `<span style="background: rgba(212,175,55,0.1); padding: 0.25rem 0.5rem; border-radius: 1rem; font-size: 0.8rem;">${ingredient}</span>`).join('')}
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <h3>Nutritional Information</h3>
                        <div class="nutrition-grid">
                            <div>Calories: <strong>${item.calories} kcal</strong></div>
                            <div>Protein: <strong>${item.protein}g</strong></div>
                            <div>Carbohydrates: <strong>${item.carbs}g</strong></div>
                            <div>Fat: <strong>${item.fat}g</strong></div>
                        </div>
                    </div>
                    <div>
                        <h3>Details</h3>
                        <div>
                            <p><strong>Preparation Time:</strong> ${item.preparationTime}</p>
                            <p><strong>Serving Size:</strong> ${item.servingSize}</p>
                            <p><strong>Spice Level:</strong> ${'🌶️'.repeat(item.spiceLevel)} (${item.spiceLevel}/5)</p>
                            <p><strong>Allergens:</strong> ${item.allergens.join(', ')}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMenuModal() {
        const modal = document.querySelector('.menu-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggleFavorite(itemId) {
        console.log(`Toggled favorite for item ${itemId}`);
        // Implementation for favorites functionality
        this.showNotification('Added to favorites! ❤️');
    }

    shareItem(itemId) {
        const item = this.menuItems.find(i => i.id === itemId);
        if (navigator.share) {
            navigator.share({
                title: item.name,
                text: item.description,
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = `${window.location.href}?dish=${itemId}`;
            navigator.clipboard.writeText(url);
            this.showNotification('Link copied to clipboard! 📋');
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'menu-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-gradient);
            color: var(--text-dark);
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: var(--shadow-medium);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    initializeRatings() {
        // Initialize interactive rating system
        this.setupRatingInteraction();
    }

    setupRatingInteraction() {
        // Add click handlers for rating stars
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('star')) {
                this.handleRatingClick(e.target);
            }
        });
    }

    handleRatingClick(starElement) {
        console.log('Rating clicked - functionality to be implemented');
        // Implementation for rating dishes
    }
}

// Initialize the advanced menu system
let advancedMenu;

// Additional CSS for notifications and suggestions
const additionalStyles = `
    .search-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 0.5rem;
        box-shadow: var(--shadow-medium);
        z-index: 1000;
        display: none;
        max-height: 200px;
        overflow-y: auto;
    }

    .suggestion-item {
        padding: 0.75rem;
        cursor: pointer;
        transition: all 0.2s ease;
        border-bottom: 1px solid rgba(212, 175, 55, 0.1);
    }

    .suggestion-item:hover {
        background: rgba(212, 175, 55, 0.1);
        color: var(--primary-color);
    }

    .menu-notification {
        animation: slideInRight 0.3s ease;
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    advancedMenu = new AdvancedMenuSystem();
});