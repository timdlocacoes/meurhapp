import React, { useState } from 'react';
import './NovaSolicitacao.css';

const NovaSolicitacao = ({ onEnviar }) => {
  const [tipo, setTipo] = useState('');
  const [motivo, setMotivo] = useState('');
  const [historico, setHistorico] = useState([]);

  const handleSubmit = () => {
    if (!tipo || !motivo.trim()) {
      alert('Preencha todos os campos.');
      return;
    }

    const nova = {
      tipo,
      motivo,
      data: new Date().toLocaleString(),
      status: 'pendente',
    };

    setHistorico((prev) => [...prev, nova]);

    if (onEnviar) onEnviar(nova);

    setTipo('');
    setMotivo('');
    alert('Solicitação enviada com sucesso!');
  };

  return (
    <div className="nova-solicitacao-card">
      <h3>Nova Solicitação</h3>

      <label>Tipo:</label>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="">Selecione</option>
        <option value="Férias">Férias</option>
        <option value="Folga">Folga</option>
        <option value="Abono">Abono</option>
        <option value="Documentação">Documentação</option>
        <option value="Ajuste de Ponto">Ajuste de Ponto</option>
      </select>

      <label>Motivo:</label>
      <textarea
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
        placeholder="Descreva o motivo da solicitação"
      />

      <button onClick={handleSubmit}>Continuar</button>

      <div className="historico-solicitacoes">
        <h4>Histórico de Solicitações</h4>
        {historico.length === 0 ? (
          <p className="vazio">Nenhuma solicitação registrada.</p>
        ) : (
          <ul className="lista-historico">
            {historico.map((item, index) => (
              <li key={index} className="item-historico">
                <strong>{item.tipo}</strong>
                <p>{item.motivo}</p>
                <span>{item.data}</span>
                <span className={`status ${item.status}`}>{item.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NovaSolicitacao;