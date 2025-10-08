 /*function Ativou(){
    var entrada = prompt("Posso sair?")
        //se a minha resposta for sim
        if (entrada == "sim"){
            alert("Pode Sair")   
        }else{alert("Não Pode Sair")

        }
    }

    function PodeSair(){
        alert("Pode sair")
    }*/
//Filho()
    
    function Filho(){
        let idade = 16  
        alert("Qual a minha idade?")
        Mae(idade)
        idade = 17
        Pai(idade)
    }

    function Mae(idade){
       alert("Você tem: " + idade)
        Pai(idade)
    }

    function Pai(idade){
        alert("Você tem: " + idade)
    }

    var resultado = Calculadora()
    var mais = Calculadora("+")
    var menos = Calculadora("-")
    var vezes = Calculadora("*")
    var dividir = Calculadora("/")
    function Calculadora(equacao){
        return alert(eval(2 + equacao + 2))
    }

    alert(resultado)