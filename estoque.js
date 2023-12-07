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
}

function transacaoNoEstoque(origem, destino, tipo, quantidade) {
    
    if (!estoque[origem]) {
        estoque[origem] = [];
    }
    
    if (!estoque[destino]) {
        estoque[destino] = [];
    }    

    if (quantidade < 0 || origem === destino) {
        return;
    }

    if (destino === "pomar") {
        let itemEncontrado = estoque[origem].find(item => item.tipo === tipo);

        if (itemEncontrado) {
            if(itemEncontrado.quantidade >= quantidade){
                itemEncontrado.quantidade = itemEncontrado.quantidade - quantidade;
            } else {
                itemEncontrado.quantidade = 0;
            }
        } else {
            return;
        }
        return;
    }

    
    if (origem === "pomar") {
        const itemEncontrado = estoque[destino].find(item => item.tipo === tipo);
    
        if (itemEncontrado) {
            itemEncontrado.quantidade += quantidade;
        } else {
            estoque[destino].push({ tipo, quantidade });
        }
        return;
    }

    else{
        let itemOrigem = estoque[origem].find(item => item.tipo === tipo);
        let itemDestino = estoque[destino].find(item => item.tipo === tipo);

        if(!itemOrigem){
            return;
        }

        else if(itemOrigem.quantidade < quantidade){
            if (itemDestino) {
                itemDestino.quantidade += itemOrigem.quantidade;
            } else {
                estoque[destino].push({ tipo: tipo, quantidade: itemOrigem.quantidade });
            }
            itemOrigem.quantidade = 0;
        }

        else {
            if (itemDestino) {
                itemDestino.quantidade += quantidade;
            } else {
                estoque[destino].push({ tipo, quantidade });
            }
            itemOrigem.quantidade = itemOrigem.quantidade - quantidade;
        }
    }
    return;
}

export { getEstoque, transacaoNoEstoque, limpaEstoque };