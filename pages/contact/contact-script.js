// Contact Page JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initFAQSection();
    initSmoothScrolling();
    initAnimations();
});

// FAQ Section Functionality
function initFAQSection() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animations and Scroll Effects
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.contact-method, .office-card, .faq-item, .section-header'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fa-solid ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fa-solid fa-times"></i>
            </button>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 50);
    
    // Close functionality
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#2563eb'
    };
    return colors[type] || colors.info;
}

// Contact Methods Click Tracking
document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    
    if (target) {
        // Track phone calls
        if (target.href.startsWith('tel:')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    event_category: 'Contact',
                    event_label: target.href
                });
            }
        }
        
        // Track email clicks
        if (target.href.startsWith('mailto:')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_click', {
                    event_category: 'Contact',
                    event_label: target.href
                });
            }
        }
        
        // Track WhatsApp clicks
        if (target.href.includes('wa.me')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    event_category: 'Contact',
                    event_label: 'WhatsApp'
                });
            }
        }
    }
});

// Schedule Call Modal (placeholder)
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-schedule') || e.target.closest('a[href="#schedule-call"]')) {
        e.preventDefault();
        
        // You can integrate with Calendly, HubSpot, or other scheduling tools
        showNotification('Schedule feature coming soon! Please call us directly or send an email.', 'info');
        
        // Example: Open Calendly
        // window.open('https://calendly.com/your-company/consultation', '_blank');
    }
});

// Lazy Loading for Office Location Images (if any)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoading);
} else {
    initLazyLoading();
}

// Error handling for missing dependencies
window.addEventListener('error', function(e) {
    console.warn('Contact page script error:', e.message);
    
    // Fallback for Swiper if not loaded
    if (e.message.includes('Swiper')) {
        console.warn('Swiper not loaded, testimonials will be static');
        
        // Show first testimonial only
        const testimonials = document.querySelectorAll('.swiper-slide');
        testimonials.forEach((slide, index) => {
            if (index > 0) {
                slide.style.display = 'none';
            }
        });
    }
});

// Export functions for potential external use
window.ContactPage = {
    showNotification,
    initFAQSection
}; 