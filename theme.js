/* Tema claro/escuro do RTS.
   - Escuro é o padrão; a escolha fica salva no navegador.
   - Adiciona o botão de tema (◐) no cabeçalho e transforma o "Sair" em botão. */
(function () {
    var chave = "rts-tema";
    var raiz = document.documentElement;

    function salvo() {
        try { return localStorage.getItem(chave); } catch (e) { return null; }
    }

    raiz.setAttribute("data-theme", salvo() === "light" ? "light" : "dark");

    document.addEventListener("DOMContentLoaded", function () {
        var nav = document.querySelector("header nav");
        if (!nav || nav.querySelector(".btn-tema")) return;

        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn-tema";
        btn.textContent = "◐";
        btn.setAttribute("aria-label", "Alternar tema claro/escuro");
        btn.title = "Alternar tema";

        btn.addEventListener("click", function () {
            var novo = raiz.getAttribute("data-theme") === "light" ? "dark" : "light";
            raiz.setAttribute("data-theme", novo);
            try { localStorage.setItem(chave, novo); } catch (e) {}
        });

        nav.insertBefore(btn, nav.firstChild);
    });
})();
