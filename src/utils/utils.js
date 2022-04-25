export default {

    //Recebe um evento de teclado, aceitando apenas as teclas numérias e backspasce
    //Recebe um array vazio que sera manipulado
    //O valor recebido é tranformado em string e retornado formatado para impressao para o usuário
    //em tempo de digitaçao
    maskAmountInput(event , arrayValue){

        if(event.key == "Backspace"){
            arrayValue.pop()
        }

        if((/[0-9]/g).test(event.key)){   
            arrayValue.push(event.key)
        }
    
        let value = arrayValue.toString().replace(/,/g, "")
        value  = (Number(value)/100)
    
        let formatedValue = value.toLocaleString('pt-BR',{
            currency: 'BRL',
            style: 'currency',
            minimumFractionDigits:2
        })
    
        return formatedValue
    },

    //Recebe um valor formatado para moeda no padrao R$ 00,00 e retorna um valor tipo number correspondente
    formatForSave(value){
        value = value.replace(/\D/g,"")
        value = value.replace(/(\d)(\d{2})$/,"$1.$2");
        value = Number(value)
        return value
    },

    //Recebe um valor do tipo number e formata para o padrao R$ 00,00 sempre positivo
    formatAmountOutput(value){
        
        if(value < 0){
            value = value * -1
        }
        
        value = value.toString().replace(/,/g, "")
        value  = (Number(value)/1)
    
        value = value.toLocaleString('pt-BR',{
            currency: 'BRL',
            style: 'currency',
            minimumFractionDigits:2
        })
    
        return value
    },

    //Recebe um nome e um valor, verifica se estao dentro do padrao para criacao da transacao
    validForm(name, value){
        
        if(name.length == 0 && value == 0){
            return {
                error: "Por favor preencha os campos acima"
            }
        }else 
            if(name.length < 2){
                return {
                error: "Por favor insira um nome válido"
                };
            }else 
                if(value == 0){
                    return {
                        error: "Por favor insira um valor válido"
                    };
                };
            
        return true;
    },
    
    //Recebe um array e retorna a soma de cada valor em amountTransaction
    calcTotal(array){
        
        let total = 0;

        for(let i in array){
            var actualValue = array[i].amountTransaction
            total += actualValue
        }
        return total
    }
}