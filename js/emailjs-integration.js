// ===== EMAILJS INTEGRATION =====

class EmailService {
    constructor() {
        this.serviceId = 'service_rdwhfmn';
        this.userId = null; // Will be set when you provide your public key
        this.templateIds = {
            contact: 'template_contact', // You'll need to create this template
            reservation: 'template_reservation', // You'll need to create this template
            feedback: 'template_feedback' // You'll need to create this template
        };
        
        this.init();
    }
    
    init() {
        // Initialize EmailJS when the page loads
        if (typeof emailjs !== 'undefined') {
            // You need to replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
            // emailjs.init('YOUR_PUBLIC_KEY');
            console.log('EmailJS ready to use');
        } else {
            console.warn('EmailJS library not loaded');
        }
    }
    
    // Send contact form message
    async sendContactMessage(formData) {
        try {
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone || 'Not provided',
                message: formData.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                to_name: 'Oasis Restaurant Team'
            };
            
            // For now, we'll simulate the email sending
            console.log('Contact form data to send:', templateParams);
            
            // Uncomment this when you set up your EmailJS templates:
            // const response = await emailjs.send(
            //     this.serviceId,
            //     this.templateIds.contact,
            //     templateParams
            // );
            
            // Simulate successful response
            await this.simulateEmailSending();
            
            return {
                success: true,
                message: 'Your message has been sent successfully! We\'ll get back to you soon.'
            };
            
        } catch (error) {
            console.error('Failed to send contact message:', error);
            return {
                success: false,
                message: 'Failed to send message. Please try again or call us directly.'
            };
        }
    }
    
    // Send reservation confirmation
    async sendReservationConfirmation(reservationData) {
        try {
            const templateParams = {
                to_name: `${reservationData.firstName} ${reservationData.lastName}`,
                to_email: reservationData.email,
                booking_id: reservationData.bookingId,
                date: reservationData.date,
                time: reservationData.time,
                party_size: reservationData.partySize,
                table: reservationData.table.name,
                phone: reservationData.phone,
                special_requests: reservationData.specialRequests || 'None',
                restaurant_name: 'Oasis Restaurant',
                restaurant_phone: '72046 11326',
                restaurant_address: 'No. 92/6, Maralavadi Hobli, Kanakapura Main Road, Harohalli Taluk, Jakkasandra Village, Harohalli, Ramanagara, Karnataka 562112',
                confirmation_date: new Date().toLocaleDateString(),
                confirmation_time: new Date().toLocaleTimeString()
            };
            
            console.log('Reservation confirmation data to send:', templateParams);
            
            // Uncomment this when you set up your EmailJS templates:
            // const response = await emailjs.send(
            //     this.serviceId,
            //     this.templateIds.reservation,
            //     templateParams
            // );
            
            // Simulate successful response
            await this.simulateEmailSending();
            
            return {
                success: true,
                message: 'Reservation confirmation sent to your email!'
            };
            
        } catch (error) {
            console.error('Failed to send reservation confirmation:', error);
            return {
                success: false,
                message: 'Reservation saved but failed to send confirmation email.'
            };
        }
    }
    
    // Send feedback/rating
    async sendFeedback(feedbackData) {
        try {
            const templateParams = {
                customer_name: feedbackData.name || 'Anonymous Customer',
                customer_email: feedbackData.email || 'Not provided',
                rating: feedbackData.rating,
                feedback: feedbackData.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                page: feedbackData.page || 'Website'
            };
            
            console.log('Feedback data to send:', templateParams);
            
            // Uncomment this when you set up your EmailJS templates:
            // const response = await emailjs.send(
            //     this.serviceId,
            //     this.templateIds.feedback,
            //     templateParams
            // );
            
            // Simulate successful response
            await this.simulateEmailSending();
            
            return {
                success: true,
                message: 'Thank you for your feedback!'
            };
            
        } catch (error) {
            console.error('Failed to send feedback:', error);
            return {
                success: false,
                message: 'Failed to send feedback. Please try again.'
            };
        }
    }
    
    // Send custom message (for chat system)
    async sendChatMessage(messageData) {
        try {
            const templateParams = {
                customer_name: messageData.name || 'Website Visitor',
                customer_email: messageData.email || 'Not provided',
                customer_phone: messageData.phone || 'Not provided',
                message: messageData.message,
                chat_session: messageData.sessionId || 'N/A',
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                page: messageData.page || 'Chat Widget'
            };
            
            console.log('Chat message data to send:', templateParams);
            
            // For chat messages, you might want to use a different template
            // or the same contact template
            
            await this.simulateEmailSending();
            
            return {
                success: true,
                message: 'Message sent to restaurant team!'
            };
            
        } catch (error) {
            console.error('Failed to send chat message:', error);
            return {
                success: false,
                message: 'Failed to send message.'
            };
        }
    }
    
    // Simulate email sending for demo purposes
    async simulateEmailSending() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ status: 200, text: 'OK' });
            }, 1500); // Simulate network delay
        });
    }
    
    // Validate email format
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Send newsletter subscription
    async subscribeNewsletter(email) {
        try {
            if (!this.isValidEmail(email)) {
                throw new Error('Invalid email address');
            }
            
            const templateParams = {
                subscriber_email: email,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            };
            
            console.log('Newsletter subscription:', templateParams);
            
            await this.simulateEmailSending();
            
            return {
                success: true,
                message: 'Successfully subscribed to our newsletter!'
            };
            
        } catch (error) {
            console.error('Failed to subscribe to newsletter:', error);
            return {
                success: false,
                message: 'Failed to subscribe. Please check your email and try again.'
            };
        }
    }
}

