import React from 'react';
import './HistoricoSolicitacoes.css';

const HistoricoSolicitacoes = ({ historico }) => {
  return (
    <div className="historico-card">
      <h3>Histórico de Solicitações</h3>
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
  );
};

export default HistoricoSolicitacoes;