import React from 'react';
import './dashboardRh.css';
import { Link } from 'react-router-dom';

const DashboardRH = () => {
  const sections = [
    { title: 'Solicitações Recebidas', icon: '📥', path: '/solicitacoes-recebidas' },
    { title: 'Gerenciar Avisos', icon: '📢', path: '/mensagens' },
    { title: 'Gerenciar Documentos', icon: '🗂️', path: '/arquivos-rh' },
    { title: 'Metas & Desempenho', icon: '🎯', path: '/desempenho' },
    { title: 'Eventos Internos', icon: '📅', path: '/eventos' },
    { title: 'Treinamentos', icon: '📚', path: '/treinamentos' },
    { title: 'Sugestões dos Colaboradores', icon: '💬', path: '/sugestoes' },
    { title: 'Gerenciar Usuários', icon: '👥', path: '/gerenciar-usuarios' },
  ];

  return (
    <div className="dashboard-container">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Painel do RH</h1>

      <div className="dashboard-grid">
        {sections.map((section, index) => (
          <div key={index} className="dashboard-card">
            <span className="card-icon">{section.icon}</span>
            <h2 className="card-title">{section.title}</h2>
            <Link to={section.path}>
              <button className="card-button">Acessar</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardRH;