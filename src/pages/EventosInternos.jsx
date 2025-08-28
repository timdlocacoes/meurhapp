import React, { useEffect, useState } from 'react';
import './EventosInternos.css'; // Estilo separado
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventosInternos = () => {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const buscarEventos = async () => {
      try {
        const response = await axios.get('https://seu-endpoint.com/api/eventos');
        setEventos(response.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    buscarEventos();
  }, []);

  return (
    <div className="eventos-container">
      <button className="voltar-btn" onClick={() => navigate(-1)}>🔙 Voltar</button>
      <h1 className="titulo">📅 Eventos Internos</h1>

      {eventos.length === 0 ? (
        <p className="vazio">Nenhum evento disponível no momento.</p>
      ) : (
        <div className="eventos-grid">
          {eventos.map((evento) => (
            <div key={evento.id} className="evento-card">
              <img src={evento.imagemUrl} alt={evento.titulo} className="evento-img" />
              <div className="evento-info">
                <h2>{evento.titulo}</h2>
                <p className="data">{new Date(evento.data).toLocaleDateString()}</p>
                <p>{evento.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventosInternos;