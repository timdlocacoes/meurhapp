import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">
          👋 Bem-vindo ao <span className="home-highlight">MeuRH</span>
        </h1>
        <p className="home-subtitle">
          Gerencie solicitações, aprovações e comunicação entre colaboradores e RH
          de forma simples e eficiente.
        </p>
        <div className="home-button-group">
          <button className="home-button" onClick={() => navigate('/login')}>
            🔐 Login
          </button>
          <button className="home-button" onClick={() => navigate('/cadastro')}>
            📝 Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
