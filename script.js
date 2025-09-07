// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Slideshow Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    showSlide(currentSlide);
}

// Auto-advance slideshow
setInterval(() => {
    changeSlide(1);
}, 5000);

// Animated Counters
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate counters when analytics section is visible
            if (entry.target.classList.contains('analytics')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
            }
            
            // Animate gender bars and age bars when audience section is visible
            if (entry.target.classList.contains('audience')) {
                // Animate gender bars
                const genderFills = entry.target.querySelectorAll('.gender-fill');
                genderFills.forEach((fill, index) => {
                    setTimeout(() => {
                        const targetWidth = fill.getAttribute('data-target-width');
                        fill.style.width = targetWidth;
                    }, index * 300);
                });
                
                // Animate age bars without showing percentage text
                const ageBars = entry.target.querySelectorAll('.age-bar');
                ageBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const percent = bar.getAttribute('data-percent');
                        bar.style.height = percent + '%';
                    }, index * 200 + 500);
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animations
document.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for animated elements
    const animatedSections = document.querySelectorAll('section');
    animatedSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Show hero section immediately
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
    
    // Initialize age bars with 0 height and gender bars with 0 width
    const ageBars = document.querySelectorAll('.age-bar');
    ageBars.forEach(bar => {
        bar.style.height = '0%';
    });
    
    // Initialize gender bars with 0 width
    const genderFills = document.querySelectorAll('.gender-fill');
    genderFills.forEach(fill => {
        const originalWidth = fill.style.width;
        fill.setAttribute('data-target-width', originalWidth);
        fill.style.width = '0%';
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Service Cards Hover Effect Enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Brand Cards Hover Effect Enhancement
document.querySelectorAll('.brand-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Social Icons Animation
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.service-card, .brand-card, .stat-card, .contact-item');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .service-card, .brand-card, .stat-card, .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card.revealed, .brand-card.revealed, .stat-card.revealed, .contact-item.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize reveal animation
document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Touch/Swipe Support for Slideshow
let touchStartX = 0;
let touchEndX = 0;

const slideshowContainer = document.querySelector('.slideshow-container');

if (slideshowContainer) {
    slideshowContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slideshowContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left, next slide
        } else {
            changeSlide(-1); // Swipe right, previous slide
        }
    }
}

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Image failed to load:', this.src);
    });
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Admin Panel Functions
function toggleAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel.style.display === 'none' || adminPanel.style.display === '') {
        // Show password modal before showing admin panel
        showPasswordModal();
    } else {
        adminPanel.style.display = 'none';
    }
}

function showPasswordModal() {
    const passwordModal = document.getElementById('password-modal');
    passwordModal.style.display = 'flex';
    // Focus on password input
    setTimeout(() => {
        const passwordInput = document.getElementById('admin-password');
        passwordInput.focus();
        // Add Enter key support
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }, 100);
}

function closePasswordModal() {
    const passwordModal = document.getElementById('password-modal');
    passwordModal.style.display = 'none';
    // Clear password input
    document.getElementById('admin-password').value = '';
}

function checkPassword() {
    const password = document.getElementById('admin-password').value;
    if (password === 'Bruce123') {
        closePasswordModal();
        const adminPanel = document.getElementById('admin-panel');
        adminPanel.style.display = 'flex';
    } else {
        alert('Incorrect password. Access denied.');
        document.getElementById('admin-password').value = '';
        document.getElementById('admin-password').focus();
    }
}

