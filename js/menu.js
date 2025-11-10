// Menu Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initMenuFiltering();
    initMenuModal();
    initMenuSearch();
    initMenuAnimations();
});

// Menu category filtering
function initMenuFiltering() {
    const navButtons = document.querySelectorAll('.menu-nav-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter categories
            filterMenuCategories(category);
            
            // Track menu filtering
            trackMenuFilter(category);
        });
    });
}

function filterMenuCategories(category) {
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuCategories.forEach(categoryElement => {
        const categoryData = categoryElement.dataset.category;
        
        if (category === 'all' || categoryData === category) {
            categoryElement.style.display = 'block';
            categoryElement.classList.add('animate-in');
        } else {
            categoryElement.style.display = 'none';
            categoryElement.classList.remove('animate-in');
        }
    });
    
    // Smooth scroll to menu content
    if (category !== 'all') {
        const menuContent = document.querySelector('.menu-content');
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const menuNavHeight = document.querySelector('.menu-nav-section').offsetHeight;
        
        window.scrollTo({
            top: menuContent.offsetTop - navbarHeight - menuNavHeight - 20,
            behavior: 'smooth'
        });
    }
}

// Order modal functionality
function initMenuModal() {
    const modal = document.getElementById('orderModal');
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeOrderModal();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeOrderModal();
        }
    });
}

