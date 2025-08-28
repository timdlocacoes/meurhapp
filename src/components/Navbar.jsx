import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';
import { FaUserTie } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ correto

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao sair:', error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-group">
          <FaUserTie className="logo-icon" />
          <h1>Meu RH</h1>
        </div>
      </div>

      <div className="navbar-user">
        <span>Olá, {user?.displayName || 'Visitante'}</span>
      </div>

      <div className="navbar-links">
        <button onClick={() => navigate('/')}>Dashboard</button>
        <button onClick={() => navigate('/perfil')}>Perfil</button>
        <button onClick={() => navigate('/notificacoes')}>Notificações</button>
        <button onClick={handleLogout} className="logout">Sair</button>
      </div>
    </nav>
  );
}