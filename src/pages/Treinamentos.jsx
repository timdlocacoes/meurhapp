import React, { useEffect, useState } from 'react';
import './Treinamentos.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Treinamentos = () => {
  const navigate = useNavigate();
  const [treinamentos, setTreinamentos] = useState([]);
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    const buscarTreinamentos = async () => {
      try {
        const response = await axios.get('https://seu-endpoint.com/api/treinamentos');
        setTreinamentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar treinamentos:', error);
      }
    };

    buscarTreinamentos();
  }, []);

  const treinamentosFiltrados =
    filtro === 'Todos'
      ? treinamentos
      : treinamentos.filter((t) => t.status === filtro);

  return (
    <div className="treinamentos-container">
      <button className="voltar-btn" onClick={() => navigate(-1)}>🔙 Voltar</button>
      <h1 className="titulo">📚 Treinamentos Corporativos</h1>

      <div className="filtros">
        {['Todos', 'Disponível', 'Em andamento', 'Concluído'].map((status) => (
          <button
            key={status}
            className={`filtro-btn ${filtro === status ? 'ativo' : ''}`}
            onClick={() => setFiltro(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {treinamentosFiltrados.length === 0 ? (
        <p className="vazio">Nenhum treinamento encontrado.</p>
      ) : (
        <div className="treinamentos-grid">
          {treinamentosFiltrados.map((treino) => (
            <div key={treino.id} className="treinamento-card">
              <img src={treino.imagemUrl} alt={treino.titulo} className="treinamento-img" />
              <div className="treinamento-info">
                <h2>{treino.titulo}</h2>
                <p className="descricao">{treino.descricao}</p>
                <p className={`status ${treino.status.toLowerCase()}`}>Status: {treino.status}</p>
                <button className="acao-btn">
                  {treino.status === 'Disponível' ? 'Iniciar' : treino.status === 'Em andamento' ? 'Continuar' : 'Visualizar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Treinamentos;