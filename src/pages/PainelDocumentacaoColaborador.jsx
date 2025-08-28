import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import BotaoVoltar from '../components/BotaoVoltar';

function PainelDocumentacaoColaborador() {
  const { user } = useAuth();
  const [documentos, setDocumentos] = useState([]);

  const fetchDocumentos = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'documentosEnviados'));
      const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const meus = todos.filter(item => item.email === user?.email);
      setDocumentos(meus);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <BotaoVoltar destino="/dashboard-colaborador" />
      <h2>📄 Documentos Recebidos</h2>

      {documentos.length === 0 ? (
        <p>Você ainda não possui documentos registrados.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {documentos.map((item) => (
            <li key={item.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', backgroundColor: '#e3f2fd' }}>
              <p><strong>Documento:</strong> {item.documento}</p>
              <p><strong>Observações:</strong> {item.observacoes || 'Nenhuma'}</p>
              <p><strong>Enviado por:</strong> {item.lancadoPor || 'RH'}</p>
              <p><strong>Data de envio:</strong> {item.dataLancamento?.toDate().toLocaleDateString() || '—'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PainelDocumentacaoColaborador;