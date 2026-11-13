const botoes = document.querySelectorAll(".filtros button");
const linhas = document.querySelectorAll("tbody tr");

botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    const filtro = botao.dataset.filtro;

    // marca qual botão está ativo
    botoes.forEach(b => b.classList.remove("ativo"));
    botao.classList.add("ativo");

    // mostra ou esconde cada linha
    linhas.forEach(linha => {
      const combina = filtro === "todos" || linha.dataset.status === filtro;
      linha.classList.toggle("escondido", !combina);
    });
  });
});

function abirForm(){
  const formulario = document.querySelector(".formulario-manutencao");

  formulario.style.display = "block";
}
  
const formulario = document.getElementById("formulario-manutencao");
const campoVeiculo = document.getElementById("veiculo");
const campoTipo = document.getElementById("tipo");
const campoData = document.getElementById("data");
const campoKm = document.getElementById("km");
const campoCusto = document.getElementById("custo");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    alert(
        "Registro de manutenção feito com sucesso!\n\n" +
        "Veículo: " + campoVeiculo.value + "\n" +
        "Tipo: " + campoTipo.value + "\n" +
        "Data: " + campoData.value + "\n" +
        "Quilometragem: " + campoKm.value + "\n" +
        "Custo: R$ " + campoCusto.value
    );

});