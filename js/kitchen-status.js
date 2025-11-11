// Live Kitchen Status & Order Tracking System
class KitchenStatusSystem {
    constructor() {
        this.isLive = true;
        this.kitchenStats = {};
        this.popularDishes = [];
        this.activityLog = [];
        this.preparationTimes = {};
        this.updateInterval = null;
        this.init();
    }

    init() {
        this.loadInitialData();
        this.startLiveUpdates();
        this.setupEventListeners();
        this.renderDashboard();
        console.log('Kitchen Status System initialized');
    }

    loadInitialData() {
        // Simulate real-time kitchen data
        this.kitchenStats = {
            activeOrders: this.generateRandomStat(15, 45),
            completedToday: this.generateRandomStat(120, 200),
            avgPrepTime: this.generateRandomStat(18, 25),
            kitchenLoad: this.generateRandomStat(60, 95),
            chefCount: 6,
            waitingOrders: this.generateRandomStat(3, 12)
        };

        this.popularDishes = [
            {
                rank: 1,
                name: "Hyderabadi Biryani",
                image: "assets/Images/Biryani.jpg",
                orders: 47,
                trend: "up",
                trendValue: 12
            },
            {
                rank: 2,
                name: "Tandoori Chicken",
                image: "assets/Images/Tandoori.jpg",
                orders: 38,
                trend: "up",
                trendValue: 8
            },
            {
                rank: 3,
                name: "Paneer Butter Masala",
                image: "assets/Images/A dish.jpg",
                orders: 32,
                trend: "down",
                trendValue: 3
            },
            {
                rank: 4,
                name: "Fish Tikka",
                image: "assets/Images/kebabs.jpg",
                orders: 28,
                trend: "up",
                trendValue: 15
            },
            {
                rank: 5,
                name: "Chicken Biryani",
                image: "assets/Images/Biryani.jpg",
                orders: 24,
                trend: "up",
                trendValue: 5
            }
        ];

        this.activityLog = [
            {
                time: "2 mins ago",
                title: "Order #1247 Started",
                description: "Hyderabadi Biryani for table 12 - Chef Ravi",
                icon: "fas fa-play-circle",
                type: "start"
            },
            {
                time: "5 mins ago",
                title: "Order #1245 Completed",
                description: "Tandoori Platter served to table 8",
                icon: "fas fa-check-circle",
                type: "complete"
            },
            {
                time: "8 mins ago",
                title: "Special Request",
                description: "Extra spicy for table 15 - Chicken Curry",
                icon: "fas fa-fire",
                type: "special"
            },
            {
                time: "12 mins ago",
                title: "Ingredient Alert",
                description: "Saffron running low - Manager notified",
                icon: "fas fa-exclamation-triangle",
                type: "alert"
            },
            {
                time: "15 mins ago",
                title: "Peak Hour Started",
                description: "All stations fully operational",
                icon: "fas fa-clock",
                type: "info"
            }
        ];

        this.preparationTimes = {
            "Biryani Station": { current: 25, max: 45 },
            "Tandoor Station": { current: 18, max: 30 },
            "Curry Station": { current: 12, max: 20 },
            "Chinese Station": { current: 15, max: 25 },
            "Dessert Station": { current: 8, max: 15 }
        };
    }

