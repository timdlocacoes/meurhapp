import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import Navbar from './components/Navbar';
import AprovacaoRH from './components/AprovacaoRH';
import FormularioSolicitacao from './components/FormularioSolicitacao';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas
import Dashboard from './pages/Dashboard';
import DashboardRh from './pages/DashboardRh';
import DashboardColaborador from './pages/DashboardColaborador';
import VacationRequest from './pages/VacationRequest';
import NovaSolicitacao from './pages/NovaSolicitacao';
import AbonoRequest from './pages/AbonoRequest';
import FolgaRequest from './pages/FolgaRequest';
import DocumentacaoRequest from './pages/DocumentacaoRequest';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import EscolhaLogin from './pages/EscolhaLogin';
import LoginColaborador from './pages/LoginColaborador';
import LoginRh from './pages/LoginRh';
import Perfil from './pages/Perfil';
import Mensagens from './pages/Mensagens';
import Desempenho from './pages/Desempenho';
import Configuracoes from './pages/Configuracoes';
import Arquivos from './pages/Arquivos';
import AvisosColaborador from './pages/AvisosColaborador';
import EscalaColaborador from './pages/EscalaColaborador';
import HoleriteColaborador from './pages/HoleriteColaborador';
import SolicitacoesColaborador from './pages/SolicitacoesColaborador';
import DocumentosColaborador from './pages/DocumentosColaborador';
import SolicitacoesRH from './pages/SolicitacoesRH';
import MinhasSolicitacoes from './pages/MinhasSolicitacoes';
import EventosInternos from './pages/EventosInternos';
import Treinamentos from './pages/Treinamentos';
import Sugestoes from './pages/Sugestoes';
import GerenciarUsuarios from './pages/GerenciarUsuarios';
import AjustePonto from './pages/AjustePonto';

// Novas páginas de arquivos
import ArquivosColaborador from './pages/ArquivosColaborador';
import ArquivosRH from './pages/ArquivosRH';

// Novos painéis e lançamentos
import LancamentoFolga from './pages/LancamentoFolga';
import PainelFolgaColaborador from './pages/PainelFolgaColaborador';
import LancamentoDocumentacao from './pages/LancamentoDocumentacao';
import PainelDocumentacaoColaborador from './pages/PainelDocumentacaoColaborador';

// 🔧 Componente temporário para teste do Firebase (remover após validação)
import TesteFirebase from './components/TesteFirebase';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<Home />} />

        {/* Login e cadastro */}
        <Route path="/login" element={<EscolhaLogin />} />
        <Route path="/login-colaborador" element={<LoginColaborador />} />
        <Route path="/login-rh" element={<LoginRh />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Dashboard principal */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Dashboards específicos */}
        <Route path="/dashboard-rh" element={<ProtectedRoute role="rh"><DashboardRh /></ProtectedRoute>}/>
        <Route
          path="/dashboard-colaborador"
          element={
            <ProtectedRoute role="colaborador">
              <DashboardColaborador />
            </ProtectedRoute>
          }
        />

        {/* Página de arquivos genérica */}
        <Route
          path="/arquivos"
          element={
            <ProtectedRoute>
              <Arquivos />
            </ProtectedRoute>
          }
        />

        {/* Novas páginas de arquivos */}
        <Route
          path="/arquivos-colaborador"
          element={
            <ProtectedRoute role="colaborador">
              <ArquivosColaborador />
            </ProtectedRoute>
          }
        />
        <Route
          path="/arquivos-rh"
          element={
            <ProtectedRoute role="rh">
              <ArquivosRH />
            </ProtectedRoute>
          }
        />

        {/* Funcionalidades */}
        <Route path="/ferias" element={<VacationRequest />} />
        <Route path="/solicitacao" element={<NovaSolicitacao />} />
        <Route path="/abono" element={<AbonoRequest />} />
        <Route path="/folga" element={<FolgaRequest />} />
        <Route path="/aprovacao" element={<AprovacaoRH />} />
        <Route path="/formulario" element={<FormularioSolicitacao />} />
        <Route path="/documentacao" element={<DocumentacaoRequest />} />

        {/* Novos componentes */}
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/mensagens" element={<ProtectedRoute role="rh"><Mensagens /></ProtectedRoute>} />
        <Route path="/desempenho" element={<ProtectedRoute role="rh"><Desempenho /></ProtectedRoute>} />
        <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />

        {/* Painel RH - Colaborador */}
        <Route path="/avisos-colaborador" element={<ProtectedRoute role="colaborador"><AvisosColaborador /></ProtectedRoute>} />
        <Route path="/escala-colaborador" element={<ProtectedRoute role="colaborador"><EscalaColaborador /></ProtectedRoute>} />
        <Route path="/holerite-colaborador" element={<ProtectedRoute role="colaborador"><HoleriteColaborador /></ProtectedRoute>} />
        <Route path="/solicitacoes-colaborador" element={<ProtectedRoute role="colaborador"><SolicitacoesColaborador /></ProtectedRoute>} />
        <Route path="/documentos-colaborador" element={<ProtectedRoute role="colaborador"><DocumentosColaborador /></ProtectedRoute>} />
        <Route path="/ajuste-ponto" element={<ProtectedRoute role="colaborador"><AjustePonto /></ProtectedRoute>} />
        {/* Solicitações RH */}
        <Route path="/solicitacoes-recebidas" element={<ProtectedRoute role="rh"><SolicitacoesRH /></ProtectedRoute>} />
        <Route path="/minhas-solicitacoes" element={<ProtectedRoute><MinhasSolicitacoes /></ProtectedRoute>} />
        <Route path="/eventos" element={<ProtectedRoute><EventosInternos /></ProtectedRoute>} />
        <Route path="/treinamentos" element={<ProtectedRoute><Treinamentos /></ProtectedRoute>} />
        <Route path="/sugestoes" element={<ProtectedRoute><Sugestoes /></ProtectedRoute>} />

        {/* Novas rotas protegidas por tipo */}
        <Route path="/lancamento-folga" element={<ProtectedRoute role="rh"><LancamentoFolga /></ProtectedRoute>} />
        <Route path="/painel-folga" element={<ProtectedRoute role="colaborador"><PainelFolgaColaborador /></ProtectedRoute>} />
        <Route path="/lancamento-documentacao" element={<ProtectedRoute role="rh"><LancamentoDocumentacao /></ProtectedRoute>} />
        <Route path="/painel-documentacao" element={<ProtectedRoute role="colaborador"><PainelDocumentacaoColaborador /></ProtectedRoute>} />
        <Route path="/gerenciar-usuarios" element={<ProtectedRoute role="rh"><GerenciarUsuarios /></ProtectedRoute>} />

        {/* 🔍 Rota de teste temporária para Firebase */}
        <Route path="/teste-firebase" element={<TesteFirebase />} />
      </Routes>
    </Router>
  );
}

export default App;