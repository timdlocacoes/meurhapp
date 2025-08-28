import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import BotaoVoltar from '../components/BotaoVoltar';

function PainelFolgaColaborador() {
  const { user } = useAuth();
  const [folgas, setFolgas] = useState([]);

  const fetchFolgas = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'folgasConfirmadas'));
      const todas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const minhas = todas.filter(item => item.email === user?.email);
      setFolgas(minhas);
    } catch (error) {
      console.error('Erro ao buscar folgas:', error);
    }
  };

  useEffect(() => {
    fetchFolgas();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <BotaoVoltar destino="/dashboard-colaborador" />
      <h2>Minhas Folgas Confirmadas</h2>

      {folgas.length === 0 ? (
        <p>Você ainda não possui folgas lançadas.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {folgas.map((item) => (
            <li key={item.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', backgroundColor: '#fff3e0' }}>
              <p><strong>Data da Folga:</strong> {item.dataFolga}</p>
              <p><strong>Motivo:</strong> {item.motivo || 'Nenhum'}</p>
              <p><strong>Lançado por:</strong> {item.lancadoPor || 'RH'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PainelFolgaColaborador;