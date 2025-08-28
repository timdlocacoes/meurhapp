import { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import BotaoVoltar from '../components/BotaoVoltar';

function LancamentoFolga() {
  const [formData, setFormData] = useState({
    colaborador: '',
    email: '',
    dataFolga: '',
    motivo: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'folgasConfirmadas'), {
        ...formData,
        lancadoPor: 'RH',
        dataLancamento: Timestamp.now(),
      });
      alert('Folga lançada com sucesso!');
      setFormData({
        colaborador: '',
        email: '',
        dataFolga: '',
        motivo: '',
      });
    } catch (error) {
      console.error('Erro ao lançar folga:', error);
      alert('Erro ao lançar folga');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <BotaoVoltar destino="/dashboard-rh" />
      <h2>Lançamento de Folga</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
        <input type="text" name="colaborador" placeholder="Nome do colaborador" value={formData.colaborador} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email do colaborador" value={formData.email} onChange={handleChange} required />
        <label>Data da Folga:</label>
        <input type="date" name="dataFolga" value={formData.dataFolga} onChange={handleChange} required />
        <textarea name="motivo" placeholder="Motivo da folga" value={formData.motivo} onChange={handleChange} />
        <button type="submit">Lançar Folga</button>
      </form>
    </div>
  );
}

export default LancamentoFolga;