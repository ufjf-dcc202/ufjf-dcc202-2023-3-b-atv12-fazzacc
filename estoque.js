let estoque = {
    'joao': [
        {'tipo': 'maca', 'quantidade': 1},
    ],
    'maria': [
        {'tipo': 'maca', 'quantidade': 2},
    ]
};


/*
A lista deve ter o mesmo conteúdo inicial do estado com 1 e 2 maçãs para joão e maria 

*/

function getEstoque() {
    return estoque;
}

function limpaEstoque() {
    
    estoque = {};
    estoque = {
        'joao': [],
        'maria': []
    };
}

function transacaoNoEstoque(origem, destino, tipo, quantidade) {
    
    if (quantidade < 0) {
        return;
    }

    if (origem === destino) {
        return;
    }

    
    if (destino === "pomar") {
        dePessoaParaPomar(origem, tipo, quantidade);
        return;
    }

    
    if (origem === "pomar") {
        dePomarParaPessoa(destino, tipo, quantidade);
        return;
    }

    
    const pessoaOrigem = estoque[origem];
    const pessoaDestino = estoque[destino];

    
    const monteOrigem = pessoaOrigem.find((monte) => monte.tipo === tipo);
    
    
    if (!monteOrigem || monteOrigem.quantidade < quantidade) {
        return;
    }

    
    let monteDestino = pessoaDestino.find((monte) => monte.tipo === tipo);

    
    if (!monteDestino) {
        monteDestino = { 'tipo': tipo, 'quantidade': 0 };
        pessoaDestino.push(monteDestino);
    }

    
    const quantidadeReal = Math.min(quantidade, monteOrigem.quantidade);
    monteDestino.quantidade += quantidadeReal;
    monteOrigem.quantidade -= quantidadeReal;
    return;
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



export { getEstoque, transacaoNoEstoque, limpaEstoque };