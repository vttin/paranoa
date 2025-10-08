function Enviar() {
    // Obtendo os valores de RE e senha
    var re = document.getElementById('re').value;
    var senha = document.getElementById('senha').value;

    // Definindo os valores corretos
    var reCorreto = '012345'; // Substitua com o RE correto
    var senhaCorreta = '1234'; // Substitua com a senha correta

    // Verificando se o RE e a senha estão corretos
    if (re === reCorreto && senha === senhaCorreta) {
      // Se estiver correto, abre uma nova aba
      window.open('home.html', '_blank');
    } else {
      // Se estiver errado, exibe um alerta
      alert('RE ou Senha incorretos!');
    }
  }