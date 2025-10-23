/**
 * FILTERS.JS - Sistema de Filtros para Projetos
 * Filtros interativos com animações
 */

'use strict';

// ===================================
// FILTRO DE PROJETOS
// ===================================

const ProjectFilter = {
    init() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        
        if (this.filterButtons.length && this.projectCards.length) {
            this.setupFilters();
        }
    },
    
    setupFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                this.applyFilter(filter);
                this.updateActiveButton(button);
            });
        });
    },
    
    applyFilter(filter) {
        this.projectCards.forEach(card => {
            const category = card.dataset.category;
            
            if (filter === 'todos' || category === filter) {
                this.showCard(card);
            } else {
                this.hideCard(card);
            }
        });
    },
    
    showCard(card) {
        card.style.display = 'block';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 10);
    },
    
    hideCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
            card.style.display = 'none';
        }, 300);
    },
    
    updateActiveButton(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
};

// ===================================
// EXPANDIR CARDS DE PROJETOS
// ===================================

const ExpandableCards = {
    init() {
        this.expandButtons = document.querySelectorAll('.btn-expand');
        
        if (this.expandButtons.length) {
            this.setupExpandButtons();
        }
    },
    
    setupExpandButtons() {
        this.expandButtons.forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('.project-card');
                const impact = card.querySelector('.project-impact');
                
                if (impact) {
                    this.toggleExpand(card, impact, button);
                }
            });
        });
    },
    
    toggleExpand(card, impact, button) {
        const isExpanded = card.classList.contains('expanded');
        
        if (isExpanded) {
            card.classList.remove('expanded');
            impact.style.maxHeight = '0';
            impact.style.opacity = '0';
            button.textContent = 'Saiba Mais';
            button.setAttribute('aria-expanded', 'false');
        } else {
            card.classList.add('expanded');
            impact.style.maxHeight = impact.scrollHeight + 'px';
            impact.style.opacity = '1';
            button.textContent = 'Mostrar Menos';
            button.setAttribute('aria-expanded', 'true');
        }
    }
};

// ===================================
// BUSCA E FILTRO COMBINADOS
// ===================================

const SearchFilter = {
    init() {
        this.searchInput = document.getElementById('projectSearch');
        
        if (this.searchInput) {
            this.setupSearch();
        }
    },
    
    setupSearch() {
        this.searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.filterBySearch(searchTerm);
        });
    },
    
    filterBySearch(term) {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            
            if (title.includes(term) || description.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
};

// ===================================
// CONTADOR DE RESULTADOS
// ===================================

const ResultCounter = {
    init() {
        this.counterElement = document.getElementById('resultCount');
        
        if (this.counterElement) {
            this.updateCount();
            this.observeChanges();
        }
    },
    
    updateCount() {
        const visibleCards = document.querySelectorAll('.project-card:not([style*="display: none"])');
        const count = visibleCards.length;
        
        if (this.counterElement) {
            this.counterElement.textContent = `${count} projeto${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
        }
    },
    
    observeChanges() {
        const observer = new MutationObserver(() => {
            this.updateCount();
        });
        
        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card, {
                attributes: true,
                attributeFilter: ['style']
            });
        });
    }
};

// ===================================
// INICIALIZAÇÃO
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    ProjectFilter.init();
    ExpandableCards.init();
    SearchFilter.init();
    ResultCounter.init();
    
    console.log('🔍 Sistema de filtros inicializado');
});

// ===================================
// EXPORTAR PARA USO GLOBAL
// ===================================

window.Filters = {
    ProjectFilter,
    ExpandableCards,
    SearchFilter,
    ResultCounter
};

