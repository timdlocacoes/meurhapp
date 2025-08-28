import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import BotaoVoltar from '../components/BotaoVoltar';

function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'usuarios'));
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsuarios(lista);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const atualizarTipo = async (id, novoTipo) => {
    try {
      const ref = doc(db, 'usuarios', id);
      await updateDoc(ref, { tipoUsuario: novoTipo });
      setUsuarios(prev =>
        prev.map(user =>
          user.id === id ? { ...user, tipoUsuario: novoTipo } : user
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar tipo de usuário:', error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <BotaoVoltar destino="/dashboard-rh" />
      <h2>Gerenciar Usuários</h2>

      {usuarios.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Nome</th>
              <th style={th}>Email</th>
              <th style={th}>Tipo</th>
              <th style={th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td style={td}>{user.nome || '—'}</td>
                <td style={td}>{user.email}</td>
                <td style={td}>{user.tipoUsuario}</td>
                <td style={td}>
                  <select
                    value={user.tipoUsuario}
                    onChange={(e) => atualizarTipo(user.id, e.target.value)}
                  >
                    <option value="colaborador">Colaborador</option>
                    <option value="rh">RH</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = {
  borderBottom: '1px solid #ccc',
  padding: '0.5rem',
  textAlign: 'left',
};

const td = {
  borderBottom: '1px solid #eee',
  padding: '0.5rem',
};

export default GerenciarUsuarios;