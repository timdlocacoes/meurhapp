import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const categorias = [
  'Contrato de Trabalho',
  'Política da Empresa',
  'Holerite',
  'Escala',
  'Aviso Interno',
];

const ArquivosRH = () => {
  const navigate = useNavigate();
  const [arquivos, setArquivos] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarArquivos();
    buscarColaboradores();
  }, []);

  const buscarArquivos = async () => {
    try {
      const response = await axios.get('https://seu-endpoint.com/api/arquivos');
      setArquivos(response.data);
    } catch (error) {
      console.error('Erro ao buscar arquivos:', error);
    } finally {
      setCarregando(false);
    }
  };

  const buscarColaboradores = async () => {
    try {
      const response = await axios.get('https://seu-endpoint.com/api/colaboradores');
      setColaboradores(response.data);
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error);
    }
  };

  const handleUpload = async () => {
    if (!arquivoSelecionado || !categoriaSelecionada || !colaboradorSelecionado) {
      alert('Preencha todos os campos antes de enviar.');
      return;
    }

    const formData = new FormData();
    formData.append('arquivo', arquivoSelecionado);
    formData.append('categoria', categoriaSelecionada);
    formData.append('colaboradorId', colaboradorSelecionado);

    try {
      await axios.post('https://seu-endpoint.com/api/arquivos', formData);
      buscarArquivos();
      setArquivoSelecionado(null);
      setCategoriaSelecionada('');
      setColaboradorSelecionado('');
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
    }
  };

  const handleExcluir = async (id) => {
    if (!window.confirm('Deseja realmente excluir este arquivo?')) return;
    try {
      await axios.delete(`https://seu-endpoint.com/api/arquivos/${id}`);
      setArquivos((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error('Erro ao excluir arquivo:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        🔙 Voltar
      </button>

      <h2 style={{ marginBottom: '1rem' }}>📁 Enviar Documento para Colaborador</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <select
          value={colaboradorSelecionado}
          onChange={(e) => setColaboradorSelecionado(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px' }}
        >
          <option value="">Selecione o colaborador</option>
          {colaboradores.map((colab) => (
            <option key={colab.id} value={colab.id}>
              {colab.nome}
            </option>
          ))}
        </select>

        <select
          value={categoriaSelecionada}
          onChange={(e) => setCategoriaSelecionada(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px' }}
        >
          <option value="">Selecione a categoria</option>
          {categorias.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input type="file" onChange={(e) => setArquivoSelecionado(e.target.files[0])} />
        <button
          onClick={handleUpload}
          style={{
            marginLeft: '1rem',
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          📤 Enviar
        </button>
      </div>

      <h3 style={{ marginTop: '2rem' }}>📚 Arquivos Enviados</h3>

      {carregando ? (
        <p>Carregando arquivos...</p>
      ) : arquivos.length === 0 ? (
        <p>Nenhum arquivo enviado ainda.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '8px', border: '1px solid #ccc' }}>Nome</th>
              <th style={{ padding: '8px', border: '1px solid #ccc' }}>Categoria</th>
              <th style={{ padding: '8px', border: '1px solid #ccc' }}>Colaborador</th>
              <th style={{ padding: '8px', border: '1px solid #ccc' }}>Data</th>
              <th style={{ padding: '8px', border: '1px solid #ccc' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {arquivos.map((arquivo) => (
              <tr key={arquivo.id}>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>
                  <a href={arquivo.url} target="_blank" rel="noopener noreferrer">
                    {arquivo.nome}
                  </a>
                </td>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>{arquivo.categoria}</td>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>{arquivo.nomeColaborador}</td>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>
                  {new Date(arquivo.dataCriacao).toLocaleDateString()}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>
                  <button
                    onClick={() => handleExcluir(arquivo.id)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    🗑️ Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ArquivosRH;