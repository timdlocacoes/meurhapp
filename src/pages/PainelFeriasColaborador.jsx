import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import BotaoVoltar from '../components/BotaoVoltar';

function PainelFeriasColaborador() {
  const { user } = useAuth();
  const [ferias, setFerias] = useState([]);

  const fetchFerias = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'feriasConfirmadas'));
      const todas = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const minhas = todas.filter(item => item.email === user?.email);
      setFerias(minhas);
    } catch (error) {
      console.error('Erro ao buscar férias:', error);
    }
  };

  useEffect(() => {
    fetchFerias();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <BotaoVoltar destino="/dashboard-colaborador" />
      <h2>Minhas Férias Confirmadas</h2>

      {ferias.length === 0 ? (
        <p>Você ainda não possui férias lançadas.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {ferias.map((item) => (
            <li
              key={item.id}
              style={{
                marginBottom: '1rem',
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: '#e3f2fd',
              }}
            >
              <p><strong>Período:</strong> {item.inicio} até {item.fim}</p>
              <p><strong>Observações:</strong> {item.observacoes || 'Nenhuma'}</p>
              <p><strong>Lançado por:</strong> {item.lancadoPor || 'RH'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PainelFeriasColaborador;