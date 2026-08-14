// KC Problem Solving - Main JavaScript
// Simple and Working Version

document.addEventListener('DOMContentLoaded', function() {
    console.log('KC Problem Solving website loaded');
    initializeAllFeatures();
});

function initializeAllFeatures() {
    // Initialize all features
    setupMobileMenu();
    setupSmoothScrolling();
    setupContactForm();
    setupLiveChat();
    setupAnimations();
    setupTestimonials();
}

// 1. Mobile Menu Setup
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Change icon
            if (navLinks.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// 2. Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate position
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 3. Contact Form Handling
function setupContactForm() {
    const form = document.getElementById('consultationForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Submit the form to Zoho inside the hidden iframe
            form.submit();

            // Give Zoho a moment to receive the submission
            setTimeout(function() {
                form.reset();

                alert(
                    'Thank you! Your consultation request has been submitted.\n\n' +
                    'We will contact you within 24 hours.'
                );

                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

            }, 1500);
        });
    }
}

// 4. Live Chat Feature
function setupLiveChat() {
    const chatToggle = document.getElementById('chatToggle');
    const chatBox = document.getElementById('chatBox');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatToggle || !chatBox) return;
    
    // Toggle chat box
    chatToggle.addEventListener('click', function() {
        chatBox.classList.toggle('active');
    });
    
    // Close chat
    if (chatClose) {
        chatClose.addEventListener('click', function() {
            chatBox.classList.remove('active');
        });
    }
    
    // Send message
    if (chatSend && chatInput && chatMessages) {
        chatSend.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addChatMessage(message, 'user');
        chatInput.value = '';
        
        // Auto-reply after delay
        setTimeout(() => {
            const replies = [
                "Thanks for your question! We'll get back to you shortly.",
                "For immediate assistance, call us at 226-377-8999.",
                "That's a common manufacturing issue. We can help with that.",
                "Let me connect you with our engineering team.",
                "We specialize in solving that type of problem."
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            addChatMessage(randomReply, 'bot');
        }, 1000);
    }
    
    function addChatMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Auto-open chat after 30 seconds
    setTimeout(() => {
        if (!chatBox.classList.contains('active')) {
            chatBox.classList.add('active');
        }
    }, 30000);
}

// 5. Animations on Scroll
function setupAnimations() {
    // Simple fade-in animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe cards
    document.querySelectorAll('.service-card, .problem-card, .testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// 6. Testimonials Slider (Simple version)
function setupTestimonials() {
    // If you want a rotating testimonials slider, uncomment this:
    /*
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    if (testimonials.length > 1) {
        // Hide all except first
        testimonials.forEach((card, index) => {
            if (index !== 0) {
                card.style.display = 'none';
            }
        });
        
        // Rotate every 5 seconds
        setInterval(() => {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        }, 5000);
    }
    */
}

// 7. Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'white';
    }
});

// 8. Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 9. Page load counter (analytics demo)
function trackPageView() {
    let views = parseInt(localStorage.getItem('kcps_page_views') || '0');
    views++;
    localStorage.setItem('kcps_page_views', views.toString());
    console.log(`Page views: ${views}`);
}

// Initialize page tracking
trackPageView();

// Make functions available globally (if needed)
window.validateEmail = validateEmail;
