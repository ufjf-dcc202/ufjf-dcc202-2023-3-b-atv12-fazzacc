import { getEstoque, transacaoNoEstoque, limpaEstoque } from "./estoque.js";

const olJoao = document.querySelector("#joao");
const olMaria = document.querySelector("#maria");

document.entrada.addEventListener('submit', leFormulario);
document.entrada.reset();

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('buttonLimparLista').addEventListener('click', () => {
        limpaEstoque();
        atualizaTela();
    });
});

atualizaTela();

function leFormulario(event)
{
    event.preventDefault(event);
    const quantidade = document.entrada.quantidade.valueAsNumber;
    const fruta = document.entrada.fruta.value;
    const origem = document.entrada.origem.value;
    const destino = document.entrada.destino.value;
    
    console.log(`${origem} doa ${quantidade} ${fruta} para ${destino}`);

    transacaoNoEstoque(origem, destino, fruta, quantidade);
    atualizaTela();
}


function preencheLista(lista, estoqueDaPessoa) {
    lista.textContent = "";

    if (Array.isArray(estoqueDaPessoa)) {
        for (let i = 0; i < estoqueDaPessoa.length; i++) {
            const monte = estoqueDaPessoa[i];
            const li = document.createElement('li');
            li.textContent = `${monte.tipo}: ${monte.quantidade}`;
            lista.appendChild(li);
        }
    }
}


function atualizaTela() {
    const estoque = getEstoque();

    olJoao.innerHTML = "";
    olMaria.innerHTML = "";
    document.entrada.quantidade.value = 1;
    document.entrada.fruta.value = "maca";

    preencheLista(olJoao, estoque.joao);
    preencheLista(olMaria, estoque.maria);
    
}