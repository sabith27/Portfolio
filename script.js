document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Header Scroll Effect & Active Link Highlight & Scroll to Top
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links li a');
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        // Header background effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll to Top visibility
        if (window.scrollY > 300) {
            scrollTopBtn?.classList.remove('disabled');
        } else {
            scrollTopBtn?.classList.add('disabled');
        }

        // Active link highlighting based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Scroll Animation - Intersection Observer
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // EmailJS Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // These IDs from the previous steps
            const btn = document.getElementById('submit-btn');
            const originalBtnText = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

            // TODO: Replace with your EmailJS service ID and template ID
            const serviceID = 'service_a5w0jcz';
            const templateID = 'template_c5cqei5';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                    btn.style.backgroundColor = '#4CAF50';
                    btn.style.color = '#fff';
                    contactForm.reset();

                    setTimeout(() => {
                        btn.innerHTML = originalBtnText;
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                    }, 3000);
                }, (err) => {
                    btn.innerHTML = 'Error! <i class="fas fa-times"></i>';
                    btn.style.backgroundColor = '#f44336';
                    console.log(JSON.stringify(err));

                    setTimeout(() => {
                        btn.innerHTML = originalBtnText;
                        btn.style.backgroundColor = '';
                    }, 3000);
                });
        });
    }
});
