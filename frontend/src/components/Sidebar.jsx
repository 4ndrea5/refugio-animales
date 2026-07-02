import {
  Home, PawPrint, Heart, Stethoscope, Utensils,
  Users, HandHeart, BarChart3, Settings,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const sans = '"Inter", system-ui, sans-serif';
const serif = '"Fraunces", Georgia, serif';

const menuItems = [
  { icon: Home, label: 'Centro de control', activo: true },
  { icon: PawPrint, label: 'Animales' },
  { icon: Heart, label: 'Adopciones' },
  { icon: Stethoscope, label: 'Salud' },
  { icon: Utensils, label: 'Alimentación' },
  { icon: Users, label: 'Personas' },
  { icon: HandHeart, label: 'Voluntarios' },
  { icon: BarChart3, label: 'Reportes' },
  { icon: Settings, label: 'Configuración' },
];

function Sidebar() {
  return (
    <aside style={{
      width: '280px',
      minHeight: '100vh',
      backgroundColor: '#1F2E22',
      display: 'flex',
      flexDirection: 'column',
      padding: '28px 20px',
      boxSizing: 'border-box',
      fontFamily: sans,
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px', marginBottom: '32px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          backgroundColor: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <PawPrint size={20} color="#F5F5DC" strokeWidth={1.8} />
        </div>
        <span style={{ fontFamily: serif, fontSize: '17px', fontWeight: 500, color: '#FAF8F3', lineHeight: 1.2 }}>
          Hogar de<br />Cuatro Patas
        </span>
      </div>

      {/* Menú */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
        {menuItems.map(({ icon: Icon, label, activo }) => (
          <button
            key={label}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '11px 12px', borderRadius: '9px', border: 'none',
              backgroundColor: activo ? '#2E7D32' : 'transparent',
              color: activo ? '#FFFFFF' : '#B9C2B4',
              fontSize: '14px', fontWeight: 500, fontFamily: 'inherit',
              cursor: 'pointer', textAlign: 'left', width: '100%',
            }}
          >
            <Icon size={17} strokeWidth={1.8} />
            {label}
          </button>
        ))}
      </nav>

      {/* Ilustración + frase */}
      <div style={{ paddingTop: '20px' }}>
        <svg width="90" height="70" viewBox="0 0 90 70" fill="none" style={{ marginBottom: '16px' }}>
          <ellipse cx="45" cy="66" rx="38" ry="3" fill="#0F1A12" opacity="0.4" />
          <ellipse cx="30" cy="45" rx="16" ry="20" fill="#D9C89A" />
          <circle cx="30" cy="24" r="13" fill="#D9C89A" />
          <ellipse cx="19" cy="26" rx="4.5" ry="8" fill="#B99F6B" transform="rotate(-15 19 26)" />
          <ellipse cx="41" cy="26" rx="4.5" ry="8" fill="#B99F6B" transform="rotate(15 41 26)" />
          <circle cx="25" cy="22" r="1.6" fill="#1F2E22" />
          <circle cx="35" cy="22" r="1.6" fill="#1F2E22" />
          <ellipse cx="60" cy="48" rx="13" ry="16" fill="#A8C4A2" />
          <circle cx="61" cy="30" r="11" fill="#A8C4A2" />
          <path d="M52 22 L50 12 L59 20 Z" fill="#A8C4A2" />
          <path d="M70 22 L73 12 L64 20 Z" fill="#A8C4A2" />
          <circle cx="57" cy="28" r="1.4" fill="#1F2E22" />
          <circle cx="65" cy="28" r="1.4" fill="#1F2E22" />
          <path d="M12 60 Q20 50 30 58" stroke="#7FA876" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M70 62 Q78 52 84 60" stroke="#7FA876" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>

        <p style={{
          fontFamily: serif, fontStyle: 'italic', fontSize: '13px',
          color: '#C7CFC3', lineHeight: 1.5, margin: 0,
        }}>
          "Rescatamos vidas, construimos hogares, creamos familias."
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;