function openOrderModal() {
    const modal = document.getElementById('orderModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Track modal open
    trackEvent('order_modal_open', {
        event_category: 'engagement',
        event_label: 'order_modal'
    });
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Menu search functionality
function initMenuSearch() {
    // Create search input dynamically if needed
    const searchContainer = document.createElement('div');
    searchContainer.className = 'menu-search-container';
    searchContainer.innerHTML = `
        <div class="menu-search">
            <i class="fas fa-search"></i>
            <input type="text" id="menuSearch" placeholder="Search dishes...">
            <button id="clearSearch" class="clear-search" style="display: none;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Insert search before menu content
    const menuContent = document.querySelector('.menu-content');
    menuContent.parentNode.insertBefore(searchContainer, menuContent);
    
    const searchInput = document.getElementById('menuSearch');
    const clearButton = document.getElementById('clearSearch');
    
    searchInput.addEventListener('input', handleMenuSearch);
    clearButton.addEventListener('click', clearMenuSearch);
}

function handleMenuSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const clearButton = document.getElementById('clearSearch');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    // Show/hide clear button
    clearButton.style.display = searchTerm ? 'block' : 'none';
    
    if (!searchTerm) {
        // Show all items and categories
        menuItems.forEach(item => {
            item.style.display = 'block';
        });
        menuCategories.forEach(category => {
            category.style.display = 'block';
        });
        return;
    }
    
    let hasVisibleItems = false;
    
    menuCategories.forEach(category => {
        let categoryHasVisibleItems = false;
        const categoryItems = category.querySelectorAll('.menu-item');
        
        categoryItems.forEach(item => {
            const itemName = item.querySelector('h3').textContent.toLowerCase();
            const itemDescription = item.querySelector('p').textContent.toLowerCase();
            
            if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
                item.style.display = 'block';
                categoryHasVisibleItems = true;
                hasVisibleItems = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide category based on whether it has visible items
        category.style.display = categoryHasVisibleItems ? 'block' : 'none';
    });
    
    // Show "no results" message if needed
    showNoResultsMessage(!hasVisibleItems, searchTerm);
    
    // Track search
    trackMenuSearch(searchTerm);
}

function clearMenuSearch() {
    const searchInput = document.getElementById('menuSearch');
    const clearButton = document.getElementById('clearSearch');
    
    searchInput.value = '';
    clearButton.style.display = 'none';
    
    // Reset all items visibility
    const menuItems = document.querySelectorAll('.menu-item');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuItems.forEach(item => {
        item.style.display = 'block';
    });
    
    menuCategories.forEach(category => {
        category.style.display = 'block';
    });
    
    // Remove no results message
    removeNoResultsMessage();
}

function showNoResultsMessage(show, searchTerm) {
    removeNoResultsMessage();
    
    if (show) {
        const noResultsElement = document.createElement('div');
        noResultsElement.className = 'no-results-message';
        noResultsElement.innerHTML = `
            <div class="no-results-content">
                <i class="fas fa-search"></i>
                <h3>No dishes found</h3>
                <p>Sorry, we couldn't find any dishes matching "${searchTerm}".</p>
                <p>Try searching for a different dish or browse our categories above.</p>
            </div>
        `;
        
        const menuContent = document.querySelector('.menu-content .container');
        menuContent.appendChild(noResultsElement);
    }
}

function removeNoResultsMessage() {
    const noResultsMessage = document.querySelector('.no-results-message');
    if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

// Menu animations
function initMenuAnimations() {
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
    
    // Observe menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        observer.observe(item);
    });
}

// Tracking functions
function trackMenuFilter(category) {
    console.log(`Menu filtered: ${category}`);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'menu_filter', {
            event_category: 'menu_interaction',
            event_label: category
        });
    }
}

function trackMenuSearch(searchTerm) {
    console.log(`Menu searched: ${searchTerm}`);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'menu_search', {
            event_category: 'menu_interaction',
            event_label: searchTerm
        });
    }
}

function trackEvent(eventName, parameters) {
    console.log(`Event tracked: ${eventName}`, parameters);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
}

// Menu item interaction tracking
document.addEventListener('click', (e) => {
    const menuItem = e.target.closest('.menu-item');
    if (menuItem) {
        const itemName = menuItem.querySelector('h3').textContent;
        const category = menuItem.closest('.menu-category').dataset.category;
        
        trackEvent('menu_item_click', {
            event_category: 'menu_interaction',
            event_label: `${category}:${itemName}`
        });
    }
});

// Order platform tracking
document.addEventListener('click', (e) => {
    const orderPlatform = e.target.closest('.order-platform');
    if (orderPlatform) {
        const platformName = orderPlatform.querySelector('span').textContent;
        
        trackEvent('order_platform_click', {
            event_category: 'conversion',
            event_label: platformName
        });
    }
});

// Add menu search styles
const menuSearchStyles = `
.menu-search-container {
    background: var(--bg-white);
    padding: 20px 0;
    border-bottom: 1px solid var(--border-light);
}

.menu-search {
    max-width: 400px;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
}

.menu-search i.fa-search {
    position: absolute;
    left: 15px;
    color: var(--text-light);
    z-index: 2;
}

.menu-search input {
    width: 100%;
    padding: 15px 15px 15px 45px;
    border: 2px solid var(--border-light);
    border-radius: 25px;
    font-size: 1rem;
    font-family: var(--font-secondary);
    transition: var(--transition);
}

.menu-search input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}

.clear-search {
    position: absolute;
    right: 15px;
    background: none;
    border: none;
    color: var(--text-light);
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: var(--transition);
}

.clear-search:hover {
    background: var(--bg-light);
    color: var(--text-dark);
}

.no-results-message {
    text-align: center;
    padding: 60px 20px;
}

.no-results-content {
    max-width: 400px;
    margin: 0 auto;
}

.no-results-content i {
    font-size: 3rem;
    color: var(--text-light);
    margin-bottom: 20px;
}

.no-results-content h3 {
    font-family: var(--font-primary);
    font-size: 1.5rem;
    color: var(--text-dark);
    margin-bottom: 15px;
}

.no-results-content p {
    color: var(--text-light);
    line-height: 1.6;
    margin-bottom: 10px;
}

@media (max-width: 768px) {
    .menu-search {
        max-width: 300px;
    }
    
    .menu-search input {
        font-size: 0.95rem;
    }
}
`;

// Inject menu search styles
const menuStyleSheet = document.createElement('style');
menuStyleSheet.textContent = menuSearchStyles;
document.head.appendChild(menuStyleSheet);

// Menu utilities
const MenuUtils = {
    // Get menu items by category
    getItemsByCategory: function(category) {
        const categoryElement = document.querySelector(`[data-category="${category}"]`);
        return categoryElement ? categoryElement.querySelectorAll('.menu-item') : [];
    },
    
    // Get all menu categories
    getAllCategories: function() {
        return Array.from(document.querySelectorAll('.menu-category')).map(el => ({
            name: el.dataset.category,
            title: el.querySelector('.category-title').textContent.trim(),
            itemCount: el.querySelectorAll('.menu-item').length
        }));
    },
    
    // Calculate average price by category
    getAveragePriceByCategory: function(category) {
        const items = this.getItemsByCategory(category);
        const prices = Array.from(items).map(item => {
            const priceText = item.querySelector('.price').textContent;
            return parseInt(priceText.replace('₹', ''));
        });
        
        if (prices.length === 0) return 0;
        return Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length);
    },
    
    // Get popular items (those with badges)
    getPopularItems: function() {
        return document.querySelectorAll('.menu-item-badge');
    },
    
    // Format price for display
    formatPrice: function(price) {
        return `₹${price}`;
    }
};

// Export for external use
window.MenuPage = {
    openOrderModal,
    closeOrderModal,
    filterMenuCategories,
    utils: MenuUtils
};