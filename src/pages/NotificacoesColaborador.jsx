import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import BotaoVoltar from '../components/BotaoVoltar';

function NotificacoesColaborador() {
  const { user } = useAuth();
  const [notificacoes, setNotificacoes] = useState([]);

  const fetchNotificacoes = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'solicitacoes'));
      const todas = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const minhas = todas.filter(
        item =>
          item.email === user?.email &&
          item.status &&
          item.status !== 'pendente'
      );

      setNotificacoes(minhas);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    }
  };

  useEffect(() => {
    fetchNotificacoes();
  }, []);

  const gerarMensagem = (item) => {
    const tipo = item.tipo;
    const status = item.status;

    if (status === 'aprovado') {
      if (tipo === 'ferias') return 'Sua solicitação de férias foi aprovada. Consulte o painel de férias.';
      if (tipo === 'folga') return 'Sua solicitação de folga foi aprovada.';
      if (tipo === 'documentacao') return `Sua solicitação de "${item.documento}" foi aprovada. Aguarde retorno do RH.`;
    }

    if (status === 'rejeitado') {
      return `Sua solicitação de ${tipo} foi rejeitada.`;
    }

    return 'Solicitação atualizada.';
  };

  return (
    <div style={{ padding: '1rem' }}>
      <BotaoVoltar destino="/dashboard-colaborador" />
      <h2>Minhas Notificações</h2>

      {notificacoes.length === 0 ? (
        <p>Você não possui notificações no momento.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notificacoes.map((item) => (
            <li
              key={item.id}
              style={{
                marginBottom: '1rem',
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor:
                  item.status === 'aprovado' ? '#e8f5e9' :
                  item.status === 'rejeitado' ? '#ffebee' :
                  '#fff',
              }}
            >
              <p><strong>Tipo:</strong> {item.tipo}</p>
              <p><strong>Status:</strong> {item.status}</p>
              <p>{gerarMensagem(item)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotificacoesColaborador;