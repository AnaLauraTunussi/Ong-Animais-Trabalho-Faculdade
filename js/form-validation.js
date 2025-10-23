/**
 * FORM-VALIDATION.JS - Sistema de Validação de Formulários
 * Validação em tempo real com feedback visual
 */

'use strict';

// ===================================
// VALIDADORES CUSTOMIZADOS
// ===================================

const Validators = {
    cpf(value) {
        const cpf = value.replace(/\D/g, '');
        
        if (cpf.length !== 11) return false;
        if (/^(\d)\1{10}$/.test(cpf)) return false;
        
        let sum = 0;
        let remainder;
        
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;
        
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;
        
        return true;
    },
    
    email(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    
    phone(value) {
        const phone = value.replace(/\D/g, '');
        return phone.length === 10 || phone.length === 11;
    },
    
    cep(value) {
        const cep = value.replace(/\D/g, '');
        return cep.length === 8;
    },
    
    date(value) {
        const date = new Date(value);
        const now = new Date();
        const minAge = new Date(now.getFullYear() - 100, now.getMonth(), now.getDate());
        const maxAge = new Date(now.getFullYear() - 15, now.getMonth(), now.getDate());
        
        return date >= minAge && date <= maxAge;
    },
    
    minLength(value, min) {
        return value.length >= min;
    },
    
    maxLength(value, max) {
        return value.length <= max;
    }
};

// ===================================
// MENSAGENS DE ERRO
// ===================================

const ErrorMessages = {
    required: 'Este campo é obrigatório',
    email: 'Por favor, insira um e-mail válido',
    cpf: 'CPF inválido. Verifique os números digitados',
    phone: 'Telefone inválido. Use o formato (11) 98765-4321',
    cep: 'CEP inválido. Use o formato 00000-000',
    date: 'Data inválida. Você deve ter entre 15 e 100 anos',
    minLength: (min) => `Este campo deve ter no mínimo ${min} caracteres`,
    maxLength: (max) => `Este campo deve ter no máximo ${max} caracteres`,
    pattern: 'Formato inválido',
    checkbox: 'Você deve selecionar pelo menos uma opção',
    terms: 'Você deve aceitar os termos para continuar'
};

// ===================================
// VALIDAÇÃO DE FORMULÁRIO
// ===================================

const FormValidation = {
    init() {
        this.form = document.getElementById('volunteerForm');
        if (!this.form) return;
        
        this.setupValidation();
        this.setupRealTimeValidation();
        this.setupCharacterCount();
    },
    
    setupValidation() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                this.submitForm();
            } else {
                this.showAlert('Por favor, corrija os erros antes de enviar o formulário', 'error');
                this.focusFirstError();
            }
        });
        
        this.form.addEventListener('reset', () => {
            this.clearAllErrors();
            this.hideAlert();
        });
    },
    
    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Validar ao perder o foco
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            // Remover erro ao começar a digitar
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.clearError(input);
                }
            });
        });
        
        // Validação especial para checkboxes
        const checkboxGroups = this.form.querySelectorAll('[name="diasDisponiveis"]');
        checkboxGroups.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.validateCheckboxGroup('diasDisponiveis');
            });
        });
    },
    
    setupCharacterCount() {
        const textarea = this.form.querySelector('#motivacao');
        const counter = document.getElementById('motivacao-count');
        
        if (textarea && counter) {
            textarea.addEventListener('input', () => {
                const length = textarea.value.length;
                const max = textarea.getAttribute('maxlength') || 500;
                counter.textContent = `${length}/${max}`;
                
                if (length > max * 0.9) {
                    counter.style.color = 'var(--color-warning)';
                } else {
                    counter.style.color = 'var(--color-text-secondary)';
                }
            });
        }
    },
    
    validateForm() {
        let isValid = true;
        const inputs = this.form.querySelectorAll('input:not([type="checkbox"]), select, textarea');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        // Validar grupo de checkboxes
        if (!this.validateCheckboxGroup('diasDisponiveis')) {
            isValid = false;
        }
        
        // Validar termos
        const termsCheckbox = this.form.querySelector('#termos');
        if (termsCheckbox && !termsCheckbox.checked) {
            this.showError(termsCheckbox, ErrorMessages.terms);
            isValid = false;
        }
        
        return isValid;
    },
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const fieldType = field.type;
        
        // Campo obrigatório
        if (field.hasAttribute('required') && !value) {
            this.showError(field, ErrorMessages.required);
            return false;
        }
        
        // Se o campo não é obrigatório e está vazio, não validar
        if (!field.hasAttribute('required') && !value) {
            this.clearError(field);
            return true;
        }
        
        // Validações específicas
        if (fieldName === 'cpf' && !Validators.cpf(value)) {
            this.showError(field, ErrorMessages.cpf);
            return false;
        }
        
        if (fieldType === 'email' && !Validators.email(value)) {
            this.showError(field, ErrorMessages.email);
            return false;
        }
        
        if (fieldName === 'telefone' && !Validators.phone(value)) {
            this.showError(field, ErrorMessages.phone);
            return false;
        }
        
        if (fieldName === 'cep' && !Validators.cep(value)) {
            this.showError(field, ErrorMessages.cep);
            return false;
        }
        
        if (fieldType === 'date' && !Validators.date(value)) {
            this.showError(field, ErrorMessages.date);
            return false;
        }
        
        // Validar minlength
        const minLength = field.getAttribute('minlength');
        if (minLength && !Validators.minLength(value, parseInt(minLength))) {
            this.showError(field, ErrorMessages.minLength(minLength));
            return false;
        }
        
        // Validar maxlength
        const maxLength = field.getAttribute('maxlength');
        if (maxLength && !Validators.maxLength(value, parseInt(maxLength))) {
            this.showError(field, ErrorMessages.maxLength(maxLength));
            return false;
        }
        
        // Validar pattern
        const pattern = field.getAttribute('pattern');
        if (pattern && !new RegExp(pattern).test(value)) {
            this.showError(field, ErrorMessages.pattern);
            return false;
        }
        
        this.clearError(field);
        return true;
    },
    
    validateCheckboxGroup(name) {
        const checkboxes = this.form.querySelectorAll(`[name="${name}"]`);
        const checked = Array.from(checkboxes).some(cb => cb.checked);
        const errorElement = document.getElementById(`${name}-error`);
        
        if (!checked) {
            if (errorElement) {
                errorElement.textContent = ErrorMessages.checkbox;
                errorElement.style.display = 'block';
            }
            checkboxes[0].closest('.checkbox-group').classList.add('error');
            return false;
        } else {
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
            checkboxes[0].closest('.checkbox-group').classList.remove('error');
            return true;
        }
    },
    
    showError(field, message) {
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        const errorId = `${field.id}-error`;
        let errorElement = document.getElementById(errorId);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    },
    
    clearError(field) {
        field.classList.remove('error');
        field.removeAttribute('aria-invalid');
        
        const errorId = `${field.id}-error`;
        const errorElement = document.getElementById(errorId);
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    },
    
    clearAllErrors() {
        this.form.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
            el.removeAttribute('aria-invalid');
        });
        
        this.form.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
    },
    
    focusFirstError() {
        const firstError = this.form.querySelector('.error');
        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },
    
    showAlert(message, type) {
        const alert = document.getElementById('formAlert');
        if (alert) {
            alert.textContent = message;
            alert.className = `form-alert ${type}`;
            alert.style.display = 'block';
            alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    },
    
    hideAlert() {
        const alert = document.getElementById('formAlert');
        if (alert) {
            alert.style.display = 'none';
        }
    },
    
    submitForm() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        console.log('Dados do formulário:', data);
        
        // Simular envio
        this.showAlert('Cadastro enviado com sucesso! Em breve entraremos em contato.', 'success');
        
        setTimeout(() => {
            this.form.reset();
            this.clearAllErrors();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);
    }
};

