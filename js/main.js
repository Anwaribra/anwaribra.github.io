document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-menu a").forEach(link =>
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
        })
    );

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / height) * 100;
            scrollIndicator.style.width = `${scrolled}%`;
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar?.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar?.classList.contains('scroll-down')) {
            navbar?.classList.remove('scroll-up');
            navbar?.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar?.classList.contains('scroll-down')) {
            navbar?.classList.remove('scroll-down');
            navbar?.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const isValid = [...contactForm.elements].every(el => !el.required || el.value.trim() !== "");
            if (contactMessage) {
                contactMessage.textContent = isValid ? "Message sent successfully!" : "Please fill in all required fields.";
                contactMessage.className = isValid ? "success" : "error";

                setTimeout(() => {
                    contactMessage.textContent = "";
                }, 3000);
            }
        });
    }

    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
        (prefersDarkScheme.matches ? 'dark' : 'light');

    // Apply the theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    // Update theme icon
    function updateThemeIcon(theme) {
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('show', window.scrollY > 300);
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Intersection Observer for animations and lazy loading
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('fade-in-element')) {
                    entry.target.classList.add('fade-in');
                }
                if (entry.target.hasAttribute('data-src')) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                }
                intersectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with fade-in class and lazy load images
    document.querySelectorAll('.fade-in-element, img[data-src]').forEach(element => {
        intersectionObserver.observe(element);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuToggle && navMenu && !menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('open');
        }
    });

    // Check if the CV file exists
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

    // Blog category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (categoryButtons.length > 0 && blogCards.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                
                // Update active state of buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter blog cards
                blogCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});

// Handle CV download
window.handleCVDownload = function(event) {
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
}; 