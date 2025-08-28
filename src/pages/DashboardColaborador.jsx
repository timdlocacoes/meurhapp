import React, { useState, useEffect, useRef } from 'react';
import './DashboardColaborador.css';
import { useNavigate } from 'react-router-dom';
import {
  FaClipboardList,
  FaBullhorn,
  FaCalendarAlt,
  FaFileAlt,
  FaUser,
  FaEnvelope,
  FaChartBar,
  FaClock,
  FaCog
} from 'react-icons/fa';

import Arquivos from './Arquivos';
import Desempenho from './Desempenho';
import Configuracoes from './Configuracoes';
import Perfil from './Perfil';
import Mensagens from './Mensagens';
import NovaSolicitacao from './NovaSolicitacao';
import VacationRequest from './VacationRequest';

const DashboardColaborador = () => {
  const [menuSelecionado, setMenuSelecionado] = useState(null);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const nomesMenu = {
    solicitacoes: 'SOLICITAÇÕES',
    avisos: 'COMUNICADOS',
    ferias: 'FÉRIAS',
    dashboard: 'DASHBOARD',
    arquivos: 'ARQUIVOS',
    perfil: 'PERFIL',
    mensagens: 'MENSAGENS',
    desempenho: 'DESEMPENHO',
    historico: 'HISTÓRICO',
    configuracoes: 'CONFIGURAÇÕES',
  };

  const iconesMenu = [
    { id: 'solicitacoes', icon: <FaClipboardList className="icon" /> },
    { id: 'avisos', icon: <FaBullhorn className="icon" /> },
    { id: 'ferias', icon: <FaCalendarAlt className="icon" /> },
    { id: 'arquivos', icon: <FaFileAlt className="icon" /> },
    { id: 'perfil', icon: <FaUser className="icon" /> },
    { id: 'mensagens', icon: <FaEnvelope className="icon" /> },
    { id: 'desempenho', icon: <FaChartBar className="icon" /> },
    { id: 'historico', icon: <FaClock className="icon" /> },
    { id: 'configuracoes', icon: <FaCog className="icon" /> },
  ];

  const componentesMap = {
    arquivos: Arquivos,
    desempenho: Desempenho,
    configuracoes: Configuracoes,
    perfil: Perfil,
    mensagens: Mensagens,
    avisos: Mensagens,
    solicitacoes: NovaSolicitacao,
    ferias: VacationRequest,
  };

  const sidebarClass = menuSelecionado ? 'sidebar expandida' : 'sidebar contraida';

  useEffect(() => {
    const handleClickOutside = (event) => {
      const painel = document.querySelector('.painel-lateral');
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        (!painel || !painel.contains(event.target))
      ) {
        setMenuSelecionado(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuClick = (id) => {
    setMenuSelecionado(id);
  };

  const ComponenteSelecionado = componentesMap[menuSelecionado];

  return (
    <div className="dashboard-container">
      <aside ref={sidebarRef} className={sidebarClass}>
        <ul className="menu">
          {iconesMenu.map(({ id, icon }) => (
            <li key={id} onClick={() => handleMenuClick(id)}>
              {menuSelecionado === id ? (
                <span className="menu-label-box zoom-in">{nomesMenu[id]}</span>
              ) : (
                icon
              )}
            </li>
          ))}
        </ul>
      </aside>

      <main className="dashboard-content">
        <div className="boas-vindas">
          <h2>Bem-vindo, Bruno 👋</h2>
          <p>Esperamos que seu dia seja produtivo e tranquilo!</p>
        </div>

        {menuSelecionado === 'ferias' && (
          <div className="card-solicitacao">
            <FaCalendarAlt className="icon-top" />
            <div className="solicitacoes-menu">
              <button onClick={() => navigate('/ferias')}>🏖️ Férias</button>
              <button onClick={() => navigate('/folga')}>💤 Folga</button>
              <button onClick={() => navigate('/abono')}>📄 Outros</button>
            </div>
          </div>
        )}

        {ComponenteSelecionado && (
          <div className="painel-lateral">
            <ComponenteSelecionado />
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardColaborador;