import { useState } from 'react';
import { Check, X, Heart } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useSolicitudesAdmin } from '../hooks/useSolicitudesAdmin';
import { useAdopcionesAdmin } from '../hooks/useAdopcionesAdmin';
import { useCambiarEstadoSolicitud } from '../hooks/useCambiarEstadoSolicitud';

const sans = '"Inter", system-ui, sans-serif';
const serif = '"Fraunces", Georgia, serif';

const panelBase = {
  backgroundColor: '#FFFFFF',
  borderRadius: '14px',
  border: '1px solid #ECE7DB',
  boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
  boxSizing: 'border-box',
};

function formatearFecha(fecha) {
  if (!fecha) return '';
  return new Date(fecha).toLocaleDateString('es-BO', { day: 'numeric', month: 'short', year: 'numeric' });
}

function Adopciones() {
  const { data: solicitudes, isLoading: cargandoSolicitudes } = useSolicitudesAdmin();
  const { data: adopciones, isLoading: cargandoAdopciones } = useAdopcionesAdmin();
  const cambiarEstado = useCambiarEstadoSolicitud();
  const [tab, setTab] = useState('pendientes');

  const pendientes = solicitudes?.filter((s) => s.estado === 'pendiente' || s.estado === 'en_revision') || [];

  const handleDecision = (id, estado) => {
    cambiarEstado.mutate({ id, estado });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F7F3' }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '40px 44px', boxSizing: 'border-box', fontFamily: sans }}>
        <h1 style={{ fontFamily: serif, fontSize: '32px', fontWeight: 500, color: '#1F2E22', margin: '0 0 6px' }}>
          Adopciones
        </h1>
        <p style={{ fontSize: '14px', color: '#8A8375', margin: '0 0 28px' }}>
          Revisa solicitudes y consulta el historial de adopciones
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
            Historial de adopciones
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

            {adopciones?.map((a, i) => (
              <div
                key={a.id_adopcion}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 24px', borderTop: i === 0 ? 'none' : '1px solid #F0ECE0',
                }}
              >
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#1F2E22', margin: '0 0 2px' }}>
                    {a.Animal?.nombre} adoptado por {a.adoptante?.nombre} {a.adoptante?.apellido}
                  </p>
                  <p style={{ fontSize: '12px', color: '#8A8375', margin: 0 }}>{a.adoptante?.email}</p>
                </div>
                <span style={{ fontSize: '13px', color: '#8A8375' }}>{formatearFecha(a.fecha_adopcion)}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Adopciones;