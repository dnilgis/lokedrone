// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Quote Form - Cost Calculator
const acresInput = document.getElementById('acres');
const estimatedCostDiv = document.getElementById('estimatedCost');
const costAmountSpan = document.getElementById('costAmount');
const pricePerAcre = 18;

if (acresInput && estimatedCostDiv && costAmountSpan) {
    acresInput.addEventListener('input', () => {
        const acres = parseFloat(acresInput.value);
        if (acres && acres > 0) {
            const totalCost = acres * pricePerAcre;
            costAmountSpan.textContent = `$${totalCost.toFixed(2)}`;
            estimatedCostDiv.style.display = 'block';
        } else {
            estimatedCostDiv.style.display = 'none';
        }
    });
}

// Quote Form Submission
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            acres: document.getElementById('acres').value,
            service: document.getElementById('service').value,
            location: document.getElementById('location').value,
            timeframe: document.getElementById('timeframe').value,
            message: document.getElementById('message').value
        };
        
        // In a real implementation, you would send this data to a server
        // For now, we'll just show a success message
        console.log('Quote request submitted:', formData);
        
        // Show success message
        showSuccessMessage(quoteForm, 'Thank you! We\'ve received your quote request and will contact you within 24 hours.');
        
        // Reset form
        quoteForm.reset();
        estimatedCostDiv.style.display = 'none';
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // In a real implementation, you would send this data to a server
        console.log('Contact form submitted');
        
        // Show success message
        showSuccessMessage(contactForm, 'Thank you for reaching out! We\'ll get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Success Message Display
function showSuccessMessage(form, message) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            background: #d4edda;
            color: #155724;
            padding: 20px;
            border-radius: 6px;
            border: 1px solid #c3e6cb;
            margin-top: 20px;
            text-align: center;
            font-weight: 600;
        ">
            ✓ ${message}
        </div>
    `;
    
    // Insert after form
    form.parentNode.insertBefore(successDiv, form.nextSibling);
    
    // Scroll to message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animate elements on scroll (fade in)
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

// Observe service cards, testimonials, and case studies
document.querySelectorAll('.service-card, .testimonial-card, .case-study').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        
        e.target.value = value;
    });
}

// Form validation styling
document.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.style.borderColor = '#dc3545';
    });
    
    input.addEventListener('input', () => {
        if (input.validity.valid) {
            input.style.borderColor = '#28a745';
        } else {
            input.style.borderColor = '';
        }
    });
});

console.log('Loke Drone LC website loaded successfully');
