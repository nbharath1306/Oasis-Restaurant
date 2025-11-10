# 🚨 EmailJS Activation Required - Quick Setup Guide

## Current Status: ⚠️ SIMULATION MODE

Your EmailJS integration is **95% complete** but needs final activation!

### 📧 What's Working Now:
- ✅ Contact forms capture data
- ✅ Forms show "success" messages  
- ✅ All data is logged to console
- ✅ Service ID `service_rdwhfmn` is configured
- ✅ EmailJS library loaded on all pages

### ❌ What's Missing:
- **Public Key**: Not configured
- **Email Templates**: Not created
- **Live Sending**: Currently simulated

---

## 🔧 Quick 5-Minute Activation Steps

### Step 1: Get Your Public Key
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click **Account** → **API Keys**
3. Copy your **Public Key**

### Step 2: Activate the Code
In `/js/emailjs-integration.js` line 22, replace:
```javascript
// emailjs.init('YOUR_PUBLIC_KEY');
```
with:
```javascript
emailjs.init('your_actual_public_key_here');
```

### Step 3: Create Email Templates
Create these templates in your EmailJS dashboard:

#### Template 1: `template_contact`
```
Subject: New Contact Message - Oasis Restaurant

Hello Oasis Restaurant Team,

You have a new message from your website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Message: {{message}}

Submitted: {{date}} at {{time}}

Please respond promptly!
```

#### Template 2: `template_reservation`
```
Subject: Reservation Confirmed - {{booking_id}}

Dear {{to_name}},

Your reservation is confirmed!

Details:
- Booking ID: {{booking_id}}
- Date: {{date}} at {{time}}
- Guests: {{party_size}}
- Table: {{table}}

See you soon at Oasis Restaurant!
Phone: {{restaurant_phone}}
```

#### Template 3: `template_feedback`
```
Subject: New Customer Feedback

Customer: {{customer_name}}
Rating: {{rating}}/5 stars
Feedback: {{feedback}}
Date: {{date}}
```

### Step 4: Uncomment Live Sending
In `/js/emailjs-integration.js`, uncomment these lines:

**Line ~40:**
```javascript
const response = await emailjs.send(
    this.serviceId,
    this.templateIds.contact,
    templateParams
);
```

**Line ~75:**
```javascript
const response = await emailjs.send(
    this.serviceId,
    this.templateIds.reservation,
    templateParams
);
```

**Line ~110:**
```javascript
const response = await emailjs.send(
    this.serviceId,
    this.templateIds.feedback,
    templateParams
);
```

---

## 🧪 Test Current State

1. **Open**: http://localhost:8082
2. **Fill Contact Form**: Submit a message
3. **Check Console**: Press F12 → Console tab
4. **Look For**: "Contact form data to send:" message

You'll see the data being prepared - it just needs EmailJS activation!

---

## ⚡ After Activation

Once you complete the 4 steps above:
- ✅ Contact forms will send real emails
- ✅ Reservations will send confirmations
- ✅ Feedback will be forwarded to you
- ✅ Live chat messages will be emailed
- ✅ Full automation active!

---

## 🆘 Need Help?

1. **Check Console**: F12 → Console for error messages
2. **Verify Service ID**: Should be `service_rdwhfmn`
3. **Test Templates**: Use EmailJS dashboard test feature
4. **Check Email Delivery**: Look in spam folder initially

Your EmailJS integration is ready to go live - just needs these final steps! 🚀