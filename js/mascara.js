// mascara.js
// Este arquivo contém funções JavaScript para aplicar máscaras de formatação a campos de input
// e para preencher automaticamente o endereço a partir do CEP usando a API ViaCEP.

/**
 * Aplica a máscara de CPF (000.000.000-00) a um campo de input.
 * @param {HTMLInputElement} input - O elemento input HTML.
 */
function mascaraCPF(input) {
    // Remove todos os caracteres não numéricos do valor do input
    let valor = input.value.replace(/\D/g, "");
    
    // Verifica o comprimento do valor para aplicar a máscara corretamente
    if (valor.length <= 11) {
        // Adiciona pontos e traço conforme o padrão do CPF
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    
    // Atualiza o valor do input com a máscara aplicada
    input.value = valor;
}

/**
 * Aplica a máscara de telefone ((00) 0000-0000 ou (00) 00000-0000) a um campo de input.
 * @param {HTMLInputElement} input - O elemento input HTML.
 */
function mascaraTelefone(input) {
    // Remove todos os caracteres não numéricos do valor do input
    let valor = input.value.replace(/\D/g, "");
    
    // Verifica o comprimento do valor para determinar se é telefone fixo ou celular
    if (valor.length <= 10) {
        // Telefone fixo: (00) 0000-0000
        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
        valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
        // Celular: (00) 00000-0000
        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
    }
    
    // Atualiza o valor do input com a máscara aplicada
    input.value = valor;
}

/**
 * Aplica a máscara de CEP (00000-000) a um campo de input.
 * @param {HTMLInputElement} input - O elemento input HTML.
 */
function mascaraCEP(input) {
    // Remove todos os caracteres não numéricos do valor do input
    let valor = input.value.replace(/\D/g, "");
    
    // Verifica o comprimento do valor para aplicar a máscara corretamente
    if (valor.length <= 8) {
        // Adiciona o traço conforme o padrão do CEP
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
    }
    
    // Atualiza o valor do input com a máscara aplicada
    input.value = valor;
}

// Adiciona listeners de evento para aplicar as máscaras quando o documento estiver completamente carregado
document.addEventListener("DOMContentLoaded", function() {
    // Campo CPF
    const cpfInput = document.getElementById("cpf");
    if (cpfInput) {
        cpfInput.addEventListener("input", function() {
            mascaraCPF(this);
        });
    }

    // Campo Telefone
    const telefoneInput = document.getElementById("telefone");
    if (telefoneInput) {
        telefoneInput.addEventListener("input", function() {
            mascaraTelefone(this);
        });
    }

    // Campo WhatsApp (reutiliza a máscara de telefone)
    const whatsappInput = document.getElementById("whatsapp");
    if (whatsappInput) {
        whatsappInput.addEventListener("input", function() {
            mascaraTelefone(this);
        });
    }

    // Campo CEP
    const cepInput = document.getElementById("cep");
    if (cepInput) {
        cepInput.addEventListener("input", function() {
            mascaraCEP(this);
        });

        // Adiciona um listener para buscar o endereço automaticamente quando o campo CEP perde o foco (blur)
        cepInput.addEventListener("blur", function() {
            // Remove caracteres não numéricos do CEP para a consulta
            const cep = this.value.replace(/\D/g, "");
            
            // Verifica se o CEP tem 8 dígitos
            if (cep.length === 8) {
                // Faz uma requisição GET para a API ViaCEP
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json()) // Converte a resposta para JSON
                    .then(data => {
                        // Verifica se a API retornou um erro
                        if (!data.erro) {
                            // Preenche os campos de endereço com os dados retornados pela API
                            document.getElementById("endereco").value = data.logradouro || "";
                            document.getElementById("bairro").value = data.bairro || "";
                            document.getElementById("cidade").value = data.localidade || "";
                            
                            // Seleciona o estado no campo <select>
                            const estadoSelect = document.getElementById("estado");
                            if (estadoSelect && data.uf) {
                                estadoSelect.value = data.uf;
                            }
                            
                            // Foca no campo "número" para o usuário completar
                            document.getElementById("numero").focus();
                        } else {
                            // Alerta o usuário se o CEP não for encontrado
                            alert("CEP não encontrado. Por favor, verifique o CEP digitado.");
                        }
                    })
                    .catch(error => {
                        // Loga qualquer erro que ocorra durante a requisição
                        console.error("Erro ao buscar CEP:", error);
                        alert("Ocorreu um erro ao buscar o CEP. Tente novamente mais tarde.");
                    });
            }
        });
    }
});

