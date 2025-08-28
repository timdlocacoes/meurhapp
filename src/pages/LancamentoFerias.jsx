import { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import BotaoVoltar from '../components/BotaoVoltar';

function LancamentoFerias() {
  const [formData, setFormData] = useState({
    colaborador: '',
    email: '',
    inicio: '',
    fim: '',
    observacoes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'feriasConfirmadas'), {
        ...formData,
        lancadoPor: 'RH',
        dataLancamento: Timestamp.now(),
      });
      alert('Férias lançadas com sucesso!');
      setFormData({
        colaborador: '',
        email: '',
        inicio: '',
        fim: '',
        observacoes: '',
      });
    } catch (error) {
      console.error('Erro ao lançar férias:', error);
      alert('Erro ao lançar férias');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <BotaoVoltar destino="/dashboard-rh" />
      <h2>Lançamento de Férias</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
        <input
          type="text"
          name="colaborador"
          placeholder="Nome do colaborador"
          value={formData.colaborador}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email do colaborador"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Data de Início:</label>
        <input
          type="date"
          name="inicio"
          value={formData.inicio}
          onChange={handleChange}
          required
        />
        <label>Data de Término:</label>
        <input
          type="date"
          name="fim"
          value={formData.fim}
          onChange={handleChange}
          required
        />
        <textarea
          name="observacoes"
          placeholder="Observações"
          value={formData.observacoes}
          onChange={handleChange}
        />
        <button type="submit">Lançar Férias</button>
      </form>
    </div>
  );
}

export default LancamentoFerias;