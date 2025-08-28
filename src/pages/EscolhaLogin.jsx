import React from 'react';
import { useNavigate } from 'react-router-dom';
import './escolhaLogin.css';

function EscolhaLogin() {
  const navigate = useNavigate();

  return (
    <div className="escolha-container">
      <div className="escolha-card">
        <h2 className="escolha-title">Esolha seu perfil</h2>
        <div className="escolha-buttons">
          <button className="escolha-button" onClick={() => navigate('/login-colaborador')}>
            👤 Sou Colaborador
          </button>
          <button className="escolha-button" onClick={() => navigate('/login-rh')}>
            🧑‍💼 Sou RH
          </button>
        </div>

        {/* Botão de voltar para a Home */}
        <button className="voltar-button" onClick={() => navigate('/')}>
          ⬅️ Voltar para a Home
        </button>
      </div>
    </div>
  );
}

export default EscolhaLogin;