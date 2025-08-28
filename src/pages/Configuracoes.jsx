// src/pages/Configuracoes.jsx
import React, { useState } from 'react';
import './Configuracoes.css'; // opcional para estilizar

const Configuracoes = () => {
  const [notificacoes, setNotificacoes] = useState(true);
  const [tema, setTema] = useState('claro');

  return (
    <div className="config-container">
      <h2>⚙️ Configurações</h2>

      <section className="config-section">
        <h3>Perfil</h3>
        <button>Editar Informações</button>
        <button>Alterar Senha</button>
      </section>

      <section className="config-section">
        <h3>Notificações</h3>
        <label>
          <input
            type="checkbox"
            checked={notificacoes}
            onChange={() => setNotificacoes(!notificacoes)}
          />
          Receber notificações por e-mail
        </label>
      </section>

      <section className="config-section">
        <h3>Tema</h3>
        <select value={tema} onChange={(e) => setTema(e.target.value)}>
          <option value="claro">Claro</option>
          <option value="escuro">Escuro</option>
        </select>
      </section>
    </div>
  );
};

export default Configuracoes;