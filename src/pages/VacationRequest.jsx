import { useState } from 'react';
import './VacationRequest.css';
import { FaCalendarAlt, FaPaperPlane, FaArrowLeft, FaUser, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function VacationRequest() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    inicio: '',
    fim: '',
    motivo: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosSolicitacao = {
      criadoPor: user?.displayName || 'Colaborador',
      email: user?.email || '',
      tipo: 'ferias',
      motivo: formData.motivo,
      data: Timestamp.now(),
      status: 'pendente',
      inicio: formData.inicio,
      fim: formData.fim,
    };

    try {
      await addDoc(collection(db, 'solicitacoes'), dadosSolicitacao);
      alert('Solicitação de férias enviada com sucesso!');
      navigate(-1);
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      alert('Erro ao enviar solicitação');
    }
  };

  return (
    <div className="vacation-page">
      <div className="vacation-card">
        <button className="btn-voltar" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Voltar
        </button>

        <div className="vacation-header">
          <FaCalendarAlt className="vacation-icon" />
          <h2>Solicitação de Férias</h2>
        </div>

        <form onSubmit={handleSubmit} className="vacation-form">
          <div className="vacation-info">
            <p><FaUser className="icone-dado" /> {user?.displayName || 'Colaborador'}</p>
            <p><FaEnvelope className="icone-dado" /> {user?.email || 'email@empresa.com'}</p>
          </div>

          <label htmlFor="inicio">Data de Início:</label>
          <input
            type="date"
            name="inicio"
            id="inicio"
            value={formData.inicio}
            onChange={handleChange}
            required
          />

          <label htmlFor="fim">Data de Término:</label>
          <input
            type="date"
            name="fim"
            id="fim"
            value={formData.fim}
            onChange={handleChange}
            required
          />

          <label htmlFor="motivo">Motivo (opcional):</label>
          <textarea
            name="motivo"
            id="motivo"
            value={formData.motivo}
            onChange={handleChange}
          />

          <button type="submit" className="btn-enviar">
            Enviar Solicitação <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}