let estoque = {
    joao: [{ tipo: "maca", quantidade: 1 }],
    maria: [{ tipo: "maca", quantidade: 2 }],
    // Adicione mais inicializações conforme necessário
  };
  
  export function getEstoque() {
    return { ...estoque };
  }
  
  export function transacaoNoEstoque(origem, destino, fruta, quantidade) {
    if (!estoque[origem] || !estoque[destino]) {
      console.error("Pessoa de origem ou destino não encontrada.");
      return;
    }
  
    const origemIndex = estoque[origem].findIndex((item) => item.tipo === fruta);
    const destinoIndex = estoque[destino].findIndex((item) => item.tipo === fruta);
  
    if (origemIndex === -1 || estoque[origem][origemIndex].quantidade < quantidade) {
      console.error("Quantidade insuficiente na pessoa de origem.");
      return;
    }
  
    if (destinoIndex === -1) {
      estoque[destino].push({ tipo: fruta, quantidade });
    } else {
      estoque[destino][destinoIndex].quantidade += quantidade;
    }
  
    estoque[origem][origemIndex].quantidade -= quantidade;
  }
  
  export function limpaEstoque() {
    estoque = {};
  }
  