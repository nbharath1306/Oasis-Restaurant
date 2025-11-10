// Service Worker for Oasis Restaurant PWA
const CACHE_NAME = 'oasis-restaurant-v1.0.0';
const STATIC_CACHE = 'oasis-static-v1';
const DYNAMIC_CACHE = 'oasis-dynamic-v1';

// Files to cache
const STATIC_FILES = [
    '/',
    '/index.html',
    '/menu.html',
    '/reservation.html',
    '/css/style.css',
    '/css/advanced-animations.css',
    '/css/reservation.css',
    '/js/script.js',
    '/js/advanced-features.js',
    '/js/reservation.js',
    '/manifest.json',
    '/assets/Images/Entrance.jpg',
    '/assets/Images/Ambience.jpg',
    '/assets/Images/Food-Display.jpg',
    '/assets/Images/Kitchen-Staff.jpg',
    '/assets/Images/Dining-Area.jpg',
    '/assets/Images/Service-Counter.jpg',
    '/assets/Images/Outdoor-Seating.jpg',
    '/assets/Images/Interior-View.jpg',
    '/assets/Images/Menu-Board.jpg',
    '/assets/Images/Fresh-Ingredients.jpg',
    '/assets/Images/A dish.jpg',
    '/assets/Images/Biryani.jpg',
    '/assets/Images/Corn.jpg',
    '/assets/Images/Empty.jpg',
    '/assets/Images/Family.jpg',
    '/assets/Images/French Fries.jpg',
    '/assets/Images/Fried Rice.jpg',
    '/assets/Images/Naan.jpg',
    '/assets/Images/One random Day.jpg',
    '/assets/Images/Outside.jpg',
    '/assets/Images/Soup.jpg',
    '/assets/Images/Stairs.jpg',
    '/assets/Images/Tandoori.jpg',
    '/assets/Images/Toy cars outside the resturant.jpg',
    '/assets/Images/kebabs.jpg',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Dynamic cache patterns
const DYNAMIC_CACHE_PATTERNS = [
    /^https:\/\/fonts\.googleapis\.com/,
    /^https:\/\/fonts\.gstatic\.com/,
    /^https:\/\/cdnjs\.cloudflare\.com/,
    /^https:\/\/maps\.googleapis\.com/,
    /^https:\/\/wa\.me/
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('SW: Precaching static assets');
                return cache.addAll(STATIC_FILES);
            })
            .catch((error) => {
                console.error('SW: Error during install:', error);
            })
    );
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('SW: Removing old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
    self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip Chrome extension requests
    if (url.protocol === 'chrome-extension:') {
        return;
    }

    // Skip WebSocket connections
    if (url.protocol === 'ws:' || url.protocol === 'wss:') {
        return;
    }

    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Serve from cache
                    return cachedResponse;
                }

                // Clone the request
                const fetchRequest = request.clone();

                return fetch(fetchRequest)
                    .then((response) => {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Check if should be cached dynamically
                        const shouldCache = DYNAMIC_CACHE_PATTERNS.some(pattern => 
                            pattern.test(request.url)
                        ) || request.url.includes(self.location.origin);

                        if (shouldCache) {
                            const responseClone = response.clone();
                            caches.open(DYNAMIC_CACHE)
                                .then((cache) => {
                                    cache.put(request, responseClone);
                                });
                        }

                        return response;
                    })
                    .catch((error) => {
                        console.error('SW: Fetch failed:', error);
                        
                        // Return offline fallback for HTML requests
                        if (request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }
                        
                        // Return offline fallback for images
                        if (request.headers.get('accept').includes('image')) {
                            return new Response(
                                '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f8f9fa"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="16" fill="#6c757d">Image unavailable offline</text></svg>',
                                { headers: { 'Content-Type': 'image/svg+xml' } }
                            );
                        }
                        
                        throw error;
                    });
            })
    );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'reservation-sync') {
        event.waitUntil(syncReservations());
    }
    
    if (event.tag === 'rating-sync') {
        event.waitUntil(syncRatings());
    }
});

