import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Componentes (mantidos como importação normal por serem pequenos)
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

// 🔥 Páginas com Lazy Loading
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DashboardRh = lazy(() => import('./pages/DashboardRh'));
const DashboardColaborador = lazy(() => import('./pages/DashboardColaborador'));
const VacationRequest = lazy(() => import('./pages/VacationRequest'));
const NovaSolicitacao = lazy(() => import('./pages/NovaSolicitacao'));
const AbonoRequest = lazy(() => import('./pages/AbonoRequest'));
const FolgaRequest = lazy(() => import('./pages/FolgaRequest'));
const DocumentacaoRequest = lazy(() => import('./pages/DocumentacaoRequest'));
const Home = lazy(() => import('./pages/Home'));
const Cadastro = lazy(() => import('./pages/Cadastro'));
const EscolhaLogin = lazy(() => import('./pages/EscolhaLogin'));
const LoginColaborador = lazy(() => import('./pages/LoginColaborador'));
const LoginRh = lazy(() => import('./pages/LoginRh'));
const Perfil = lazy(() => import('./pages/Perfil'));
const Mensagens = lazy(() => import('./pages/Mensagens'));
const Desempenho = lazy(() => import('./pages/Desempenho'));
const Configuracoes = lazy(() => import('./pages/Configuracoes'));
const Arquivos = lazy(() => import('./pages/Arquivos'));
const AvisosColaborador = lazy(() => import('./pages/AvisosColaborador'));
const EscalaColaborador = lazy(() => import('./pages/EscalaColaborador'));
const HoleriteColaborador = lazy(() => import('./pages/HoleriteColaborador'));
const SolicitacoesColaborador = lazy(() => import('./pages/SolicitacoesColaborador'));
const DocumentosColaborador = lazy(() => import('./pages/DocumentosColaborador'));
const SolicitacoesRH = lazy(() => import('./pages/SolicitacoesRH'));
const MinhasSolicitacoes = lazy(() => import('./pages/MinhasSolicitacoes'));
const EventosInternos = lazy(() => import('./pages/EventosInternos'));
const Treinamentos = lazy(() => import('./pages/Treinamentos'));
const Sugestoes = lazy(() => import('./pages/Sugestoes'));
const GerenciarUsuarios = lazy(() => import('./pages/GerenciarUsuarios'));
const AjustePonto = lazy(() => import('./pages/AjustePonto'));
const ArquivosColaborador = lazy(() => import('./pages/ArquivosColaborador'));
const ArquivosRH = lazy(() => import('./pages/ArquivosRH'));
const LancamentoFolga = lazy(() => import('./pages/LancamentoFolga'));
const PainelFolgaColaborador = lazy(() => import('./pages/PainelFolgaColaborador'));
const LancamentoDocumentacao = lazy(() => import('./pages/LancamentoDocumentacao'));
const PainelDocumentacaoColaborador = lazy(() => import('./pages/PainelDocumentacaoColaborador'));
const TesteFirebase = lazy(() => import('./components/TesteFirebase'));
const AprovacaoRH = lazy(() => import('./components/AprovacaoRH'));
const FormularioSolicitacao = lazy(() => import('./components/FormularioSolicitacao'));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
    </Router>
  );
}

export default App;