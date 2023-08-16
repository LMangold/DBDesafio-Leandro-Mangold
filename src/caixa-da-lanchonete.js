class CaixaDaLanchonete {
    //Definição do Cardarpio com codigos, descrição e valores dos itens
    constructor() {
      this.cardapio = {
        'cafe': { descricao: 'Café', valor: 3.00 },
        'chantily': { descricao: 'Chantily (extra do Café)', valor: 1.50 },
        'suco': { descricao: 'Suco Natural', valor: 6.20 },
        'sanduiche': { descricao: 'Sanduíche', valor: 6.50 },
        'queijo': { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        'salgado': { descricao: 'Salgado', valor: 7.25 },
        'combo1': { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        'combo2': { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
      };
    }

    calcularValorDaCompra(formaDePagamento, itens) { 
      const validFormasPagamento = ['debito', 'credito', 'dinheiro'];
            if (!validFormasPagamento.includes(formaDePagamento)) { // Verificação da forma de pagamento
                return "Forma de pagamento inválida!";
            }

            if (itens.length === 0) {
                return "Não há itens no carrinho de compra!";
            }

        let total = 0; // Variáveis para calcular o valor total e rastrear itens principais
        let cafePresente = false;
        let sanduichePresente = false;

      for (const itemInfo of itens) { 
        const [codigo, quantidade] = itemInfo.split(','); // Separando código e quantidade do item
        const item = this.cardapio[codigo];

            if (!item) {
                return "Item inválido!";
            }
 
        const itemValor = item.valor * quantidade; // Cálculo do valor do item
    
            if (item.descricao.includes('extra')) {
                const itemPrincipalCodigo = codigo.split(',')[0];
                const itemPrincipal = this.cardapio[itemPrincipalCodigo];

            if (!itemPrincipal || itemPrincipal.descricao.includes('combo'))
            {
             return "Item extra não pode ser pedido sem o principal";
            };
        }
           // Atualização das variáveis de itens principais
            if (codigo === 'cafe') {
                cafePresente = true;
            } else if (codigo === 'sanduiche') {
                sanduichePresente = true;
            }

        total += itemValor;
        }   // Verificação de itens extras sem itens principais correspondentes
            if (!cafePresente && itens.some(itemInfo => itemInfo.includes('chantily'))) {
                return "Item extra não pode ser pedido sem o principal";
            }

            if (!sanduichePresente && itens.some(itemInfo => itemInfo.includes('queijo'))) {
                return "Item extra não pode ser pedido sem o principal";
            }
      
            if (total === 0) {
                return "Quantidade inválida!";
            }

            // Aplicação de desconto/acréscimo conforme forma de pagamento
            if (formaDePagamento === 'dinheiro') {
                total *= 0.95; // 5% de desconto

            } else if (formaDePagamento === 'credito') {
                total *= 1.03; // 3% de acréscimo
            }

      return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
  
}
// Exportação da classe para ser usada em outros arquivos
    export { CaixaDaLanchonete };