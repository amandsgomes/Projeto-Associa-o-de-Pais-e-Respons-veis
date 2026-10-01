ddocument.addEventListener("DOMContentLoaded", () => {
    const secoes = document.querySelectorAll("main > section");
    const linksSidebar = document.querySelectorAll(".sidebar nav a");

    // =========================================================
    // 1. INTEGRAÇÃO COM BIBLIOTECA EXTERNA (Cleave.js - Máscaras)
    // =========================================================
    if (typeof Cleave !== "undefined") {
        // Máscara para Telefone no Cadastro
        if (document.getElementById("telefone")) {
            new Cleave("#telefone", {
                numericOnly: true,
                blocks: [0, 2, 5, 4],
                delimiters: ["(", ") ", "-"]
            });
        }

        // Máscara para CEP no Cadastro
        if (document.getElementById("cep")) {
            new Cleave("#cep", {
                blocks: [5, 3],
                delimiter: "-"
            });
        }

        // Máscara para Cartão de Crédito na Doação
        if (document.getElementById("numero-cartao")) {
            new Cleave("#numero-cartao", {
                creditCard: true
            });
        }

        // Máscara para Validade do Cartão (MM/AA)
        if (document.getElementById("validade-cartao")) {
            new Cleave("#validade-cartao", {
                date: true,
                datePattern: ["m", "y"]
            });
        }
    }

    // =========================================================
    // 2. GERENCIADOR DE NAVEGAÇÃO SPA (Roteamento via Hash)
    // =========================================================
    function navegarParaHash() {
        const hashAtual = window.location.hash || "#inicio";

        secoes.forEach((secao) => {
            if ("#" + secao.id === hashAtual) {
                secao.style.display = "block";
            } else {
                secao.style.display = "none";
            }
        });

        linksSidebar.forEach((link) => {
            if (link.getAttribute("href") === hashAtual) {
                link.classList.add("ativo");
            } else {
                link.classList.remove("ativo");
            }
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.addEventListener("hashchange", navegarParaHash);
    navegarParaHash();

    // =========================================================
    // 3. FORMULÁRIO DE CADASTRO (Validação e LocalStorage)
    // =========================================================
    const formCadastro = document.getElementById("form-cadastro");
    if (formCadastro) {
        formCadastro.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const dataNascimento = document.getElementById("data_nascimento").value;
            const telefone = document.getElementById("telefone") ? document.getElementById("telefone").value : "";
            const senha = document.getElementById("senha").value;
            const confirmaSenha = document.getElementById("confirma_senha").value;

            // Validação de correspondência de senhas
            if (senha !== confirmaSenha) {
                alert("As senhas não coincidem. Verifique e tente novamente.");
                return;
            }

            // Objeto com os dados do usuário
            const novoUsuario = {
                nome,
                email,
                dataNascimento,
                telefone,
                dataRegistro: new Date().toLocaleDateString("pt-BR")
            };

            // Persistência no LocalStorage (Gravação / setItem)
            const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios_aprs")) || [];
            usuariosSalvos.push(novoUsuario);
            localStorage.setItem("usuarios_aprs", JSON.stringify(usuariosSalvos));

            alert(`Cadastro realizado com sucesso! Seja bem-vindo(a), ${nome}.`);
            formCadastro.reset();
        });
    }

    // =========================================================
    // 4. FORMULÁRIO DE DOAÇÃO (Validação e LocalStorage)
    // =========================================================
    const formDoacao = document.querySelector(".form-doacao");
    if (formDoacao) {
        formDoacao.addEventListener("submit", (e) => {
            e.preventDefault();

            const nomeDoador = document.getElementById("nome-doador").value;
            const emailDoador = document.getElementById("email-doador").value;
            const valorDoacao = document.getElementById("valor-doacao").value;

            const novaDoacao = {
                nomeDoador,
                emailDoador,
                valorDoacao,
                dataDoacao: new Date().toLocaleDateString("pt-BR")
            };

            // Persistência no LocalStorage
            const doacoesSalvas = JSON.parse(localStorage.getItem("doacoes_aprs")) || [];
            doacoesSalvas.push(novaDoacao);
            localStorage.setItem("doacoes_aprs", JSON.stringify(doacoesSalvas));

            alert(`Obrigado, ${nomeDoador}! Sua doação no valor de R$ ${valorDoacao} foi processada com sucesso.`);
            formDoacao.reset();
        });
    }

    // =========================================================
    // 5. FORMULÁRIO DE PARTICIPAÇÃO (Nossos Projetos)
    // =========================================================
    const formParticipar = document.getElementById("form-participar");
    if (formParticipar) {
        formParticipar.addEventListener("submit", (e) => {
            e.preventDefault();
            const nome = document.getElementById("nome-participar").value;
            alert(`Obrigado pelo seu interesse, ${nome}! Entraremos em contato em breve.`);
            formParticipar.reset();
        });
    }

    // =========================================================
    // 6. FORMULÁRIO DE CONTATO
    // =========================================================
    const formContato = document.querySelector(".form-contato");
    if (formContato) {
        formContato.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Mensagem enviada com sucesso!");
            formContato.reset();
        });
    }
});