// ===================================
// BUSCA DE CEP (ViaCEP API)
// ===================================

const CEPLookup = {
    init() {
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('blur', () => {
                const cep = cepInput.value.replace(/\D/g, '');
                if (cep.length === 8) {
                    this.fetchAddress(cep);
                }
            });
        }
    },
    
    async fetchAddress(cep) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (!data.erro) {
                this.fillAddressFields(data);
            } else {
                console.log('CEP não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        }
    },
    
    fillAddressFields(data) {
        const enderecoInput = document.getElementById('endereco');
        const bairroInput = document.getElementById('bairro');
        const cidadeInput = document.getElementById('cidade');
        const estadoInput = document.getElementById('estado');
        
        if (enderecoInput && data.logradouro) {
            enderecoInput.value = data.logradouro;
        }
        if (bairroInput && data.bairro) {
            bairroInput.value = data.bairro;
        }
        if (cidadeInput && data.localidade) {
            cidadeInput.value = data.localidade;
        }
        if (estadoInput && data.uf) {
            estadoInput.value = data.uf;
        }
        
        // Focar no campo número
        const numeroInput = document.getElementById('numero');
        if (numeroInput) {
            numeroInput.focus();
        }
    }
};

// ===================================
// INICIALIZAÇÃO
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    FormValidation.init();
    CEPLookup.init();
    
    console.log('✅ Sistema de validação de formulários inicializado');
});

// ===================================
// EXPORTAR PARA USO GLOBAL
// ===================================

window.FormValidation = {
    Validators,
    ErrorMessages,
    FormValidation,
    CEPLookup
};

