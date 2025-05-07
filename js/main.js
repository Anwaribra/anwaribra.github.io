// Initialize site interactions after DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new ThemeToggle();
    new ScrollHandler();
    new FormHandler();
    new CVDownloadHandler();
    initIntersectionObserver();
  });
  
  // Navigation Component
  class Navigation {
    constructor() {
      this.navbar = document.querySelector('.navbar');
      this.hamburger = document.querySelector('.hamburger');
      this.navLinks = document.querySelector('.nav-links');
      this.navItems = document.querySelectorAll('.nav-links a');
      this.currentPath = window.location.pathname.split('/').pop();
      this.init();
    }
  
    init() {
      this.hamburger?.addEventListener('click', () => {
        this.navLinks?.classList.toggle('active');
        this.hamburger.classList.toggle('active');
      });
  
      document.addEventListener('click', (e) => {
        if (!this.navbar?.contains(e.target)) {
          this.navLinks?.classList.remove('active');
          this.hamburger?.classList.remove('active');
        }
      });
  
      this.navItems.forEach(item => {
        if (item.getAttribute('href') === this.currentPath) {
          item.classList.add('active');
        }
      });
    }
  }
  
  // Theme Toggle Component
  class ThemeToggle {
    constructor() {
      this.themeToggle = document.getElementById('theme-toggle');
      this.themeIcon = this.themeToggle?.querySelector('i');
      this.html = document.documentElement;
      this.init();
    }
  
    init() {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      this.html.setAttribute('data-theme', savedTheme);
      this.updateIcon(savedTheme);
  
      this.themeToggle?.addEventListener('click', () => {
        const currentTheme = this.html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateIcon(newTheme);
      });
    }
  
    updateIcon(theme) {
      if (this.themeIcon) {
        this.themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    }
  }
  
  // Scroll Handler (for scroll indicator, back-to-top, smooth scroll, navbar behavior)
  class ScrollHandler {
    constructor() {
      this.scrollIndicator = document.querySelector('.scroll-indicator');
      this.backToTopButton = document.querySelector('.back-to-top');
      this.navbar = document.querySelector('.navbar');
      this.lastScroll = 0;
      this.init();
    }
  
    init() {
      window.addEventListener('scroll', () => {
        this.handleScrollIndicator();
        this.handleBackToTop();
        this.handleNavbarScroll();
      });
  
      this.backToTopButton?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target) {
            const offset = target.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top: offset, behavior: 'smooth' });
          }
        });
      });
    }
  
    handleScrollIndicator() {
      if (this.scrollIndicator) {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / height) * 100;
        this.scrollIndicator.style.width = `${scrolled}%`;
      }
    }
  
    handleBackToTop() {
      if (this.backToTopButton) {
        this.backToTopButton.classList.toggle('show', window.scrollY > 300);
      }
    }
  
    handleNavbarScroll() {
      const currentScroll = window.scrollY;
      if (currentScroll <= 0) {
        this.navbar?.classList.remove('scroll-up');
        return;
      }
  
      if (currentScroll > this.lastScroll && !this.navbar?.classList.contains('scroll-down')) {
        this.navbar?.classList.remove('scroll-up');
        this.navbar?.classList.add('scroll-down');
      } else if (currentScroll < this.lastScroll && this.navbar?.classList.contains('scroll-down')) {
        this.navbar?.classList.remove('scroll-down');
        this.navbar?.classList.add('scroll-up');
      }
      this.lastScroll = currentScroll;
    }
  }
  
  // Form Validation Handler
  class FormHandler {
    constructor() {
      this.form = document.getElementById('contact-form');
      this.message = document.getElementById('contact-message');
      this.init();
    }
  
    init() {
      if (!this.form) return;
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const isValid = [...this.form.elements].every(el => !el.required || el.value.trim() !== "");
        if (this.message) {
          if (!isValid) {
            this.message.textContent = "Please fill in all required fields.";
            this.message.className = "error";
            return;
          }
          this.message.textContent = "Message sent successfully!";
          this.message.className = "success";
          setTimeout(() => this.message.textContent = '', 3000);
        }
      });
    }
  }
  
  // CV Download Handler
  class CVDownloadHandler {
    constructor() {
      this.cvPath = './assets/files/Anwar-Mousa-CV.pdf';
      this.init();
    }
  
    init() {
      window.handleCVDownload = (event) => {
        if (event.currentTarget.href.includes('drive.google.com')) return true;
        event.preventDefault();
  
        const newTab = window.open(this.cvPath, '_blank');
        if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
          const link = document.createElement('a');
          link.href = this.cvPath;
          link.download = 'Anwar-Mousa-CV.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };
    }
  }
  
  // Intersection Observer
  function initIntersectionObserver() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('section').forEach(section => observer.observe(section));
  } 
  
  // Optional: Global Notification System (can be triggered anywhere)
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  } 
  
  window.showNotification = showNotification;
  