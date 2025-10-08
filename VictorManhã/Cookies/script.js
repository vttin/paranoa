
document.cookie = "nome = Joãoziho";
document.cookie = "nome = João; expires=Fri, 10 Jun 2025 12:00:00 UTC"

function Salvar(){
    var coisa = document.getElementById('coisa').value
    document.cookie = "coisa = "+ coisa
    location.reload()
}