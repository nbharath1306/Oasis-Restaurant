// Smart Reservation System with AI-powered recommendations
class SmartReservationSystem {
    constructor() {
        this.guestCount = 2;
        this.selectedDate = '';
        this.selectedTime = '';
        this.selectedOccasion = '';
        this.selectedRecommendation = null;
        this.availableSlots = [];
        this.waitingListPosition = 0;
        
        this.init();
    }
    
    init() {
        this.createReservationInterface();
        this.bindEvents();
        this.generateAvailableSlots();
        this.loadAIRecommendations();
    }
    
    createReservationInterface() {
        const reservationSection = document.createElement('div');
        reservationSection.className = 'smart-reservation-section';
        reservationSection.id = 'smart-reservation';
        
        reservationSection.innerHTML = `
            <div class="container">
                <div class="reservation-header">
                    <h2><i class="fas fa-robot"></i> Smart Reservation System</h2>
                    <p>AI-powered table recommendations and intelligent booking system</p>
                </div>
                
                <div class="reservation-container">
                    <div class="reservation-form-card">
                        <h3><i class="fas fa-calendar-alt"></i> Book Your Table</h3>
                        
                        <form id="smart-reservation-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="guest-name">Full Name</label>
                                    <input type="text" id="guest-name" class="form-input" placeholder="Enter your name" required>
                                </div>
                                <div class="form-group">
                                    <label for="guest-phone">Phone Number</label>
                                    <input type="tel" id="guest-phone" class="form-input" placeholder="+91 XXXXX XXXXX" required>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="guest-email">Email Address</label>
                                <input type="email" id="guest-email" class="form-input" placeholder="your@email.com" required>
                            </div>
                            
                            <div class="date-time-group">
                                <div class="form-group">
                                    <label for="reservation-date">Preferred Date</label>
                                    <input type="date" id="reservation-date" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label for="reservation-time">Preferred Time</label>
                                    <input type="time" id="reservation-time" class="form-input" required>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>Number of Guests</label>
                                <div class="guest-selector">
                                    <i class="fas fa-users"></i>
                                    <span>Guests:</span>
                                    <div class="guest-controls">
                                        <button type="button" class="guest-btn" id="decrease-guests">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <span class="guest-count" id="guest-count">2</span>
                                        <button type="button" class="guest-btn" id="increase-guests">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>Special Occasion</label>
                                <div class="occasion-selector" id="occasion-selector">
                                    <button type="button" class="occasion-btn" data-occasion="casual">Casual Dining</button>
                                    <button type="button" class="occasion-btn" data-occasion="birthday">Birthday</button>
                                    <button type="button" class="occasion-btn" data-occasion="anniversary">Anniversary</button>
                                    <button type="button" class="occasion-btn" data-occasion="business">Business</button>
                                    <button type="button" class="occasion-btn" data-occasion="date">Date Night</button>
                                    <button type="button" class="occasion-btn" data-occasion="family">Family Gathering</button>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="special-requests">Special Requests</label>
                                <textarea id="special-requests" class="form-input" rows="3" placeholder="Dietary restrictions, seating preferences, etc."></textarea>
                            </div>
                        </form>
                        
                        <div class="availability-display" id="availability-display" style="display: none;">
                            <h4><i class="fas fa-clock"></i> Available Time Slots</h4>
                            <div class="time-slots" id="time-slots"></div>
                            
                            <div class="waiting-list-option" id="waiting-list-option" style="display: none;">
                                <h5><i class="fas fa-hourglass-half"></i> Join Waiting List</h5>
                                <p>No tables available at your preferred time. Join our waiting list and we'll notify you when a table opens up!</p>
                                <button class="join-waitlist" onclick="smartReservation.joinWaitingList()">
                                    <i class="fas fa-list-alt"></i> Join Waiting List
                                </button>
                            </div>
                        </div>
                        
                        <button type="submit" class="reservation-submit" id="reservation-submit" disabled>
                            <i class="fas fa-calendar-check"></i> Complete Reservation
                        </button>
                    </div>
                    
                    <div class="ai-recommendations">
                        <h3><i class="fas fa-brain"></i> AI Recommendations</h3>
                        <div class="ai-loading" id="ai-loading">
                            Analyzing your preferences...
                        </div>
                        <div id="recommendations-content" style="display: none;"></div>
                    </div>
                </div>
            </div>
            
            <!-- Confirmation Modal -->
            <div class="confirmation-modal" id="confirmation-modal">
                <div class="confirmation-content">
                    <h3><i class="fas fa-check-circle" style="color: #27ae60; font-size: 3rem;"></i></h3>
                    <h3 style="margin: 20px 0;">Reservation Confirmed!</h3>
                    <div id="confirmation-details"></div>
                    <button class="btn btn-primary" onclick="smartReservation.closeConfirmation()" style="margin-top: 20px;">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        `;
        
        // Insert after virtual tour section
        const virtualTour = document.getElementById('virtual-tour');
        if (virtualTour) {
            virtualTour.parentNode.insertBefore(reservationSection, virtualTour.nextSibling);
        } else {
            // Fallback: insert before contact section
            const contactSection = document.getElementById('contact');
            contactSection.parentNode.insertBefore(reservationSection, contactSection);
        }
    }
    
