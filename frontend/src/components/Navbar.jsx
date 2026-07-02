import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px',
      backgroundColor: '#2E7D32',
      fontFamily: '"Quicksand", system-ui, sans-serif',
    }}>
      <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '17px' }}>
        🐾 Hogar de Cuatro Patas
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span style={{ color: '#F5F5DC', fontSize: '14px' }}>
          {usuario?.nombre} · {usuario?.rol}
        </span>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            fontFamily: 'inherit',
            fontWeight: 600,
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;