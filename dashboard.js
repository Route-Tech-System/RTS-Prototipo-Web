// =====================================================
// DASHBOARD (gestor) e INÍCIO (motorista)
// Usado somente em painel.html e painelMotorista.html
// =====================================================

// Data de hoje no subtítulo
(() => {
    const campo = document.getElementById("data-hoje");

    if (!campo) return;

    campo.textContent = new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
})();


// ==========================================
// GESTOR: APROVAR/RECUSAR RESERVAS PENDENTES
// ==========================================

(() => {
    const tabela = document.getElementById("tabela-pendentes");

    if (!tabela) return;

    const contador = document.getElementById("total-pendentes");
    const aviso = document.getElementById("sem-pendentes");

    function atualizarPendentes() {
        const restantes = tabela.querySelectorAll(
            "tbody tr[data-status='pendente']"
        ).length;

        if (contador) contador.textContent = String(restantes).padStart(2, "0");

        if (aviso) aviso.hidden = restantes > 0;
        tabela.hidden = restantes === 0;
    }

    function decidir(botao, status, texto, classe) {
        const linha = botao.closest("tr");
        const celulaStatus = linha?.querySelector(".status");

        if (!linha || !celulaStatus) return;

        linha.dataset.status = status;
        celulaStatus.textContent = texto;
        celulaStatus.className = "status " + classe;

        linha.querySelector(".botoes-acao")?.remove();

        atualizarPendentes();
    }

    tabela.querySelectorAll(".aprovar").forEach(botao => {
        botao.addEventListener("click", () =>
            decidir(botao, "aprovado", "Aprovado", "status-ok")
        );
    });

    tabela.querySelectorAll(".recusar").forEach(botao => {
        botao.addEventListener("click", () =>
            decidir(botao, "recusado", "Recusado", "status-erro")
        );
    });

    atualizarPendentes();
})();


// ==========================================
// MOTORISTA: SITUAÇÃO DA CNH
// (mesma regra da página de perfil)
// ==========================================

(() => {
    const campo = document.getElementById("cnh-status");

    if (!campo) return;

    const validade = new Date(2025, 11, 31);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dias = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24));

    if (dias < 0) {
        campo.textContent = "Vencida";
        campo.classList.add("status-erro");
    } else if (dias <= 30) {
        campo.textContent = "Próxima do vencimento";
        campo.classList.add("status-alerta");
    } else {
        campo.textContent = "Em dia";
        campo.classList.add("status-ok");
    }
})();
