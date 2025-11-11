// Virtual Tour System
class VirtualTourSystem {
    constructor() {
        this.currentScene = 'entrance';
        this.scenes = {
            entrance: {
                name: 'Restaurant Entrance',
                description: 'Welcome to Oasis Restaurant! Our grand entrance welcomes you with traditional architecture and modern elegance.',
                image: 'assets/Images/Entrance.jpg',
                hotspots: [
                    { x: 75, y: 60, target: 'dining-main', icon: 'fas fa-arrow-right', info: 'Enter Main Dining Area' },
                    { x: 25, y: 80, target: 'outdoor', icon: 'fas fa-tree', info: 'Outdoor Seating' }
                ]
            },
            'dining-main': {
                name: 'Main Dining Hall',
                description: 'Our spacious main dining area features comfortable seating for families and groups, with traditional decor creating a warm atmosphere.',
                image: 'assets/Images/Interior-1.jpg',
                hotspots: [
                    { x: 20, y: 30, target: 'kitchen-view', icon: 'fas fa-utensils', info: 'Kitchen View' },
                    { x: 80, y: 70, target: 'private-dining', icon: 'fas fa-users', info: 'Private Dining' },
                    { x: 50, y: 20, target: 'entrance', icon: 'fas fa-arrow-left', info: 'Back to Entrance' }
                ]
            },
            'private-dining': {
                name: 'Private Dining Area',
                description: 'Perfect for intimate gatherings and special occasions. This cozy section offers privacy while maintaining the restaurant\'s welcoming ambiance.',
                image: 'assets/Images/Interior-2.jpg',
                hotspots: [
                    { x: 30, y: 60, target: 'dining-main', icon: 'fas fa-arrow-left', info: 'Main Dining Area' },
                    { x: 70, y: 40, target: 'vip-section', icon: 'fas fa-crown', info: 'VIP Section' }
                ]
            },
            'kitchen-view': {
                name: 'Open Kitchen View',
                description: 'Watch our skilled chefs prepare your meals in our state-of-the-art kitchen. Fresh ingredients and traditional cooking methods meet modern efficiency.',
                image: 'assets/Images/Food-3.jpg',
                hotspots: [
                    { x: 60, y: 80, target: 'dining-main', icon: 'fas fa-arrow-left', info: 'Back to Dining' },
                    { x: 20, y: 30, target: 'chef-counter', icon: 'fas fa-chef-hat', info: 'Chef Counter' }
                ]
            },
            'outdoor': {
                name: 'Outdoor Terrace',
                description: 'Enjoy your meal under the stars in our beautiful outdoor seating area, surrounded by lush greenery and gentle lighting.',
                image: 'assets/Images/Ambiance-1.jpg',
                hotspots: [
                    { x: 40, y: 20, target: 'entrance', icon: 'fas fa-arrow-left', info: 'Back to Entrance' },
                    { x: 80, y: 60, target: 'garden-view', icon: 'fas fa-leaf', info: 'Garden View' }
                ]
            },
            'vip-section': {
                name: 'VIP Dining Section',
                description: 'Our exclusive VIP area offers the ultimate dining experience with personalized service and premium ambiance.',
                image: 'assets/Images/Ambiance-2.jpg',
                hotspots: [
                    { x: 30, y: 70, target: 'private-dining', icon: 'fas fa-arrow-left', info: 'Private Dining' }
                ]
            },
            'chef-counter': {
                name: 'Chef\'s Counter',
                description: 'Get front-row seats to culinary artistry at our chef\'s counter, where you can interact with our master chefs.',
                image: 'assets/Images/Food-1.jpg',
                hotspots: [
                    { x: 50, y: 80, target: 'kitchen-view', icon: 'fas fa-arrow-left', info: 'Kitchen View' }
                ]
            },
            'garden-view': {
                name: 'Garden Dining',
                description: 'Dine surrounded by nature in our garden section, where every meal becomes a peaceful retreat from the city.',
                image: 'assets/Images/Food-2.jpg',
                hotspots: [
                    { x: 20, y: 30, target: 'outdoor', icon: 'fas fa-arrow-left', info: 'Outdoor Terrace' }
                ]
            }
        };
        
        this.tables = this.generateTableLayout();
        this.selectedTable = null;
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        this.rotation = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        this.createTourInterface();
        this.bindEvents();
        this.loadScene(this.currentScene);
        this.updateTablePreview();
        this.startAutoRotation();
    }
    
