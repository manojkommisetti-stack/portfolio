document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. GSAP Minimal Scroll Reveals
    // ==========================================
    gsap.registerPlugin(ScrollTrigger);

    // Fade up standard elements
    gsap.utils.toArray('.gsap-reveal').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%", // Trigger when top of element hits 85% down viewport
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Fade in from right (hero image)
    gsap.utils.toArray('.gsap-reveal-right').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.2
        });
    });


    // ==========================================
    // 2. Vanilla JS 3D Tilt Effect on Cards
    // ==========================================
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Calculate mouse position relative to the center of the card
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Maximum rotation in degrees
            const maxTilt = 8;
            
            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            // Apply 3D transform
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset to default smoothly
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });

        card.addEventListener('mouseenter', () => {
            // Remove transition on enter so it tracks mouse instantly
            card.style.transition = 'none';
        });
    });
});
