let estoque = {
    'joao': [
        {'tipo': 'maca', 'quantidade': 1}
    ],
    'maria': [
        {'tipo': 'maca', 'quantidade': 2}
    ]
};

/*
A lista deve ter o mesmo conteúdo inicial do estado com 1 e 2 maçãs para joão e maria 

*/

function getEstoque() {
    return structuredClone(estoque);
}

function transacaoNoEstoque(origem, destino, tipo, quantidade) {
    if(origem === destino) { return; };
    if(destino === "pomar") {
        dePessoaParaPomar(origem, tipo, quantidade);
        return;
    }

    if(origem === "pomar") {
        dePomarParaPessoa(destino, tipo, quantidade);
        return;
    }

    const pessoaOrigem = estoque[origem];
    const pessoaDestino = estoque[destino];
    let monteOrigem;
    for(let i=0; i < pessoaOrigem.length; i++) {
        const monte = pessoaOrigem[i];
        if(monte.tipo === tipo) {
            monteOrigem = monte;
            break;
        }
    }
    if(!monteOrigem) { return; }
    let monteDestino;
    for(let i=0; i < pessoaDestino.length; i++) {
        const monte = pessoaDestino[i];
        if(monte.tipo === tipo) {
            monteDestino = monte;
            break;
        }
    }
    if(!monteDestino) {
        monteDestino = {'tipo': tipo, 'quantidade': 0};
        pessoaDestino.push(monteDestino);
    }
    const quantidadeReal = Math.min(quantidade, monteOrigem.quantidade);
    monteDestino.quantidade += quantidadeReal;
    monteOrigem.quantidade -= quantidadeReal;
}

function dePessoaParaPomar(origem, tipo, quantidade) {
    const pessoa = estoque[origem];
    for(let i=0; i<pessoa.length; i++) {
        const monte = pessoa[i];
        if(monte.tipo === tipo) {
            monte.quantidade -= Math.min(quantidade, monte.quantidade);
            return;
        }
    }
}

function dePomarParaPessoa(destino, tipo, quantidade) {
    const pessoa = estoque[destino];
    for(let i=0; i<pessoa.length; i++) {
        const monte = pessoa[i];
        if(monte.tipo === tipo) {
            monte.quantidade += Math.max(quantidade, 0);
            return;
        }
    }
    const novoMonte = {'tipo': tipo, 'quantidade': Math.max(quantidade, 0)};
    pessoa.push(novoMonte);
}

export { getEstoque, transacaoNoEstoque };