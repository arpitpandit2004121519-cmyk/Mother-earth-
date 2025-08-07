// Space Web - Interactive JavaScript

// Speed data with realistic variations
const speedData = {
    rotation: {
        base: 1670,
        variation: 5,
        unit: 'km/h'
    },
    orbital: {
        base: 107226,
        variation: 50,
        unit: 'km/h'
    },
    timeToSun: {
        base: 8,
        variation: 0.1,
        unit: 'minutes'
    }
};

// Space facts array
const spaceFacts = [
    "Earth completes one rotation every 24 hours",
    "Earth orbits the Sun at 107,226 km/h",
    "Light from the Sun takes 8 minutes to reach Earth",
    "Earth's diameter is 12,742 kilometers",
    "The Moon is 384,400 km away from Earth",
    "Earth's atmosphere extends 10,000 km into space",
    "Earth's magnetic field protects us from solar radiation",
    "Earth is the only known planet with life",
    "Earth's surface is 71% water and 29% land",
    "The Earth's core is as hot as the surface of the Sun",
    "Earth's gravity is 9.8 m/s²",
    "Earth has one natural satellite - the Moon",
    "Earth's rotation is gradually slowing down",
    "Earth's orbit around the Sun is elliptical",
    "Earth's axial tilt causes seasons"
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSpeedCounters();
    initializeFactRotation();
    initializeInteractiveFeatures();
    startRealTimeUpdates();
});

// Initialize speed counters with animation
function initializeSpeedCounters() {
    const rotationSpeed = document.getElementById('rotation-speed');
    const orbitalSpeed = document.getElementById('orbital-speed');
    const timeToSun = document.getElementById('time-to-sun');
    
    // Animate counters on page load
    animateCounter(rotationSpeed, 0, speedData.rotation.base, 2000);
    animateCounter(orbitalSpeed, 0, speedData.orbital.base, 3000);
    animateCounter(timeToSun, 0, speedData.timeToSun.base, 1500);
}

// Animate counter function
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = start + (difference * easeOutQuart);
        
        element.textContent = Math.round(currentValue).toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Initialize fact rotation
function initializeFactRotation() {
    const factElement = document.getElementById('current-fact');
    let currentFactIndex = 0;
    
    function updateFact() {
        factElement.style.opacity = '0';
        
        setTimeout(() => {
            factElement.textContent = spaceFacts[currentFactIndex];
            factElement.style.opacity = '1';
            currentFactIndex = (currentFactIndex + 1) % spaceFacts.length;
        }, 500);
    }
    
    // Update fact every 4 seconds
    setInterval(updateFact, 4000);
}

// Initialize interactive features
function initializeInteractiveFeatures() {
    // Add hover effects to info cards
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to earth
    const earth = document.querySelector('.earth');
    earth.addEventListener('click', function() {
        // Add zoom animation class
        this.classList.add('zoomed');
        
        // Remove class after animation
        setTimeout(() => {
            this.classList.remove('zoomed');
        }, 800);
        
        // Show a fun message
        showNotification('🌍 Earth clicked! You\'re now in space!');
    });
    
    // Add click effects to sun
    const sun = document.querySelector('.sun');
    sun.addEventListener('click', function() {
        this.style.transform = 'scale(1.3)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
        
        showNotification('☀️ Sun clicked! It\'s 15 million degrees Celsius!');
    });
}

// Start real-time updates
function startRealTimeUpdates() {
    setInterval(() => {
        updateSpeeds();
    }, 3000); // Update every 3 seconds
}

// Update speeds with realistic variations
function updateSpeeds() {
    const rotationSpeed = document.getElementById('rotation-speed');
    const orbitalSpeed = document.getElementById('orbital-speed');
    const timeToSun = document.getElementById('time-to-sun');
    
    // Add small random variations to make it more realistic
    const rotationVariation = speedData.rotation.base + (Math.random() - 0.5) * speedData.rotation.variation;
    const orbitalVariation = speedData.orbital.base + (Math.random() - 0.5) * speedData.orbital.variation;
    const timeVariation = speedData.timeToSun.base + (Math.random() - 0.5) * speedData.timeToSun.variation;
    
    // Smooth update with animation
    animateValue(rotationSpeed, parseFloat(rotationSpeed.textContent.replace(',', '')), rotationVariation, 1000);
    animateValue(orbitalSpeed, parseFloat(orbitalSpeed.textContent.replace(',', '')), orbitalVariation, 1000);
    animateValue(timeToSun, parseFloat(timeToSun.textContent), timeVariation, 1000);
}

// Animate value change
function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = start + (difference * easeOutCubic);
        
        element.textContent = Math.round(currentValue).toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Show notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 255, 255, 0.9);
        color: #000;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add keyboard controls
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'e':
        case 'E':
            document.querySelector('.earth').click();
            break;
        case 's':
        case 'S':
            document.querySelector('.sun').click();
            break;
        case ' ':
            event.preventDefault();
            showNotification('🚀 Space Web - Explore the universe!');
            break;
    }
});

// Add touch support for mobile
document.addEventListener('touchstart', function(event) {
    const touch = event.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (element && element.classList.contains('earth')) {
        event.preventDefault();
        element.click();
        
        // Add haptic feedback for mobile
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
    } else if (element && element.classList.contains('sun')) {
        event.preventDefault();
        element.click();
        
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
});

// Add parallax effect for stars
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const stars = document.querySelectorAll('.stars, .stars2, .stars3');
    
    stars.forEach((star, index) => {
        const speed = (index + 1) * 0.5;
        star.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add mouse movement effect
document.addEventListener('mousemove', function(event) {
    const mouseX = event.clientX / window.innerWidth;
    const mouseY = event.clientY / window.innerHeight;
    
    const earth = document.querySelector('.earth');
    const sun = document.querySelector('.sun');
    
    // Subtle movement based on mouse position (only if not zoomed)
    if (!earth.classList.contains('zoomed')) {
        earth.style.transform = `rotate(${mouseX * 5}deg)`;
    }
    sun.style.transform = `scale(${1 + mouseY * 0.1})`;
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add performance optimization
let animationFrameId;
function optimizeAnimations() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    // Throttle animations for better performance
    animationFrameId = requestAnimationFrame(() => {
        // Update only visible elements
        const elements = document.querySelectorAll('.info-card, .earth, .sun');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                element.style.willChange = 'transform';
            } else {
                element.style.willChange = 'auto';
            }
        });
    });
}

// Call optimization function periodically
setInterval(optimizeAnimations, 1000);