// Initialize EmailJS service
const emailService = new EmailService();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailService;
}

// Make available globally
window.emailService = emailService;

// ===== INTEGRATION WITH EXISTING FORMS =====

// Enhanced contact form handling
function initContactFormWithEmail() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const result = await emailService.sendContactMessage(contactData);
            
            if (result.success) {
                showNotification(result.message, 'success');
                contactForm.reset();
            } else {
                showNotification(result.message, 'error');
            }
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Enhanced reservation confirmation
async function sendReservationEmail(reservationData) {
    if (!reservationData.email) {
        console.warn('No email provided for reservation confirmation');
        return { success: false, message: 'No email provided' };
    }
    
    try {
        const result = await emailService.sendReservationConfirmation(reservationData);
        return result;
    } catch (error) {
        console.error('Failed to send reservation email:', error);
        return { success: false, message: 'Failed to send confirmation email' };
    }
}

// Enhanced feedback system
async function submitFeedbackWithEmail(rating, message = '', customerInfo = {}) {
    const feedbackData = {
        rating: rating,
        message: message,
        name: customerInfo.name,
        email: customerInfo.email,
        page: window.location.pathname
    };
    
    try {
        const result = await emailService.sendFeedback(feedbackData);
        return result;
    } catch (error) {
        console.error('Failed to send feedback:', error);
        return { success: false, message: 'Failed to send feedback' };
    }
}

// Enhanced chat message sending
async function sendChatMessageWithEmail(message, customerInfo = {}) {
    const messageData = {
        message: message,
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        sessionId: Date.now().toString(),
        page: window.location.pathname
    };
    
    try {
        const result = await emailService.sendChatMessage(messageData);
        return result;
    } catch (error) {
        console.error('Failed to send chat message:', error);
        return { success: false, message: 'Failed to send message' };
    }
}

// Newsletter subscription
async function subscribeToNewsletter(email) {
    try {
        const result = await emailService.subscribeNewsletter(email);
        return result;
    } catch (error) {
        console.error('Failed to subscribe to newsletter:', error);
        return { success: false, message: 'Failed to subscribe' };
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initContactFormWithEmail();
    
    // Add newsletter subscription handling
    const newsletterCheckbox = document.getElementById('newsletter');
    if (newsletterCheckbox) {
        const form = newsletterCheckbox.closest('form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                if (newsletterCheckbox.checked) {
                    const emailInput = form.querySelector('input[name="email"], input[type="email"]');
                    if (emailInput && emailInput.value) {
                        await subscribeToNewsletter(emailInput.value);
                    }
                }
            });
        }
    }
});

console.log('EmailJS integration loaded with service ID: service_rdwhfmn');