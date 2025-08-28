import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Ajuste aqui: só redireciona se tipoUsuario estiver definido
  if (role && user?.tipoUsuario && user.tipoUsuario !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const styles = {
  loadingContainer: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: '20px',
    color: '#333',
  },
};

export default ProtectedRoute;