// Sync pending reservations
async function syncReservations() {
    try {
        const reservations = await getStoredReservations();
        
        for (const reservation of reservations) {
            try {
                // Simulate API call to submit reservation
                const response = await fetch('/api/reservations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reservation)
                });
                
                if (response.ok) {
                    await removeStoredReservation(reservation.id);
                    
                    // Notify user of successful sync
                    self.registration.showNotification('Reservation Confirmed!', {
                        body: `Your table for ${reservation.partySize} people on ${reservation.date} has been confirmed.`,
                        icon: '/assets/Images/Entrance.jpg',
                        badge: '/assets/Images/Entrance.jpg',
                        tag: 'reservation-confirmed',
                        requireInteraction: true,
                        actions: [
                            {
                                action: 'view',
                                title: 'View Details',
                                icon: '/assets/Images/Entrance.jpg'
                            }
                        ]
                    });
                }
            } catch (error) {
                console.error('Failed to sync reservation:', error);
            }
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Sync pending ratings
async function syncRatings() {
    try {
        const ratings = await getStoredRatings();
        
        for (const rating of ratings) {
            try {
                const response = await fetch('/api/ratings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(rating)
                });
                
                if (response.ok) {
                    await removeStoredRating(rating.id);
                }
            } catch (error) {
                console.error('Failed to sync rating:', error);
            }
        }
    } catch (error) {
        console.error('Rating sync failed:', error);
    }
}

// Push notification handler
self.addEventListener('push', (event) => {
    const options = {
        body: 'Thank you for choosing Oasis Restaurant!',
        icon: '/assets/Images/Entrance.jpg',
        badge: '/assets/Images/Entrance.jpg',
        vibrate: [100, 50, 100],
        tag: 'oasis-notification',
        actions: [
            {
                action: 'view-menu',
                title: 'View Menu',
                icon: '/assets/Images/Food-Display.jpg'
            },
            {
                action: 'make-reservation',
                title: 'Book Table',
                icon: '/assets/Images/Ambience.jpg'
            }
        ]
    };

    if (event.data) {
        const data = event.data.json();
        options.body = data.body || options.body;
        options.title = data.title || 'Oasis Restaurant';
    }

    event.waitUntil(
        self.registration.showNotification('Oasis Restaurant', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const action = event.action;
    let url = '/';

    switch (action) {
        case 'view-menu':
            url = '/menu.html';
            break;
        case 'make-reservation':
            url = '/reservation.html';
            break;
        case 'view':
            url = '/reservation.html';
            break;
    }

    event.waitUntil(
        clients.matchAll({ type: 'window' })
            .then((clientList) => {
                // Check if app is already open
                for (const client of clientList) {
                    if (client.url.includes(url) && 'focus' in client) {
                        return client.focus();
                    }
                }
                
                // Open new window
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
    );
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
    const { type, data } = event.data;

    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
        
        case 'STORE_RESERVATION':
            storeReservation(data);
            break;
        
        case 'STORE_RATING':
            storeRating(data);
            break;
        
        case 'CLEAR_CACHE':
            clearAllCaches();
            break;
    }
});

// Utility functions for IndexedDB operations
async function getStoredReservations() {
    // Simulate stored reservations
    return JSON.parse(localStorage.getItem('pendingReservations') || '[]');
}

async function removeStoredReservation(id) {
    const reservations = await getStoredReservations();
    const filtered = reservations.filter(r => r.id !== id);
    localStorage.setItem('pendingReservations', JSON.stringify(filtered));
}

async function storeReservation(data) {
    const reservations = await getStoredReservations();
    reservations.push({ ...data, id: Date.now() });
    localStorage.setItem('pendingReservations', JSON.stringify(reservations));
}

async function getStoredRatings() {
    return JSON.parse(localStorage.getItem('pendingRatings') || '[]');
}

async function removeStoredRating(id) {
    const ratings = await getStoredRatings();
    const filtered = ratings.filter(r => r.id !== id);
    localStorage.setItem('pendingRatings', JSON.stringify(filtered));
}

async function storeRating(data) {
    const ratings = await getStoredRatings();
    ratings.push({ ...data, id: Date.now() });
    localStorage.setItem('pendingRatings', JSON.stringify(ratings));
}

async function clearAllCaches() {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    );
}

// Update cache strategy based on network conditions
self.addEventListener('online', () => {
    console.log('SW: Back online');
});

self.addEventListener('offline', () => {
    console.log('SW: Gone offline');
});

console.log('SW: Service Worker loaded successfully');