    createTourInterface() {
        const tourSection = document.createElement('div');
        tourSection.className = 'virtual-tour-section';
        tourSection.id = 'virtual-tour';
        
        tourSection.innerHTML = `
            <div class="container">
                <div class="tour-header">
                    <h2><i class="fas fa-vr-cardboard"></i> Virtual Restaurant Tour</h2>
                    <p>Take a 360° journey through our restaurant and explore every corner before your visit</p>
                </div>
                
                <div class="tour-container">
                    <div class="tour-viewer">
                        <div class="tour-canvas" id="tour-canvas">
                            <div class="tour-scene" id="tour-scene"></div>
                            <div class="tour-loading" id="tour-loading">Loading virtual tour...</div>
                        </div>
                        
                        <div class="tour-controls">
                            <button class="tour-control-btn" id="zoom-in" title="Zoom In">
                                <i class="fas fa-search-plus"></i>
                            </button>
                            <button class="tour-control-btn" id="zoom-out" title="Zoom Out">
                                <i class="fas fa-search-minus"></i>
                            </button>
                            <button class="tour-control-btn" id="fullscreen" title="Fullscreen">
                                <i class="fas fa-expand"></i>
                            </button>
                            <button class="tour-control-btn" id="auto-rotate" title="Auto Rotate">
                                <i class="fas fa-sync-alt"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="tour-sidebar">
                        <div class="tour-locations">
                            <h3><i class="fas fa-map-marked-alt"></i> Explore Areas</h3>
                            <div id="location-list"></div>
                        </div>
                        
                        <div class="table-preview">
                            <h3><i class="fas fa-chair"></i> Table Preview</h3>
                            <div class="table-grid" id="table-grid"></div>
                            <div class="table-legend">
                                <div class="legend-item">
                                    <div class="legend-dot available"></div>
                                    <span>Available</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-dot occupied"></div>
                                    <span>Occupied</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-dot reserved"></div>
                                    <span>Reserved</span>
                                </div>
                            </div>
                            <button class="btn btn-primary" style="width: 100%; margin-top: 15px;" onclick="openReservationModal()">
                                <i class="fas fa-calendar-plus"></i> Reserve Table
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tour-info-panel" id="tour-info-panel">
                <button class="info-close" onclick="virtualTour.hideInfo()">&times;</button>
                <h4 id="info-title"></h4>
                <p id="info-description"></p>
            </div>
        `;
        
        // Insert after kitchen status section
        const kitchenStatus = document.getElementById('kitchen-status');
        if (kitchenStatus) {
            kitchenStatus.parentNode.insertBefore(tourSection, kitchenStatus.nextSibling);
        } else {
            // Fallback: insert before reviews section
            const reviewsSection = document.querySelector('.reviews-section');
            if (reviewsSection) {
                reviewsSection.parentNode.insertBefore(tourSection, reviewsSection);
            } else {
                // Final fallback: insert before contact section
                const contactSection = document.getElementById('contact');
                contactSection.parentNode.insertBefore(tourSection, contactSection);
            }
        }
    }
    
