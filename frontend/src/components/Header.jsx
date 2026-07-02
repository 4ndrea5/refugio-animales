import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const sans = '"Inter", system-ui, sans-serif';
const serif = '"Fraunces", Georgia, serif';

function saludoPorHora() {
  const hora = new Date().getHours();
  if (hora < 12) return 'Buenos días';
  if (hora < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

function Header({ notificaciones = 0 }) {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const rolLegible = {
    admin: 'Administradora',
    veterinario: 'Veterinario',
    adoptante: 'Adoptante',
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', fontFamily: sans }}>
      <div>
        <h1 style={{ fontFamily: serif, fontSize: '32px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>
          {saludoPorHora()}, {usuario?.nombre}
        </h1>
        <p style={{ fontSize: '14px', color: '#8A8375', margin: '6px 0 0' }}>
          Gracias por ayudar a cambiar la vida de nuestros animales.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <Bell size={19} strokeWidth={1.8} color="#4A4A42" />
          {notificaciones > 0 && (
            <span style={{
              position: 'absolute', top: '-6px', right: '-6px',
              backgroundColor: '#A6564F', color: '#fff', fontSize: '10px', fontWeight: 700,
              width: '16px', height: '16px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {notificaciones}
            </span>
          )}
        </div>

        <div>
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#2E7D32',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: sans,
            }}>
              {usuario?.nombre?.charAt(0).toUpperCase()}
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#1F2E22', margin: 0 }}>{usuario?.nombre}</p>
              <p style={{ fontSize: '12px', color: '#8A8375', margin: 0 }}>{rolLegible[usuario?.rol] || usuario?.rol}</p>
            </div>
            <ChevronDown size={15} color="#8A8375" />
          </button>

          {menuAbierto && (
            <div style={{
              position: 'absolute', top: '48px', right: 0,
              backgroundColor: '#FFFFFF', borderRadius: '10px',
              border: '1px solid #ECE7DB', boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
              minWidth: '160px', overflow: 'hidden', zIndex: 10,
            }}>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                  padding: '12px 16px', background: 'none', border: 'none',
                  fontSize: '13px', fontFamily: sans, fontWeight: 500, color: '#A6564F',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <LogOut size={15} strokeWidth={1.8} />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;