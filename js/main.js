/*
 * SRG Motors Website JavaScript
 * Author: Cline
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Header scroll class
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            console.log('Mobile menu toggled:', navMenu.classList.contains('active'));
        });
    } else {
        console.error('Mobile navigation elements not found:', { 
            mobileNavToggle: !!mobileNavToggle, 
            navMenu: !!navMenu 
        });
    }

    // Close mobile nav when clicking outside
    if (navMenu && mobileNavToggle) {
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileNavToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
                console.log('Mobile menu closed by outside click');
            }
        });
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a, .hero-btns a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if the link is an anchor link
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile nav if open
                    if (navMenu && mobileNavToggle && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
                        console.log('Mobile menu closed by navigation click');
                    }
                    
                    // Scroll to the target element
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length > 0 && navMenu) {
        function highlightNavLink() {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
                
                if (navLink) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        navLink.classList.add('active');
                    } else {
                        navLink.classList.remove('active');
                    }
                }
            });
        }
        
        window.addEventListener('scroll', highlightNavLink);
        // Initial call to set active link on page load
        highlightNavLink();
    }

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Please enter your name');
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                isValid = false;
                showError(emailInput, 'Please enter your email');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email');
            } else {
                removeError(emailInput);
            }
            
            if (subjectInput.value.trim() === '') {
                isValid = false;
                showError(subjectInput, 'Please enter a subject');
            } else {
                removeError(subjectInput);
            }
            
            if (messageInput.value.trim() === '') {
                isValid = false;
                showError(messageInput, 'Please enter your message');
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server
                // For now, just show a success message
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => group.style.display = 'none');
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.style.display = 'none';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.innerHTML = '<p>Thank you for your message! We will get back to you soon.</p>';
                contactForm.appendChild(successMessage);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    formGroups.forEach(group => group.style.display = 'block');
                    submitBtn.style.display = 'block';
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        if (!formGroup.querySelector('.error-message')) {
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('is-invalid');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.classList.remove('is-invalid');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
