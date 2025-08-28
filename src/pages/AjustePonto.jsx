import { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import BotaoVoltar from '../components/BotaoVoltar';
import './AjustePonto.css';

export default function AjustePonto() {
  const { user } = useAuth();
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data || !horario || !motivo) {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      await addDoc(collection(db, 'solicitacoes'), {
        tipo: 'ajuste-ponto',
        criadoPor: user.displayName,
        userId: user.uid,
        email: user.email,
        dataSolicitada: data,
        horario: horario,
        motivo: motivo,
        status: 'pendente',
        data: Timestamp.now(),
      });

      alert('Solicitação enviada com sucesso!');
      setData('');
      setHorario('');
      setMotivo('');
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      alert('Erro ao enviar solicitação.');
    }
  };

  return (
    <div className="ajuste-ponto-card">
      <BotaoVoltar destino="/solicitacao" />
      <h2>Solicitação de Ajuste de Ponto</h2>

      <form onSubmit={handleSubmit} className="form-ajuste-ponto">
        <label>Data do ajuste:</label>
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />

        <label>Horário correto:</label>
        <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} required />

        <label>Motivo do ajuste:</label>
        <textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} required />

        <button type="submit">Enviar Solicitação</button>
      </form>
    </div>
  );
}