var nome = "cesar"
var idade = "15"
var idade2 = 15

function Clicou(){
    alert("Ativou a função")
}

function Enviar(){
    var email = document.getElementById("re").value
    var senha = document.getElementById("senha").value

    if (email == "" || senha == ""){
        alert("login não finalizado")
    }else if(email == "victor@gmail.com" && senha == "123"){
        alert("Logado com sucesso")
    }else{
        alert("Crie uma conta")
    }
        
}
