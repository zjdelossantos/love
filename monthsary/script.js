document.addEventListener('DOMContentLoaded', function() {
    // Add animation to elements with data-animate attribute
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const animateOnScroll = () => {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add hover effect to gallery images
    const galleryImages = document.querySelectorAll('.gallery img');
    galleryImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Add click effect
        img.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 200);
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button, .button, .enter-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add floating effect to elements with data-float attribute
    const floatElements = document.querySelectorAll('[data-float]');
    floatElements.forEach(el => {
        el.style.animation = `float ${Math.random() * 3 + 3}s ease-in-out infinite`;
    });
    // Create floating hearts
    const heartsContainer = document.getElementById('heartsContainer');
    const heartIcons = ['❤️', '💖', '💕', '💓', '💗', '💘'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = 5 + Math.random() * 15 + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (1 + Math.random() * 2) + 'rem';
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 20000);
    }
    
    // Initial hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 1000);
    }
    
    // Continue creating hearts
    setInterval(createHeart, 2000);
    
    // Add sparkle effect on click
    document.addEventListener('click', function(e) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        document.body.appendChild(sparkle);
        
        // Animate sparkle
        const size = 5 + Math.random() * 15;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        sparkle.style.transition = 'all 0.5s ease-out';
        sparkle.style.opacity = '0.8';
        
        setTimeout(() => {
            sparkle.style.transform = 'scale(2)';
            sparkle.style.opacity = '0';
            
            // Remove sparkle after animation
            setTimeout(() => {
                sparkle.remove();
            }, 500);
        }, 10);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item-container');
    galleryItems.forEach((item, index) => {
        // Add slight delay for a ripple effect on page load
        item.style.transitionDelay = `${index * 0.05}s`;
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        // Animate in
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });
    
    // Add floating effect to signature
    const signature = document.querySelector('.signature');
    setInterval(() => {
        signature.style.transform = 'translateY(-3px)';
        setTimeout(() => {
            signature.style.transform = 'translateY(0)';
        }, 1000);
    }, 3000);
    
    // Add confetti effect on click
    document.addEventListener('click', function(e) {
        const colors = ['#ff6b6b', '#ff8e8e', '#ffb8b8', '#ffd3d3'];
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = e.clientX + 'px';
        confetti.style.top = e.clientY + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(confetti);
        
        // Animate confetti
        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;
        const rotation = Math.random() * 360;
        let posX = e.clientX;
        let posY = e.clientY;
        let opacity = 1;
        
        const animate = () => {
            posX += Math.cos(angle) * velocity;
            posY += Math.sin(angle) * velocity + 0.5; // Add gravity
            opacity -= 0.02;
            
            confetti.style.left = posX + 'px';
            confetti.style.top = posY + 'px';
            confetti.style.opacity = opacity;
            confetti.style.transform = `rotate(${rotation}deg) scale(${opacity})`;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        
        requestAnimationFrame(animate);
    });
});