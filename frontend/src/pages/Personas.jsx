import { useState } from 'react';
import { Plus, X, Shield, Stethoscope, User } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useUsuarios } from '../hooks/useUsuarios';
import { useCrearStaff } from '../hooks/useCrearStaff';
import { useCambiarRol } from '../hooks/useCambiarRol';

const sans = '"Inter", system-ui, sans-serif';
const serif = '"Fraunces", Georgia, serif';

const panelBase = {
  backgroundColor: '#FFFFFF',
  borderRadius: '14px',
  border: '1px solid #ECE7DB',
  boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
  boxSizing: 'border-box',
};

const inputStyle = {
  width: '100%', padding: '10px 12px', fontSize: '14px', fontFamily: sans,
  border: '1px solid #E4DFD1', borderRadius: '8px', backgroundColor: '#FAF8F3',
  color: '#1F2E22', boxSizing: 'border-box',
};

const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 600, color: '#4A4A42', marginBottom: '6px' };

const rolInfo = {
  admin: { label: 'Administrador', color: '#2E7D32', bg: '#EAF1E7', icon: Shield },
  veterinario: { label: 'Veterinario', color: '#C8A76A', bg: '#F7EFDD', icon: Stethoscope },
  adoptante: { label: 'Adoptante', color: '#8A8375', bg: '#F0ECE0', icon: User },
};

function ModalNuevoStaff({ onClose }) {
  const crearStaff = useCrearStaff();
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', password: '', telefono: '', direccion: '', rol: 'veterinario',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    crearStaff.mutate(form, { onSuccess: onClose });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(31,46,34,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={onClose}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '32px', width: '100%', maxWidth: '440px', fontFamily: sans }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: serif, fontSize: '20px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>
            Nueva cuenta de staff
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} color="#8A8375" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Rol</label>
            <select style={inputStyle} value={form.rol} onChange={(e) => setForm({ ...form, rol: e.target.value })}>
              <option value="veterinario">Veterinario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Nombre</label>
              <input style={inputStyle} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
            </div>
            <div>
              <label style={labelStyle}>Apellido</label>
              <input style={inputStyle} value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} required />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Email</label>
            <input type="email" style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Contraseña temporal</label>
            <input type="password" style={inputStyle} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
            <div>
              <label style={labelStyle}>Teléfono</label>
              <input style={inputStyle} value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Ciudad</label>
              <input style={inputStyle} value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} />
            </div>
          </div>

          {crearStaff.isError && (
            <p style={{ color: '#A6564F', fontSize: '13px', marginBottom: '16px' }}>
              {crearStaff.error?.response?.data?.error || 'Error al crear la cuenta.'}
            </p>
          )}

          <button
            type="submit"
            disabled={crearStaff.isPending}
            style={{
              width: '100%', padding: '12px', fontSize: '14px', fontWeight: 700, fontFamily: sans,
              backgroundColor: '#356B45', color: '#fff', border: 'none', borderRadius: '9px',
              cursor: crearStaff.isPending ? 'default' : 'pointer',
              opacity: crearStaff.isPending ? 0.6 : 1,
            }}
          >
            {crearStaff.isPending ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Personas() {
  const { data: usuarios, isLoading } = useUsuarios();
  const cambiarRol = useCambiarRol();
  const [filtro, setFiltro] = useState('todos');
  const [modalAbierto, setModalAbierto] = useState(false);

  const usuariosFiltrados = usuarios?.filter((u) => filtro === 'todos' || u.rol === filtro) || [];

  const filtros = [
    { valor: 'todos', label: 'Todos' },
    { valor: 'admin', label: 'Administradores' },
    { valor: 'veterinario', label: 'Veterinarios' },
    { valor: 'adoptante', label: 'Adoptantes' },
  ];

  const handleCambiarRol = (id, nuevoRol) => {
    cambiarRol.mutate({ id, rol: nuevoRol });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F7F3' }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '40px 44px', boxSizing: 'border-box', fontFamily: sans }}>
        <Header />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontFamily: serif, fontSize: '32px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>
              Personas
            </h1>
            <p style={{ fontSize: '14px', color: '#8A8375', margin: '6px 0 0' }}>
              {usuarios?.length || 0} personas registradas en el sistema
            </p>
          </div>

          <button
            onClick={() => setModalAbierto(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 18px',
              fontSize: '14px', fontWeight: 600, fontFamily: sans, backgroundColor: '#356B45',
              color: '#fff', border: 'none', borderRadius: '9px', cursor: 'pointer',
            }}
          >
            <Plus size={16} /> Nueva cuenta de staff
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          {filtros.map((f) => (
            <button
              key={f.valor}
              onClick={() => setFiltro(f.valor)}
              style={{
                padding: '8px 16px', fontSize: '13px', fontWeight: 600, fontFamily: sans,
                borderRadius: '20px', border: '1px solid #E4DFD1',
                backgroundColor: filtro === f.valor ? '#1F2E22' : '#FFFFFF',
                color: filtro === f.valor ? '#FFFFFF' : '#4A4A42',
                cursor: 'pointer',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ ...panelBase, overflow: 'hidden' }}>
          {isLoading && <p style={{ padding: '24px', color: '#8A8375' }}>Cargando personas...</p>}
          {!isLoading && usuariosFiltrados.length === 0 && (
            <p style={{ padding: '24px', color: '#8A8375' }}>No hay personas en esta categoría.</p>
          )}

          {usuariosFiltrados.map((u, i) => {
            const info = rolInfo[u.rol] || rolInfo.adoptante;
            const Icon = info.icon;
            return (
              <div
                key={u.id_usuario}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 24px', borderTop: i === 0 ? 'none' : '1px solid #F0ECE0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '50%', backgroundColor: info.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={16} color={info.color} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#1F2E22', margin: '0 0 2px' }}>
                      {u.nombre} {u.apellido}
                    </p>
                    <p style={{ fontSize: '12px', color: '#8A8375', margin: 0 }}>{u.email}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '20px',
                    backgroundColor: info.bg, color: info.color,
                  }}>
                    {info.label}
                  </span>
                  <select
                    value={u.rol}
                    onChange={(e) => handleCambiarRol(u.id_usuario, e.target.value)}
                    disabled={cambiarRol.isPending}
                    style={{
                      fontSize: '12px', fontFamily: sans, padding: '6px 8px',
                      border: '1px solid #E4DFD1', borderRadius: '7px', backgroundColor: '#FAF8F3',
                      color: '#4A4A42', cursor: 'pointer',
                    }}
                  >
                    <option value="adoptante">Adoptante</option>
                    <option value="veterinario">Veterinario</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {modalAbierto && <ModalNuevoStaff onClose={() => setModalAbierto(false)} />}
    </div>
  );
}

export default Personas;