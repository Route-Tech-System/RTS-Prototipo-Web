



// =====================================================
// FILTROS DE TABELAS (reservas, veículos e motoristas)
// =====================================================

(() => {
    const botoesFiltro = document.querySelectorAll(".filtros button[data-filtro]");
    const tabela = document.querySelector("main table");

    if (!botoesFiltro.length || !tabela) return;

    const linhas = tabela.querySelectorAll("tbody tr[data-status]");

    if (!linhas.length) return;

    let filtroAtivo = "todos";

    function aplicarFiltro() {
        linhas.forEach(linha => {
            const combina =
                filtroAtivo === "todos" ||
                linha.dataset.status === filtroAtivo;

            linha.classList.toggle("escondido", !combina);
        });
    }

    botoesFiltro.forEach(botao => {
        botao.addEventListener("click", () => {
            filtroAtivo = botao.dataset.filtro;

            botoesFiltro.forEach(item => item.classList.remove("ativo"));
            botao.classList.add("ativo");

            aplicarFiltro();
        });
    });
})();



// =====================================
// FORMULÁRIO DE REGISTRO DE MANUTENÇÃO
// =====================================
(() => {
    const formulario = document.getElementById("formulario-manutencao");

    if (!formulario) return;

    formulario.addEventListener("submit", event => {
        event.preventDefault();

        const registro = {
            veiculo: document.getElementById("veiculo").value.trim(),
            tipo: document.getElementById("tipo").value,
            data: document.getElementById("data").value,
            km: document.getElementById("km").value,
            custo: document.getElementById("custo").value
        };

        const registros = JSON.parse(
            localStorage.getItem("registrosManutencao")
        ) || [];

        registros.push(registro);

        localStorage.setItem(
            "registrosManutencao",
            JSON.stringify(registros)
        );

        alert("Manutenção registrada com sucesso!");

        formulario.reset();

        window.location.href = "manutencoes.html";
    });
})();


// ==================================
// AÇÕES DE APROVAR/RECUSAR RESERVAS
// ==================================

(() => {
    const tabelaReservas = document.getElementById("veiculos-filtros");

    if (!tabelaReservas) return;

    function atualizarFiltro() {
        const filtroAtivo = document.querySelector(
            ".filtros button.ativo"
        )?.dataset.filtro || "todos";

        const linhas = tabelaReservas.querySelectorAll("tbody tr[data-status]");

        linhas.forEach(linha => {
            const combina =
                filtroAtivo === "todos" ||
                linha.dataset.status === filtroAtivo;

            linha.classList.toggle("escondido", !combina);
        });
    }

    tabelaReservas.querySelectorAll(".aprovar").forEach(botao => {
        botao.addEventListener("click", () => {
            const linha = botao.closest("tr");
            const status = linha?.querySelector(".status");

            if (!linha || !status) return;

            linha.dataset.status = "aprovado";
            status.textContent = "Aprovado";

            atualizarFiltro();
        });
    });

    tabelaReservas.querySelectorAll(".recusar").forEach(botao => {
        botao.addEventListener("click", () => {
            const linha = botao.closest("tr");
            const status = linha?.querySelector(".status");

            if (!linha || !status) return;

            linha.dataset.status = "recusado";
            status.textContent = "Recusado";

            atualizarFiltro();
        });
    });
})();

// ==========================
// ATIVAR/DESATIVAR MOTORISTAS
// ==========================
(() => {
    const campoBusca = document.getElementById("buscar-motorista");
    if (!campoBusca) return;

    const tabela = campoBusca.closest("main")?.querySelector("table");
    if (!tabela) return;

    tabela.querySelectorAll("tbody tr").forEach(linha => {
        const botaoAtivar = linha.querySelector(".aprovar");
        const botaoDesativar = linha.querySelector(".recusar");
        const status = linha.querySelector(".status");

        if (!botaoAtivar || !botaoDesativar || !status) return;

        botaoAtivar.addEventListener("click", () => {
            linha.dataset.status = "ativo";
            status.textContent = "Ativo";
        });

        botaoDesativar.addEventListener("click", () => {
            linha.dataset.status = "inativo";
            status.textContent = "Inativo";
        });
    });
})();

