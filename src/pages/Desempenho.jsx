import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import './paginaPadrao.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Desempenho = () => {
  const dadosProdutividade = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    datasets: [
      {
        label: 'Tarefas Concluídas',
        data: [35, 42, 38, 50, 47],
        backgroundColor: '#2ecc71',
      },
    ],
  };

  const dadosAssiduidade = {
    labels: ['Presenças', 'Faltas'],
    datasets: [
      {
        data: [92, 8],
        backgroundColor: ['#3498db', '#e74c3c'],
      },
    ],
  };

  return (
    <div className="pagina-padrao">
      <h2>Desempenho do Colaborador</h2>

      <div style={{ marginTop: '30px' }}>
        <h3>Produtividade Mensal</h3>
        <Bar data={dadosProdutividade} />

        <h3 style={{ marginTop: '40px' }}>Assiduidade</h3>
        <Doughnut data={dadosAssiduidade} />
      </div>
    </div>
  );
};

export default Desempenho;