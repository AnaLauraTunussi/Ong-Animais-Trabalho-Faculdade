/**
 * FORM-MASKS.JS - Máscaras de Input para Formulários
 * Formatação automática de CPF, telefone e CEP
 */

'use strict';

// ===================================
// MÁSCARAS DE FORMATAÇÃO
// ===================================

const InputMasks = {
    cpf(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    },
    
    phone(value) {
        value = value.replace(/\D/g, '');
        
        if (value.length <= 10) {
            return value
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            return value
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(-\d{4})\d+?$/, '$1');
        }
    },
    
    cep(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1');
    },
    
    date(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\/\d{4})\d+?$/, '$1');
    },
    
    currency(value) {
        value = value.replace(/\D/g, '');
        value = (parseInt(value) / 100).toFixed(2);
        return 'R$ ' + value.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    },
    
    onlyNumbers(value) {
        return value.replace(/\D/g, '');
    },
    
    onlyLetters(value) {
        return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    }
};

// ===================================
// APLICAR MÁSCARAS
// ===================================

const MaskApplier = {
    init() {
        this.setupMasks();
    },
    
    setupMasks() {
        // CPF
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', (e) => {
                e.target.value = InputMasks.cpf(e.target.value);
            });
        }
        
        // Telefone
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', (e) => {
                e.target.value = InputMasks.phone(e.target.value);
            });
        }
        
        // CEP
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('input', (e) => {
                e.target.value = InputMasks.cep(e.target.value);
            });
        }
        
        // Nome (apenas letras)
        const nomeInput = document.getElementById('nome');
        if (nomeInput) {
            nomeInput.addEventListener('input', (e) => {
                e.target.value = InputMasks.onlyLetters(e.target.value);
            });
        }
        
        // Número (apenas números)
        const numeroInput = document.getElementById('numero');
        if (numeroInput) {
            numeroInput.addEventListener('input', (e) => {
                e.target.value = InputMasks.onlyNumbers(e.target.value);
            });
        }
        
        // Cidade (apenas letras)
        const cidadeInput = document.getElementById('cidade');
        if (cidadeInput) {
            cidadeInput.addEventListener('input', (e) => {
                e.target.value = InputMasks.onlyLetters(e.target.value);
            });
        }
        
        // Bairro (apenas letras)
        const bairroInput = document.getElementById('bairro');
        if (bairroInput) {
            bairroInput.addEventListener('input', (e) => {
                e.target.value = InputMasks.onlyLetters(e.target.value);
            });
        }
    }
};

// ===================================
// AUTO-COMPLETE E SUGESTÕES
// ===================================

const AutoComplete = {
    init() {
        this.setupNameCapitalization();
        this.setupEmailLowercase();
    },
    
    setupNameCapitalization() {
        const nameInputs = document.querySelectorAll('#nome, #cidade, #bairro');
        
        nameInputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                e.target.value = this.capitalizeWords(e.target.value);
            });
        });
    },
    
    setupEmailLowercase() {
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.toLowerCase();
            });
        }
    },
    
    capitalizeWords(str) {
        return str.replace(/\b\w/g, l => l.toUpperCase());
    }
};

// ===================================
// CLIPBOARD - COLAR E FORMATAR
// ===================================

const ClipboardHandler = {
    init() {
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedText = (e.clipboardData || window.clipboardData).getData('text');
                e.target.value = InputMasks.cpf(pastedText);
            });
        }
        
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedText = (e.clipboardData || window.clipboardData).getData('text');
                e.target.value = InputMasks.phone(pastedText);
            });
        }
        
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedText = (e.clipboardData || window.clipboardData).getData('text');
                e.target.value = InputMasks.cep(pastedText);
            });
        }
    }
};

// ===================================
// FEEDBACK VISUAL
// ===================================

const VisualFeedback = {
    init() {
        this.setupInputHighlight();
        this.setupSuccessIndicator();
    },
    
    setupInputHighlight() {
        const inputs = document.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
                
                if (input.value) {
                    input.parentElement.classList.add('filled');
                } else {
                    input.parentElement.classList.remove('filled');
                }
            });
        });
    },
    
    setupSuccessIndicator() {
        const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.checkValidity() && input.value) {
                    this.showSuccess(input);
                }
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('success')) {
                    input.classList.remove('success');
                }
            });
        });
    },
    
    showSuccess(input) {
        if (!input.classList.contains('error')) {
            input.classList.add('success');
            
            setTimeout(() => {
                input.classList.remove('success');
            }, 2000);
        }
    }
};

// ===================================
// PLACEHOLDER ANIMADO
// ===================================

const AnimatedPlaceholder = {
    init() {
        const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
        
        inputs.forEach(input => {
            if (input.value) {
                input.parentElement.classList.add('has-value');
            }
            
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('is-focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('is-focused');
                
                if (input.value) {
                    input.parentElement.classList.add('has-value');
                } else {
                    input.parentElement.classList.remove('has-value');
                }
            });
        });
    }
};

// ===================================
// INICIALIZAÇÃO
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    MaskApplier.init();
    AutoComplete.init();
    ClipboardHandler.init();
    VisualFeedback.init();
    AnimatedPlaceholder.init();
    
    console.log('🎭 Máscaras de input inicializadas');
});

// ===================================
// EXPORTAR PARA USO GLOBAL
// ===================================

window.FormMasks = {
    InputMasks,
    MaskApplier,
    AutoComplete,
    ClipboardHandler,
    VisualFeedback,
    AnimatedPlaceholder
};

