/**
 * ANIMATIONS.JS - Animações e Efeitos Visuais
 * Micro-interações e animações de entrada
 */

'use strict';

// ===================================
// ANIMAÇÕES DE ENTRADA (FADE IN)
// ===================================

const FadeInAnimation = {
    init() {
        this.addAnimationStyles();
        this.observeElements();
    },
    
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .fade-in-element {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .fade-in-element.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .slide-in-left {
                opacity: 0;
                transform: translateX(-50px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .slide-in-left.animate-in {
                opacity: 1;
                transform: translateX(0);
            }
            
            .slide-in-right {
                opacity: 0;
                transform: translateX(50px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .slide-in-right.animate-in {
                opacity: 1;
                transform: translateX(0);
            }
            
            .scale-in {
                opacity: 0;
                transform: scale(0.8);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .scale-in.animate-in {
                opacity: 1;
                transform: scale(1);
            }
            
            .project-card,
            .mission-card,
            .team-card,
            .volunteer-card,
            .donation-card {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .project-card.animate-in,
            .mission-card.animate-in,
            .team-card.animate-in,
            .volunteer-card.animate-in,
            .donation-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    },
    
    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const elements = document.querySelectorAll(`
            .fade-in-element,
            .slide-in-left,
            .slide-in-right,
            .scale-in,
            .project-card,
            .mission-card,
            .team-card,
            .volunteer-card,
            .donation-card
        `);
        
        elements.forEach(el => observer.observe(el));
    }
};

// ===================================
// PARALLAX SCROLL
// ===================================

const ParallaxEffect = {
    init() {
        this.parallaxElements = document.querySelectorAll('.parallax');
        
        if (this.parallaxElements.length) {
            this.setupParallax();
        }
    },
    
    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            this.parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
};

// ===================================
// HOVER EFFECTS
// ===================================

const HoverEffects = {
    init() {
        this.setupCardHover();
        this.setupButtonHover();
        this.setupImageHover();
    },
    
    setupCardHover() {
        const cards = document.querySelectorAll('.project-card, .mission-card, .team-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    },
    
    setupButtonHover() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    },
    
    setupImageHover() {
        const images = document.querySelectorAll('.project-image img, .history-image img');
        
        images.forEach(img => {
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
};

// ===================================
// LOADING ANIMATION
// ===================================

const LoadingAnimation = {
    init() {
        this.createLoader();
        this.hideLoaderOnLoad();
    },
    
    createLoader() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p>Carregando...</p>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            #page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: var(--color-background);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease-out;
            }
            
            #page-loader.hidden {
                opacity: 0;
                pointer-events: none;
            }
            
            .loader-content {
                text-align: center;
            }
            
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 4px solid var(--color-neutral-200);
                border-top-color: var(--color-primary-500);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(loader);
    },
    
    hideLoaderOnLoad() {
        window.addEventListener('load', () => {
            const loader = document.getElementById('page-loader');
            if (loader) {
                setTimeout(() => {
                    loader.classList.add('hidden');
                    setTimeout(() => {
                        loader.remove();
                    }, 500);
                }, 500);
            }
        });
    }
};

// ===================================
// PROGRESS BAR
// ===================================

const ProgressBar = {
    init() {
        this.createProgressBar();
        this.updateProgress();
    },
    
    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500));
            z-index: 9999;
            transition: width 0.1s ease-out;
        `;
        document.body.appendChild(progressBar);
    },
    
    updateProgress() {
        window.addEventListener('scroll', () => {
            const progressBar = document.getElementById('scroll-progress');
            if (!progressBar) return;
            
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            
            progressBar.style.width = scrolled + '%';
        });
    }
};

// ===================================
// RIPPLE EFFECT
// ===================================

const RippleEffect = {
    init() {
        this.addRippleToButtons();
    },
    
    addRippleToButtons() {
        const buttons = document.querySelectorAll('.btn, .filter-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// ===================================
// TYPEWRITER EFFECT
// ===================================

const TypewriterEffect = {
    init() {
        const elements = document.querySelectorAll('.typewriter');
        
        elements.forEach(element => {
            this.typeText(element);
        });
    },
    
    typeText(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 50);
    }
};

// ===================================
// INICIALIZAÇÃO
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    FadeInAnimation.init();
    ParallaxEffect.init();
    HoverEffects.init();
    LoadingAnimation.init();
    ProgressBar.init();
    RippleEffect.init();
    TypewriterEffect.init();
    
    console.log('✨ Animações inicializadas');
});

// ===================================
// EXPORTAR PARA USO GLOBAL
// ===================================

window.Animations = {
    FadeInAnimation,
    ParallaxEffect,
    HoverEffects,
    LoadingAnimation,
    ProgressBar,
    RippleEffect,
    TypewriterEffect
};

