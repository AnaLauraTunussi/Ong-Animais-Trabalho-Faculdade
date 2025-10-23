ONG Amigos dos Animais - Projeto de Desenvolvimento Web

Visão Geral

Este projeto consiste no desenvolvimento de um website completo para uma ONG de proteção animal, focado em resgate, cuidado e adoção responsável. O site foi construído utilizando HTML5, CSS3 e JavaScript puro, com uma abordagem modular para o JavaScript, seguindo as melhores práticas de desenvolvimento web, acessibilidade e otimização de performance.

Especificações Técnicas Obrigatórias Implementadas

1. Estrutura HTML5 Semântica

Foram implementadas 3 páginas HTML com estrutura semântica completa, utilizando tags como <header>, <nav>, <main>, <section>, <article>, <footer>, entre outras, para garantir uma boa hierarquia de títulos e consistência lógica. Imagens relevantes foram utilizadas em cada página para enriquecer o conteúdo.

•Página Inicial (index.html): Apresenta a organização, sua missão, visão, valores, história, equipe e informações de contato.

•Projetos Sociais (projetos.html): Detalha os projetos de voluntariado e as formas de doação.

•Cadastro (cadastro.html): Contém um formulário complexo para voluntários.

2. Sistema de Design Consistente

Foi desenvolvido um sistema de design robusto e consistente, utilizando CSS Custom Properties (variáveis CSS) para facilitar a manutenção e escalabilidade.

•Paleta de Cores: Definida com 10 cores (5 primárias, 5 secundárias, além de neutras e de feedback) para garantir harmonia visual.

•Tipografia Hierárquica: Estabelecida com 5 tamanhos de fonte e pesos variados para clareza e legibilidade.

•Sistema de Espaçamento Modular: Baseado em múltiplos de 8px (8px, 16px, 24px, 32px, 48px, 64px) para espaçamento consistente entre os elementos.

3. Leiautes Responsivos com Flexbox e Grid

O design do site é mobile-first e totalmente responsivo, adaptando-se a diferentes tamanhos de tela.

•Layout Principal: Utiliza CSS Grid para a estrutura geral das páginas.

•Componentes Internos: Emprega Flexbox para alinhamentos e organização de elementos dentro dos componentes.

•Breakpoints: Criados 5 breakpoints responsivos bem definidos para garantir a adaptação em diversos dispositivos.

•
Sistema de Grid Customizado: Implementado um sistema de grid de 12 colunas para organização flexível do conteúdo.

4. Navegação Sofisticada e Interativa

A navegação foi projetada para ser intuitiva e acessível em todas as plataformas.

•Menu Principal: Responsivo, com submenu dropdown para categorias de

navegação.

•Navegação Mobile: Implementada com um menu hambúrguer para dispositivos móveis, garantindo usabilidade.

5. Componentes de Interface

Diversos componentes de interface foram desenvolvidos para enriquecer a experiência do usuário.

•Cards Responsivos: Criados cards dinâmicos para exibir projetos, com informações detalhadas e estados visuais.

•Botões com Estados Visuais: Botões interativos com estados de hover, focus, active e disabled para feedback visual claro.

•Formulários Estilizados: Formulários com design moderno e validação visual para guiar o usuário no preenchimento.

•Componentes de Feedback: Implementados alertas e mensagens de sucesso/erro para feedback ao usuário.

•Badges e Tags: Utilizados para categorização visual de projetos e outras informações.

6. Manipulação do DOM e SPA Básico

O site incorpora funcionalidades dinâmicas e interativas.

•Single Page Application (SPA) Básico: Implementado um sistema que permite a troca de conteúdo principal de forma dinâmica, sem recarregar a página inteira, utilizando data-spa-link para navegação interna.

•Sistema de Templates JavaScript: Utilizado para renderizar dinamicamente componentes como cards de projeto e voluntário, e mensagens de alerta, facilitando a reutilização de código e a manutenção.

7. Funcionalidades Específicas (Validação de Formulários)

O formulário de cadastro possui validação robusta para garantir a integridade dos dados.

•Validação de Consistência de Dados: Sistema de verificação em tempo real com aviso ao usuário de preenchimento incorreto, incluindo validações para CPF, e-mail, telefone, CEP e data de nascimento.

•Máscaras de Input: Aplicadas automaticamente para CPF, telefone e CEP para facilitar o preenchimento e garantir o formato correto.

•Busca de CEP: Integração com a API ViaCEP para preenchimento automático de endereço.

8. Controle de Versão com Git/GitHub

O projeto segue boas práticas de controle de versão.

•Estratégia de Branching: Utilização de um fluxo de trabalho com branches para desenvolvimento, features e correção de bugs.

•Histórico de Commits Semântico: Commits com mensagens claras e padronizadas para facilitar o rastreamento de mudanças.

•Sistema de Releases: Preparado para futuras releases com versionamento semântico.

9. Acessibilidade (WCAG 2.1 Nível AA)

A acessibilidade foi uma prioridade no desenvolvimento para garantir que o site seja utilizável por todos.

•Navegação por Teclado: Todos os componentes são navegáveis e interativos via teclado.

•Estrutura Semântica Adequada: Uso correto de tags HTML semânticas e atributos ARIA para leitores de tela.

•Contraste Mínimo: Garantia de contraste de 4.5:1 para texto normal, conforme WCAG 2.1 AA.

•Suporte para Leitores de Tela: Conteúdo e interações otimizados para serem compreendidos por tecnologias assistivas.

•Modo Escuro Acessível: Implementação de um modo escuro com cores de alto contraste para melhorar a legibilidade em diferentes condições.

10. Otimização para Produção

O site foi otimizado para oferecer alta performance.

•Minificação: Minificação de arquivos CSS, JavaScript e HTML para reduzir o tamanho e o tempo de carregamento.

•Compressão de Imagens: Imagens otimizadas para múltiplos formatos e tamanhos, garantindo carregamento rápido sem perda de qualidade.

•Lazy Loading: Implementação de lazy loading para imagens, carregando-as apenas quando visíveis na tela.

Estrutura de Pastas

Plain Text


Ong-Animais-Trabalho-Faculdade/
├── index.html
├── projetos.html
├── cadastro.html
├── css/
│   ├── styles.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── form-validation.js
│   └── form-masks.jsluntario.jpg