    bindEvents() {
        // Guest count controls
        document.getElementById('decrease-guests').addEventListener('click', () => this.changeGuestCount(-1));
        document.getElementById('increase-guests').addEventListener('click', () => this.changeGuestCount(1));
        
        // Occasion selection
        document.getElementById('occasion-selector').addEventListener('click', (e) => {
            if (e.target.classList.contains('occasion-btn')) {
                this.selectOccasion(e.target);
            }
        });
        
        // Date/time change
        document.getElementById('reservation-date').addEventListener('change', () => this.checkAvailability());
        document.getElementById('reservation-time').addEventListener('change', () => this.checkAvailability());
        
        // Form submission
        document.getElementById('smart-reservation-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitReservation();
        });
        
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('reservation-date').min = today;
    }
    
    changeGuestCount(delta) {
        this.guestCount = Math.max(1, Math.min(12, this.guestCount + delta));
        document.getElementById('guest-count').textContent = this.guestCount;
        
        // Update button states
        document.getElementById('decrease-guests').disabled = this.guestCount <= 1;
        document.getElementById('increase-guests').disabled = this.guestCount >= 12;
        
        // Reload AI recommendations with new guest count
        this.loadAIRecommendations();
        this.checkAvailability();
    }
    
    selectOccasion(button) {
        // Clear previous selection
        document.querySelectorAll('.occasion-btn').forEach(btn => btn.classList.remove('active'));
        
        // Select new occasion
        button.classList.add('active');
        this.selectedOccasion = button.dataset.occasion;
        
        // Reload AI recommendations
        this.loadAIRecommendations();
    }
    
    loadAIRecommendations() {
        const aiLoading = document.getElementById('ai-loading');
        const recommendationsContent = document.getElementById('recommendations-content');
        
        aiLoading.style.display = 'flex';
        recommendationsContent.style.display = 'none';
        
        // Simulate AI processing time
        setTimeout(() => {
            const recommendations = this.generateAIRecommendations();
            this.displayRecommendations(recommendations);
            
            aiLoading.style.display = 'none';
            recommendationsContent.style.display = 'block';
        }, 2000);
    }
    
    generateAIRecommendations() {
        const recommendations = [];
        
        // Base recommendations on guest count and occasion
        if (this.guestCount <= 2) {
            if (this.selectedOccasion === 'date' || this.selectedOccasion === 'anniversary') {
                recommendations.push({
                    title: 'Romantic Corner Table',
                    description: 'Perfect intimate setting with soft lighting and privacy. Ideal for romantic conversations.',
                    features: ['Window View', 'Soft Lighting', 'Private Corner', 'Quiet Ambiance'],
                    tableType: 'romantic',
                    priority: 1
                });
            } else {
                recommendations.push({
                    title: 'Cozy Two-Seater',
                    description: 'Comfortable seating for two with easy conversation and excellent service.',
                    features: ['Quick Service', 'Comfortable Seating', 'Central Location', 'Good Acoustics'],
                    tableType: 'standard',
                    priority: 2
                });
            }
        } else if (this.guestCount <= 4) {
            if (this.selectedOccasion === 'family') {
                recommendations.push({
                    title: 'Family-Friendly Zone',
                    description: 'Spacious table in our family section with easy access and kid-friendly amenities.',
                    features: ['Spacious', 'Kid-Friendly', 'Easy Access', 'Family Section'],
                    tableType: 'family',
                    priority: 1
                });
            } else if (this.selectedOccasion === 'business') {
                recommendations.push({
                    title: 'Business Corner',
                    description: 'Quiet section perfect for business discussions with professional ambiance.',
                    features: ['Quiet Zone', 'Professional Setting', 'Good Lighting', 'WiFi Available'],
                    tableType: 'business',
                    priority: 1
                });
            }
        } else {
            recommendations.push({
                title: 'Large Group Table',
                description: 'Perfect for celebrations and large gatherings with extra space and attention.',
                features: ['Extra Space', 'Group Service', 'Celebration Setup', 'Central Location'],
                tableType: 'group',
                priority: 1
            });
        }
        
        // Add time-based recommendations
        const currentHour = new Date().getHours();
        if (currentHour >= 19 || currentHour <= 22) {
            recommendations.push({
                title: 'Evening Ambiance Special',
                description: 'Experience our enhanced evening atmosphere with special lighting and live music.',
                features: ['Live Music', 'Enhanced Lighting', 'Evening Menu', 'Special Cocktails'],
                tableType: 'evening',
                priority: 2
            });
        }
        
        // Add cuisine-based recommendation
        recommendations.push({
            title: 'Chef\'s Table Experience',
            description: 'Watch our master chefs at work while enjoying our signature multi-cuisine specialties.',
            features: ['Open Kitchen View', 'Chef Interaction', 'Premium Service', 'Signature Dishes'],
            tableType: 'premium',
            priority: 3
        });
        
        return recommendations.sort((a, b) => a.priority - b.priority);
    }
    
    displayRecommendations(recommendations) {
        const container = document.getElementById('recommendations-content');
        container.innerHTML = '';
        
        recommendations.forEach((rec, index) => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.innerHTML = `
                <h4>
                    <i class="fas fa-${this.getRecommendationIcon(rec.tableType)}"></i>
                    ${rec.title}
                </h4>
                <p>${rec.description}</p>
                <div class="recommendation-features">
                    ${rec.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <button class="select-recommendation" onclick="smartReservation.selectRecommendation(${index})">
                    <i class="fas fa-check"></i> Select This Option
                </button>
            `;
            
            container.appendChild(card);
        });
        
        this.currentRecommendations = recommendations;
    }
    
    getRecommendationIcon(tableType) {
        const icons = {
            'romantic': 'heart',
            'standard': 'chair',
            'family': 'home',
            'business': 'briefcase',
            'group': 'users',
            'evening': 'moon',
            'premium': 'crown'
        };
        return icons[tableType] || 'utensils';
    }
    
    selectRecommendation(index) {
        this.selectedRecommendation = this.currentRecommendations[index];
        
        // Visual feedback
        document.querySelectorAll('.recommendation-card').forEach((card, i) => {
            if (i === index) {
                card.style.background = 'rgba(255,255,255,0.3)';
                card.style.border = '2px solid rgba(255,255,255,0.8)';
            } else {
                card.style.background = 'rgba(255,255,255,0.15)';
                card.style.border = '1px solid rgba(255,255,255,0.2)';
            }
        });
        
        // Show success message
        const button = document.querySelectorAll('.select-recommendation')[index];
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Selected!';
        button.style.background = 'rgba(39, 174, 96, 0.8)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = 'rgba(255,255,255,0.1)';
        }, 2000);
        
        this.checkAvailability();
    }
    
    generateAvailableSlots() {
        const slots = [];
        const today = new Date();
        const selectedDate = new Date(document.getElementById('reservation-date').value);
        
        // Generate time slots for the day
        for (let hour = 11; hour <= 22; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const slotDateTime = new Date(selectedDate);
                slotDateTime.setHours(hour, minute);
                
                // Skip past times for today
                if (selectedDate.toDateString() === today.toDateString() && slotDateTime <= today) {
                    continue;
                }
                
                // Simulate availability based on time and guest count
                let status = 'available';
                const random = Math.random();
                
                // Peak hours (19:00-21:00) are busier
                if (hour >= 19 && hour <= 21) {
                    if (random < 0.6) status = 'busy';
                    if (random < 0.3) status = 'full';
                } else if (hour >= 12 && hour <= 14) {
                    // Lunch hours
                    if (random < 0.4) status = 'busy';
                    if (random < 0.2) status = 'full';
                } else {
                    if (random < 0.2) status = 'busy';
                    if (random < 0.1) status = 'full';
                }
                
                // Large groups have less availability
                if (this.guestCount > 6 && random < 0.4) {
                    status = 'full';
                }
                
                slots.push({ time, status });
            }
        }
        
        this.availableSlots = slots;
    }
    
    checkAvailability() {
        const date = document.getElementById('reservation-date').value;
        const time = document.getElementById('reservation-time').value;
        
        if (!date) return;
        
        this.generateAvailableSlots();
        this.displayAvailableSlots();
        
        const availabilityDisplay = document.getElementById('availability-display');
        availabilityDisplay.style.display = 'block';
        
        this.validateForm();
    }
    
    displayAvailableSlots() {
        const container = document.getElementById('time-slots');
        const waitingListOption = document.getElementById('waiting-list-option');
        
        container.innerHTML = '';
        
        let availableCount = 0;
        
        this.availableSlots.forEach(slot => {
            const slotElement = document.createElement('div');
            slotElement.className = `time-slot ${slot.status}`;
            slotElement.textContent = slot.time;
            slotElement.dataset.time = slot.time;
            
            if (slot.status === 'available') {
                availableCount++;
                slotElement.addEventListener('click', () => this.selectTimeSlot(slotElement));
            } else if (slot.status === 'busy') {
                slotElement.title = 'Limited availability - may have waiting time';
                slotElement.addEventListener('click', () => this.selectTimeSlot(slotElement));
            }
            
            container.appendChild(slotElement);
        });
        
        // Show waiting list option if very few slots available
        waitingListOption.style.display = availableCount < 3 ? 'block' : 'none';
    }
    
    selectTimeSlot(slotElement) {
        // Clear previous selection
        document.querySelectorAll('.time-slot.selected').forEach(slot => {
            slot.classList.remove('selected');
        });
        
        // Select new slot
        slotElement.classList.add('selected');
        this.selectedTime = slotElement.dataset.time;
        
        // Update time input
        document.getElementById('reservation-time').value = this.selectedTime;
        
        this.validateForm();
    }
    
    validateForm() {
        const name = document.getElementById('guest-name').value;
        const phone = document.getElementById('guest-phone').value;
        const email = document.getElementById('guest-email').value;
        const date = document.getElementById('reservation-date').value;
        const submitButton = document.getElementById('reservation-submit');
        
        const isValid = name && phone && email && date && this.selectedTime;
        
        submitButton.disabled = !isValid;
        submitButton.style.opacity = isValid ? '1' : '0.6';
    }
    
    joinWaitingList() {
        this.waitingListPosition = Math.floor(Math.random() * 5) + 1;
        
        alert(`You've been added to our waiting list at position #${this.waitingListPosition}. We'll send you an SMS notification when a table becomes available!`);
        
        // Simulate notification system
        setTimeout(() => {
            if (Math.random() > 0.5) {
                alert('Good news! A table just became available. You have 10 minutes to confirm your reservation.');
            }
        }, 30000); // 30 seconds for demo
    }
    
    submitReservation() {
        const formData = {
            name: document.getElementById('guest-name').value,
            phone: document.getElementById('guest-phone').value,
            email: document.getElementById('guest-email').value,
            date: document.getElementById('reservation-date').value,
            time: this.selectedTime,
            guests: this.guestCount,
            occasion: this.selectedOccasion,
            recommendation: this.selectedRecommendation,
            specialRequests: document.getElementById('special-requests').value
        };
        
        // Simulate reservation processing
        const submitButton = document.getElementById('reservation-submit');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            this.showConfirmation(formData);
            submitButton.innerHTML = '<i class="fas fa-calendar-check"></i> Complete Reservation';
            submitButton.disabled = false;
        }, 2000);
    }
    
    showConfirmation(formData) {
        const modal = document.getElementById('confirmation-modal');
        const details = document.getElementById('confirmation-details');
        
        const confirmationId = 'ORS' + Date.now().toString().slice(-6);
        
        details.innerHTML = `
            <div style="text-align: left; margin: 20px 0;">
                <p><strong>Confirmation ID:</strong> ${confirmationId}</p>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Date & Time:</strong> ${formData.date} at ${formData.time}</p>
                <p><strong>Guests:</strong> ${formData.guests} people</p>
                <p><strong>Phone:</strong> ${formData.phone}</p>
                ${formData.recommendation ? `<p><strong>Table:</strong> ${formData.recommendation.title}</p>` : ''}
                ${formData.occasion ? `<p><strong>Occasion:</strong> ${formData.occasion}</p>` : ''}
            </div>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 15px 0;">
                <p><strong>What's Next:</strong></p>
                <ul style="text-align: left; margin: 10px 0;">
                    <li>SMS confirmation sent to ${formData.phone}</li>
                    <li>Email confirmation sent to ${formData.email}</li>
                    <li>Please arrive 10 minutes early</li>
                    <li>Call us at 72046 11326 for any changes</li>
                </ul>
            </div>
        `;
        
        modal.classList.add('show');
        
        // Send SMS notification (simulated)
        this.sendSMSNotification(formData, confirmationId);
    }
    
    sendSMSNotification(formData, confirmationId) {
        // Simulate SMS sending
        console.log(`SMS sent to ${formData.phone}: Your table at Oasis Restaurant is confirmed for ${formData.date} at ${formData.time}. Confirmation: ${confirmationId}`);
        
        // In a real implementation, you would integrate with an SMS service like Twilio
        // Example: await twilioClient.messages.create({...})
    }
    
    closeConfirmation() {
        const modal = document.getElementById('confirmation-modal');
        modal.classList.remove('show');
        
        // Reset form
        document.getElementById('smart-reservation-form').reset();
        this.guestCount = 2;
        document.getElementById('guest-count').textContent = '2';
        this.selectedTime = '';
        this.selectedOccasion = '';
        this.selectedRecommendation = null;
        
        // Clear selections
        document.querySelectorAll('.occasion-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.time-slot.selected').forEach(slot => slot.classList.remove('selected'));
        document.getElementById('availability-display').style.display = 'none';
        
        this.validateForm();
    }
}

// Initialize Smart Reservation System when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure other systems are loaded
    setTimeout(() => {
        window.smartReservation = new SmartReservationSystem();
    }, 1500);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartReservationSystem;
}