    bindEvents() {
        const canvas = document.getElementById('tour-canvas');
        const scene = document.getElementById('tour-scene');
        
        // Mouse events for dragging
        canvas.addEventListener('mousedown', (e) => this.startDrag(e));
        canvas.addEventListener('mousemove', (e) => this.drag(e));
        canvas.addEventListener('mouseup', () => this.endDrag());
        canvas.addEventListener('mouseleave', () => this.endDrag());
        
        // Touch events for mobile
        canvas.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.drag(e.touches[0]);
        });
        canvas.addEventListener('touchend', () => this.endDrag());
        
        // Control buttons
        document.getElementById('zoom-in').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoom-out').addEventListener('click', () => this.zoomOut());
        document.getElementById('fullscreen').addEventListener('click', () => this.toggleFullscreen());
        document.getElementById('auto-rotate').addEventListener('click', () => this.toggleAutoRotate());
        
        // Hotspot clicks
        scene.addEventListener('click', (e) => this.handleHotspotClick(e));
    }
    
    loadScene(sceneId) {
        const scene = this.scenes[sceneId];
        if (!scene) return;
        
        this.currentScene = sceneId;
        const sceneElement = document.getElementById('tour-scene');
        const loading = document.getElementById('tour-loading');
        
        loading.style.display = 'flex';
        
        // Simulate loading time
        setTimeout(() => {
            sceneElement.style.backgroundImage = `url('${scene.image}')`;
            this.createHotspots(scene.hotspots);
            this.updateLocationList();
            loading.style.display = 'none';
        }, 800);
    }
    
    createHotspots(hotspots) {
        const sceneElement = document.getElementById('tour-scene');
        
        // Clear existing hotspots
        const existingHotspots = sceneElement.querySelectorAll('.tour-hotspot');
        existingHotspots.forEach(hotspot => hotspot.remove());
        
        // Create new hotspots
        hotspots.forEach((hotspot, index) => {
            const hotspotElement = document.createElement('div');
            hotspotElement.className = 'tour-hotspot';
            hotspotElement.style.left = `${hotspot.x}%`;
            hotspotElement.style.top = `${hotspot.y}%`;
            hotspotElement.innerHTML = `<i class="${hotspot.icon}"></i>`;
            hotspotElement.dataset.target = hotspot.target;
            hotspotElement.dataset.info = hotspot.info;
            
            hotspotElement.addEventListener('click', () => {
                if (hotspot.target) {
                    this.loadScene(hotspot.target);
                }
            });
            
            hotspotElement.addEventListener('mouseenter', () => {
                this.showInfo(hotspot.info, hotspot.info);
            });
            
            sceneElement.appendChild(hotspotElement);
        });
    }
    
    updateLocationList() {
        const locationList = document.getElementById('location-list');
        locationList.innerHTML = '';
        
        Object.entries(this.scenes).forEach(([sceneId, scene]) => {
            const locationItem = document.createElement('div');
            locationItem.className = `location-item ${sceneId === this.currentScene ? 'active' : ''}`;
            locationItem.innerHTML = `
                <div class="location-icon">
                    <i class="fas fa-${this.getSceneIcon(sceneId)}"></i>
                </div>
                <div class="location-info">
                    <h4>${scene.name}</h4>
                    <p>${scene.description.substring(0, 60)}...</p>
                </div>
            `;
            
            locationItem.addEventListener('click', () => {
                this.loadScene(sceneId);
            });
            
            locationList.appendChild(locationItem);
        });
    }
    
    getSceneIcon(sceneId) {
        const icons = {
            'entrance': 'door-open',
            'dining-main': 'utensils',
            'private-dining': 'users',
            'kitchen-view': 'fire',
            'outdoor': 'tree',
            'vip-section': 'crown',
            'chef-counter': 'chef-hat',
            'garden-view': 'leaf'
        };
        return icons[sceneId] || 'map-marker-alt';
    }
    
    generateTableLayout() {
        const tables = [];
        const statuses = ['available', 'occupied', 'reserved'];
        
        for (let i = 1; i <= 12; i++) {
            tables.push({
                id: i,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                capacity: Math.floor(Math.random() * 6) + 2, // 2-8 people
                location: i <= 4 ? 'main' : i <= 8 ? 'private' : 'outdoor'
            });
        }
        
        return tables;
    }
    
    updateTablePreview() {
        const tableGrid = document.getElementById('table-grid');
        tableGrid.innerHTML = '';
        
        this.tables.forEach(table => {
            const tableSeat = document.createElement('div');
            tableSeat.className = `table-seat ${table.status}`;
            tableSeat.textContent = `T${table.id}`;
            tableSeat.title = `Table ${table.id} - ${table.capacity} seats - ${table.status}`;
            
            if (table.status === 'available') {
                tableSeat.addEventListener('click', () => {
                    // Clear previous selection
                    document.querySelectorAll('.table-seat.selected').forEach(seat => {
                        seat.classList.remove('selected');
                        seat.classList.add('available');
                    });
                    
                    // Select current table
                    tableSeat.classList.remove('available');
                    tableSeat.classList.add('selected');
                    this.selectedTable = table.id;
                });
            }
            
            tableGrid.appendChild(tableSeat);
        });
    }
    
    showInfo(title, description) {
        const infoPanel = document.getElementById('tour-info-panel');
        const infoTitle = document.getElementById('info-title');
        const infoDescription = document.getElementById('info-description');
        
        infoTitle.textContent = title;
        infoDescription.textContent = description;
        infoPanel.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            this.hideInfo();
        }, 5000);
    }
    
    hideInfo() {
        const infoPanel = document.getElementById('tour-info-panel');
        infoPanel.classList.remove('show');
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.dragStart.x = e.clientX;
        this.dragStart.y = e.clientY;
        document.getElementById('tour-canvas').style.cursor = 'grabbing';
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        const deltaX = e.clientX - this.dragStart.x;
        const deltaY = e.clientY - this.dragStart.y;
        
        this.rotation.y += deltaX * 0.5;
        this.rotation.x += deltaY * 0.5;
        
        // Limit vertical rotation
        this.rotation.x = Math.max(-45, Math.min(45, this.rotation.x));
        
        this.applyRotation();
        
        this.dragStart.x = e.clientX;
        this.dragStart.y = e.clientY;
    }
    
    endDrag() {
        this.isDragging = false;
        document.getElementById('tour-canvas').style.cursor = 'grab';
    }
    
    applyRotation() {
        const scene = document.getElementById('tour-scene');
        scene.style.transform = `rotateX(${this.rotation.x}deg) rotateY(${this.rotation.y}deg)`;
    }
    
    zoomIn() {
        const scene = document.getElementById('tour-scene');
        const currentScale = parseFloat(scene.style.transform.match(/scale\(([^)]+)\)/) ?.[1] || 1);
        const newScale = Math.min(currentScale * 1.2, 3);
        scene.style.transform += ` scale(${newScale})`;
    }
    
    zoomOut() {
        const scene = document.getElementById('tour-scene');
        const currentScale = parseFloat(scene.style.transform.match(/scale\(([^)]+)\)/) ?.[1] || 1);
        const newScale = Math.max(currentScale * 0.8, 0.5);
        scene.style.transform += ` scale(${newScale})`;
    }
    
    toggleFullscreen() {
        const tourViewer = document.querySelector('.tour-viewer');
        if (!document.fullscreenElement) {
            tourViewer.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
    
    toggleAutoRotate() {
        const btn = document.getElementById('auto-rotate');
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = null;
            btn.classList.remove('active');
        } else {
            this.startAutoRotation();
            btn.classList.add('active');
        }
    }
    
    startAutoRotation() {
        this.autoRotateInterval = setInterval(() => {
            if (!this.isDragging) {
                this.rotation.y += 0.5;
                this.applyRotation();
            }
        }, 50);
        
        const btn = document.getElementById('auto-rotate');
        if (btn) btn.classList.add('active');
    }
    
    handleHotspotClick(e) {
        if (e.target.classList.contains('tour-hotspot')) {
            const target = e.target.dataset.target;
            if (target) {
                this.loadScene(target);
            }
        }
    }
}

// Initialize Virtual Tour when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure other systems are loaded
    setTimeout(() => {
        window.virtualTour = new VirtualTourSystem();
    }, 1000);
});

// Reservation Modal Function (to be integrated with existing reservation system)
function openReservationModal() {
    const selectedTable = window.virtualTour?.selectedTable;
    if (selectedTable) {
        alert(`Opening reservation for Table ${selectedTable}. This will integrate with your existing reservation system.`);
        // Here you would integrate with your existing reservation system
        // For now, we'll show an alert
    } else {
        alert('Please select a table first by clicking on an available table (green).');
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VirtualTourSystem;
}