// ==========================
// BUSCA DE MOTORISTAS
// ==========================
(() => {
    const campoBusca = document.getElementById("buscar-motorista");
    if (!campoBusca) return;

    const tabela = campoBusca.closest("main")?.querySelector("table");
    if (!tabela) return;

    campoBusca.addEventListener("input", () => {
        const pesquisa = campoBusca.value.trim().toLowerCase();

        tabela.querySelectorAll("tbody tr").forEach(linha => {
            const nome = linha.cells[0]?.textContent.toLowerCase() || "";
            const matricula = linha.cells[1]?.textContent.toLowerCase() || "";
            const encontrou = nome.includes(pesquisa) || matricula.includes(pesquisa);
            linha.style.display = encontrou ? "" : "none";
        });
    });
})();


 // =================================
 // RELATÓRIOS: PERÍODO E DATAS
 // =================================

(() => {
    const botao7Dias = document.getElementById("sete-dias");
    const botao30Dias = document.getElementById("trinta-dias");
    const botao90Dias = document.getElementById("noventa-dias");
    const botaoPersonalizado = document.getElementById("personalizado");

    const dataInicial = document.getElementById("data-inicial");
    const dataFinal = document.getElementById("data-final");

    if (!botao7Dias || !botao30Dias || !botao90Dias ||
        !botaoPersonalizado || !dataInicial || !dataFinal) {
        return;
    }

    const botoesPeriodo = [
        botao7Dias,
        botao30Dias,
        botao90Dias,
        botaoPersonalizado
    ];

    const formatarData = data => {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const dia = String(data.getDate()).padStart(2, "0");

        return `${ano}-${mes}-${dia}`;
    };

    // Inicialmente, as datas ficam bloqueadas.
    dataInicial.disabled = true;
    dataFinal.disabled = true;

    botoesPeriodo.forEach(botao => {
        botao.addEventListener("click", () => {

            botoesPeriodo.forEach(item =>
                item.classList.remove("ativo")
            );

            botao.classList.add("ativo");

            // Só permite edição no período personalizado.
            if (botao === botaoPersonalizado) {
                dataInicial.disabled = false;
                dataFinal.disabled = false;
                return;
            }

            dataInicial.disabled = true;
            dataFinal.disabled = true;

            const hoje = new Date();
            const dataFim = new Date(hoje);
            const dataInicio = new Date(hoje);

            if (botao === botao7Dias) {
                dataInicio.setDate(hoje.getDate() - 7);

            } else if (botao === botao30Dias) {
                dataInicio.setDate(hoje.getDate() - 30);

            } else if (botao === botao90Dias) {
                dataInicio.setDate(hoje.getDate() - 90);
            }

            dataInicial.value = formatarData(dataInicio);
            dataFinal.value = formatarData(dataFim);
        });
    });
})();


// =====================================
// RELATÓRIOS: FILTROS DE UNIDADE/CONDUTOR
// =====================================
(() => {
    const filtroUnidade = document.getElementById("filtro-unidade");
    const filtroMotorista = document.getElementById("filtro-motorista");
    const botaoAplicar = document.getElementById("aplicar-filtros");

    if (!filtroUnidade || !filtroMotorista || !botaoAplicar) return;

    botaoAplicar.addEventListener("click", () => {
        const linhas = document.querySelectorAll(".conteudo table tbody tr[data-unidade]");

        linhas.forEach(linha => {
            const combinaUnidade =
                filtroUnidade.selectedIndex === 0 ||
                linha.dataset.unidade === filtroUnidade.value;

            const combinaMotorista =
                filtroMotorista.selectedIndex === 0 ||
                linha.dataset.motorista === filtroMotorista.value;

            linha.style.display = combinaUnidade && combinaMotorista ? "" : "none";
        });

        atualizarResumo();
    });
})();

