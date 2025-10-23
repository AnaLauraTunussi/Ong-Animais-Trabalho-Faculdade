/**
 * NAVIGATION.JS - Sistema de Navegação Interativa
 * Menu responsivo, dropdown e navegação mobile
 */

'use strict';

// ===================================
// MENU MOBILE HAMBÚRGUER
// ===================================

const MobileMenu = {
    init() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        
        if (this.menuToggle && this.navMenu) {
            this.setupEventListeners();
        }
    },
    
    setupEventListeners() {
        this.menuToggle.addEventListener('click', () => this.toggleMenu());
        
        // Fechar menu ao clicar em um link
        this.navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 991) {
                    this.closeMenu();
                }
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container') && this.navMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
    },
    
    toggleMenu() {
        this.menuToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        const isExpanded = this.navMenu.classList.contains('active');
        this.menuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Prevenir scroll do body quando menu está aberto
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    },
    
    closeMenu() {
        this.menuToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
};

// ===================================
// DROPDOWN MENU
// ===================================

const DropdownMenu = {
    init() {
        this.dropdowns = document.querySelectorAll('.dropdown');
        this.setupDropdowns();
    },
    
    setupDropdowns() {
        this.dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a[aria-haspopup="true"]');
            const submenu = dropdown.querySelector('.submenu');
            
            if (link && submenu) {
                // Desktop: hover
                if (window.innerWidth > 991) {
                    dropdown.addEventListener('mouseenter', () => {
                        link.setAttribute('aria-expanded', 'true');
                    });
                    
                    dropdown.addEventListener('mouseleave', () => {
                        link.setAttribute('aria-expanded', 'false');
                    });
                }
                
                // Mobile: click
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 991) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                        const isExpanded = dropdown.classList.contains('active');
                        link.setAttribute('aria-expanded', isExpanded);
                    }
                });
                
                // Navegação por teclado
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                        const isExpanded = dropdown.classList.contains('active');
                        link.setAttribute('aria-expanded', isExpanded);
                    }
                });
            }
        });
    }
};

// ===================================
// ACTIVE PAGE INDICATOR
// ===================================

const ActivePageIndicator = {
    init() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            const href = link.getAttribute('href');
            
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }
};

// ===================================
// STICKY HEADER
// ===================================

const StickyHeader = {
    init() {
        this.header = document.querySelector('header');
        this.lastScroll = 0;
        
        if (this.header) {
            this.setupScrollListener();
        }
    },
    
    setupScrollListener() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            
            // Hide header on scroll down, show on scroll up
            if (currentScroll > this.lastScroll && currentScroll > 200) {
                this.header.style.transform = 'translateY(-100%)';
            } else {
                this.header.style.transform = 'translateY(0)';
            }
            
            this.lastScroll = currentScroll;
        });
    }
};

// ===================================
// BREADCRUMB NAVIGATION
// ===================================

const Breadcrumb = {
    init() {
        const breadcrumbContainer = document.querySelector('.breadcrumb');
        if (breadcrumbContainer) {
            this.generateBreadcrumb(breadcrumbContainer);
        }
    },
    
    generateBreadcrumb(container) {
        const path = window.location.pathname.split('/').filter(p => p);
        const breadcrumbItems = ['<a href="index.html">Início</a>'];
        
        path.forEach((item, index) => {
            const isLast = index === path.length - 1;
            const name = this.formatName(item);
            
            if (isLast) {
                breadcrumbItems.push(`<span aria-current="page">${name}</span>`);
            } else {
                const url = path.slice(0, index + 1).join('/');
                breadcrumbItems.push(`<a href="/${url}">${name}</a>`);
            }
        });
        
        container.innerHTML = breadcrumbItems.join(' / ');
    },
    
    formatName(str) {
        return str
            .replace('.html', '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }
};

// ===================================
// NAVEGAÇÃO POR TECLADO APRIMORADA
// ===================================

const KeyboardNav = {
    init() {
        this.setupArrowNavigation();
        this.setupTabTrapping();
    },
    
    setupArrowNavigation() {
        document.querySelectorAll('.nav-menu').forEach(menu => {
            const links = Array.from(menu.querySelectorAll('a'));
            
            links.forEach((link, index) => {
                link.addEventListener('keydown', (e) => {
                    let targetIndex;
                    
                    switch(e.key) {
                        case 'ArrowRight':
                        case 'ArrowDown':
                            e.preventDefault();
                            targetIndex = (index + 1) % links.length;
                            links[targetIndex].focus();
                            break;
                        case 'ArrowLeft':
                        case 'ArrowUp':
                            e.preventDefault();
                            targetIndex = (index - 1 + links.length) % links.length;
                            links[targetIndex].focus();
                            break;
                        case 'Home':
                            e.preventDefault();
                            links[0].focus();
                            break;
                        case 'End':
                            e.preventDefault();
                            links[links.length - 1].focus();
                            break;
                    }
                });
            });
        });
    },
    
    setupTabTrapping() {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) return;
        
        navMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && navMenu.classList.contains('active')) {
                const focusableElements = navMenu.querySelectorAll('a, button');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }
};

// ===================================
// SCROLL SPY - Highlight menu based on scroll position
// ===================================

const ScrollSpy = {
    init() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        if (this.sections.length && this.navLinks.length) {
            this.setupScrollListener();
        }
    },
    
    setupScrollListener() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveLink(id);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -80% 0px'
        });
        
        this.sections.forEach(section => observer.observe(section));
    },
    
    updateActiveLink(id) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }
};

// ===================================
// BACK TO TOP BUTTON
// ===================================

const BackToTop = {
    init() {
        this.createButton();
        this.setupScrollListener();
    },
    
    createButton() {
        const button = document.createElement('button');
        button.id = 'back-to-top';
        button.setAttribute('aria-label', 'Voltar ao topo');
        button.innerHTML = '↑';
        button.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background-color: var(--color-secondary-500);
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-base);
        `;
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(button);
        this.button = button;
    },
    
    setupScrollListener() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.button.style.opacity = '1';
                this.button.style.visibility = 'visible';
            } else {
                this.button.style.opacity = '0';
                this.button.style.visibility = 'hidden';
            }
        });
    }
};

// ===================================
// INICIALIZAÇÃO
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    MobileMenu.init();
    DropdownMenu.init();
    ActivePageIndicator.init();
    StickyHeader.init();
    Breadcrumb.init();
    KeyboardNav.init();
    ScrollSpy.init();
    BackToTop.init();
    
    console.log('🧭 Sistema de navegação inicializado');
});

// ===================================
// EXPORTAR PARA USO GLOBAL
// ===================================

window.Navigation = {
    MobileMenu,
    DropdownMenu,
    ActivePageIndicator,
    StickyHeader,
    Breadcrumb,
    KeyboardNav,
    ScrollSpy,
    BackToTop
};

