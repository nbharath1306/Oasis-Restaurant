// ===== EMAILJS STATUS CHECKER =====

function checkEmailJSStatus() {
    console.log('🔍 EmailJS Integration Status Check');
    console.log('=====================================');
    
    // Check if EmailJS library is loaded
    if (typeof emailjs !== 'undefined') {
        console.log('✅ EmailJS Library: LOADED');
    } else {
        console.log('❌ EmailJS Library: NOT LOADED');
    }
    
    // Check if EmailJS service is available
    if (typeof emailService !== 'undefined') {
        console.log('✅ EmailJS Service Class: AVAILABLE');
        console.log('📧 Service ID:', emailService.serviceId);
        console.log('🆔 Template IDs:', emailService.templateIds);
    } else {
        console.log('❌ EmailJS Service Class: NOT AVAILABLE');
    }
    
    // Check configuration status
    console.log('\n🔧 Configuration Status:');
    console.log('Service ID: service_rdwhfmn ✅');
    console.log('Public Key: ⚠️ NOT CONFIGURED (line 22 in emailjs-integration.js)');
    console.log('Templates: ⚠️ NOT CREATED IN DASHBOARD');
    console.log('Live Sending: ❌ COMMENTED OUT (simulation mode active)');
    
    console.log('\n📝 Current Mode: SIMULATION');
    console.log('Forms will show success messages but emails won\'t be sent.');
    console.log('Check EmailJS-Activation-Guide.md for setup steps.');
    
    return {
        libraryLoaded: typeof emailjs !== 'undefined',
        serviceAvailable: typeof emailService !== 'undefined',
        configured: false,
        mode: 'simulation'
    };
}

// Auto-run status check when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        checkEmailJSStatus();
    }, 1000);
});

// Make it available globally for manual testing
window.checkEmailJSStatus = checkEmailJSStatus;