// =============================
// RELATÓRIOS: ATUALIZAR RESUMO
// =============================
function atualizarResumo() {
    const elementoKm = document.getElementById("total-km");
    const elementoAbastecimento = document.getElementById("total-abastecimento");
    const elementoManutencao = document.getElementById("total-manutencao");
    const elementoCusto = document.getElementById("custo-por-km");

    if (!elementoKm || !elementoAbastecimento ||
        !elementoManutencao || !elementoCusto) return;

    const linhas = document.querySelectorAll(".conteudo table tbody tr[data-unidade]");

    let totalKm = 0;
    let totalAbastecimento = 0;
    let totalManutencao = 0;

    linhas.forEach(linha => {
        if (linha.style.display === "none") return;

        const celulas = linha.querySelectorAll("td");

        if (celulas.length !== 7) return;

        const converterMoeda = texto => Number(
            texto.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()
        ) || 0;

        totalKm += parseFloat(celulas[4].textContent) || 0;
        totalAbastecimento += converterMoeda(celulas[3].textContent);
        totalManutencao += converterMoeda(celulas[6].textContent);
    });

    const custoPorKm = totalKm > 0
        ? (totalAbastecimento + totalManutencao) / totalKm
        : 0;

    elementoKm.textContent = totalKm.toLocaleString("pt-BR") + " km";

    elementoAbastecimento.textContent = totalAbastecimento.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    elementoManutencao.textContent = totalManutencao.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    elementoCusto.textContent = custoPorKm.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// =================================
// RELATÓRIOS: LIMPAR FILTROS
// =================================
(() => {
    const filtroUnidade = document.getElementById("filtro-unidade");
    const filtroMotorista = document.getElementById("filtro-motorista");
    const botaoLimpar = document.getElementById("limpar-filtros");

    if (!filtroUnidade || !filtroMotorista || !botaoLimpar) return;

    botaoLimpar.addEventListener("click", () => {
        filtroUnidade.selectedIndex = 0;
        filtroMotorista.selectedIndex = 0;

        document.querySelectorAll(".conteudo table tbody tr[data-unidade]").forEach(linha => {
            linha.style.display = "";
        });

        atualizarResumo();
    });
})();

// =============================
// FUNCIONALIDADES DE NOTIFICAÇÕES
// =============================
(() => {
    const alertas = document.querySelectorAll(".lista-alertas .alerta[data-status]");
    const botoesFiltro = document.querySelectorAll(".filtros button[data-filtro]");
    const botaoMarcarTodas = document.getElementById("marcar-todas");

    if (!alertas.length || !botaoMarcarTodas) return;

    const totalNaoLidas = document.getElementById("total-nao-lidas");
    const totalSolicitacoes = document.getElementById("total-solicitacoes");
    const totalAvarias = document.getElementById("total-avarias");
    const totalKm = document.getElementById("total-km-alertas");

    function atualizarResumoNotificacoes() {
        let naoLidas = 0;
        let solicitacoes = 0;
        let avarias = 0;
        let limitesKm = 0;

        alertas.forEach(alerta => {
            if (alerta.dataset.status === "nao-lida") naoLidas++;
            if (alerta.dataset.tipo === "solicitacao") solicitacoes++;
            if (alerta.dataset.tipo === "avaria") avarias++;
            if (alerta.dataset.tipo === "km") limitesKm++;
        });

        if (totalNaoLidas) totalNaoLidas.textContent = naoLidas;
        if (totalSolicitacoes) totalSolicitacoes.textContent = solicitacoes;
        if (totalAvarias) totalAvarias.textContent = avarias;
        if (totalKm) totalKm.textContent = limitesKm;
    }

    function filtrarAlertas(filtro) {
        alertas.forEach(alerta => {
            alerta.style.display =
                filtro === "todos" || alerta.dataset.status === filtro ? "" : "none";
        });
    }

    botoesFiltro.forEach(botao => {
        botao.addEventListener("click", () => {
            botoesFiltro.forEach(item => item.classList.remove("ativo"));
            botao.classList.add("ativo");
            filtrarAlertas(botao.dataset.filtro);
        });
    });

    botaoMarcarTodas.addEventListener("click", () => {
        alertas.forEach(alerta => {
            alerta.dataset.status = "lida";

            const textoStatus = alerta.querySelector(".texto-status");
            if (textoStatus) textoStatus.textContent = "Lida";
        });

        atualizarResumoNotificacoes();

        botoesFiltro.forEach(item => item.classList.remove("ativo"));

        const filtroTodas = document.querySelector(
            '.filtros button[data-filtro="todos"]'
        );

        if (filtroTodas) filtroTodas.classList.add("ativo");

        filtrarAlertas("todos");
    });

    atualizarResumoNotificacoes();
})();

// ==================================
// CADASTRO: GESTOR / MOTORISTA
// ==================================
(() => {
    const botoes = document.querySelectorAll(".tipos-cadastro button[data-tipo]");
    const grupos = document.querySelectorAll(".campos[data-tipo]");

    if (!botoes.length || !grupos.length) return;

    function mostrarTipo(tipo) {
        botoes.forEach(botao => {
            botao.classList.toggle("ativo", botao.dataset.tipo === tipo);
        });

        grupos.forEach(grupo => {
            const ativo = grupo.dataset.tipo === tipo;

            grupo.hidden = !ativo;
            grupo.disabled = !ativo;
        });
    }

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            mostrarTipo(botao.dataset.tipo);
        });
    });

    mostrarTipo("gestor");
})();

