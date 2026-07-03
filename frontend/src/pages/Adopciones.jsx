import { useState } from 'react';
import { Check, X, Heart, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useSolicitudesAdmin } from '../hooks/useSolicitudesAdmin';
import { useAdopcionesAdmin } from '../hooks/useAdopcionesAdmin';
import { useCambiarEstadoSolicitud } from '../hooks/useCambiarEstadoSolicitud';
import { useSeguimientosPorAdopcion } from '../hooks/useSeguimientosPorAdopcion';
import { useCrearSeguimiento } from '../hooks/useCrearSeguimiento';

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

function ModalSeguimiento({ idAdopcion, onClose }) {
  const crearSeguimiento = useCrearSeguimiento();
  const [form, setForm] = useState({ estado_animal: '', notas: '', proxima_visita: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    crearSeguimiento.mutate({ ...form, id_adopcion: idAdopcion }, { onSuccess: onClose });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(31,46,34,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={onClose}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '32px', width: '100%', maxWidth: '420px', fontFamily: sans }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: serif, fontSize: '20px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>Nuevo seguimiento</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} color="#8A8375" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Estado del animal</label>
            <input
              style={inputStyle}
              value={form.estado_animal}
              onChange={(e) => setForm({ ...form, estado_animal: e.target.value })}
              placeholder="Ej: Sano, adaptándose bien"
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Notas</label>
            <textarea
              style={{ ...inputStyle, minHeight: '70px', fontFamily: sans }}
              value={form.notas}
              onChange={(e) => setForm({ ...form, notas: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Próxima visita</label>
            <input
              type="date"
              style={inputStyle}
              value={form.proxima_visita}
              onChange={(e) => setForm({ ...form, proxima_visita: e.target.value })}
            />
          </div>
          {crearSeguimiento.isError && (
            <p style={{ color: '#A6564F', fontSize: '13px', marginBottom: '16px' }}>Error al guardar. Intenta de nuevo.</p>
          )}
          <button
            type="submit"
            disabled={crearSeguimiento.isPending}
            style={{
              width: '100%', padding: '12px', fontSize: '14px', fontWeight: 700, fontFamily: sans,
              backgroundColor: '#356B45', color: '#fff', border: 'none', borderRadius: '9px',
              cursor: crearSeguimiento.isPending ? 'default' : 'pointer',
              opacity: crearSeguimiento.isPending ? 0.6 : 1,
            }}
          >
            {crearSeguimiento.isPending ? 'Guardando...' : 'Guardar seguimiento'}
          </button>
        </form>
      </div>
    </div>
  );
}

function FilaAdopcion({ adopcion, expandido, onToggle, onNuevoSeguimiento }) {
  const { data: seguimientos, isLoading } = useSeguimientosPorAdopcion(expandido ? adopcion.id_adopcion : null);

  return (
    <div style={{ borderTop: '1px solid #F0ECE0' }}>
      <div
        onClick={onToggle}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 24px', cursor: 'pointer',
        }}
      >
        <div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#1F2E22', margin: '0 0 2px' }}>
            {adopcion.Animal?.nombre} adoptado por {adopcion.adoptante?.nombre} {adopcion.adoptante?.apellido}
          </p>
          <p style={{ fontSize: '12px', color: '#8A8375', margin: 0 }}>{adopcion.adoptante?.email}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: '#8A8375' }}>{formatearFecha(adopcion.fecha_adopcion)}</span>
          {expandido ? <ChevronUp size={16} color="#8A8375" /> : <ChevronDown size={16} color="#8A8375" />}
        </div>
      </div>

      {expandido && (
        <div style={{ padding: '0 24px 20px', backgroundColor: '#FAF8F3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingTop: '4px' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#8A8375', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
              Seguimiento post-adopción
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); onNuevoSeguimiento(adopcion.id_adopcion); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px',
                fontSize: '12px', fontWeight: 600, fontFamily: sans, backgroundColor: '#356B45',
                color: '#fff', border: 'none', borderRadius: '7px', cursor: 'pointer',
              }}
            >
              <Plus size={12} /> Registrar visita
            </button>
          </div>

          {isLoading && <p style={{ fontSize: '13px', color: '#8A8375' }}>Cargando...</p>}
          {!isLoading && seguimientos?.length === 0 && (
            <p style={{ fontSize: '13px', color: '#8A8375' }}>Sin seguimientos registrados aún.</p>
          )}

          {seguimientos?.map((s) => (
            <div key={s.id_seguimiento} style={{ padding: '10px 0', borderTop: '1px solid #ECE7DB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2E22' }}>{s.estado_animal}</span>
                <span style={{ fontSize: '12px', color: '#8A8375' }}>{formatearFecha(s.fecha_seguimiento)}</span>
              </div>
              {s.notas && <p style={{ fontSize: '12px', color: '#4A4A42', margin: '4px 0 0' }}>{s.notas}</p>}
              {s.proxima_visita && (
                <p style={{ fontSize: '12px', color: '#C8A76A', margin: '4px 0 0' }}>
                  Próxima visita: {formatearFecha(s.proxima_visita)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Adopciones() {
  const { data: solicitudes, isLoading: cargandoSolicitudes } = useSolicitudesAdmin();
  const { data: adopciones, isLoading: cargandoAdopciones } = useAdopcionesAdmin();
  const cambiarEstado = useCambiarEstadoSolicitud();
  const [tab, setTab] = useState('pendientes');
  const [expandidoId, setExpandidoId] = useState(null);
  const [modalSeguimiento, setModalSeguimiento] = useState(null);

  const pendientes = solicitudes?.filter((s) => s.estado === 'pendiente' || s.estado === 'en_revision') || [];

  const handleDecision = (id, estado) => {
    cambiarEstado.mutate({ id, estado });
  };

  const toggleExpandido = (id) => {
    setExpandidoId(expandidoId === id ? null : id);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F7F3' }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '40px 44px', boxSizing: 'border-box', fontFamily: sans }}>
        <h1 style={{ fontFamily: serif, fontSize: '32px', fontWeight: 500, color: '#1F2E22', margin: '0 0 6px' }}>
          Adopciones
        </h1>
        <p style={{ fontSize: '14px', color: '#8A8375', margin: '0 0 28px' }}>
          Revisa solicitudes y da seguimiento a las adopciones concretadas
        </p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          <button
            onClick={() => setTab('pendientes')}
            style={{
              padding: '9px 18px', fontSize: '13px', fontWeight: 600, fontFamily: sans,
              borderRadius: '20px', border: '1px solid #E4DFD1',
              backgroundColor: tab === 'pendientes' ? '#1F2E22' : '#FFFFFF',
              color: tab === 'pendientes' ? '#FFFFFF' : '#4A4A42',
              cursor: 'pointer',
            }}
          >
            Solicitudes pendientes {pendientes.length > 0 && `(${pendientes.length})`}
          </button>
          <button
            onClick={() => setTab('historial')}
            style={{
              padding: '9px 18px', fontSize: '13px', fontWeight: 600, fontFamily: sans,
              borderRadius: '20px', border: '1px solid #E4DFD1',
              backgroundColor: tab === 'historial' ? '#1F2E22' : '#FFFFFF',
              color: tab === 'historial' ? '#FFFFFF' : '#4A4A42',
              cursor: 'pointer',
            }}
          >
            Historial y seguimiento
          </button>
        </div>

        {tab === 'pendientes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {cargandoSolicitudes && <p style={{ color: '#8A8375' }}>Cargando solicitudes...</p>}
            {!cargandoSolicitudes && pendientes.length === 0 && (
              <p style={{ color: '#8A8375' }}>No hay solicitudes pendientes por revisar.</p>
            )}

            {pendientes.map((s) => (
              <div key={s.id_solicitud} style={{ ...panelBase, padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <Heart size={16} color="#C8A76A" />
                      <h3 style={{ fontFamily: serif, fontSize: '18px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>
                        {s.adoptante?.nombre} {s.adoptante?.apellido} → {s.Animal?.nombre}
                      </h3>
                    </div>
                    <p style={{ fontSize: '12px', color: '#8A8375', margin: 0 }}>
                      Solicitado el {formatearFecha(s.fecha_solicitud)} · {s.adoptante?.email}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '20px',
                    backgroundColor: '#F7EFDD', color: '#C8A76A',
                  }}>
                    {s.estado === 'pendiente' ? 'Pendiente' : 'En revisión'}
                  </span>
                </div>

                {s.motivo && (
                  <p style={{ fontSize: '13px', color: '#4A4A42', lineHeight: 1.5, margin: '0 0 8px' }}>
                    <strong>Motivo:</strong> {s.motivo}
                  </p>
                )}
                {s.respuestas_cuestionario && (
                  <p style={{ fontSize: '13px', color: '#4A4A42', lineHeight: 1.5, margin: '0 0 16px' }}>
                    <strong>Detalles:</strong> {s.respuestas_cuestionario}
                  </p>
                )}

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleDecision(s.id_solicitud, 'aprobada')}
                    disabled={cambiarEstado.isPending}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '9px 16px', fontSize: '13px', fontWeight: 600, fontFamily: sans,
                      backgroundColor: '#356B45', color: '#fff', border: 'none', borderRadius: '8px',
                      cursor: cambiarEstado.isPending ? 'default' : 'pointer',
                      opacity: cambiarEstado.isPending ? 0.6 : 1,
                    }}
                  >
                    <Check size={14} /> Aprobar
                  </button>
                  <button
                    onClick={() => handleDecision(s.id_solicitud, 'rechazada')}
                    disabled={cambiarEstado.isPending}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '9px 16px', fontSize: '13px', fontWeight: 600, fontFamily: sans,
                      backgroundColor: 'transparent', color: '#A6564F', border: '1px solid #E4DFD1', borderRadius: '8px',
                      cursor: cambiarEstado.isPending ? 'default' : 'pointer',
                      opacity: cambiarEstado.isPending ? 0.6 : 1,
                    }}
                  >
                    <X size={14} /> Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'historial' && (
          <div style={{ ...panelBase, overflow: 'hidden' }}>
            {cargandoAdopciones && <p style={{ padding: '24px', color: '#8A8375' }}>Cargando historial...</p>}
            {!cargandoAdopciones && adopciones?.length === 0 && (
              <p style={{ padding: '24px', color: '#8A8375' }}>Aún no hay adopciones registradas.</p>
            )}

            {adopciones?.map((a) => (
              <FilaAdopcion
                key={a.id_adopcion}
                adopcion={a}
                expandido={expandidoId === a.id_adopcion}
                onToggle={() => toggleExpandido(a.id_adopcion)}
                onNuevoSeguimiento={(id) => setModalSeguimiento(id)}
              />
            ))}
          </div>
        )}
      </main>

      {modalSeguimiento && (
        <ModalSeguimiento idAdopcion={modalSeguimiento} onClose={() => setModalSeguimiento(null)} />
      )}
    </div>
  );
}

export default Adopciones;