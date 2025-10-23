/**
 * MAIN.JS - Sistema SPA e Templates JavaScript
 * ONG Amigos dos Animais
 */

'use strict';

// ===================================
// SISTEMA DE TEMPLATES JAVASCRIPT
// ===================================

const TemplateSystem = {
    templates: {},
    
    init() {
        this.loadTemplates();
    },
    
    // Carregar templates de componentes reutilizáveis
    loadTemplates() {
        // Template para card de projeto
        this.templates.projectCard = (data) => `
            <article class="project-card" data-category="${data.category}">
                <div class="project-image">
                    <img src="${data.image}" alt="${data.imageAlt}">
                    <span class="project-badge badge-${data.category}">${data.badgeText}</span>
                </div>
                <div class="project-content">
                    <h3>${data.title}</h3>
                    <p class="project-description">${data.description}</p>
                    <div class="project-stats">
                        <div class="stat-item">
                            <span class="stat-value">${data.stat1Value}</span>
                            <span class="stat-label">${data.stat1Label}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${data.stat2Value}</span>
                            <span class="stat-label">${data.stat2Label}</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
        
        // Template para card de voluntário
        this.templates.volunteerCard = (data) => `
            <article class="volunteer-card">
                <div class="volunteer-icon" aria-hidden="true">${data.icon}</div>
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <ul class="requirements">
                    ${data.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
                <a href="cadastro.html" class="btn btn-secondary">Inscreva-se</a>
            </article>
        `;
        
        // Template para mensagem de alerta
        this.templates.alert = (message, type) => `
            <div class="form-alert ${type}" role="alert">
                ${message}
            </div>
        `;
    },
    
    // Renderizar template
    render(templateName, data) {
        if (this.templates[templateName]) {
            return this.templates[templateName](data);
        }
        return '';
    },
    
    // Renderizar múltiplos itens
    renderList(templateName, dataArray, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const html = dataArray.map(data => this.render(templateName, data)).join('');
        container.innerHTML = html;
    }
};

// ===================================
// SISTEMA SPA (SINGLE PAGE APPLICATION) BÁSICO
// ===================================

const SPASystem = {
    currentView: 'home',
    contentArea: null,
    
    init() {
        this.contentArea = document.getElementById('spa-content');
        if (!this.contentArea) {
            console.log('SPA não habilitado nesta página');
            return;
        }
        
        this.setupNavigation();
        this.loadView(this.currentView);
    },
    
    setupNavigation() {
        // Interceptar cliques em links com data-spa-link
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-spa-link]');
            if (link) {
                e.preventDefault();
                const view = link.dataset.spaLink;
                this.loadView(view);
            }
        });
    },
    
    loadView(viewName) {
        this.currentView = viewName;
        
        // Adicionar classe de transição
        this.contentArea.classList.add('transitioning');
        
        setTimeout(() => {
            // Carregar conteúdo da view
            const content = this.getViewContent(viewName);
            this.contentArea.innerHTML = content;
            
            // Remover classe de transição
            this.contentArea.classList.remove('transitioning');
            
            // Atualizar navegação ativa
            this.updateActiveNav(viewName);
            
            // Scroll para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    },
    
    getViewContent(viewName) {
        const views = {
            home: `
                <section class="view-section">
                    <h2>Bem-vindo à ONG Amigos dos Animais</h2>
                    <p>Resgatamos, cuidamos e encontramos lares para animais abandonados.</p>
                    <div class="stats-container">
                        <div class="stat-card">
                            <span class="stat-number">1250</span>
                            <h3>Animais Resgatados</h3>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">890</span>
                            <h3>Adoções Realizadas</h3>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">150</span>
                            <h3>Voluntários Ativos</h3>
                        </div>
                    </div>
                </section>
            `,
            projects: `
                <section class="view-section">
                    <h2>Nossos Projetos</h2>
                    <p>Conheça as iniciativas que transformam a vida de centenas de animais.</p>
                    <div id="projects-list"></div>
                </section>
            `,
            volunteer: `
                <section class="view-section">
                    <h2>Seja Voluntário</h2>
                    <p>Existem diversas formas de contribuir com nosso trabalho.</p>
                    <div id="volunteer-list"></div>
                </section>
            `,
            contact: `
                <section class="view-section">
                    <h2>Entre em Contato</h2>
                    <p><strong>Telefone:</strong> (11) 3456-7890</p>
                    <p><strong>E-mail:</strong> contato@amigosdosanimais.org.br</p>
                    <p><strong>Endereço:</strong> Rua dos Animais, 123 - Centro, São Paulo - SP</p>
                </section>
            `
        };
        
        return views[viewName] || views.home;
    },
    
    updateActiveNav(viewName) {
        document.querySelectorAll('[data-spa-link]').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.spaLink === viewName) {
                link.classList.add('active');
            }
        });
    }
};

// ===================================
// ANIMAÇÕES DE SCROLL
// ===================================

const ScrollAnimations = {
    init() {
        this.animateCounters();
    },
    
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    },
    
    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
};

// ===================================
// SMOOTH SCROLL PARA ÂNCORAS
// ===================================

const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#' && href !== '') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
};

// ===================================
// INICIALIZAÇÃO
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    TemplateSystem.init();
    SPASystem.init();
    ScrollAnimations.init();
    SmoothScroll.init();
    
    console.log('🐾 Sistema JavaScript carregado com sucesso!');
});

// ===================================
// EXPORTAR PARA USO GLOBAL
// ===================================

window.ONG = {
    TemplateSystem,
    SPASystem,
    ScrollAnimations,
    SmoothScroll
};