// Atualiza os indicadores na página de relatórios.
atualizarResumo();

//======================================
//ARMAZENAR REGISTRO DE MANUTENÇÃO NO LOCAL STORAGE
//======================================
(() => {
    const formulario = document.getElementById("formulario-manutencao");
    if (!formulario) return;
    
    formulario.addEventListener("submit", event => {
        event.preventDefault();

        const registro = {
            veiculo: document.getElementById("veiculo").value,
            tipo: document.getElementById("tipo").value,
            data: document.getElementById("data").value,
            km: document.getElementById("km").value,
            custo: document.getElementById("custo").value
        };

        let registros = JSON.parse(localStorage.getItem("registrosManutencao")) || [];
        registros.push(registro);
        localStorage.setItem("registrosManutencao", JSON.stringify(registros));

        alert("Registro de manutenção armazenado com sucesso!");
        formulario.reset();
    });
})();


// =====================================
// EXIBIR MANUTENÇÕES REGISTRADAS
// =====================================
(() => {
    const lista = document.getElementById("lista-manutencoes");

    // Só executa na página que possui a lista
    if (!lista) return;

    const campoBusca = document.getElementById("buscar-manutencao");

    // Recupera os registros salvos
    const registros = JSON.parse(
        localStorage.getItem("registrosManutencao")
    ) || [];

    // Formata a data para o padrão brasileiro
    function formatarData(data) {
        if (!data) return "Não informada";

        const partes = data.split("-");
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    // Cria os cards na tela
    function renderizarRegistros(registrosFiltrados) {

        if (registrosFiltrados.length === 0) {
            lista.innerHTML = "<p>Nenhuma manutenção encontrada.</p>";
            return;
        }

        lista.innerHTML = registrosFiltrados.map(
            ({ veiculo, tipo, data, km, custo }) => `
                <article class="veiculo card-manutencao">
                    <h3>${veiculo}</h3>

                    <p><strong>Tipo:</strong> ${tipo}</p>

                    <p><strong>Data:</strong> ${formatarData(data)}</p>

                    <p><strong>Quilometragem:</strong> ${km} km</p>

                    <p><strong>Custo:</strong> R$ ${Number(custo).toFixed(2)}</p>
                </article>
            `
        ).join("");
    }

    // Exibe todos os registros inicialmente
    renderizarRegistros(registros);

    // Pesquisa por veículo ou tipo de manutenção
    if (campoBusca) {
        campoBusca.addEventListener("input", () => {

            const termo = campoBusca.value.toLowerCase().trim();

            const registrosFiltrados = registros.filter(
                ({ veiculo, tipo }) =>
                    veiculo.toLowerCase().includes(termo) ||
                    tipo.toLowerCase().includes(termo)
            );

            renderizarRegistros(registrosFiltrados);
        });
    }
})();
