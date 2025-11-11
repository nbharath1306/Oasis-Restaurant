# 📧 EmailJS Template Creation - Step by Step

## 🎯 You need to create 3 templates with HTML code format:

---

## 📧 Template 1: Contact Form

**Step 1:** EmailJS Dashboard → Email Templates → Create New Template

**Step 2:** Template ID: `template_contact`

**Step 3:** Subject: `New Contact Message - Oasis Restaurant`

**Step 4:** Content (copy this HTML code):

```html
<p>Hello Oasis Restaurant Team!</p>
<br>
<p>You have a new message from your website:</p>
<br>
<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Message:</strong> {{message}}</p>
<br>
<p><strong>Submitted:</strong> {{date}} at {{time}}</p>
<br>
<p>Please respond promptly to maintain excellent customer service!</p>
<br>
<p>Best regards,<br>Website Contact System</p>
```

---

## 📋 Template 2: Reservation Confirmation

**Step 1:** Create New Template

**Step 2:** Template ID: `template_reservation`

**Step 3:** Subject: `Reservation Confirmed - {{booking_id}} - Oasis Restaurant`

**Step 4:** Content (copy this HTML code):

```html
<p>Dear {{to_name}},</p>
<br>
<p>Your reservation at <strong>Oasis Restaurant</strong> has been confirmed! 🎉</p>
<br>
<h3>BOOKING DETAILS:</h3>
<p><strong>Booking ID:</strong> {{booking_id}}</p>
<p><strong>Date:</strong> {{date}}</p>
<p><strong>Time:</strong> {{time}}</p>
<p><strong>Party Size:</strong> {{party_size}} guests</p>
<p><strong>Table:</strong> {{table}}</p>
<p><strong>Your Phone:</strong> {{phone}}</p>
<p><strong>Special Requests:</strong> {{special_requests}}</p>
<br>
<h3>RESTAURANT INFO:</h3>
<p><strong>Address:</strong> {{restaurant_address}}</p>
<p><strong>Phone:</strong> {{restaurant_phone}}</p>
<br>
<p>⏰ Please arrive 10 minutes before your reservation time.</p>
<p>Need to modify or cancel? Call us at {{restaurant_phone}}</p>
<br>
<p>We look forward to serving you!</p>
<br>
<p>Best regards,<br><strong>Oasis Restaurant Team</strong></p>
```

---

## ⭐ Template 3: Feedback Collection

**Step 1:** Create New Template

**Step 2:** Template ID: `template_feedback`

**Step 3:** Subject: `New Customer Feedback - Oasis Restaurant`

**Step 4:** Content (copy this HTML code):

```html
<p>Hello Team!</p>
<br>
<p>New customer feedback received:</p>
<br>
<p><strong>Customer:</strong> {{customer_name}}</p>
<p><strong>Email:</strong> {{customer_email}}</p>
<p><strong>Rating:</strong> {{rating}}/5 stars</p>
<p><strong>Feedback:</strong> {{feedback}}</p>
<br>
<p><strong>Page:</strong> {{page}}</p>
<p><strong>Date:</strong> {{date}}</p>
<br>
<p>Please review and take appropriate action if needed.</p>
<br>
<p>Customer Service Team<br><strong>Oasis Restaurant</strong></p>
```

---

## ✅ After Creating Templates:

1. **Test each template** in EmailJS dashboard
2. **Get your Public Key** from Account → API Keys
3. **Let me know** - I'll help you update the code!

## 🆔 Template IDs Must Be Exactly:
- `template_contact`
- `template_reservation` 
- `template_feedback`

Copy-paste the HTML code exactly as shown above! 🚀