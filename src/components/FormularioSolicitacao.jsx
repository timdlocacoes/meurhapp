import React, { useState } from 'react';
import { db } from "../services/firebase";
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from "../hooks/useAuth";

const FormularioSolicitacao = () => {
  const [form, setForm] = useState({
    tipo: '',
    data: '',
    motivo: '',
  });

  const [mensagem, setMensagem] = useState("");
  const { user } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviarSolicitacao = async (e) => {
    e.preventDefault();
    setMensagem("");

    if (!form.tipo || !form.data || !form.motivo) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    if (!user) {
      setMensagem("Você precisa estar logado para enviar uma solicitação.");
      return;
    }

    const novaSolicitacao = {
      tipo: form.tipo,
      data: Timestamp.fromDate(new Date(form.data)),
      motivo: form.motivo,
      status: 'pendente',
      criadoPor: user.email,
      criadoEm: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, 'solicitacoes'), novaSolicitacao);
      setMensagem("Solicitação enviada com sucesso!");
      setForm({ tipo: '', data: '', motivo: '' });
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setMensagem("Erro ao enviar solicitação.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Enviar Solicitação</h2>
      <form onSubmit={enviarSolicitacao} style={{ maxWidth: '400px' }}>
        <label>Tipo:</label>
        <select name="tipo" value={form.tipo} onChange={handleChange} style={{ width: '100%', marginBottom: '10px' }}>
          <option value="">Selecione</option>
          <option value="Folga">Folga</option>
          <option value="Férias">Férias</option>
          <option value="Home Office">Home Office</option>
          <option value="Outro">Outro</option>
        </select>

        <label>Data:</label>
        <input type="date" name="data" value={form.data} onChange={handleChange} style={{ width: '100%', marginBottom: '10px' }} />

        <label>Motivo:</label>
        <textarea name="motivo" value={form.motivo} onChange={handleChange} rows="3" style={{ width: '100%', marginBottom: '10px' }} />

        <button type="submit" style={{ backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', width: '100%' }}>
          📤 Enviar Solicitação
        </button>
      </form>

      {mensagem && <p style={{ marginTop: "1rem", color: "green" }}>{mensagem}</p>}
    </div>
  );
};

export default FormularioSolicitacao;