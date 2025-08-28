import { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import BotaoVoltar from '../components/BotaoVoltar';

function LancamentoDocumentacao() {
  const [formData, setFormData] = useState({
    colaborador: '',
    email: '',
    documento: '',
    observacoes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'documentosEnviados'), {
        ...formData,
        lancadoPor: 'RH',
        dataLancamento: Timestamp.now(),
      });
      alert('Documento registrado com sucesso!');
      setFormData({
        colaborador: '',
        email: '',
        documento: '',
        observacoes: '',
      });
    } catch (error) {
      console.error('Erro ao registrar documento:', error);
      alert('Erro ao registrar documento');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <BotaoVoltar destino="/dashboard-rh" />
      <h2>Registro de Documentação Enviada</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
        <input type="text" name="colaborador" placeholder="Nome do colaborador" value={formData.colaborador} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email do colaborador" value={formData.email} onChange={handleChange} required />
        <input type="text" name="documento" placeholder="Tipo de documento" value={formData.documento} onChange={handleChange} required />
        <textarea name="observacoes" placeholder="Observações" value={formData.observacoes} onChange={handleChange} />
        <button type="submit">Registrar Documento</button>
      </form>
    </div>
  );
}

export default LancamentoDocumentacao;