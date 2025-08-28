import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { FaArrowLeft } from 'react-icons/fa';

function LoginRh() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/dashboard-rh');
    } catch (error) {
      console.error('Erro ao logar:', error.message);
      alert('Email ou senha inválidos');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <button style={styles.btnVoltar} onClick={() => navigate(-1)}>
          <FaArrowLeft style={{ marginRight: '6px' }} />
          Voltar
        </button>

        <h2 style={styles.title}>Login - RH</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            style={styles.input}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>Entrar</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(to right, #1e3c72, #2a5298)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  btnVoltar: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#2a5298',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '16px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  title: {
    marginBottom: '24px',
    color: '#2a5298',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#2a5298',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default LoginRh;