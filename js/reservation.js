// ===== RESERVATION SYSTEM JAVASCRIPT =====

class ReservationSystem {
    constructor() {
        this.currentStep = 1;
        this.selectedTable = null;
        this.reservationData = {
            date: '',
            time: '',
            partySize: 2,
            table: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            specialRequests: '',
            newsletter: false
        };
        
        this.unavailableTables = {
            // Format: 'YYYY-MM-DD': { 'HH:MM': [table_ids] }
            // Mock unavailable tables for demo
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateSummary();
        this.setMinDate();
        this.generateUnavailableTables();
        
        // Initialize particles
        if (typeof createParticles === 'function') {
            createParticles('particles', 50);
        }
    }
    
    setupEventListeners() {
        // Form inputs
        document.getElementById('reservationDate').addEventListener('change', () => this.updateSummary());
        document.getElementById('reservationTime').addEventListener('change', () => this.updateSummary());
        document.getElementById('partySize').addEventListener('change', () => this.updateSummary());
        
        // Table selection
        document.querySelectorAll('.table-item').forEach(table => {
            table.addEventListener('click', (e) => this.selectTable(e.currentTarget));
        });
        
        // Form submission
        document.getElementById('reservationForm').addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Date change for table availability
        document.getElementById('reservationDate').addEventListener('change', () => this.updateTableAvailability());
        document.getElementById('reservationTime').addEventListener('change', () => this.updateTableAvailability());
    }
    
    setMinDate() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const dateString = tomorrow.toISOString().split('T')[0];
        document.getElementById('reservationDate').min = dateString;
        
        // Set max date to 3 months from now
        const maxDate = new Date(today);
        maxDate.setMonth(maxDate.getMonth() + 3);
        document.getElementById('reservationDate').max = maxDate.toISOString().split('T')[0];
    }
    
    generateUnavailableTables() {
        // Generate some random unavailable tables for demo
        const dates = [];
        const today = new Date();
        
        for (let i = 1; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];
            dates.push(dateStr);
        }
        
        dates.forEach(date => {
            this.unavailableTables[date] = {};
            const times = ['12:00', '13:00', '19:00', '20:00', '21:00'];
            
            times.forEach(time => {
                if (Math.random() < 0.3) { // 30% chance a table is unavailable
                    const unavailableCount = Math.floor(Math.random() * 3) + 1;
                    const tables = [];
                    
                    for (let j = 0; j < unavailableCount; j++) {
                        const tableId = Math.floor(Math.random() * 6) + 1;
                        if (!tables.includes(tableId)) {
                            tables.push(tableId);
                        }
                    }
                    
                    this.unavailableTables[date][time] = tables;
                }
            });
        });
    }
    
    updateTableAvailability() {
        const date = document.getElementById('reservationDate').value;
        const time = document.getElementById('reservationTime').value;
        
        document.querySelectorAll('.table-item').forEach(table => {
            const tableId = parseInt(table.dataset.table);
            const isUnavailable = this.unavailableTables[date] && 
                                 this.unavailableTables[date][time] && 
                                 this.unavailableTables[date][time].includes(tableId);
            
            table.classList.toggle('unavailable', isUnavailable);
            
            if (isUnavailable && table.classList.contains('selected')) {
                this.deselectTable();
            }
        });
    }
    
    selectTable(tableElement) {
        if (tableElement.classList.contains('unavailable')) {
            this.showNotification('This table is not available for the selected time', 'error');
            return;
        }
        
        // Deselect previous table
        document.querySelectorAll('.table-item').forEach(table => {
            table.classList.remove('selected');
        });
        
        // Select new table
        tableElement.classList.add('selected');
        this.selectedTable = {
            id: tableElement.dataset.table,
            seats: tableElement.dataset.seats,
            name: tableElement.querySelector('span').textContent
        };
        
        this.updateSummary();
        this.addTableSelectAnimation(tableElement);
    }
    
    deselectTable() {
        document.querySelectorAll('.table-item').forEach(table => {
            table.classList.remove('selected');
        });
        this.selectedTable = null;
        this.updateSummary();
    }
    
    addTableSelectAnimation(tableElement) {
        tableElement.style.animation = 'none';
        tableElement.offsetHeight; // Trigger reflow
        tableElement.style.animation = 'tableSelect 0.6s ease-out';
    }
    
    updateSummary() {
        const date = document.getElementById('reservationDate').value;
        const time = document.getElementById('reservationTime').value;
        const partySize = document.getElementById('partySize').value;
        
        // Update summary display
        document.getElementById('summaryDate').textContent = date ? this.formatDate(date) : 'Select date';
        document.getElementById('summaryTime').textContent = time ? this.formatTime(time) : 'Select time';
        document.getElementById('summaryGuests').textContent = `${partySize} ${partySize === '1' ? 'person' : 'people'}`;
        document.getElementById('summaryTable').textContent = this.selectedTable ? this.selectedTable.name : 'Not selected';
        
        // Store in reservation data
        this.reservationData.date = date;
        this.reservationData.time = time;
        this.reservationData.partySize = parseInt(partySize);
        if (this.selectedTable) {
            this.reservationData.table = this.selectedTable;
        }
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }
    
    formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    }
    
    nextStep() {
        if (!this.validateCurrentStep()) {
            return;
        }
        
        this.currentStep++;
        this.showStep(this.currentStep);
        this.scrollToTop();
    }
    
    prevStep() {
        this.currentStep--;
        this.showStep(this.currentStep);
        this.scrollToTop();
    }
    
    showStep(stepNumber) {
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });
        
        const activeStep = document.querySelector(`[data-step="${stepNumber}"]`);
        if (activeStep) {
            activeStep.classList.add('active');
        }
    }
    
    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                return this.validateDateTime();
            case 2:
                return this.validateTableSelection();
            case 3:
                return this.validatePersonalInfo();
            default:
                return true;
        }
    }
    
    validateDateTime() {
        const date = document.getElementById('reservationDate').value;
        const time = document.getElementById('reservationTime').value;
        
        if (!date) {
            this.showNotification('Please select a date', 'error');
            return false;
        }
        
        if (!time) {
            this.showNotification('Please select a time', 'error');
            return false;
        }
        
        // Check if date is in the past
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            this.showNotification('Please select a future date', 'error');
            return false;
        }
        
        return true;
    }
    
    validateTableSelection() {
        if (!this.selectedTable) {
            this.showNotification('Please select a table', 'error');
            return false;
        }
        
        const partySize = parseInt(document.getElementById('partySize').value);
        const tableSeats = parseInt(this.selectedTable.seats);
        
        if (partySize > tableSeats) {
            this.showNotification(`Selected table can only accommodate ${tableSeats} guests. Please select a larger table or adjust party size.`, 'error');
            return false;
        }
        
        return true;
    }
    
    validatePersonalInfo() {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        if (!firstName) {
            this.showNotification('Please enter your first name', 'error');
            return false;
        }
        
        if (!lastName) {
            this.showNotification('Please enter your last name', 'error');
            return false;
        }
        
        if (!email || !this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return false;
        }
        
        if (!phone || !this.isValidPhone(phone)) {
            this.showNotification('Please enter a valid phone number', 'error');
            return false;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateCurrentStep()) {
            return;
        }
        
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        
        // Collect all form data
        this.collectFormData();
        
        try {
            // Simulate API call
            await this.submitReservation();
            
            // Show confirmation
            this.showConfirmation();
            
        } catch (error) {
            this.showNotification('Reservation failed. Please try again.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
        }
    }
    
    collectFormData() {
        this.reservationData.firstName = document.getElementById('firstName').value.trim();
        this.reservationData.lastName = document.getElementById('lastName').value.trim();
        this.reservationData.email = document.getElementById('email').value.trim();
        this.reservationData.phone = document.getElementById('phone').value.trim();
        this.reservationData.specialRequests = document.getElementById('specialRequests').value.trim();
        this.reservationData.newsletter = document.getElementById('newsletter').checked;
    }
    
    async submitReservation() {
        try {
            // Generate booking ID
            this.reservationData.bookingId = this.generateBookingId();
            
            // Mark table as unavailable
            const date = this.reservationData.date;
            const time = this.reservationData.time;
            const tableId = parseInt(this.reservationData.table.id);
            
            if (!this.unavailableTables[date]) {
                this.unavailableTables[date] = {};
            }
            if (!this.unavailableTables[date][time]) {
                this.unavailableTables[date][time] = [];
            }
            this.unavailableTables[date][time].push(tableId);
            
            // Send confirmation email if EmailJS is available
            if (typeof emailService !== 'undefined' && this.reservationData.email) {
                const result = await emailService.sendReservationConfirmation(this.reservationData);
                if (result.success) {
                    console.log('Reservation confirmation email sent successfully');
                } else {
                    console.warn('Failed to send confirmation email:', result.message);
                }
            }
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('Reservation Data:', this.reservationData);
            return this.reservationData;
            
        } catch (error) {
            console.error('Error submitting reservation:', error);
            throw error;
        }
    }
    
    generateBookingId() {
        const prefix = 'OR';
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${prefix}${year}-${random}`;
    }
    
    showConfirmation() {
        const modal = document.getElementById('confirmationModal');
        
        // Update confirmation details
        document.getElementById('bookingId').textContent = this.reservationData.bookingId;
        document.getElementById('confirmedDateTime').textContent = 
            `${this.formatDate(this.reservationData.date)} at ${this.formatTime(this.reservationData.time)}`;
        document.getElementById('confirmedTable').textContent = this.reservationData.table.name;
        document.getElementById('confirmedGuests').textContent = 
            `${this.reservationData.partySize} ${this.reservationData.partySize === 1 ? 'guest' : 'guests'}`;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Send confirmation email (simulation)
        this.sendConfirmationEmail();
    }
    
    async sendConfirmationEmail() {
        // Send confirmation email via EmailJS if available
        if (typeof emailService !== 'undefined' && this.reservationData.email) {
            try {
                const result = await emailService.sendReservationConfirmation(this.reservationData);
                if (result.success) {
                    this.showNotification('Confirmation email sent to your inbox!', 'success');
                } else {
                    this.showNotification('Reservation confirmed but email sending failed', 'warning');
                }
            } catch (error) {
                console.error('Email sending error:', error);
                this.showNotification('Reservation confirmed! Please check your email.', 'info');
            }
        } else {
            // Fallback notification
            console.log('Sending confirmation email to:', this.reservationData.email);
            setTimeout(() => {
                this.showNotification('Confirmation details have been noted!', 'success');
            }, 1000);
        }
    }
    
    closeConfirmation() {
        const modal = document.getElementById('confirmationModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form for new reservation
        this.resetForm();
    }
    
    resetForm() {
        // Reset form data
        document.getElementById('reservationForm').reset();
        this.currentStep = 1;
        this.selectedTable = null;
        this.reservationData = {
            date: '',
            time: '',
            partySize: 2,
            table: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            specialRequests: '',
            newsletter: false
        };
        
        // Reset UI
        this.showStep(1);
        this.deselectTable();
        this.updateSummary();
        document.getElementById('partySize').value = 2;
    }
    
    scrollToTop() {
        document.querySelector('.reservation-form-container').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
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
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Global functions for HTML onclick handlers
function changePartySize(delta) {
    const input = document.getElementById('partySize');
    const currentValue = parseInt(input.value);
    const newValue = Math.max(1, Math.min(12, currentValue + delta));
    
    input.value = newValue;
    reservationSystem.updateSummary();
    
    // Add animation
    input.style.transform = 'scale(1.1)';
    setTimeout(() => {
        input.style.transform = 'scale(1)';
    }, 200);
}

function nextStep() {
    reservationSystem.nextStep();
}

function prevStep() {
    reservationSystem.prevStep();
}

function closeConfirmation() {
    reservationSystem.closeConfirmation();
}

// Initialize reservation system when DOM is loaded
let reservationSystem;

document.addEventListener('DOMContentLoaded', function() {
    reservationSystem = new ReservationSystem();
});

// Add CSS for notifications dynamically
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 10px;
    padding: 1rem 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 10001;
    transform: translateX(400px);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 300px;
    max-width: 500px;
}

.notification.show {
    transform: translateX(0);
}

.notification-error {
    border-left: 4px solid #dc3545;
}

.notification-success {
    border-left: 4px solid #28a745;
}

.notification-info {
    border-left: 4px solid #17a2b8;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
}

.notification-content i {
    font-size: 1.2rem;
}

.notification-error .notification-content i {
    color: #dc3545;
}

.notification-success .notification-content i {
    color: #28a745;
}

.notification-info .notification-content i {
    color: #17a2b8;
}

.notification-close {
    background: none;
    border: none;
    font-size: 1rem;
    color: #999;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.notification-close:hover {
    background: #f8f9fa;
    color: #666;
}

@keyframes tableSelect {
    0% { transform: translateY(-5px) scale(1); }
    50% { transform: translateY(-10px) scale(1.05); }
    100% { transform: translateY(-5px) scale(1); }
}

@media (max-width: 768px) {
    .notification {
        right: 10px;
        left: 10px;
        min-width: auto;
        transform: translateY(-100px);
    }
    
    .notification.show {
        transform: translateY(0);
    }
}
</style>`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);