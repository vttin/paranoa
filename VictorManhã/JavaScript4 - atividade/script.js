function VerificaIdade(){
    idade = parseInt(document.getElementById("idade").value)
   
    switch(idade){
        case 13:
            alert("curso 1")
            break
         case 14:
            alert("curso 2")
            break
        case 15:
            alert("curso 3")
            break
        case 16:
            alert("curso 4")
            break
        default:
            alert("Não pode estudar") 
        }

}
