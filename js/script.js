// Form Validation and Interactive Elements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initFormValidation();
    initImageLightbox();
    initSearchFunctionality();
    initSmoothScrolling();
    initAccordions();
});

// Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const enquiryForm = document.getElementById('enquiryForm');

    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', validateEnquiryForm);
    }
}

function validateContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');
    let isValid = true;

    // Clear previous errors
    clearErrors(form);

    // Name validation
    if (!name.value.trim()) {
        showError(name, 'Full name is required');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Message validation
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters long');
        isValid = false;
    }

    if (isValid) {
        // Simulate form submission
        showSuccessMessage(form, 'Thank you! Your message has been sent successfully.');
        form.reset();
    }
}

function validateEnquiryForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const enquiryType = form.querySelector('select[name="type"]');
    const message = form.querySelector('textarea[name="message"]');
    let isValid = true;

    clearErrors(form);

    // Name validation
    if (!name.value.trim()) {
        showError(name, 'Full name is required');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Enquiry type validation
    if (!enquiryType.value) {
        showError(enquiryType, 'Please select an enquiry type');
        isValid = false;
    }

    // Message validation
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 20) {
        showError(message, 'Please provide more details (at least 20 characters)');
        isValid = false;
    }

    if (isValid) {
        const response = generateEnquiryResponse(enquiryType.value);
        showSuccessMessage(form, `Thank you for your enquiry! ${response}`);
        form.reset();
    }
}

function generateEnquiryResponse(type) {
    const responses = {
        'product': 'Our team will contact you within 24 hours with product details and pricing.',
        'volunteer': 'We appreciate your interest in volunteering! Our community coordinator will reach out to discuss opportunities.',
        'sponsor': 'Thank you for your sponsorship interest! Our partnerships team will contact you to discuss collaboration options.'
    };
    return responses[type] || 'We will get back to you soon!';
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9em';
    errorDiv.style.marginTop = '5px';
    
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#e74c3c';
}

function clearErrors(form) {
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

function showSuccessMessage(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        background: #2ecc71;
        color: white;
        padding: 15px;
        border-radius: 5px;
        margin: 20px 0;
        text-align: center;
    `;
    
    form.parentNode.insertBefore(successDiv, form);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Image Lightbox
function initImageLightbox() {
    const productImages = document.querySelectorAll('.product-card img');
    
    productImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
}

function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(255,255,255,0.3);
    `;
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
}

function filterProducts() {
    const searchTerm = this.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in';
        } else {
            card.style.display = 'none';
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Accordions for FAQ section
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all accordions
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });
            
            // Open clicked one if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}