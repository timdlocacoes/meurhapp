import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import BotaoVoltar from '../components/BotaoVoltar';

const AvisosColaborador = ({ colaboradorId }) => {
  const [avisos, setAvisos] = useState([]);

  const fetchAvisos = async () => {
    const snapshot = await getDocs(collection(db, 'avisos'));
    const lista = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(aviso =>
        aviso.destinatario === 'todos' || aviso.destinatario === colaboradorId
      );
    setAvisos(lista);
  };

  useEffect(() => {
    fetchAvisos();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <BotaoVoltar destino="/dashboard-colaborador" />
      <h2>Meus Avisos</h2>
      {avisos.length === 0 ? (
        <p>Você não possui avisos no momento.</p>
      ) : (
        avisos.map(aviso => (
          <div key={aviso.id} style={{ marginBottom: '1rem' }}>
            <h3>{aviso.titulo}</h3>
            <p>{aviso.conteudo}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AvisosColaborador;