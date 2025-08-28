import { useState } from 'react';
import './DocumentacaoRequest.css';
import { FaFileAlt, FaPaperPlane, FaArrowLeft, FaUser, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function DocumentacaoRequest() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tipoDocumento: '',
    motivo: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.nome || !user.email) {
      alert("Dados do usuário não disponíveis. Faça login novamente.");
      return;
    }

    if (!formData.tipoDocumento || !formData.motivo) {
      alert("Preencha todos os campos");
      return;
    }

    const dadosSolicitacao = {
      userId: user.uid, // 👈 necessário para validação nas regras
      criadoPor: user.nome,
      email: user.email,
      tipo: 'documentacao',
      motivo: formData.motivo,
      documento: formData.tipoDocumento,
      data: Timestamp.now(),
      status: 'pendente',
    };

    console.log("Dados enviados:", {
      uid: user.uid,
      tipoUsuario: user.tipoUsuario,
      ...dadosSolicitacao
    });

    console.log("Firestore está pronto?", db);
    console.log("Dados da solicitação:", dadosSolicitacao);

    try {
      await addDoc(collection(db, 'solicitacoes'), dadosSolicitacao);
      alert('Solicitação de documentação enviada com sucesso!');
      navigate(-1);
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error.message);
      console.error('Erro completo:', error);
      alert('Erro ao enviar solicitação');
    }
  };

  console.log("Documento criado com sucesso!");
  console.log("Estado do Auth:", { user, loading });

  if (loading) {
    return (
      <div className="documentacao-page">
        <div className="documentacao-card">
          <p>Carregando dados do usuário...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="documentacao-page">
        <div className="documentacao-card">
          <p>Usuário não autenticado. Faça login novamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="documentacao-page">
      <div className="documentacao-card">
        <button className="btn-voltar" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Voltar
        </button>

        <div className="documentacao-header">
          <FaFileAlt className="documentacao-icon" />
          <h2>Solicitação de Documentação</h2>
        </div>

        <form onSubmit={handleSubmit} className="documentacao-form">
          <div className="documentacao-info">
            <p><FaUser className="icone-dado" /> {user.nome}</p>
            <p><FaEnvelope className="icone-dado" /> {user.email}</p>
          </div>

          <label htmlFor="tipoDocumento">Tipo de Documento:</label>
          <input
            type="text"
            name="tipoDocumento"
            id="tipoDocumento"
            value={formData.tipoDocumento}
            onChange={handleChange}
            placeholder="Ex: Declaração de vínculo"
            required
          />

          <label htmlFor="motivo">Motivo:</label>
          <textarea
            name="motivo"
            id="motivo"
            value={formData.motivo}
            onChange={handleChange}
            placeholder="Descreva o motivo da solicitação"
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