document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Sticky Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle (Basic)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(5, 11, 20, 0.95)';
            navLinks.style.padding = '20px';
            navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        }
    });

    // Reset mobile menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.background = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.borderBottom = 'none';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // 3. Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.getElementById('counter-section');
    let started = false;

    // Optional: Only run when into view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            started = true;
            counters.forEach(counter => {
                counter.innerText = '0';
                const updateCounter = () => {
                    const target = +counter.getAttribute('data-target');
                    const c = +counter.innerText;

                    // Calculate increment 
                    const increment = target / 50;

                    if (c < target) {
                        counter.innerText = `${Math.ceil(c + increment)}`;
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // 4. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 5. Form submission linked to WhatsApp
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('.btn-submit');
            const originalText = btn.innerText;
            btn.innerText = 'Redirecting to WhatsApp...';
            btn.style.background = '#4CAF50';
            
            // Gather form data
            const fname = document.getElementById('fname').value;
            const lname = document.getElementById('lname').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Construct WhatsApp Message
            let waText = `*New Lead Inquiry*\n`;
            waText += `*Name:* ${fname} ${lname}\n`;
            waText += `*Email:* ${email}\n`;
            waText += `*Phone:* ${phone}\n`;
            waText += `*Message:* ${message}`;

            const encodedWaText = encodeURIComponent(waText);
            const waNumber = '918281760160'; 
            const waLink = `https://wa.me/${waNumber}?text=${encodedWaText}`;

            // Open whatsapp
            window.open(waLink, '_blank');
            
            // Reset button
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = 'var(--accent-color)';
            }, 2000);
        });
    }
});
