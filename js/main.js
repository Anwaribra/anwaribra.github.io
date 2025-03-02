document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Here you would typically send the data to a server
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, message });

            // Show success message
            alert('Thank you for your message! I will get back to you soon.');

            // Reset form
            contactForm.reset();
        });
    }

    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinkElements = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinkElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add animation to timeline items when they come into view
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'light-mode') {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    // Toggle theme
    themeToggle.addEventListener('click', function () {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Stats counter animation
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // animation duration in milliseconds
            const step = target / (duration / 16); // approximately 16ms per frame
            let current = 0;

            const updateCount = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };

            updateCount();
        });
    }

    // إضافة مراقب التقاطع للإحصائيات
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }
});

function handleCVDownload(event) {
    // Keep the default behavior for Google Drive links
    if (event.currentTarget.href.includes('drive.google.com')) {
        return true;
    }
    
    event.preventDefault();
    
    const cvPath = './assets/files/Anwar-Mousa-CV.pdf';
    
    // Try to open in a new tab first
    const newTab = window.open(cvPath, '_blank');
    
    // If blocked by popup blocker or failed, try direct download
    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = 'Anwar-Mousa-CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Log for debugging
    console.log('CV download attempted');
}

// Check if the CV file exists when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const cvLink = document.querySelector('a[href$="Anwar-Mousa-CV.pdf"]');
    if (cvLink) {
        fetch(cvLink.href)
            .then(response => {
                if (!response.ok) {
                    console.error('CV file not found at specified path');
                    cvLink.style.color = '#999';
                    cvLink.title = 'CV file not available';
                }
            })
            .catch(error => {
                console.error('Error checking CV file:', error);
            });
    }
}); 