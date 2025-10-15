// validacao.js
// Este arquivo contém funções JavaScript para validação de formulários em tempo real e na submissão.
// Inclui validações específicas para CPF, e-mail, idade e campos obrigatórios.

document.addEventListener('DOMContentLoaded', function() {
    // Obtém a referência ao formulário de voluntariado
    const form = document.getElementById('form-voluntario');
    
    // Se o formulário não existir na página, encerra a execução do script
    if (!form) return;

    /**
     * Valida um número de CPF.
     * @param {string} cpf - O CPF a ser validado (apenas dígitos).
     * @returns {boolean} - Retorna true se o CPF for válido, false caso contrário.
     */
    function validarCPF(cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');
        
        // Verifica se o CPF tem 11 dígitos
        if (cpf.length !== 11) return false;
        
        // Verifica se todos os dígitos são iguais (ex: 111.111.111-11), o que torna o CPF inválido
        if (/^(\d)\1{10}$/.test(cpf)) return false;
        
        // Validação do primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
        
        if (digitoVerificador1 !== parseInt(cpf.charAt(9))) return false;
        
        // Validação do segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
        
        if (digitoVerificador2 !== parseInt(cpf.charAt(10))) return false;
        
        return true;
    }

    /**
     * Valida um endereço de e-mail usando uma expressão regular.
     * @param {string} email - O e-mail a ser validado.
     * @returns {boolean} - Retorna true se o e-mail for válido, false caso contrário.
     */
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Valida a idade de uma pessoa com base na data de nascimento.
     * A idade deve estar entre 16 e 100 anos.
     * @param {string} dataNascimento - A data de nascimento no formato 'YYYY-MM-DD'.
     * @returns {boolean} - Retorna true se a idade estiver dentro do intervalo válido, false caso contrário.
     */
    function validarIdade(dataNascimento) {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        
        // Ajusta a idade se o aniversário ainda não ocorreu este ano
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        
        return idade >= 16 && idade <= 100;
    }

    /**
     * Exibe uma mensagem de erro para um campo específico do formulário.
     * Adiciona a classe 'campo-invalido' ao campo para estilização.
     * @param {HTMLElement} campo - O elemento input, select ou textarea.
     * @param {string} mensagem - A mensagem de erro a ser exibida.
     */
    function mostrarErro(campo, mensagem) {
        // Encontra o span de erro associado ao campo
        const errorSpan = document.getElementById(`erro-${campo.id}`);
        if (errorSpan) {
            errorSpan.textContent = mensagem;
            errorSpan.style.display = 'block'; // Torna a mensagem visível
        }
        campo.classList.add('campo-invalido'); // Adiciona classe para estilização de erro
    }

    /**
     * Limpa a mensagem de erro de um campo específico do formulário.
     * Remove a classe 'campo-invalido' do campo.
     * @param {HTMLElement} campo - O elemento input, select ou textarea.
     */
    function limparErro(campo) {
        // Encontra o span de erro associado ao campo
        const errorSpan = document.getElementById(`erro-${campo.id}`);
        if (errorSpan) {
            errorSpan.textContent = '';
            errorSpan.style.display = 'none'; // Oculta a mensagem
        }
        campo.classList.remove('campo-invalido'); // Remove classe de erro
    }

    // --- Validações em tempo real (ao perder o foco do campo) ---

    // Validação de CPF
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('blur', function() {
            const cpf = this.value.replace(/\D/g, ''); // Remove máscara para validação
            
            if (cpf.length === 0) {
                mostrarErro(this, 'CPF é obrigatório');
            } else if (cpf.length !== 11) {
                mostrarErro(this, 'CPF deve ter 11 dígitos');
            } else if (!validarCPF(cpf)) {
                mostrarErro(this, 'CPF inválido');
            } else {
                limparErro(this);
            }
        });
    }

    // Validação de e-mail
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value.length === 0) {
                mostrarErro(this, 'E-mail é obrigatório');
            } else if (!validarEmail(this.value)) {
                mostrarErro(this, 'E-mail inválido');
            } else {
                limparErro(this);
            }
        });
    }

    // Validação de confirmação de e-mail
    const confirmarEmailInput = document.getElementById('confirmar-email');
    if (confirmarEmailInput && emailInput) {
        confirmarEmailInput.addEventListener('blur', function() {
            if (this.value.length === 0) {
                mostrarErro(this, 'Confirmação de e-mail é obrigatória');
            } else if (this.value !== emailInput.value) {
                mostrarErro(this, 'Os e-mails não coincidem');
            } else {
                limparErro(this);
            }
        });
    }

    // Validação de data de nascimento (idade)
    const dataNascimentoInput = document.getElementById('data-nascimento');
    if (dataNascimentoInput) {
        dataNascimentoInput.addEventListener('blur', function() {
            if (this.value.length === 0) {
                mostrarErro(this, 'Data de nascimento é obrigatória');
            } else if (!validarIdade(this.value)) {
                mostrarErro(this, 'Você deve ter entre 16 e 100 anos');
            } else {
                limparErro(this);
            }
        });
    }

    // Validação de nome completo
    const nomeInput = document.getElementById('nome-completo');
    if (nomeInput) {
        nomeInput.addEventListener('blur', function() {
            const nome = this.value.trim();
            
            if (nome.length === 0) {
                mostrarErro(this, 'Nome completo é obrigatório');
            } else if (nome.length < 3) {
                mostrarErro(this, 'Nome deve ter pelo menos 3 caracteres');
            } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
                mostrarErro(this, 'Nome deve conter apenas letras');
            } else if (nome.split(' ').length < 2) {
                mostrarErro(this, 'Digite seu nome completo (nome e sobrenome)');
            } else {
                limparErro(this);
            }
        });
    }

    // Validação de telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('blur', function() {
            const telefone = this.value.replace(/\D/g, ''); // Remove máscara para validação
            
            if (telefone.length === 0) {
                mostrarErro(this, 'Telefone é obrigatório');
            } else if (telefone.length < 10) { // Mínimo de 10 dígitos para telefone (DDD + 8 ou 9 dígitos)
                mostrarErro(this, 'Telefone inválido');
            } else {
                limparErro(this);
            }
        });
    }

    // Validação de CEP
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('blur', function() {
            const cep = this.value.replace(/\D/g, ''); // Remove máscara para validação
            
            if (cep.length === 0) {
                mostrarErro(this, 'CEP é obrigatório');
            } else if (cep.length !== 8) {
                mostrarErro(this, 'CEP deve ter 8 dígitos');
            } else {
                limparErro(this);
            }
        });
    }

    // Validação de motivação (mínimo 50 caracteres)
    const motivacaoInput = document.getElementById('motivacao');
    if (motivacaoInput) {
        motivacaoInput.addEventListener('blur', function() {
            const texto = this.value.trim();
            
            if (texto.length === 0) {
                mostrarErro(this, 'Este campo é obrigatório');
            } else if (texto.length < 50) {
                mostrarErro(this, `Digite pelo menos 50 caracteres (${texto.length}/50)`);
            } else {
                limparErro(this);
            }
        });
    }

    // --- Validação ao submeter o formulário ---
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio padrão do formulário
        
        let formularioValido = true;
        // Seleciona todos os campos com o atributo 'required'
        const camposObrigatorios = form.querySelectorAll('[required]');
        
        // Itera sobre cada campo obrigatório para realizar a validação
        camposObrigatorios.forEach(campo => {
            // Limpa erros anteriores antes de revalidar
            limparErro(campo);

            // Validação específica para checkboxes
            if (campo.type === 'checkbox') {
                // Validação para o grupo de checkboxes de período (pelo menos um deve ser marcado)
                if (campo.name === 'periodo') {
                    const checkboxesPeriodo = form.querySelectorAll('input[name="periodo"]');
                    const algumMarcado = Array.from(checkboxesPeriodo).some(cb => cb.checked);
                    
                    if (!algumMarcado) {
                        formularioValido = false;
                        const errorSpan = document.getElementById('erro-periodo');
                        if (errorSpan) {
                            errorSpan.textContent = 'Selecione pelo menos um período de disponibilidade';
                            errorSpan.style.display = 'block';
                        }
                    }
                } else if (!campo.checked) {
                    // Validação para checkbox individual (ex: aceite de termos)
                    formularioValido = false;
                    mostrarErro(campo, 'Este campo é obrigatório');
                }
            } else if (campo.type === 'radio') {
                // Validação para grupos de radio buttons (pelo menos um deve ser marcado)
                const radioGroup = form.querySelectorAll(`input[name="${campo.name}"]`);
                const algumMarcado = Array.from(radioGroup).some(radio => radio.checked);
                
                if (!algumMarcado) {
                    formularioValido = false;
                    const errorSpan = document.getElementById(`erro-${campo.name}`);
                    if (errorSpan) {
                        errorSpan.textContent = 'Selecione uma opção';
                        errorSpan.style.display = 'block';
                    }
                }
            } else if (campo.value.trim() === '') {
                // Validação para campos de texto, select, textarea vazios
                formularioValido = false;
                mostrarErro(campo, 'Este campo é obrigatório');
            }
        });

        // --- Validações específicas que podem não ser cobertas pelo 'required' ou padrões HTML5 ---

        // Revalidação de CPF
        if (cpfInput && cpfInput.value) {
            const cpf = cpfInput.value.replace(/\D/g, '');
            if (!validarCPF(cpf)) {
                formularioValido = false;
                mostrarErro(cpfInput, 'CPF inválido');
            }
        }

        // Revalidação de e-mails coincidentes
        if (emailInput && confirmarEmailInput) {
            if (emailInput.value !== confirmarEmailInput.value) {
                formularioValido = false;
                mostrarErro(confirmarEmailInput, 'Os e-mails não coincidem');
            }
        }

        // Revalidação de idade
        if (dataNascimentoInput && dataNascimentoInput.value) {
            if (!validarIdade(dataNascimentoInput.value)) {
                formularioValido = false;
                mostrarErro(dataNascimentoInput, 'Você deve ter entre 16 e 100 anos para ser voluntário');
            }
        }

        // Revalidação de motivação (comprimento mínimo)
        if (motivacaoInput && motivacaoInput.value.trim().length < 50) {
            formularioValido = false;
            mostrarErro(motivacaoInput, 'Descreva sua motivação com pelo menos 50 caracteres');
        }

        // Se todas as validações passarem, o formulário é considerado válido
        if (formularioValido) {
            // Exibe uma mensagem de sucesso e limpa o formulário
            alert('Cadastro de voluntário realizado com sucesso! Nossa equipe Amigo Animal entrará em contato em breve.');
            form.reset(); // Limpa todos os campos do formulário
            
            // Limpa todas as mensagens de erro que possam ter ficado visíveis
            const errorSpans = form.querySelectorAll('.error-message');
            errorSpans.forEach(span => {
                span.textContent = '';
                span.style.display = 'none';
            });
            
            // Rola a página para o topo para indicar o sucesso e o reset
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Se houver erros, rola para o primeiro campo inválido e exibe um alerta
            const primeiroErro = form.querySelector('.campo-invalido');
            if (primeiroErro) {
                primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
                primeiroErro.focus(); // Foca no primeiro campo com erro
            }
            
            alert('Por favor, corrija os erros no formulário antes de enviar.');
        }
    });

    // --- Limpar erros ao digitar --- 
    // Adiciona um listener 'input' a todos os campos para limpar a mensagem de erro
    // assim que o usuário começa a digitar novamente em um campo que estava inválido.
    const todosInputs = form.querySelectorAll('input, select, textarea');
    todosInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('campo-invalido')) {
                limparErro(this);
            }
        });
    });
});

