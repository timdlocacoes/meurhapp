import { useState } from 'react';
import './FolgaRequest.css';
import { FaBed, FaPaperPlane, FaArrowLeft, FaUser, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function FolgaRequest() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    data: '',
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
      tipo: 'folga',
      motivo: formData.motivo,
      data: Timestamp.now(),
      status: 'pendente',
      dataFolga: formData.data,
    };

    try {
      await addDoc(collection(db, 'solicitacoes'), dadosSolicitacao);
      alert('Solicitação de folga enviada com sucesso!');
      navigate(-1);
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      alert('Erro ao enviar solicitação');
    }
  };

  return (
    <div className="folga-page">
      <div className="folga-card">
        <button className="btn-voltar" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Voltar
        </button>

        <div className="folga-header">
          <FaBed className="folga-icon" />
          <h2>Solicitação de Folga</h2>
        </div>

        <form onSubmit={handleSubmit} className="folga-form">
          <div className="folga-info">
            <p><FaUser className="icone-dado" /> {user?.displayName || 'Colaborador'}</p>
            <p><FaEnvelope className="icone-dado" /> {user?.email || 'email@empresa.com'}</p>
          </div>

          <label htmlFor="data">Data da Folga:</label>
          <input
            type="date"
            name="data"
            id="data"
            value={formData.data}
            onChange={handleChange}
            required
          />

          <label htmlFor="motivo">Motivo:</label>
          <textarea
            name="motivo"
            id="motivo"
            value={formData.motivo}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-enviar">
            Enviar Solicitação <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}