import { getEstoque, transacaoNoEstoque, limpaEstoque } from "./estoque.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.forms.entrada;
  const outputSection = document.getElementById("saida");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const origem = form.origem.value;
    const destino = form.destino.value;
    const fruta = form.fruta.value;
    const quantidade = parseInt(form.quantidade.value, 10);

    transacaoNoEstoque(origem, destino, fruta, quantidade);
    exibirEstoque();
  });

  window.limparLista = () => {
    limpaEstoque();
    exibirEstoque();
  };

  function exibirEstoque() {
    outputSection.innerHTML = ""; // Limpa a seção de saída

    const estoque = getEstoque();

    Object.keys(estoque).forEach((pessoa) => {
      const ol = document.createElement("ol");
      ol.id = pessoa.toLowerCase();
      const h2 = document.createElement("h2");
      h2.textContent = pessoa;
      outputSection.appendChild(h2);
      outputSection.appendChild(ol);

      estoque[pessoa].forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.tipo}: ${item.quantidade}`;
        ol.appendChild(li);
      });
    });
  }
  exibirEstoque();
});
