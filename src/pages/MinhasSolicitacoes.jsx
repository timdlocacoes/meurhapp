import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth'; // ajuste o caminho se necessário
import BotaoVoltar from '../components/BotaoVoltar';

function MinhasSolicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    const buscarSolicitacoes = async () => {
      try {
        const solicitacoesRef = collection(db, 'solicitacoes');
        const q = query(solicitacoesRef, where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const dados = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSolicitacoes(dados);
      } catch (erro) {
        console.error('Erro ao buscar solicitações:', erro);
      }
    };

    if (user?.uid) {
      buscarSolicitacoes();
    }
  }, [user]);

  const formatarData = (timestamp) => {
    return timestamp?.toDate().toLocaleDateString('pt-BR');
  };

  if (loading) {
    return <p>Carregando solicitações...</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <BotaoVoltar destino="/dashboard-colaborador" />

      <h2>Minhas Solicitações</h2>
      <p>Veja abaixo suas solicitações registradas:</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {solicitacoes.map((item) => (
          <li key={item.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <strong>Tipo:</strong> {item.tipo} <br />
            <strong>Status:</strong> {item.status} <br />
            <strong>Data:</strong> {formatarData(item.data)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MinhasSolicitacoes;