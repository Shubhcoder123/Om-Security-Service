// Firebase configuration and initialization
const firebaseConfig = {
    apiKey: "AIzaSyAOAjwKhF6iGr2zqONEevAXwMP1YHWO0gY",
    authDomain: "omsecurity-98f1e.firebaseapp.com",
    projectId: "omsecurity-98f1e",
    storageBucket: "omsecurity-98f1e.firebasestorage.app",
    messagingSenderId: "265699315904",
    appId: "1:265699315904:web:7257cfee28cab596f99d25",
    measurementId: "G-167NK98B7M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            nav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonials[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Auto rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Generate a unique serial code
function generateSerialCode() {
    const timestamp = new Date().getTime().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `OM-${timestamp}-${randomStr}`;
}

// Save form data to Firebase
async function saveFormData(formData) {
    try {
        const docRef = await db.collection("guardRequests").add({
            serialCode: generateSerialCode(),
            timestamp: new Date().toISOString(),
            status: 'pending',
            ...formData
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}

// Form Submission Handling
const quoteForm = document.getElementById('quoteForm');

quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Basic validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const address = document.getElementById('address').value;
    
    if (!name || !email || !phone || !service || !address) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Collect form data
    const formData = {
        name: name,
        email: email,
        phone: phone,
        service: service,
        address: address
    };
    
    try {
        // Save the data and get serial code
        const docId = await saveFormData(formData);
        
        // Show success message with serial code
        showNotification(`Thank you for your request! We will contact you shortly.`, 'success');
        quoteForm.reset();
    } catch (error) {
        console.error("Error saving form data: ", error);
        showNotification('There was an error submitting your request. Please try again.', 'error');
    }
});

// Scroll animations
function checkVisibility() {
    const serviceCards = document.querySelectorAll('.service-card');
    const features = document.querySelectorAll('.feature');
    
    serviceCards.forEach(card => {
        const position = card.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
            card.classList.add('visible');
        }
    });
    
    features.forEach(feature => {
        const position = feature.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
            feature.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Security camera animation
const camera = document.querySelector('.security-camera');
setInterval(() => {
    camera.style.color = `rgba(100, 255, 218, ${Math.random() * 0.5 + 0.5})`;
}, 2000);

// Create floating particles
const particlesContainer = document.getElementById('particles');
const particleCount = 30;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 5 + 2;
    const posX = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 15;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    // Random color from accent colors
    const colors = ['#64ffda', '#08d9d6', '#ff2e63', '#ffc93c'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = randomColor;
    
    particlesContainer.appendChild(particle);
}

// Notification function
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.innerHTML = `
        <p>${message}</p>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}