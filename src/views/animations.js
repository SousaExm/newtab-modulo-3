export default {
    
    fedeOut(element){
        element.classList.add("fade-out");
    },

    fadeIn(element){
        element.classList.add("fade-in")
    },

    load(element, setTime, button, error, msgError){

        element.classList.remove("fade-out")
        element.classList.add("load")
        button.setAttribute('disabled', true)
        button.style.cursor = "not-allowed"

        if(error){

            setTimeout(()=>{
            element.classList.remove("load")
            element.innerHTML = msgError
            },setTime)
        
            setTimeout(()=>{
                this.fedeOut(element)
            },setTime + 2000)

            setTimeout(()=>{
                button.removeAttribute('disabled')
                button.style.cursor = "pointer"
                element.innerHTML = ""
            },setTime + 3000)
        }
        
        else{       
            
            setTimeout(()=>{
                element.classList.remove("load")
                element.classList.add("done")
            },setTime)

            setTimeout(()=>{
                this.fedeOut(element)
            },setTime + 2000)

            setTimeout(()=>{

                button.removeAttribute('disabled')
                button.style.cursor = "pointer"
                element.classList.remove("done")
                element.innerHTML = ""
            },setTime + 3000)
        }
    }
}