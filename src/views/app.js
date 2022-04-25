import TransactionsControllers from '../controllers/transactionsController.js'
import Validation from '../utils/utils.js'

const formNewTransact = document.querySelector("#form-new-transaction") //Form de envio de transacao
const tablePanel = document.querySelector('.transactions') //Area de renderizacao da tabela
const amountInput = document.querySelector('.amount-input') //Input de valores do form
const btnsDelete = document.getElementsByClassName("delete-unit-btn")//Botoes de deletar uma única transacao
const confirmClearAll = document.querySelector('.confirm') //Botao de confirmar exlusao massa de transacoes
const cancelClearAll = document.querySelector('.cancel') //Botao de cancelar exlusao em massa de transacoes 
const youSureMenu = document.getElementById('menu') //Modal da mensagem de confirmacao de exlusao em massa
const clearAll = document.getElementById('clear-all') //Botao que chama o moadal de confirmaçao de exlusao em massa
const divValidAndLoad = document.querySelector('.text-validation') //Div utilizada para renderizar mensagens de erro para o usuário 
const openMenu = document.getElementById('open-menu') //Menu hamburguer
const closeMenu = document.getElementById('close-menu') //Botao de fechamento do menu lateral
const assideMenu = document.querySelector("#nav-menu") //Menu lateral


const App = { 
    
    //Solicita as transacoes ao TransactionsController.js e apaga as mensagens de erro
    renderTable(){     
        tablePanel.innerHTML = TransactionsControllers.renderAllTransactions().table
        this.listenerBtnDelete();
        divValidAndLoad.innerHTML = ""
    },

    //Adiciona o eventListnner no botao de exlusao de cada transacao,
    //é inicalmente renderizado quando chamamos App.renderTable
    //Caso o botao seja clicado a solicitaçao de exlusao é passada ao TransactionsController
    listenerBtnDelete(){
        for(let btn in btnsDelete){    
                
            if(Number(btn) || Number(btn) == 0){
                btnsDelete[btn].addEventListener('click',()=>{
                    TransactionsControllers.deleteUnit(btn);
                    this.renderTable();
                });
            };
        };
    }
};

App.renderTable()

//Envia a nova transacao para o transactionsController.js, em caso de sucesso cria
//uma nova transacao, caso contrário, retorna o erro para o usuário
formNewTransact.addEventListener('submit', (event)=>{
    event.preventDefault();
    
    if(TransactionsControllers.create(event) != undefined){
        divValidAndLoad.innerHTML = TransactionsControllers.create(event)
    }else{
        App.renderTable();
    }
});

//Caso hajam transacoes salvas, abre o menu de confirmaçao da exclusao das transaçoes
//se nao houver transacoes informa ao usuário que nao existem transacoes cadastradas no
//momento
clearAll.addEventListener('click', ()=>{
    if(TransactionsControllers.renderAllTransactions().haveTransactions){
        youSureMenu.classList.add('on');
    }else{
        alert('Nao existem transacoes salvas no momento');
    }
});

//Análisa a cofirmaçao da transacao, enviando a solicitacao para o 
//arquivo transactionsController.js responsável por prosseguir com a solicitaçao
//e após a exclusao renderiza a tabela
confirmClearAll.addEventListener('click', ()=>{
    TransactionsControllers.clearAllTransactions();
    youSureMenu.classList.remove('on');
    App.renderTable();
});

//Cancela a exclusao das transacoes e fecha o menu de confirmaçao
cancelClearAll.addEventListener('click', ()=>{
    youSureMenu.classList.remove('on');
});

//Recebe o valor digitado e envia ao maskAmountInput que retorna o valor
//formatado no padrao R$ 10,90
let amount = [];
amountInput.addEventListener('keydown', (event)=>{
    event.preventDefault();
    event.target.value = Validation.maskAmountInput(event, amount);   
});

//Abre o menu lateral
openMenu.addEventListener("click", ()=>{
    assideMenu.style.display = "flex"
    closeMenu.style.display = "unset"
})

//Fecha o menu lateral
closeMenu.addEventListener("click", ()=>{
    assideMenu.style.display = "none"
})

//Corrige as classes no nav-menu caso o usário mantenha o menu lateral 
//aberto e redimensione a tela,evitando bug no layout
window.addEventListener('resize', () =>{
    if(window.innerWidth > 768){
        assideMenu.style.display = "flex"
        closeMenu.style.display = "none"
    }else{
        assideMenu.style.display = "none"
    }
})

