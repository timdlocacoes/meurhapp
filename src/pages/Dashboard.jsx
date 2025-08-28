import React, { useEffect, useState } from 'react';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const dados = docSnap.data();
          setUsuario({
            uid: user.uid,
            email: user.email,
            nome: dados.nome,
            tipo: dados.tipo,
          });
        }
      } else {
        navigate('/login'); // redireciona se não estiver logado
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!usuario) {
    return (
      <div style={styles.container}>
        <h2>Carregando dados do usuário...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Bem-vindo, {usuario.nome}!</h2>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Tipo de usuário:</strong> {usuario.tipo}</p>
      <p><strong>ID:</strong> {usuario.uid}</p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#e6f0ff',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
};

export default Dashboard;