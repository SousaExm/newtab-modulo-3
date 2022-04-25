export default {

    //Header da tabela que será renderizado
    Thead(){
        return` 
                <h2>Extrato de transaçoes</h2>
                <table class="table-transactions">   
                    <thead>
                        <tr>
                            <th>
                        
                            </th>
                            <th>
                                Mercadoria
                            </th>
                            <th>
                                Valor
                            </th>
                            <th>
                                <!-- Espaço para o botao delete -->
                            </th>
                        </tr>
                    </thead>
                    <tbody class="transactions-panel">
                `
    },
    
    //Recebe cada dado da transacao que será renderizada e de acordo com o tipo da venda define o
    //sinal de - ou + para renderizaçao
    Tbody(typeTransaction, nameTransaction, amountTransaction){
    
        return `
                <tr>
                    <td>
                        ${typeTransaction == "Venda"? "+" : "-"}
                    </td>
                    <td>
                        ${nameTransaction}
                    </td>
                    <td>
                        ${amountTransaction}
                    </td>
                    <td class="delete-unit-btn">
                        <img src="./assets/imgs/delete.svg" alt="deletar transacao">
                    </td>
                </tr>
            `
    },

    //Recebe o valor de todas as transacoes e o status final
    Tfoot(totalValue, status){
        return `</tbody>
                <tfoot class="resume">
                    <tr class="separate-line"></tr>
                    <tr class="especial-tr">
                        <td class="first-space">
                        </td>
                        <td class="name-total">
                            Total:
                        </td>
                        <td class="total-value">
                            ${totalValue} <br>  [${status}]
                        </td>
                        <td class="second-space">
                        </td>
                    </tr>
                </tfoot>
            </table>
        `
    },

    //Padrao de exibiçao em caso de nao haver transacoes para renderizacao
    nothingHere(){
        return `
            <h2>Extrato de transaçoes</h2>
            <div class="nothing-here fede-in">
                <img src="./assets/imgs/nothing.svg" alt="">
                <h2>Ops... Ainda nao há transaçoes cadastradas</h2>
                <p>Tente adicionar uma nova transacao</p>
            </div>
        `
    }
}