    generateRandomStat(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    startLiveUpdates() {
        // Update every 10 seconds
        this.updateInterval = setInterval(() => {
            this.updateKitchenStats();
            this.updatePreparationTimes();
            this.addNewActivity();
        }, 10000);

        // Update popular dishes every minute
        setInterval(() => {
            this.updatePopularDishes();
        }, 60000);
    }

    updateKitchenStats() {
        // Simulate fluctuations in kitchen stats
        this.kitchenStats.activeOrders += this.generateRandomChange(-3, 5);
        this.kitchenStats.completedToday += this.generateRandomChange(0, 3);
        this.kitchenStats.avgPrepTime += this.generateRandomChange(-2, 2);
        this.kitchenStats.kitchenLoad += this.generateRandomChange(-5, 8);
        this.kitchenStats.waitingOrders += this.generateRandomChange(-2, 3);

        // Ensure values stay within realistic bounds
        this.kitchenStats.activeOrders = Math.max(5, Math.min(50, this.kitchenStats.activeOrders));
        this.kitchenStats.avgPrepTime = Math.max(15, Math.min(30, this.kitchenStats.avgPrepTime));
        this.kitchenStats.kitchenLoad = Math.max(40, Math.min(100, this.kitchenStats.kitchenLoad));
        this.kitchenStats.waitingOrders = Math.max(0, Math.min(15, this.kitchenStats.waitingOrders));

        this.renderKitchenStats();
    }

    generateRandomChange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    updatePreparationTimes() {
        Object.keys(this.preparationTimes).forEach(station => {
            const change = this.generateRandomChange(-3, 4);
            this.preparationTimes[station].current += change;
            this.preparationTimes[station].current = Math.max(5, 
                Math.min(this.preparationTimes[station].max, this.preparationTimes[station].current));
        });

        this.renderPreparationTimes();
    }

    updatePopularDishes() {
        this.popularDishes.forEach(dish => {
            const change = this.generateRandomChange(-2, 5);
            dish.orders += change;
            dish.orders = Math.max(10, dish.orders);
            
            if (change > 2) {
                dish.trend = "up";
                dish.trendValue = Math.abs(change);
            } else if (change < -1) {
                dish.trend = "down";
                dish.trendValue = Math.abs(change);
            }
        });

        // Re-sort by orders
        this.popularDishes.sort((a, b) => b.orders - a.orders);
        this.popularDishes.forEach((dish, index) => {
            dish.rank = index + 1;
        });

        this.renderPopularDishes();
    }

    addNewActivity() {
        const activities = [
            {
                title: "Order #" + this.generateOrderId() + " Started",
                description: this.getRandomDish() + " for table " + this.generateRandomChange(1, 20),
                icon: "fas fa-play-circle",
                type: "start"
            },
            {
                title: "Order #" + this.generateOrderId() + " Completed",
                description: this.getRandomDish() + " served to table " + this.generateRandomChange(1, 20),
                icon: "fas fa-check-circle",
                type: "complete"
            },
            {
                title: "Special Request",
                description: "Custom preparation for " + this.getRandomDish(),
                icon: "fas fa-star",
                type: "special"
            }
        ];

        if (Math.random() > 0.7) { // 30% chance of new activity
            const newActivity = activities[Math.floor(Math.random() * activities.length)];
            newActivity.time = "Just now";
            
            this.activityLog.unshift(newActivity);
            
            // Keep only last 10 activities
            if (this.activityLog.length > 10) {
                this.activityLog = this.activityLog.slice(0, 10);
            }
            
            // Update timestamps
            this.updateActivityTimestamps();
            this.renderActivity();
        }
    }

    generateOrderId() {
        return Math.floor(Math.random() * 9000) + 1000;
    }

    getRandomDish() {
        const dishes = ["Biryani", "Tandoori Chicken", "Paneer Curry", "Fish Tikka", "Naan", "Dal Makhani"];
        return dishes[Math.floor(Math.random() * dishes.length)];
    }

    updateActivityTimestamps() {
        this.activityLog.forEach((activity, index) => {
            if (index === 0) {
                activity.time = "Just now";
            } else if (index === 1) {
                activity.time = "2 mins ago";
            } else {
                activity.time = (index * 3 + 2) + " mins ago";
            }
        });
    }

    setupEventListeners() {
        const refreshBtn = document.querySelector('.refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshData();
            });
        }
    }

    refreshData() {
        const refreshBtn = document.querySelector('.refresh-btn');
        if (refreshBtn) {
            const icon = refreshBtn.querySelector('i');
            icon.style.animation = 'spin 1s linear';
            
            setTimeout(() => {
                icon.style.animation = '';
            }, 1000);
        }

        // Simulate data refresh
        this.updateKitchenStats();
        this.updatePopularDishes();
        this.addNewActivity();
        
        this.showNotification('Kitchen data refreshed! 🔄');
    }

    renderDashboard() {
        this.renderKitchenStats();
        this.renderPopularDishes();
        this.renderActivity();
        this.renderPreparationTimes();
    }

    renderKitchenStats() {
        const statsContainer = document.querySelector('.kitchen-stats-grid');
        if (!statsContainer) return;

        const stats = [
            {
                icon: 'fas fa-utensils',
                number: this.kitchenStats.activeOrders,
                label: 'Active Orders',
                change: this.generateRandomChange(-2, 5),
                suffix: ''
            },
            {
                icon: 'fas fa-check-circle',
                number: this.kitchenStats.completedToday,
                label: 'Completed Today',
                change: this.generateRandomChange(5, 15),
                suffix: ''
            },
            {
                icon: 'fas fa-clock',
                number: this.kitchenStats.avgPrepTime,
                label: 'Avg Prep Time',
                change: this.generateRandomChange(-1, 2),
                suffix: 'min'
            },
            {
                icon: 'fas fa-fire',
                number: this.kitchenStats.kitchenLoad,
                label: 'Kitchen Load',
                change: this.generateRandomChange(-3, 5),
                suffix: '%'
            },
            {
                icon: 'fas fa-user-friends',
                number: this.kitchenStats.chefCount,
                label: 'Chefs Active',
                change: 0,
                suffix: ''
            },
            {
                icon: 'fas fa-hourglass-half',
                number: this.kitchenStats.waitingOrders,
                label: 'In Queue',
                change: this.generateRandomChange(-1, 3),
                suffix: ''
            }
        ];

        statsContainer.innerHTML = stats.map(stat => `
            <div class="kitchen-stat-card">
                <div class="stat-icon">
                    <i class="${stat.icon}"></i>
                </div>
                <div class="stat-number">${stat.number}${stat.suffix}</div>
                <div class="stat-label">${stat.label}</div>
                ${stat.change !== 0 ? `
                    <div class="stat-change ${stat.change > 0 ? 'positive' : 'negative'}">
                        <i class="fas fa-arrow-${stat.change > 0 ? 'up' : 'down'}"></i>
                        ${Math.abs(stat.change)}${stat.suffix} from last hour
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    renderPopularDishes() {
        const dishesContainer = document.querySelector('.popular-dishes-list');
        if (!dishesContainer) return;

        dishesContainer.innerHTML = this.popularDishes.map(dish => `
            <div class="popular-dish-item">
                <div class="dish-rank">${dish.rank}</div>
                <div class="dish-info">
                    <img src="${dish.image}" alt="${dish.name}" class="dish-image">
                    <div class="dish-details">
                        <div class="dish-name">${dish.name}</div>
                        <div class="dish-orders">${dish.orders} orders today</div>
                        <div class="dish-trend">
                            <span class="trend-arrow ${dish.trend === 'up' ? 'trend-up' : 'trend-down'}">
                                <i class="fas fa-arrow-${dish.trend}"></i>
                            </span>
                            <span class="${dish.trend === 'up' ? 'trend-up' : 'trend-down'}">
                                ${dish.trendValue}% from yesterday
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderActivity() {
        const activityContainer = document.querySelector('.activity-timeline');
        if (!activityContainer) return;

        const timelineHTML = this.activityLog.map((activity, index) => `
            <div class="activity-item">
                <div class="activity-content">
                    <div class="activity-time">${activity.time}</div>
                    <div class="activity-title-text">${activity.title}</div>
                    <div class="activity-description">${activity.description}</div>
                </div>
                <div class="activity-icon-wrapper">
                    <i class="activity-icon ${activity.icon}"></i>
                </div>
            </div>
        `).join('');

        activityContainer.innerHTML = timelineHTML;
    }

    renderPreparationTimes() {
        const prepTimesContainer = document.querySelector('.prep-time-bars');
        if (!prepTimesContainer) return;

        const prepTimesHTML = Object.entries(this.preparationTimes).map(([station, times]) => {
            const percentage = (times.current / times.max) * 100;
            const color = percentage > 80 ? '#f44336' : percentage > 60 ? '#FF9800' : '#4CAF50';
            
            return `
                <div class="prep-time-item">
                    <span class="prep-dish-name">${station}</span>
                    <div class="prep-time-bar">
                        <div class="prep-time-fill" style="width: ${percentage}%; background: linear-gradient(90deg, ${color}, ${color}dd);"></div>
                    </div>
                    <span class="prep-time-value">${times.current}min</span>
                </div>
            `;
        }).join('');

        prepTimesContainer.innerHTML = prepTimesHTML;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'kitchen-notification';
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

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// Initialize the kitchen status system
let kitchenStatus;

// CSS animations
const kitchenAnimations = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
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
    
    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
`;

// Inject animations
const animationSheet = document.createElement('style');
animationSheet.textContent = kitchenAnimations;
document.head.appendChild(animationSheet);

document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on a page with kitchen status elements
    if (document.querySelector('.kitchen-dashboard')) {
        kitchenStatus = new KitchenStatusSystem();
    }
});