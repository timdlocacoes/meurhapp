import React, { useState } from 'react';
import './Perfil.css';
import {
  FaUser, FaEnvelope, FaBriefcase, FaCalendarAlt,
  FaIdBadge, FaBuilding, FaEdit, FaTimes
} from 'react-icons/fa';

const Perfil = () => {
  const [colaborador, setColaborador] = useState({
    nome: 'Bruno Oliveira',
    email: 'bruno.oliveira@empresa.com',
    cargo: 'Analista de RH',
    matricula: 'EMP123456',
    setor: 'Recursos Humanos',
    tempoEmpresa: '2 anos e 4 meses',
    foto: 'https://i.pravatar.cc/'
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [formData, setFormData] = useState(colaborador);
  const [previewFoto, setPreviewFoto] = useState(colaborador.foto);

  const abrirModal = () => {
    setFormData(colaborador);
    setPreviewFoto(colaborador.foto);
    setModalAberto(true);
  };

  const fecharModal = () => setModalAberto(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const salvarAlteracoes = () => {
    setColaborador(formData);
    fecharModal();
  };

  return (
    <div className="perfil-container">
      <h2 className="perfil-boasvindas">👋 Bem-vindo, {colaborador.nome}</h2>
      <p className="perfil-msg">Esperamos que seu dia seja produtivo e tranquilo!</p>

      <div className="perfil-card">
        <div className="perfil-foto">
          <img src={colaborador.foto} alt="Foto do colaborador" />
        </div>

        <div className="perfil-info">
          <div><FaUser /> <strong>Nome:</strong> {colaborador.nome}</div>
          <div><FaEnvelope /> <strong>Email:</strong> {colaborador.email}</div>
          <div><FaBriefcase /> <strong>Cargo:</strong> {colaborador.cargo}</div>
          <div><FaIdBadge /> <strong>Matrícula:</strong> {colaborador.matricula}</div>
          <div><FaBuilding /> <strong>Setor:</strong> {colaborador.setor}</div>
          <div><FaCalendarAlt /> <strong>Tempo de Empresa:</strong> {colaborador.tempoEmpresa}</div>
        </div>

        <button className="perfil-editar" onClick={abrirModal}>
          <FaEdit /> Editar Perfil
        </button>
      </div>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-fechar" onClick={fecharModal}><FaTimes /></button>
            <h3>Editar Perfil</h3>
            <div className="modal-form">
              {Object.keys(formData).map((campo) => (
                campo !== 'foto' && (
                  <label key={campo}>
                    {campo.charAt(0).toUpperCase() + campo.slice(1)}:
                    <input
                      type="text"
                      name={campo}
                      value={formData[campo]}
                      onChange={handleChange}
                    />
                  </label>
                )
              ))}

              <label>
                Foto de Perfil:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setPreviewFoto(url);
                      setFormData({ ...formData, foto: url });
                    }
                  }}
                />
              </label>

              <div className="preview-foto">
                <img src={previewFoto} alt="Pré-visualização" />
              </div>

              <button className="modal-salvar" onClick={salvarAlteracoes}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;