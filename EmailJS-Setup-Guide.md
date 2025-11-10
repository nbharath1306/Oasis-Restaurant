# EmailJS Integration Setup Guide

## Overview
This restaurant website is now integrated with EmailJS service (service_rdwhfmn) to handle automated email communications for:
- Contact form submissions
- Reservation confirmations 
- Customer feedback
- Live chat messages
- Newsletter subscriptions

## Setup Steps

### 1. EmailJS Account Configuration

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Use service ID: `service_rdwhfmn`
3. Get your **Public Key** from Account > API Keys
4. Create the following email templates:

### 2. Email Templates Required

#### Contact Form Template (`template_contact`)
```
Subject: New Contact Form Message - Oasis Restaurant

Hello {{to_name}},

You have received a new message from your website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Message: {{message}}

Submitted on: {{date}} at {{time}}

Please respond promptly to maintain excellent customer service.

Best regards,
Oasis Restaurant Website System
```

#### Reservation Confirmation Template (`template_reservation`)
```
Subject: Reservation Confirmed - Oasis Restaurant

Dear {{to_name}},

Your reservation at {{restaurant_name}} has been confirmed!

Booking Details:
- Booking ID: {{booking_id}}
- Date: {{date}}
- Time: {{time}}
- Party Size: {{party_size}} guests
- Table: {{table}}
- Phone: {{phone}}
- Special Requests: {{special_requests}}

Restaurant Information:
📍 {{restaurant_address}}
📞 {{restaurant_phone}}

We look forward to serving you! Please arrive 10 minutes before your reservation time.

If you need to modify or cancel your reservation, please call us at {{restaurant_phone}}.

Thank you for choosing Oasis Restaurant!

Best regards,
The Oasis Restaurant Team
```

#### Feedback Template (`template_feedback`)
```
Subject: New Customer Feedback - Oasis Restaurant

Hello Team,

New feedback received:

Customer: {{customer_name}}
Email: {{customer_email}}
Rating: {{rating}}/5 stars
Feedback: {{feedback}}

Submitted from: {{page}}
Date: {{date}} at {{time}}

Please review and take appropriate action if needed.

Best regards,
Website Feedback System
```

### 3. Code Integration

1. **Update Public Key**: In `js/emailjs-integration.js`, replace the placeholder:
```javascript
// emailjs.init('YOUR_PUBLIC_KEY');
```
with your actual public key:
```javascript
emailjs.init('your_actual_public_key_here');
```

2. **Uncomment Email Sending Code**: Remove the comment blocks around the actual EmailJS send calls in the service methods.

### 4. Template Variables Reference

#### Contact Form Variables:
- `{{from_name}}` - Customer name
- `{{from_email}}` - Customer email
- `{{phone}}` - Customer phone
- `{{message}}` - Customer message
- `{{date}}` - Submission date
- `{{time}}` - Submission time
- `{{to_name}}` - Restaurant team name

#### Reservation Variables:
- `{{to_name}}` - Customer full name
- `{{to_email}}` - Customer email
- `{{booking_id}}` - Generated booking ID
- `{{date}}` - Reservation date
- `{{time}}` - Reservation time
- `{{party_size}}` - Number of guests
- `{{table}}` - Table name
- `{{phone}}` - Customer phone
- `{{special_requests}}` - Special requests
- `{{restaurant_name}}` - "Oasis Restaurant"
- `{{restaurant_phone}}` - "72046 11326"
- `{{restaurant_address}}` - Full address

#### Feedback Variables:
- `{{customer_name}}` - Customer name
- `{{customer_email}}` - Customer email
- `{{rating}}` - Rating value (1-5)
- `{{feedback}}` - Feedback message
- `{{page}}` - Page where feedback was submitted
- `{{date}}` - Feedback date
- `{{time}}` - Feedback time

### 5. Testing

After setup, test the integration:

1. **Contact Form**: Submit a message via the contact form
2. **Reservations**: Make a test reservation with a valid email
3. **Feedback**: Submit feedback through the rating system

### 6. Features Included

✅ **Contact Form Integration**
- Automatic email notifications to restaurant
- Customer confirmation emails
- Form validation and error handling

✅ **Reservation System**
- Booking confirmation emails
- Detailed reservation information
- Booking ID generation

✅ **Feedback System**
- Customer feedback collection
- Rating notifications
- Review management

✅ **Live Chat Integration**
- Chat message forwarding
- Customer inquiry handling

✅ **Newsletter Subscription**
- Subscription confirmations
- Email list management

### 7. Customization

You can customize the email templates, styling, and messaging by:
1. Editing templates in EmailJS dashboard
2. Modifying the JavaScript service methods
3. Updating email content and styling

### 8. Error Handling

The system includes:
- Graceful degradation if EmailJS is unavailable
- User-friendly error messages
- Fallback notifications
- Console logging for debugging

### 9. Security Notes

- Never expose your private key in frontend code
- Use environment variables for sensitive data
- Implement rate limiting for production use
- Monitor email usage to prevent abuse

### 10. Support

For issues with EmailJS integration:
1. Check browser console for errors
2. Verify template IDs match your EmailJS dashboard
3. Ensure public key is correctly set
4. Test with EmailJS dashboard tools

## Current Status

✅ EmailJS library integrated
✅ Service class created with ID: service_rdwhfmn
✅ Form handlers updated
✅ Email templates designed
⚠️ Requires public key configuration
⚠️ Requires template creation in EmailJS dashboard

The integration is ready to use once you complete the EmailJS account setup and configuration steps above.