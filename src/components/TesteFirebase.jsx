import { useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { auth } from '../services/firebase';

export default function TesteFirebase() {
  useEffect(() => {
    const testarGravacao = async () => {
      const usuario = auth.currentUser;

      if (!usuario) {
        console.warn("Usuário não está logado.");
        return;
      }

      const dadosTeste = {
        userId: usuario.uid,
        criadoPor: usuario.displayName || "Teste",
        email: usuario.email || "teste@exemplo.com",
        tipo: "documentacao",
        motivo: "Teste de gravação",
        documento: "Documento de teste",
        data: Timestamp.now(),
        status: "pendente",
      };

      console.log("Enviando dados de teste:", dadosTeste);

      try {
        const docRef = await addDoc(collection(db, "solicitacoes"), dadosTeste);
        console.log("Documento criado com sucesso! ID:", docRef.id);
      } catch (error) {
        console.error("Erro ao gravar no Firestore:", error.message);
        console.error("Erro completo:", error);
      }
    };

    testarGravacao();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Teste de Gravação no Firebase</h2>
      <p>Abra o console do navegador para ver o resultado.</p>
    </div>
  );
}