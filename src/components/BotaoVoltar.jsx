import { useNavigate } from 'react-router-dom';

function BotaoVoltar({ destino = "/dashboard-rh" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(destino)}
      style={{
        marginBottom: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      ← Voltar
    </button>
  );
}

export default BotaoVoltar;