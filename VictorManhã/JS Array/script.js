var array = ["Victor", 16, "Modulo1"]

//alert(array.length) conta as peças

array.push("Xique-Xique Bahia")
//alert(array) adiciona ao final

array.pop()
//alert(array) pop remove o ultimo

array.splice(2,0, "Pedrinho")
//alert(array) splice adicioma ao meio ou substitui


/*
var continuar = true
var alunos = []

while(continuar == true){
    
    var nome = prompt("Adicione um nome: ")
    alunos.push(nome)


    var continuar2 = prompt("Deseja continuar? [S] ou [N]")
    if(continuar2 == "N"){
        break
    }

}   

alert(alunos)
*/

var array = [
    ["João", 15, "Rua 123"],
    ["Neymar", 30, "Rua 456"],
    ["Messi", 35, "Rua 789"],
    ["Cr7", 75, "Rua 000"]
]

alert(array[2][1])