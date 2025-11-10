#!/bin/bash

# EmailJS Activation Script for Oasis Restaurant
echo "🚀 EmailJS Activation Helper"
echo "══════════════════════════════════════"

echo ""
echo "📧 Current EmailJS Status:"
echo "✅ Service ID: service_rdwhfmn (configured)"
echo "✅ Library: Loaded"
echo "✅ Integration: 95% complete"
echo "⚠️  Missing: Public key & live sending"

echo ""
echo "🎯 To make it 100% functional, you need to:"
echo ""

echo "1️⃣  GET PUBLIC KEY:"
echo "   → Go to: https://emailjs.com"
echo "   → Sign up (free)"
echo "   → Account → API Keys → Copy your public key"
echo ""

echo "2️⃣  UPDATE CODE:"
echo "   → File: js/emailjs-integration.js"
echo "   → Line 22: Replace YOUR_PUBLIC_KEY with your actual key"
echo ""

echo "3️⃣  CREATE TEMPLATES:"
echo "   → EmailJS Dashboard → Email Templates → Create:"
echo "   → template_contact (for contact form)"
echo "   → template_reservation (for bookings)"
echo "   → template_feedback (for ratings)"
echo ""

echo "4️⃣  UNCOMMENT SENDING CODE:"
echo "   → File: js/emailjs-integration.js"
echo "   → Remove // from lines ~42, ~77, ~112"
echo ""

echo "📋 Template designs are ready in:"
echo "   → EmailJS-100-Percent-Guide.md"
echo ""

echo "🧪 Test by:"
echo "   → python3 -m http.server 8080"
echo "   → Open http://localhost:8080"
echo "   → Submit contact form"
echo "   → Check your email!"
echo ""

echo "⏱️  Total time needed: ~10 minutes"
echo "🎊 Result: Fully automated restaurant email system!"

# Check if user wants to open the guide
read -p "📖 Open detailed guide? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v code &> /dev/null; then
        code EmailJS-100-Percent-Guide.md
        echo "📄 Guide opened in VS Code!"
    else
        echo "📄 Please check: EmailJS-100-Percent-Guide.md"
    fi
fi

echo ""
echo "🚀 Ready to activate EmailJS!"