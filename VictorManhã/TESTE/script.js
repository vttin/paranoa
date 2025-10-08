document.addEventListener("DOMContentLoaded", function() {
    let desperdicios = [];
    let chart = null;
    let indexEdicao = null; // Índice do desperdício que está sendo editado
  
    // Referências para elementos DOM
    const formDesperdicio = document.getElementById('formDesperdicio');
    const tabelaHistorico = document.getElementById('tabelaHistorico').getElementsByTagName('tbody')[0];
    const graficoDesperdicio = document.getElementById('graficoDesperdicio');
    const editarGrafico = document.getElementById('editarGrafico'); // Botão de edição
  
    // Função para adicionar desperdício
    function adicionarDesperdicio(event) {
      event.preventDefault();
  
      const data = document.getElementById('data').value;
      const quantidade = parseFloat(document.getElementById('quantidade').value);
      const motivo = document.getElementById('motivo').value;
  
      if (!data || !quantidade || !motivo) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
  
      // Se estiver editando, atualize o desperdício no índice correto
      if (indexEdicao !== null) {
        desperdicios[indexEdicao] = { data, quantidade, motivo };
        indexEdicao = null; // Limpa a variável de edição
      } else {
        desperdicios.push({ data, quantidade, motivo });
      }
  
      desperdicios.sort((a, b) => new Date(a.data) - new Date(b.data)); // Ordena pela data
  
      // Atualiza a tabela de histórico
      atualizarTabelaHistorico();
  
      // Atualiza o gráfico
      atualizarGrafico();
  
      // Limpa o formulário
      formDesperdicio.reset();
    }
  
    // Função para atualizar a tabela de histórico
    function atualizarTabelaHistorico() {
      tabelaHistorico.innerHTML = ''; // Limpa a tabela antes de atualizar
  
      desperdicios.forEach((desperdicio, index) => {
        const row = tabelaHistorico.insertRow();
        row.insertCell(0).textContent = desperdicio.data;
        row.insertCell(1).textContent = `${desperdicio.quantidade} kg`;
        row.insertCell(2).textContent = desperdicio.motivo;
        const editCell = row.insertCell(3);
        const editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        editarBtn.className = 'btn btn-warning btn-sm';
        editarBtn.onclick = function() {
          editarDesperdicio(index);
        };
        editCell.appendChild(editarBtn);
      });
    }
  
    // Função para editar um desperdício
    function editarDesperdicio(index) {
      // Preenche o formulário com os dados do desperdício selecionado
      const desperdicio = desperdicios[index];
      document.getElementById('data').value = desperdicio.data;
      document.getElementById('quantidade').value = desperdicio.quantidade;
      document.getElementById('motivo').value = desperdicio.motivo;
  
      // Armazena o índice do desperdício sendo editado
      indexEdicao = index;
    }
  
    // Função para atualizar o gráfico
    function atualizarGrafico() {
      const labels = desperdicios.map(d => d.data);
      const data = desperdicios.map(d => d.quantidade);
  
      if (chart) {
        // Se o gráfico já foi criado, atualize os dados
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.update();
      } else {
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
          });
        });
      }
    }
  
    // Função para mostrar o formulário de edição
    editarGrafico.addEventListener('click', function() {
      document.getElementById('formDesperdicio').classList.toggle('d-none');
    });
  
    // Adiciona o evento de submit ao formulário
    formDesperdicio.addEventListener('submit', adicionarDesperdicio);
  });
  