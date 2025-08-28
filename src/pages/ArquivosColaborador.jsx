import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ArquivosColaborador = () => {
  const navigate = useNavigate();
  const [arquivos, setArquivos] = useState([]);

  useEffect(() => {
    const fetchArquivos = async () => {
      try {
        const response = await axios.get('https://seu-endpoint.com/api/arquivos');
        setArquivos(response.data);
      } catch (error) {
        console.error('Erro ao buscar arquivos:', error);
      }
    };

    fetchArquivos();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        🔙 Voltar
      </button>

      <h2>Meus Arquivos</h2>
      <ul>
        {arquivos.map((arquivo) => (
          <li key={arquivo.id}>
            <a href={arquivo.url} target="_blank" rel="noopener noreferrer">
              {arquivo.nome}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArquivosColaborador;