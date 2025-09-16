// Auto-redirect after 2 seconds
setTimeout(() => {
    window.location.href = "home.html";
}, 2000);

// Additional animation effects
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle background particle effect
    const backgroundAnimation = document.querySelector('.background-animation');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#64ffda';
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random animation
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 5;
        particle.style.animation = `floatParticle ${duration}s infinite ${delay}s`;
        
        backgroundAnimation.appendChild(particle);
    }
});

// Add the floatParticle keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 0.5; }
        90% { opacity: 0.5; }
        100% { transform: translateY(-40px) translateX(20px); opacity: 0; }
    }
`;
document.head.appendChild(style);