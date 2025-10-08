document.addEventListener("DOMContentLoaded", function() {
  // Dados de desperdício registrados
  let desperdicios = JSON.parse(localStorage.getItem('desperdicios')) || [];
  let edicaoIndice = -1; // Variável para controlar o índice em edição

  // Referências para elementos DOM
  const formDesperdicio = document.getElementById('formDesperdicio');
  const tabelaHistorico = document.getElementById('tabelaHistorico').getElementsByTagName('tbody')[0];
  const graficoDesperdicio = document.getElementById('graficoDesperdicio');
  const btnSubmit = document.querySelector('#formDesperdicio button[type="submit"]');
  const dataInput = document.getElementById('data');
  const quantidadeInput = document.getElementById('quantidade');
  const motivoInput = document.getElementById('motivo');

  // Adicionar botão de cancelar edição
  const btnCancelar = document.createElement('button');
  btnCancelar.textContent = 'Cancelar';
  btnCancelar.type = 'button';
  btnCancelar.classList.add('btn', 'btn-secondary', 'ml-2');
  btnCancelar.style.display = 'none';
  formDesperdicio.appendChild(btnCancelar);

  let chart = null;

  // Função para salvar desperdícios no Local Storage
  function salvarNoLocalStorage() {
    localStorage.setItem('desperdicios', JSON.stringify(desperdicios));
  }

  // Função para adicionar ou editar desperdício
  function processarDesperdicio(event) {
    event.preventDefault();

    // Coleta os dados do formulário
    const data = dataInput.value;
    const quantidade = parseFloat(quantidadeInput.value);
    const motivo = motivoInput.value;

    // Validações:
    if (!data || !quantidade || !motivo) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (quantidade <= 0 || isNaN(quantidade)) {
      alert("A quantidade de desperdício deve ser um número positivo.");
      return
    }

    if (motivo.trim() === "") {
      alert("O motivo do desperdício não pode estar vazio.");
      return;
    }

    // Verifica se está em modo de edição
    if (edicaoIndice !== -1) {
      // Verifica se houve mudanças reais
      const registroOriginal = desperdicios[edicaoIndice];
      if (registroOriginal.data === data && 
          registroOriginal.quantidade === quantidade && 
          registroOriginal.motivo === motivo) {
        alert("Nenhuma alteração foi feita.");
        return;
      }

      // Edita o registro existente
      desperdicios[edicaoIndice] = { data, quantidade, motivo };
      edicaoIndice = -1;
      btnSubmit.textContent = 'Registrar';
      btnCancelar.style.display = 'none';
      formDesperdicio.classList.remove('editing');
    } else {
      // Adiciona novo registro
      desperdicios.push({ data, quantidade, motivo });
    }

    // Ordena o array por data (crescente)
    desperdicios.sort((a, b) => new Date(a.data) - new Date(b.data));

    // Atualiza a tabela de histórico e o gráfico
    atualizarTabelaHistorico();
    atualizarGrafico();

    // Salva os dados no Local Storage
    salvarNoLocalStorage();

    // Limpa o formulário
    formDesperdicio.reset();
  }

  // Função para cancelar edição
  function cancelarEdicao() {
    edicaoIndice = -1;
    formDesperdicio.reset();
    btnSubmit.textContent = 'Registrar';
    btnCancelar.style.display = 'none';
    formDesperdicio.classList.remove('editing');
  }

  // Função para atualizar a tabela de histórico com botões de edição
  function atualizarTabelaHistorico() {
    tabelaHistorico.innerHTML = ''; // Limpa a tabela antes de atualizar

    desperdicios.forEach((desperdicio, indice) => {
      const row = tabelaHistorico.insertRow();
      row.insertCell(0).textContent = desperdicio.data;
      row.insertCell(1).textContent = `${desperdicio.quantidade} kg`;
      row.insertCell(2).textContent = desperdicio.motivo;

      // Célula de ações
      const acaoCell = row.insertCell(3);
      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.classList.add('btn', 'btn-warning', 'btn-sm', 'mr-2');

      btnEditar.addEventListener('click', () => editarRegistro(indice));
      acaoCell.appendChild(btnEditar);

      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.classList.add('btn', 'btn-danger', 'btn-sm');
      btnExcluir.addEventListener('click', () => excluirRegistro(indice));
      acaoCell.appendChild(btnExcluir);
    });
  }

  // Função para editar um registro
  function editarRegistro(indice) {
    const desperdicio = desperdicios[indice];
    
    // Preenche o formulário com os dados do registro
    dataInput.value = desperdicio.data;
    quantidadeInput.value = desperdicio.quantidade;
    motivoInput.value = desperdicio.motivo;

    // Altera o texto do botão para indicar edição
    btnSubmit.textContent = 'Atualizar';
    btnCancelar.style.display = 'inline-block';
    formDesperdicio.classList.add('editing');
    
    // Marca o índice em edição
    edicaoIndice = indice;

    // Rola a página para a seção de registro
    document.getElementById('checkpoint1').scrollIntoView({ behavior: 'smooth' });
  }

  // Função para excluir um registro
  function excluirRegistro(indice) {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      desperdicios.splice(indice, 1);
      atualizarTabelaHistorico();
      atualizarGrafico();
      salvarNoLocalStorage(); // Atualiza o Local Storage após exclusão
    }
  }

  // Função para atualizar o gráfico de desperdício
  function atualizarGrafico() {
    const labels = desperdicios.map(d => d.data);
    const data = desperdicios.map(d => d.quantidade);

    // Se o gráfico já foi criado, apenas atualiza os dados
    if (chart) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = data;
      chart.update();
    } else {
      // Criação do gráfico se não existir
      const ctx = graficoDesperdicio.getContext('2d');
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Desperdício de Borracha (kg)',
            data: data,
            borderColor: '#00a8ff',
            backgroundColor: 'rgb(0, 110, 255)',
            borderWidth: 2,
            fill: false,
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  // Carregar dados do Local Storage ao inicializar a página
  function carregarDados() {
    desperdicios.forEach(d => {
      tabelaHistorico.innerHTML = ''; // Limpa a tabela antes de preencher
      atualizarTabelaHistorico();
      atualizarGrafico();
    });
  }

  // Adiciona eventos
  formDesperdicio.addEventListener('submit', processarDesperdicio);
  btnCancelar.addEventListener('click', cancelarEdicao);

  // Carrega dados iniciais
  carregarDados();
});



