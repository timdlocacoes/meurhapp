import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import BotaoVoltar from '../components/BotaoVoltar';
import './Mensagens.css';

const Mensagens = () => {
  const [avisos, setAvisos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [destinatario, setDestinatario] = useState('todos');
  const [colaboradores, setColaboradores] = useState([]);
  const [busca, setBusca] = useState('');

  // Buscar avisos existentes
  const fetchAvisos = async () => {
    const snapshot = await getDocs(collection(db, 'avisos'));
    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAvisos(lista);
  };

  // Buscar lista de colaboradores
  const fetchColaboradores = async () => {
    const snapshot = await getDocs(collection(db, 'colaboradores'));
    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      nome: doc.data().nome || 'Sem nome',
    }));
    setColaboradores(lista);
  };

  useEffect(() => {
    fetchAvisos();
    fetchColaboradores();
  }, []);

  // Publicar novo aviso
  const handlePublicar = async () => {
    if (!titulo || !conteudo) return;

    await addDoc(collection(db, 'avisos'), {
      titulo,
      conteudo,
      criadoEm: Timestamp.now(),
      destinatario: destinatario || 'todos',
    });

    setTitulo('');
    setConteudo('');
    setDestinatario('todos');
    setBusca('');
    fetchAvisos();
  };

  // Excluir aviso
  const handleExcluir = async (id) => {
    await deleteDoc(doc(db, 'avisos', id));
    fetchAvisos();
  };

  // Filtrar colaboradores por nome digitado
  const colaboradoresFiltrados = colaboradores.filter(colab =>
    colab.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="mensagens-container">
      <BotaoVoltar destino="/dashboard-rh" />

      <h1>Gerenciar Avisos</h1>

      <div className="form-aviso">
        <input
          type="text"
          placeholder="Título do aviso"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Conteúdo do aviso"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
        />

        <div className="destinatario-opcoes">
          <label>
            <input
              type="radio"
              name="destino"
              value="todos"
              checked={destinatario === 'todos'}
              onChange={() => {
                setDestinatario('todos');
                setBusca('');
              }}
            />
            Enviar para todos
          </label>

          <label>
            <input
              type="radio"
              name="destino"
              value="individual"
              checked={destinatario !== 'todos'}
              onChange={() => setDestinatario('')}
            />
            Enviar para colaborador específico
          </label>
        </div>

        {destinatario !== 'todos' && (
          <>
            <input
              type="text"
              placeholder="Buscar colaborador"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />

            <ul className="lista-sugestoes">
              {colaboradoresFiltrados.map((colab) => (
                <li
                  key={colab.id}
                  onClick={() => {
                    setDestinatario(colab.id);
                    setBusca(colab.nome);
                  }}
                >
                  {colab.nome}
                </li>
              ))}
            </ul>
          </>
        )}

        <button onClick={handlePublicar}>Publicar Aviso</button>
      </div>

      <div className="lista-avisos">
        <h2>Avisos Publicados</h2>
        {avisos.length === 0 ? (
          <p>Nenhum aviso publicado ainda.</p>
        ) : (
          avisos.map((aviso) => (
            <div key={aviso.id} className="aviso-card">
              <h3>{aviso.titulo}</h3>
              <p>{aviso.conteudo}</p>
              <p>
                <strong>Destinatário:</strong>{' '}
                {aviso.destinatario === 'todos'
                  ? 'Todos os colaboradores'
                  : `ID: ${aviso.destinatario}`}
              </p>
              <button onClick={() => handleExcluir(aviso.id)}>Excluir</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Mensagens;