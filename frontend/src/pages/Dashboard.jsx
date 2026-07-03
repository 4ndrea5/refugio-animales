import { useMemo } from 'react';
import {
  PawPrint, Heart, Calendar, Gift, FileText, Package, ArrowRight, Home,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAnimales } from '../hooks/useAnimales';
import { useSolicitudesAdmin } from '../hooks/useSolicitudesAdmin';
import { useAdopcionesAdmin } from '../hooks/useAdopcionesAdmin';
import { useDonacionesAdmin } from '../hooks/useDonacionesAdmin';
import { useVacunasProximas } from '../hooks/useVacunasProximas';

const sans = '"Inter", system-ui, sans-serif';
const serif = '"Fraunces", Georgia, serif';

const panelBase = {
  backgroundColor: '#FFFFFF',
  borderRadius: '14px',
  border: '1px solid #ECE7DB',
  boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
  boxSizing: 'border-box',
};

const etiqueta = {
  fontSize: '12px', fontWeight: 600, color: '#8A8375',
  letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0,
};

function formatearFecha(fecha) {
  if (!fecha) return '';
  return new Date(fecha).toLocaleDateString('es-BO', { day: 'numeric', month: 'short' });
}

function Dashboard() {
  const { data: animales, isLoading: cargandoAnimales } = useAnimales();
  const { data: solicitudes } = useSolicitudesAdmin();
  const { data: adopciones } = useAdopcionesAdmin();
  const { data: donaciones } = useDonacionesAdmin();
  const { data: vacunas } = useVacunasProximas();

  const totalAnimales = animales?.length || 0;
  const disponibles = animales?.filter((a) => a.estado === 'disponible').length || 0;
  const enRefugio = animales?.filter((a) => a.estado !== 'adoptado').length || 0;
  const ocupacionPct = totalAnimales > 0 ? Math.round((enRefugio / totalAnimales) * 100) : 0;

  const inicioMes = new Date();
  inicioMes.setDate(1);
  inicioMes.setHours(0, 0, 0, 0);
  const adopcionesDelMes = adopciones?.filter((a) => new Date(a.fecha_adopcion) >= inicioMes) || [];

  const destacado = useMemo(() => {
    if (!animales || animales.length === 0) return null;
    return animales.find((a) => a.estado === 'disponible') || animales[0];
  }, [animales]);

  const actividad = useMemo(() => {
    const eventos = [];
    (solicitudes || []).forEach((s) => {
      eventos.push({
        fecha: s.fecha_respuesta || s.fecha_solicitud,
        icon: Heart,
        texto:
          s.estado === 'aprobada' ? `Adopción aprobada · ${s.Animal?.nombre || 'animal'}`
          : s.estado === 'rechazada' ? `Solicitud rechazada · ${s.Animal?.nombre || 'animal'}`
          : `Nueva solicitud · ${s.Animal?.nombre || 'animal'}`,
      });
    });
    (animales || []).forEach((a) => {
      eventos.push({ fecha: a.fecha_ingreso, icon: PawPrint, texto: `Ingreso al refugio · ${a.nombre}` });
    });
    return eventos.filter((e) => e.fecha).sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 5);
  }, [solicitudes, animales]);

  const proximaVacuna = vacunas?.[0];

  const barrasAdopciones = useMemo(() => {
    const dias = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    const hoy = new Date();
    const resultado = [];
    for (let i = 6; i >= 0; i--) {
      const dia = new Date(hoy);
      dia.setDate(hoy.getDate() - i);
      const cuenta = (adopciones || []).filter((a) => {
        const f = new Date(a.fecha_adopcion);
        return f.toDateString() === dia.toDateString();
      }).length;
      resultado.push({ label: dias[dia.getDay()], cuenta });
    }
    return resultado;
  }, [adopciones]);

  const maxBarra = Math.max(1, ...barrasAdopciones.map((b) => b.cuenta));

  const accesos = [
    { icon: PawPrint, label: 'Registrar animal' },
    { icon: Heart, label: 'Nueva adopción' },
    { icon: FileText, label: 'Historia clínica' },
    { icon: Calendar, label: 'Programar cita' },
    { icon: Gift, label: 'Registrar donación' },
    { icon: Package, label: 'Inventario' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F7F3' }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '40px 44px', boxSizing: 'border-box' }}>
        <Header />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', marginBottom: '24px' }}>
          <div style={{ ...panelBase, gridColumn: 'span 5', padding: '28px' }}>
            <p style={etiqueta}>Estado del refugio</p>

            <div style={{ display: 'flex', gap: '32px', margin: '20px 0 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#EAF1E7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PawPrint size={17} color="#2E7D32" strokeWidth={1.8} />
                </div>
                <div>
                  <p style={{ fontFamily: serif, fontSize: '28px', fontWeight: 500, color: '#1F2E22', margin: 0, lineHeight: 1 }}>
                    {cargandoAnimales ? '—' : totalAnimales}
                  </p>
                  <p style={{ fontSize: '12px', color: '#8A8375', margin: '2px 0 0' }}>animales bajo cuidado</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#F7EFDD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={17} color="#C8A76A" strokeWidth={1.8} />
                </div>
                <div>
                  <p style={{ fontFamily: serif, fontSize: '28px', fontWeight: 500, color: '#1F2E22', margin: 0, lineHeight: 1 }}>
                    {adopcionesDelMes.length}
                  </p>
                  <p style={{ fontSize: '12px', color: '#8A8375', margin: '2px 0 0' }}>adopciones este mes</p>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #F0ECE0', paddingTop: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Home size={14} color="#8A8375" strokeWidth={1.8} />
                <span style={{ fontSize: '13px', color: '#4A4A42', fontWeight: 500 }}>Ocupación del refugio</span>
              </div>
              <div style={{ height: '9px', borderRadius: '5px', backgroundColor: '#F0ECE0', overflow: 'hidden', position: 'relative' }}>
                <div style={{ height: '100%', width: `${ocupacionPct}%`, backgroundColor: '#356B45', borderRadius: '5px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                <span style={{ fontSize: '12px', color: '#8A8375' }}>{enRefugio} de {totalAnimales} en el refugio</span>
                <span style={{ fontSize: '12px', color: '#356B45', fontWeight: 600 }}>{ocupacionPct}%</span>
              </div>
            </div>
          </div>

          <div style={{
            ...panelBase, gridColumn: 'span 7', padding: 0, overflow: 'hidden',
            backgroundColor: '#1F2E22', border: 'none', minHeight: '300px',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative',
          }}>
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.06 }} preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="pawBig" width="80" height="80" patternUnits="userSpaceOnUse">
                  <g fill="#FAF8F3">
                    <circle cx="40" cy="48" r="9" /><circle cx="26" cy="32" r="5" /><circle cx="54" cy="32" r="5" />
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pawBig)" />
            </svg>

            <div style={{ padding: '32px', position: 'relative' }}>
              <p style={{ ...etiqueta, color: '#A8C4A2', marginBottom: '10px' }}>Animal destacado</p>
              {destacado ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px' }}>
                    <h2 style={{ fontFamily: serif, fontSize: '34px', fontWeight: 500, color: '#FAF8F3', margin: 0 }}>
                      {destacado.nombre}
                    </h2>
                    <Heart size={18} color="#C8A76A" strokeWidth={1.8} />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                    {[destacado.sexo, destacado.edad_estimada ? `${destacado.edad_estimada} años` : null, destacado.tamano]
                      .filter(Boolean).map((tag) => (
                        <span key={tag} style={{
                          fontSize: '12px', color: '#D7CFC0', backgroundColor: 'rgba(255,255,255,0.08)',
                          padding: '4px 11px', borderRadius: '20px', textTransform: 'capitalize',
                        }}>{tag}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '14px', color: '#D7CFC0', lineHeight: 1.6, maxWidth: '420px', margin: '0 0 18px' }}>
                    {destacado.descripcion || 'Esperando encontrar un hogar lleno de cariño.'}
                  </p>
                  <button style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    background: 'none', border: 'none', color: '#A8C4A2',
                    fontSize: '13px', fontWeight: 600, fontFamily: sans, cursor: 'pointer', padding: 0,
                  }}>
                    Ver perfil <ArrowRight size={14} />
                  </button>
                </>
              ) : (
                <p style={{ color: '#D7CFC0' }}>Aún no hay animales registrados.</p>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>

          <div style={{ ...panelBase, gridColumn: 'span 5', padding: '28px' }}>
            <p style={{ ...etiqueta, marginBottom: '20px' }}>Actividad reciente</p>
            {actividad.length === 0 && <p style={{ fontSize: '13px', color: '#8A8375' }}>Sin actividad todavía.</p>}
            <div style={{ position: 'relative', paddingLeft: '20px' }}>
              {actividad.length > 0 && (
                <div style={{ position: 'absolute', left: '4px', top: '6px', bottom: '6px', width: '1px', backgroundColor: '#ECE7DB' }} />
              )}
              {actividad.map((ev, i) => {
                const Icon = ev.icon;
                return (
                  <div key={i} style={{ position: 'relative', paddingBottom: i === actividad.length - 1 ? 0 : '18px' }}>
                    <span style={{
                      position: 'absolute', left: '-20px', top: '2px',
                      width: '18px', height: '18px', borderRadius: '50%',
                      backgroundColor: '#EAF1E7', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={10} color="#2E7D32" strokeWidth={2} />
                    </span>
                    <p style={{ fontSize: '13px', color: '#1F2E22', margin: '0 0 2px', fontWeight: 500 }}>{ev.texto}</p>
                    <p style={{ fontSize: '12px', color: '#A8A497', margin: 0 }}>{formatearFecha(ev.fecha)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ ...panelBase, padding: '24px' }}>
              <p style={{ ...etiqueta, marginBottom: '14px' }}>Próxima vacuna</p>
              {proximaVacuna ? (
                <>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '9px', backgroundColor: '#F7EFDD', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Calendar size={15} color="#C8A76A" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#1F2E22', margin: 0 }}>{formatearFecha(proximaVacuna.fecha_proxima_dosis)}</p>
                      <p style={{ fontSize: '12px', color: '#8A8375', margin: '2px 0 0' }}>{proximaVacuna.tipo_vacuna}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '12px', color: '#8A8375', margin: '0 0 14px' }}>
                    Paciente: <strong style={{ color: '#1F2E22' }}>{proximaVacuna.Animal?.nombre}</strong>
                  </p>
                </>
              ) : (
                <p style={{ fontSize: '13px', color: '#8A8375', marginBottom: '14px' }}>Nada pendiente en 30 días.</p>
              )}
              <button style={{
                width: '100%', padding: '9px', fontSize: '12px', fontWeight: 600, fontFamily: sans,
                backgroundColor: 'transparent', border: '1px solid #E4DFD1', borderRadius: '8px',
                color: '#1F2E22', cursor: 'pointer',
              }}>
                Ver agenda completa
              </button>
            </div>

            <div style={{ ...panelBase, padding: '24px', flex: 1 }}>
              <p style={{ ...etiqueta, marginBottom: '14px' }}>Últimos ingresos</p>
              {(!donaciones || donaciones.length === 0) && <p style={{ fontSize: '12px', color: '#8A8375' }}>Sin donaciones aún.</p>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {donaciones?.slice(0, 3).map((d) => (
                  <div key={d.id_donacion} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C8A76A' }} />
                      <span style={{ fontSize: '12px', color: '#4A4A42' }}>
                        {d.tipo === 'monetaria' ? 'Donación monetaria' : 'Donación en especie'}
                      </span>
                    </div>
                    {d.monto && <span style={{ fontSize: '12px', fontWeight: 600, color: '#1F2E22' }}>Bs. {d.monto}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ ...panelBase, padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                <p style={etiqueta}>Adopciones del mes</p>
                <span style={{ fontFamily: serif, fontSize: '22px', color: '#1F2E22', fontWeight: 500 }}>{adopcionesDelMes.length}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '70px' }}>
                {barrasAdopciones.map((b, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '100%', borderRadius: '4px',
                      height: `${(b.cuenta / maxBarra) * 50 + 4}px`,
                      backgroundColor: b.cuenta > 0 ? '#356B45' : '#EDEAE0',
                    }} />
                    <span style={{ fontSize: '10px', color: '#A8A497' }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...panelBase, padding: '24px', flex: 1 }}>
              <p style={{ ...etiqueta, marginBottom: '16px' }}>Accesos rápidos</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {accesos.map(({ icon: Icon, label }) => (
                  <button key={label} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                    padding: '14px 6px', borderRadius: '10px', border: '1px solid #F0ECE0',
                    backgroundColor: '#FAF8F3', cursor: 'pointer',
                  }}>
                    <Icon size={17} color="#356B45" strokeWidth={1.8} />
                    <span style={{ fontSize: '10.5px', color: '#4A4A42', fontWeight: 500, textAlign: 'center', lineHeight: 1.2 }}>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;