import React, { useEffect, useState } from 'react';
import './Sugestoes.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sugestoes = () => {
  const navigate = useNavigate();
  const [sugestoes, setSugestoes] = useState([]);
  const [filtro, setFiltro] = useState('Todas');
  const [resposta, setResposta] = useState({});

  useEffect(() => {
    const buscarSugestoes = async () => {
      try {
        const response = await axios.get('https://seu-endpoint.com/api/sugestoes');
        setSugestoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
      }
    };

    buscarSugestoes();
  }, []);

  const sugestoesFiltradas =
    filtro === 'Todas' ? sugestoes : sugestoes.filter((s) => s.status === filtro);

  const responderSugestao = async (id) => {
    if (!resposta[id]) return;
    try {
      await axios.post(`https://seu-endpoint.com/api/sugestoes/${id}/resposta`, {
        texto: resposta[id],
      });
      setResposta((prev) => ({ ...prev, [id]: '' }));
      alert('Resposta enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao responder sugestão:', error);
    }
  };

  return (
    <div className="sugestoes-container">
      <button className="voltar-btn" onClick={() => navigate(-1)}>🔙 Voltar</button>
      <h1 className="titulo">💬 Sugestões dos Colaboradores</h1>

      <div className="resumo">
        <p>Total de sugestões: <strong>{sugestoes.length}</strong></p>
        <div className="filtros">
          {['Todas', 'Nova', 'Em análise', 'Respondida'].map((status) => (
            <button
              key={status}
              className={`filtro-btn ${filtro === status ? 'ativo' : ''}`}
              onClick={() => setFiltro(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {sugestoesFiltradas.length === 0 ? (
        <p className="vazio">Nenhuma sugestão encontrada.</p>
      ) : (
        <div className="sugestoes-grid">
          {sugestoesFiltradas.map((sugestao) => (
            <div key={sugestao.id} className="sugestao-card">
              <div className="sugestao-info">
                <p className="data">{new Date(sugestao.data).toLocaleDateString()}</p>
                <p className="conteudo">"{sugestao.texto}"</p>
                <p className={`status ${sugestao.status.toLowerCase()}`}>Status: {sugestao.status}</p>
              </div>

              {sugestao.status !== 'Respondida' && (
                <div className="resposta-area">
                  <textarea
                    placeholder="Escreva uma resposta..."
                    value={resposta[sugestao.id] || ''}
                    onChange={(e) =>
                      setResposta((prev) => ({ ...prev, [sugestao.id]: e.target.value }))
                    }
                  />
                  <button onClick={() => responderSugestao(sugestao.id)}>📨 Responder</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sugestoes;