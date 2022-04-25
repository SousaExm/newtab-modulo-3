export default {

    //Salva um array passado como parametro no localStorage
    save(array){
        localStorage.setItem("FinancesData", JSON.stringify(array));
    },

    //Retorna todas as transacoes do localStorage ou um array vazio
    get(){
        const AllTransactions = JSON.parse(localStorage.getItem('FinancesData'));

        if(AllTransactions === null){
            return [];
        }else{
            
            return  AllTransactions.map(transaction =>({
                    typeTransaction: transaction.typeTransaction,
                    nameTransaction: transaction.nameTransaction,
                    amountTransaction: transaction.amountTransaction
        }))};
    },

    //Adiciona uma nova transacao passada no parametro no array de transacoes atuais e chama 
    //o método save para persistir no localStorage
    create(newTransaction){
        const ActualTransactions = this.get();
        ActualTransactions.push(newTransaction);
        this.save(ActualTransactions);
    },

    //Recebe um index, solicita o array pelo método get e remove a transacao no indice informado
    //e solicita a persistencia no localStorage pelo método save
    remove(index){
        const AllTransactions = this.get()
        AllTransactions.splice(index, 1)
        this.save(AllTransactions);
    },

    //Salva um array vazio no localStorage, fazendo com que as transacoes anteriores sejam apagadas
    deleteAll(){
        this.save([]);
    }
}
