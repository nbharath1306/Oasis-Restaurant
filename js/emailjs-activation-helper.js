// ===== EMAILJS ACTIVATION HELPER =====
// This script shows you exactly what to uncomment to activate EmailJS

function showActivationSteps() {
    console.log('🔧 EmailJS Activation Helper');
    console.log('═══════════════════════════════════');
    
    console.log('\n📝 STEP 1: Add Your Public Key');
    console.log('File: js/emailjs-integration.js');
    console.log('Line: 22');
    console.log('Change this:');
    console.log('❌ // emailjs.init(\'YOUR_PUBLIC_KEY\');');
    console.log('To this:');
    console.log('✅ emailjs.init(\'your_actual_public_key_here\');');
    
    console.log('\n📧 STEP 2: Uncomment Email Sending Code');
    console.log('File: js/emailjs-integration.js');
    
    console.log('\n🎯 Location 1: Contact Form (Line ~42)');
    console.log('Uncomment these lines:');
    console.log('✅ const response = await emailjs.send(');
    console.log('✅     this.serviceId,');
    console.log('✅     this.templateIds.contact,');
    console.log('✅     templateParams');
    console.log('✅ );');
    
    console.log('\n🎯 Location 2: Reservations (Line ~77)');
    console.log('Uncomment these lines:');
    console.log('✅ const response = await emailjs.send(');
    console.log('✅     this.serviceId,');
    console.log('✅     this.templateIds.reservation,');
    console.log('✅     templateParams');
    console.log('✅ );');
    
    console.log('\n🎯 Location 3: Feedback (Line ~112)');
    console.log('Uncomment these lines:');
    console.log('✅ const response = await emailjs.send(');
    console.log('✅     this.serviceId,');
    console.log('✅     this.templateIds.feedback,');
    console.log('✅     templateParams');
    console.log('✅ );');
    
    console.log('\n🎨 STEP 3: Create Templates in EmailJS Dashboard');
    console.log('Template IDs needed:');
    console.log('• template_contact');
    console.log('• template_reservation');
    console.log('• template_feedback');
    
    console.log('\n🧪 STEP 4: Test');
    console.log('After changes:');
    console.log('1. Refresh the page');
    console.log('2. Submit contact form');
    console.log('3. Check your email!');
    
    console.log('\n📋 Current Configuration:');
    console.log('Service ID:', emailService?.serviceId || 'Not loaded');
    console.log('Templates:', emailService?.templateIds || 'Not loaded');
    
    return {
        publicKeyLine: 22,
        contactFormLine: '~42',
        reservationLine: '~77',
        feedbackLine: '~112',
        file: 'js/emailjs-integration.js'
    };
}

// Auto-run when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('\n🚀 Want to activate EmailJS? Type: showActivationSteps()');
    }, 2000);
});

// Make it globally available
window.showActivationSteps = showActivationSteps;