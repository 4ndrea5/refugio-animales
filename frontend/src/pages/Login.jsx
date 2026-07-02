import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Email o contraseña incorrectos');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      fontFamily: '"Quicksand", system-ui, sans-serif',
      backgroundColor: '#F3F4F6',
    }}>
      {/* Panel izquierdo ilustrado */}
      <div style={{
        flex: '1 1 45%',
        background: 'linear-gradient(160deg, #4CAF50 0%, #2E7D32 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        padding: '48px',
        minHeight: '100vh',
      }}>
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 1 }}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="pawPattern" width="70" height="70" patternUnits="userSpaceOnUse">
              <g fill="#FFFFFF" opacity="0.08">
                <circle cx="35" cy="42" r="8" />
                <circle cx="23" cy="28" r="4.5" />
                <circle cx="47" cy="28" r="4.5" />
                <circle cx="16" cy="40" r="4" />
                <circle cx="54" cy="40" r="4" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pawPattern)" />
        </svg>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#F5F5DC',
            letterSpacing: '0.04em',
          }}>
            🐾 HOGAR DE CUATRO PATAS
          </span>
        </div>

        {/* Ilustración perro + gato */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
          <svg width="280" height="220" viewBox="0 0 280 220" fill="none">
            {/* Sombra suelo */}
            <ellipse cx="140" cy="205" rx="110" ry="10" fill="#1B5E20" opacity="0.3" />

            {/* Perro - cuerpo */}
            <ellipse cx="90" cy="165" rx="52" ry="45" fill="#F5F5DC" />
            {/* Perro - cabeza */}
            <circle cx="90" cy="100" r="42" fill="#F5F5DC" />
            {/* Perro - orejas caídas */}
            <ellipse cx="55" cy="105" rx="14" ry="26" fill="#2E7D32" transform="rotate(-15 55 105)" />
            <ellipse cx="125" cy="105" rx="14" ry="26" fill="#2E7D32" transform="rotate(15 125 105)" />
            {/* Perro - hocico */}
            <ellipse cx="90" cy="115" rx="20" ry="15" fill="#FFFFFF" />
            <circle cx="90" cy="112" r="5" fill="#2E7D32" />
            {/* Perro - ojos */}
            <circle cx="75" cy="92" r="4.5" fill="#2E7D32" />
            <circle cx="105" cy="92" r="4.5" fill="#2E7D32" />
            {/* Perro - boca */}
            <path d="M90 118 Q90 126 80 124" stroke="#2E7D32" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M90 118 Q90 126 100 124" stroke="#2E7D32" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Gato - cuerpo */}
            <ellipse cx="190" cy="170" rx="46" ry="40" fill="#FFFFFF" />
            {/* Gato - cabeza */}
            <circle cx="192" cy="115" r="36" fill="#FFFFFF" />
            {/* Gato - orejas triangulares */}
            <path d="M164 95 L158 62 L186 88 Z" fill="#FFFFFF" />
            <path d="M220 95 L228 62 L198 88 Z" fill="#FFFFFF" />
            <path d="M167 90 L164 72 L180 86 Z" fill="#F5F5DC" />
            <path d="M217 90 L221 72 L204 86 Z" fill="#F5F5DC" />
            {/* Gato - ojos */}
            <ellipse cx="180" cy="112" rx="4" ry="5.5" fill="#2E7D32" />
            <ellipse cx="204" cy="112" rx="4" ry="5.5" fill="#2E7D32" />
            {/* Gato - nariz y boca */}
            <path d="M192 122 L188 127 L196 127 Z" fill="#4CAF50" />
            <path d="M192 127 Q192 132 186 132" stroke="#2E7D32" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M192 127 Q192 132 198 132" stroke="#2E7D32" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Gato - bigotes */}
            <line x1="160" y1="118" x2="178" y2="121" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="160" y1="128" x2="178" y2="127" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="224" y1="118" x2="206" y2="121" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="224" y1="128" x2="206" y2="127" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
            {/* Gato - cola */}
            <path d="M232 175 Q260 165 254 130" stroke="#FFFFFF" strokeWidth="14" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            fontSize: '26px',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.3,
            margin: 0,
          }}>
            Cada huella tiene una historia.
          </p>
          <p style={{
            fontSize: '15px',
            color: '#F5F5DC',
            marginTop: '8px',
          }}>
            Ayúdanos a encontrarle un hogar.
          </p>
        </div>
      </div>

      {/* Panel derecho: formulario */}
      <div style={{
        flex: '1 1 55%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
      }}>
        <div style={{ width: '100%', maxWidth: '360px', padding: '0 24px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 700, marginBottom: '6px', color: '#2E7D32' }}>
            ¡Bienvenido de nuevo!
          </h1>
          <p style={{ fontSize: '15px', color: '#6b6b6b', marginBottom: '36px' }}>
            Inicia sesión para continuar
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#2E7D32', marginBottom: '6px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  border: '2px solid #F3F4F6',
                  borderRadius: '10px',
                  backgroundColor: '#F5F5DC',
                  color: '#1a1a1a',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.border = '2px solid #4CAF50')}
                onBlur={(e) => (e.target.style.border = '2px solid #F3F4F6')}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#2E7D32', marginBottom: '6px' }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  border: '2px solid #F3F4F6',
                  borderRadius: '10px',
                  backgroundColor: '#F5F5DC',
                  color: '#1a1a1a',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.border = '2px solid #4CAF50')}
                onBlur={(e) => (e.target.style.border = '2px solid #F3F4F6')}
              />
            </div>

            {error && (
              <p style={{ color: '#c0392b', fontSize: '13px', marginBottom: '16px' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={cargando}
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '15px',
                fontFamily: 'inherit',
                fontWeight: 700,
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                cursor: cargando ? 'default' : 'pointer',
                opacity: cargando ? 0.6 : 1,
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => !cargando && (e.target.style.backgroundColor = '#2E7D32')}
              onMouseLeave={(e) => !cargando && (e.target.style.backgroundColor = '#4CAF50')}
            >
              {cargando ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;