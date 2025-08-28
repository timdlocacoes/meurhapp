import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import BotaoVoltar from '../components/BotaoVoltar';
import './SolicitacoesRH.css';

// ...imports permanecem os mesmos

function SolicitacoesRH() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState('');
  const [buscaNome, setBuscaNome] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [detalhesAbertos, setDetalhesAbertos] = useState({});
  const [motivos, setMotivos] = useState({});
  const [acaoPendente, setAcaoPendente] = useState({});

  const fetchSolicitacoes = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'solicitacoes'));
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSolicitacoes(lista);
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error);
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  const iniciarAcao = (id, tipo) => {
    setAcaoPendente({ id, tipo });
    setMotivos((prev) => ({ ...prev, [id]: '' }));
  };

  const confirmarAcao = async () => {
    const { id, tipo } = acaoPendente;
    const motivo = motivos[id];

    if (!motivo.trim()) return;

    try {
      const ref = doc(db, 'solicitacoes', id);
      await updateDoc(ref, {
        status: tipo,
        motivoDecisao: motivo,
      });

      setSolicitacoes((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: tipo, motivoDecisao: motivo } : item
        )
      );

      setAcaoPendente({});
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const formatarData = (timestamp) => {
    try {
      return timestamp?.toDate().toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  };

  const toggleDetalhes = (id) => {
    setDetalhesAbertos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const solicitacoesFiltradas = solicitacoes.filter((item) => {
    const statusOk = filtroStatus ? item.status === filtroStatus : true;
    const nomeOk = buscaNome ? item.criadoPor?.toLowerCase().includes(buscaNome.toLowerCase()) : true;
    const dataSolicitacao = item.data?.toDate?.();
    const inicio = dataInicial ? new Date(dataInicial) : null;
    const fim = dataFinal ? new Date(dataFinal) : null;
    const dataOk = (!inicio || dataSolicitacao >= inicio) && (!fim || dataSolicitacao <= fim);
    return statusOk && nomeOk && dataOk;
  });

  return (
    <div className="pagina-solicitacoes">
      <div className="container-flutuante">
        <BotaoVoltar destino="/dashboard-rh" />
        <h2>Solicitações Recebidas</h2>

        <div className="filtros">
          <label>
            Status:
            <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} className="input-estilizado">
              <option value="">Todos</option>
              <option value="pendente">Pendente</option>
              <option value="aprovado">Aprovado</option>
              <option value="rejeitado">Rejeitado</option>
            </select>
          </label>

          <label>
            Buscar por nome:
            <input
              type="text"
              value={buscaNome}
              onChange={(e) => setBuscaNome(e.target.value)}
              placeholder="Digite o nome"
              className="input-estilizado"
            />
          </label>

          <label>
            Data Inicial:
            <input
              type="date"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
              className="input-estilizado"
            />
          </label>

          <label>
            Data Final:
            <input
              type="date"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
              className="input-estilizado"
            />
          </label>
        </div>

        {solicitacoesFiltradas.length === 0 ? (
          <p>Nenhuma solicitação encontrada.</p>
        ) : (
          <ul className="lista-solicitacoes">
            {solicitacoesFiltradas.map((item) => {
              const status = item.status || 'pendente';
              const aberto = detalhesAbertos[item.id];
              const classeCard = `card-solicitacao ${status}`;
              const estaEmAcao = acaoPendente.id === item.id;

              return (
                <li key={item.id} className={classeCard}>
                  <div className="cabecalho-card" onClick={() => toggleDetalhes(item.id)}>
                    <strong>{item.criadoPor || 'Colaborador'}</strong> — {status}
                    <span className="toggle-indicador">{aberto ? '▲' : '▼'}</span>
                  </div>

                  {aberto && (
                    <div className="detalhes-card">
                      <p><strong>Tipo:</strong> {item.tipo || 'Não informado'}</p>
                      <p><strong>Data:</strong> {formatarData(item.data)}</p>

                      {item.tipo === 'ajuste-ponto' ? (
                        <>
                          <p><strong>Data solicitada:</strong> {item.dataSolicitada || 'Não informado'}</p>
                          <p><strong>Horário correto:</strong> {item.horario || 'Não informado'}</p>
                          <p><strong>Motivo:</strong> {item.motivo || 'Não informado'}</p>
                        </>
                      ) : (
                        <p><strong>Motivo:</strong> {item.motivo || 'Não informado'}</p>
                      )}

                      {item.tipo === 'documentacao' && (
                        <p><strong>Documento:</strong> {item.documento || 'Não informado'}</p>
                      )}

                      {item.tipo === 'folga' && (
                        <p><strong>Data da Folga:</strong> {item.dataFolga || 'Não informado'}</p>
                      )}

                      {item.tipo === 'ferias' && (
                        <>
                          <p><strong>Início:</strong> {item.inicio || 'Não informado'}</p>
                          <p><strong>Fim:</strong> {item.fim || 'Não informado'}</p>
                        </>
                      )}

                      <p><strong>Status:</strong> {status}</p>
                      {item.motivoDecisao && (
                        <p><strong>Motivo da decisão:</strong> {item.motivoDecisao}</p>
                      )}

                      {status === 'pendente' && !estaEmAcao && (
                        <div className="botoes-acao">
                          <button onClick={() => iniciarAcao(item.id, 'aprovado')}>✅ Aprovar</button>
                          <button onClick={() => iniciarAcao(item.id, 'rejeitado')}>❌ Rejeitar</button>
                        </div>
                      )}

                      {estaEmAcao && (
                        <div className="acao-motivo">
                          <textarea
                            placeholder={`Motivo da ${acaoPendente.tipo === 'aprovado' ? 'aprovação' : 'rejeição'} (obrigatório)`}
                            value={motivos[item.id]}
                            onChange={(e) => setMotivos((prev) => ({ ...prev, [item.id]: e.target.value }))}
                            className="input-estilizado"
                          />
                          <button
                            onClick={confirmarAcao}
                            disabled={!motivos[item.id]?.trim()}
                          >
                            Confirmar {acaoPendente.tipo === 'aprovado' ? '✅' : '❌'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SolicitacoesRH;