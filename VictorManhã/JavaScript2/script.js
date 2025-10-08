function AtivarTexto(){
    //document.getElementById("p").innerHTML = "Depois de Clicar"
    var nome = "Victor"
    var sobrenome = "Brito"
    console.log(nome+ " " +sobrenome)
}

function Ad(){
    var n1 = parseInt(document.getElementById("n1").value)
    var n2 = parseInt(document.getElementById("n2").value)
    console.log(n1+n2)
    Sub()
}

function Sub(){
    var n1 = parseInt(document.getElementById("n1").value)
    var n2 = parseInt(document.getElementById("n2").value)
    console.log(n1-n2)
    Mul()
}

function Mul(){
    var n1 = parseInt(document.getElementById("n1").value)
    var n2 = parseInt(document.getElementById("n2").value)
    console.log(n1*n2)
    Div()
}

function Div(){
    var n1 = parseInt(document.getElementById("n1").value)
    var n2 = parseInt(document.getElementById("n2").value)
    console.log(n1/n2)

}
