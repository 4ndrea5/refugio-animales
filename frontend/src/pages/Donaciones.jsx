import { useState } from 'react';
import { Plus, X, Gift, Wallet, Package } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useDonacionesAdmin } from '../hooks/useDonacionesAdmin';
import { useCrearDonacion } from '../hooks/useCrearDonacion';

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

function formatearFecha(fecha) {
  if (!fecha) return '';
  return new Date(fecha).toLocaleDateString('es-BO', { day: 'numeric', month: 'short', year: 'numeric' });
}

function ModalDonacion({ onClose }) {
  const crearDonacion = useCrearDonacion();
  const [form, setForm] = useState({
    tipo: 'monetaria', monto: '', descripcion: '', metodo_pago: '', fecha_donacion: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    crearDonacion.mutate(
      { ...form, monto: form.monto ? parseFloat(form.monto) : null },
      { onSuccess: onClose }
    );
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(31,46,34,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={onClose}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '32px', width: '100%', maxWidth: '440px', fontFamily: sans }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: serif, fontSize: '20px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>Registrar donación</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="#8A8375" /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Tipo de donación</label>
            <select style={inputStyle} value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
              <option value="monetaria">Monetaria</option>
              <option value="especie">En especie</option>
            </select>
          </div>

          {form.tipo === 'monetaria' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Monto (Bs.)</label>
                <input type="number" step="0.01" style={inputStyle} value={form.monto} onChange={(e) => setForm({ ...form, monto: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Método de pago</label>
                <input style={inputStyle} value={form.metodo_pago} onChange={(e) => setForm({ ...form, metodo_pago: e.target.value })} placeholder="Efectivo, QR..." />
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Descripción de lo donado</label>
              <textarea style={{ ...inputStyle, minHeight: '60px', fontFamily: sans }} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Ej: 20 kg de alimento para perro" />
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Fecha</label>
            <input type="date" style={inputStyle} value={form.fecha_donacion} onChange={(e) => setForm({ ...form, fecha_donacion: e.target.value })} />
          </div>

          {crearDonacion.isError && <p style={{ color: '#A6564F', fontSize: '13px', marginBottom: '16px' }}>Error al guardar. Intenta de nuevo.</p>}

          <button type="submit" disabled={crearDonacion.isPending} style={{
            width: '100%', padding: '12px', fontSize: '14px', fontWeight: 700, fontFamily: sans,
            backgroundColor: '#356B45', color: '#fff', border: 'none', borderRadius: '9px',
            cursor: crearDonacion.isPending ? 'default' : 'pointer', opacity: crearDonacion.isPending ? 0.6 : 1,
          }}>
            {crearDonacion.isPending ? 'Guardando...' : 'Registrar donación'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Donaciones() {
  const { data: donaciones, isLoading } = useDonacionesAdmin();
  const [modalAbierto, setModalAbierto] = useState(false);

  const totalMonetario = donaciones
    ?.filter((d) => d.tipo === 'monetaria' && d.monto)
    .reduce((sum, d) => sum + parseFloat(d.monto), 0) || 0;

  const totalEnEspecie = donaciones?.filter((d) => d.tipo === 'especie').length || 0;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F7F3' }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '40px 44px', boxSizing: 'border-box', fontFamily: sans }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontFamily: serif, fontSize: '32px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>Donaciones</h1>
            <p style={{ fontSize: '14px', color: '#8A8375', margin: '6px 0 0' }}>
              Registro de aportes monetarios y en especie
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
            <Plus size={16} /> Registrar donación
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
          <div style={{ ...panelBase, padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#EAF1E7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={20} color="#2E7D32" strokeWidth={1.8} />
            </div>
            <div>
              <p style={{ fontFamily: serif, fontSize: '26px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>Bs. {totalMonetario.toFixed(2)}</p>
              <p style={{ fontSize: '12px', color: '#8A8375', margin: '2px 0 0' }}>total recaudado</p>
            </div>
          </div>
          <div style={{ ...panelBase, padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#F7EFDD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={20} color="#C8A76A" strokeWidth={1.8} />
            </div>
            <div>
              <p style={{ fontFamily: serif, fontSize: '26px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>{totalEnEspecie}</p>
              <p style={{ fontSize: '12px', color: '#8A8375', margin: '2px 0 0' }}>donaciones en especie</p>
            </div>
          </div>
        </div>

        <div style={{ ...panelBase, overflow: 'hidden' }}>
          {isLoading && <p style={{ padding: '24px', color: '#8A8375' }}>Cargando donaciones...</p>}
          {!isLoading && donaciones?.length === 0 && (
            <p style={{ padding: '24px', color: '#8A8375' }}>Aún no hay donaciones registradas.</p>
          )}

          {donaciones?.map((d, i) => (
            <div key={d.id_donacion} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '18px 24px', borderTop: i === 0 ? 'none' : '1px solid #F0ECE0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Gift size={16} color="#C8A76A" />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#1F2E22', margin: '0 0 2px' }}>
                    {d.tipo === 'monetaria' ? 'Donación monetaria' : d.descripcion || 'Donación en especie'}
                  </p>
                  <p style={{ fontSize: '12px', color: '#8A8375', margin: 0 }}>
                    {d.Usuario ? `${d.Usuario.nombre} ${d.Usuario.apellido}` : 'Donante anónimo'}
                    {d.metodo_pago && ` · ${d.metodo_pago}`}
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                {d.monto && <p style={{ fontSize: '14px', fontWeight: 600, color: '#356B45', margin: '0 0 2px' }}>Bs. {d.monto}</p>}
                <p style={{ fontSize: '12px', color: '#8A8375', margin: 0 }}>{formatearFecha(d.fecha_donacion)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {modalAbierto && <ModalDonacion onClose={() => setModalAbierto(false)} />}
    </div>
  );
}

export default Donaciones;