import BotaoVoltar from '../components/BotaoVoltar'; // Import do botão

function HoleriteColaborador() {
  return (
    <div style={{ padding: '1rem' }}>
      <BotaoVoltar destino="/dashboard-colaborador" /> {/* Botão Voltar com destino específico */}

      <h2>Holerites</h2>
      <p>Aqui você poderá acessar seus holerites mensais.</p>
    </div>
  );
}

export default HoleriteColaborador;