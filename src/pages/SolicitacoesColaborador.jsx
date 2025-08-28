import { useEffect, useState } from 'react';
import BotaoVoltar from '../components/BotaoVoltar';

function SolicitacoesColaborador() {
  const [solicitacoes, setSolicitacoes] = useState([]);

  // Simulação de dados recebidos (pode ser substituído por chamada ao Firebase)
  useEffect(() => {
    const dadosMock = [
      { id: 1, colaborador: 'João Silva', tipo: 'Férias', status: 'Pendente' },
      { id: 2, colaborador: 'Maria Souza', tipo: 'Ajuste de ponto', status: 'Aprovado' },
    ];
    setSolicitacoes(dadosMock);
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <BotaoVoltar destino="/dashboard-colaborador" />

      <h2>Solicitações Recebidas</h2>
      <p>Veja abaixo as solicitações enviadas pelos colaboradores:</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {solicitacoes.map((item) => (
          <li key={item.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <strong>Colaborador:</strong> {item.colaborador} <br />
            <strong>Tipo:</strong> {item.tipo} <br />
            <strong>Status:</strong> {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SolicitacoesColaborador;