import Transactions from '../../src/model/transactions.js'
import Table from '../../src/views/table.js'
import Validation from '../utils/utils.js'

export default {

    //Recebe os valores passados no form para adicionar uma nova transacao  através do evento,
    //válida os valores passados e caso passe pela validaçao solicita permanecia da transacao
    //para o arquivo transactions.js
    //Se houver algum erro retorna a mensagem de erro do arquivo de validacao.
    create(event){

        let amount = Validation.formatForSave(event.target.amount.value);
        let name = event.target.description.value
        let type = event.target.type.value

        type == "Compra"? amount = amount * -1 : amount; 

        const NewTransaction = {
            typeTransaction: type,
            nameTransaction: name,
            amountTransaction: amount            
        };

        if(Validation.validForm(name, amount) == true){
            Transactions.create(NewTransaction);
        }else{
            return Validation.validForm(name, amount).error
        }
    },

    //Recebe um index e envia a solicitacao de exlusao para o arquivo transactions
    deleteUnit(index){
        Transactions.remove(index);
    },

    //Requisita o array com todas as transacoes e solicita o calculo da soma do valor de cada transacao
    //Armazena o status de lucro ou prejuizo de acordo com o valor total das transacoes
    //Caso hajam transacoes adiciona cada transacao a variavel table, seguindo o padrao do arquivo table.js
    //Por fim retorna um objeto contendo a tabela e a informaçao de se há transacoes nela
    renderAllTransactions(){
        
        let table = Table.Thead() 
        let allTransactions = Transactions.get(); 
        let totalValue = Validation.calcTotal(Transactions.get());
        let status = totalValue < 0? "Prejuízo" : "Lucro"; 
            status = totalValue == 0? "Neutro" : status;

        if(allTransactions.length != 0){
            
            for(let transaction in allTransactions){
                    table += Table.Tbody(
                        allTransactions[transaction].typeTransaction,
                        allTransactions[transaction].nameTransaction,
                        Validation.formatAmountOutput(
                                                allTransactions[transaction]
                                                .amountTransaction)
                    );
                };
            
            return {
                table: table += Table.Tfoot(Validation.formatAmountOutput(totalValue),status),
                haveTransactions: true    
            }
        }else{
            return {
                table: Table.nothingHere(),
                haveTransactions: false
            };
        };   
    },

    //Solicita a exlusao de todas as transacoes ao arquivo transactions
    clearAllTransactions(){
        Transactions.deleteAll();
    }
};

