import { useState } from 'react';

function AbonoRequest() {
  const [formData, setFormData] = useState({
    nome: '',
    data: '',
    justificativa: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Solicitação de abono enviada:', formData);
    alert('Solicitação de abono enviada com sucesso!');
  };

  return (
    <div style={styles.container}>
      <h2>Solicitação de Abono</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Nome:</label>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />

        <label>Data do Abono:</label>
        <input type="date" name="data" value={formData.data} onChange={handleChange} required />

        <label>Justificativa:</label>
        <textarea name="justificativa" value={formData.justificativa} onChange={handleChange} required />

        <button type="submit">Enviar Solicitação</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    fontFamily: 'Arial',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
};

export default AbonoRequest;