function updateStats() {
    // Update Journey Stats
    const statesVisited = document.getElementById('states-visited').value;
    const journeyStarted = document.getElementById('journey-started').value;
    const fifthWheel = document.getElementById('fifth-wheel').value;
    
    // Update Analytics
    const avgFollowers = document.getElementById('avg-followers').value;
    const avgReach = document.getElementById('avg-reach').value;
    const avgImpressions = document.getElementById('avg-impressions').value;
    const engagementRate = document.getElementById('engagement-rate').value;
    
    // Update Gender Distribution
    const femalePercent = document.getElementById('female-percent').value;
    const malePercent = document.getElementById('male-percent').value;
    
    // Update Age Distribution
    const age18_24 = document.getElementById('age-18-24').value;
    const age25_34 = document.getElementById('age-25-34').value;
    const age35_44 = document.getElementById('age-35-44').value;
    
    // Update Journey Stats in DOM
    const journeyStats = document.querySelectorAll('.journey-stats .stat-number');
    journeyStats[0].textContent = statesVisited;
    journeyStats[1].textContent = journeyStarted;
    journeyStats[2].textContent = fifthWheel;
    
    // Update Analytics in DOM
    const analyticsStats = document.querySelectorAll('.analytics .stat-number');
    analyticsStats[0].setAttribute('data-target', avgFollowers);
    analyticsStats[1].setAttribute('data-target', avgReach);
    analyticsStats[2].setAttribute('data-target', avgImpressions);
    analyticsStats[3].setAttribute('data-target', engagementRate);
    
    // Update Gender Distribution in DOM
    const genderFills = document.querySelectorAll('.gender-fill');
    const genderPercents = document.querySelectorAll('.gender-percent');
    genderFills[0].style.width = femalePercent + '%';
    genderFills[0].setAttribute('data-target-width', femalePercent + '%');
    genderPercents[0].textContent = femalePercent + '%';
    genderFills[1].style.width = malePercent + '%';
    genderFills[1].setAttribute('data-target-width', malePercent + '%');
    genderPercents[1].textContent = malePercent + '%';
    
    // Update Age Distribution in DOM
    const ageBars = document.querySelectorAll('.age-bar');
    const ageValues = [age18_24, age25_34, age35_44];
    ageBars.forEach((bar, index) => {
        bar.setAttribute('data-percent', ageValues[index]);
        bar.style.height = ageValues[index] + '%';
    });
    
    // Reset and re-animate analytics counters
    analyticsStats.forEach(counter => {
        counter.textContent = '0';
    });
    
    // Re-trigger the animation
    const analyticsSection = document.querySelector('.analytics');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(analyticsSection);
    
    // Save to localStorage for persistence
    const statsData = {
        statesVisited,
        journeyStarted,
        fifthWheel,
        avgFollowers,
        avgReach,
        avgImpressions,
        engagementRate,
        femalePercent,
        malePercent,
        age18_24,
        age25_34,
        age35_44
    };
    localStorage.setItem('websiteStats', JSON.stringify(statsData));
    
    alert('Statistics updated successfully!');
    toggleAdminPanel();
}

function loadSavedStats() {
    const savedStats = localStorage.getItem('websiteStats');
    if (savedStats) {
        const stats = JSON.parse(savedStats);
        
        // Update input fields
        document.getElementById('states-visited').value = stats.statesVisited || '29';
        document.getElementById('journey-started').value = stats.journeyStarted || '2021';
        document.getElementById('fifth-wheel').value = stats.fifthWheel || '40ft';
        document.getElementById('avg-followers').value = stats.avgFollowers || '3115';
        document.getElementById('avg-reach').value = stats.avgReach || '2600';
        document.getElementById('avg-impressions').value = stats.avgImpressions || '2000';
        document.getElementById('engagement-rate').value = stats.engagementRate || '85';
        document.getElementById('female-percent').value = stats.femalePercent || '79';
        document.getElementById('male-percent').value = stats.malePercent || '21';
        document.getElementById('age-18-24').value = stats.age18_24 || '25';
        document.getElementById('age-25-34').value = stats.age25_34 || '40';
        document.getElementById('age-35-44').value = stats.age35_44 || '35';
        
        // Apply the saved stats
        updateStats();
    }
}

function checkAdminAccess() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
        document.getElementById('admin-toggle').style.display = 'block';
    }
}

// Initialize slideshow
function initializeSlideshow() {
    if (slides.length > 0) {
        showSlide(0);
    }
}

// Initialize animations
function initializeAnimations() {
    revealOnScroll();
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSlideshow();
    initializeAnimations();
    checkAdminAccess();
    loadSavedStats();
});