import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase'; // ajuste o caminho se necessário
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

const AprovacaoRH = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);

  // 🔄 Buscar dados do Firestore
  useEffect(() => {
    const fetchSolicitacoes = async () => {
      const querySnapshot = await getDocs(collection(db, 'solicitacoes'));
      const dados = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSolicitacoes(dados);
    };

    fetchSolicitacoes();
  }, []);

  // ✅ Salvar nova solicitação de exemplo
  const salvarSolicitacao = async () => {
    const nova = {
      nome: 'Bruno Oliveira',
      tipo: 'Folga',
      data: '2025-09-10',
      motivo: 'Consulta médica',
      status: 'Pendente',
    };

    await addDoc(collection(db, 'solicitacoes'), nova);
    alert('Solicitação salva com sucesso!');

    // Atualiza a lista local
    setSolicitacoes((prev) => [...prev, { ...nova, id: Date.now().toString() }]);
  };

  // 🔁 Atualizar status da solicitação
  const atualizarStatus = async (id, novoStatus) => {
    const ref = doc(db, 'solicitacoes', id);
    await updateDoc(ref, { status: novoStatus });

    setSolicitacoes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: novoStatus } : s))
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Aprovação de Solicitações</h2>

      <button onClick={salvarSolicitacao} style={{ marginBottom: '20px' }}>
        ➕ Salvar exemplo no banco
      </button>

      <h3>Solicitações existentes:</h3>
      {solicitacoes.length > 0 ? (
        solicitacoes.map((s) => (
          <div
            key={s.id}
            style={{
              border: '1px solid #ccc',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            <p><strong>Nome:</strong> {s.nome}</p>
            <p><strong>Tipo:</strong> {s.tipo}</p>
            <p><strong>Data:</strong> {s.data}</p>
            <p><strong>Motivo:</strong> {s.motivo}</p>
            <p><strong>Status:</strong> {s.status}</p>

            {s.status === 'Pendente' && (
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => atualizarStatus(s.id, 'Aprovado')}
                  style={{ marginRight: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px' }}
                >
                  ✅ Aprovar
                </button>
                <button
                  onClick={() => atualizarStatus(s.id, 'Rejeitado')}
                  style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px' }}
                >
                  ❌ Rejeitar
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Nenhuma solicitação encontrada.</p>
      )}
    </div>
  );
};

export default AprovacaoRH;