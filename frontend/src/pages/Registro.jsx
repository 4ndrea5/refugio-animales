import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRegistro } from '../hooks/useRegistro';

function Registro() {
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', password: '', telefono: '', direccion: '',
  });
  const [error, setError] = useState('');
  const registro = useRegistro();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (campo) => (e) => setForm({ ...form, [campo]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registro.mutateAsync(form);
      // Después de registrarse, inicia sesión automáticamente
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo completar el registro. Intenta de nuevo.');
    }
  };

  const inputStyle = {
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
  };

  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: '#2E7D32', marginBottom: '6px' };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      fontFamily: '"Quicksand", system-ui, sans-serif',
      backgroundColor: '#F3F4F6',
    }}>
      {/* Panel izquierdo ilustrado (igual al Login) */}
      <div style={{
        flex: '1 1 40%',
        background: 'linear-gradient(160deg, #4CAF50 0%, #2E7D32 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        padding: '48px',
        minHeight: '100vh',
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }} preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="pawPatternReg" width="70" height="70" patternUnits="userSpaceOnUse">
              <g fill="#FFFFFF" opacity="0.08">
                <circle cx="35" cy="42" r="8" />
                <circle cx="23" cy="28" r="4.5" />
                <circle cx="47" cy="28" r="4.5" />
                <circle cx="16" cy="40" r="4" />
                <circle cx="54" cy="40" r="4" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pawPatternReg)" />
        </svg>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#F5F5DC', letterSpacing: '0.04em' }}>
            🐾 HOGAR DE CUATRO PATAS
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '26px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3, margin: 0 }}>
            Únete y ayuda a encontrarles un hogar.
          </p>
          <p style={{ fontSize: '15px', color: '#F5F5DC', marginTop: '8px' }}>
            Regístrate para iniciar tu proceso de adopción.
          </p>
        </div>
      </div>

      {/* Panel derecho: formulario */}
      <div style={{ flex: '1 1 60%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', padding: '40px 0' }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '0 24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '6px', color: '#2E7D32' }}>Crea tu cuenta</h1>
          <p style={{ fontSize: '15px', color: '#6b6b6b', marginBottom: '28px' }}>
            Regístrate como adoptante para empezar
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Nombre</label>
                <input style={inputStyle} value={form.nombre} onChange={handleChange('nombre')} required />
              </div>
              <div>
                <label style={labelStyle}>Apellido</label>
                <input style={inputStyle} value={form.apellido} onChange={handleChange('apellido')} required />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Email</label>
              <input type="email" style={inputStyle} value={form.email} onChange={handleChange('email')} required />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Contraseña</label>
              <input type="password" style={inputStyle} value={form.password} onChange={handleChange('password')} required minLength={6} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Teléfono</label>
                <input style={inputStyle} value={form.telefono} onChange={handleChange('telefono')} />
              </div>
              <div>
                <label style={labelStyle}>Ciudad</label>
                <input style={inputStyle} value={form.direccion} onChange={handleChange('direccion')} />
              </div>
            </div>

            {error && <p style={{ color: '#c0392b', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}

            <button
              type="submit"
              disabled={registro.isPending}
              style={{
                width: '100%', padding: '13px', fontSize: '15px', fontFamily: 'inherit', fontWeight: 700,
                backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '10px',
                cursor: registro.isPending ? 'default' : 'pointer', opacity: registro.isPending ? 0.6 : 1,
              }}
            >
              {registro.isPending ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <p style={{ fontSize: '13px', color: '#6b6b6b', marginTop: '20px', textAlign: 'center' }}>
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" style={{ color: '#2E7D32', fontWeight: 600, textDecoration: 'none' }}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registro;