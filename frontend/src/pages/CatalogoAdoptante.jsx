import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, PawPrint, Heart, Clock, CheckCircle2, XCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAnimales } from '../hooks/useAnimales';
import { useSolicitudesMias } from '../hooks/useSolicitudesMias';
import { useCrearSolicitud } from '../hooks/useCrearSolicitud';

const sans = '"Inter", system-ui, sans-serif';
const serif = '"Fraunces", Georgia, serif';

const panelBase = {
  backgroundColor: '#FFFFFF',
  borderRadius: '14px',
  border: '1px solid #ECE7DB',
  boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
  boxSizing: 'border-box',
};

const estadoInfo = {
  pendiente: { label: 'Pendiente', color: '#C8A76A', bg: '#F7EFDD', icon: Clock },
  en_revision: { label: 'En revisión', color: '#C8A76A', bg: '#F7EFDD', icon: Clock },
  aprobada: { label: 'Aprobada', color: '#2E7D32', bg: '#EAF1E7', icon: CheckCircle2 },
  rechazada: { label: 'Rechazada', color: '#A6564F', bg: '#F7EAE8', icon: XCircle },
};

function ModalSolicitud({ animal, onClose }) {
  const crearSolicitud = useCrearSolicitud();
  const [motivo, setMotivo] = useState('');
  const [respuestas, setRespuestas] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    crearSolicitud.mutate(
      { id_animal: animal.id_animal, motivo, respuestas_cuestionario: respuestas },
      { onSuccess: onClose }
    );
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px', fontSize: '14px', fontFamily: sans,
    border: '1px solid #E4DFD1', borderRadius: '8px', backgroundColor: '#FAF8F3',
    color: '#1F2E22', boxSizing: 'border-box', minHeight: '70px',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(31,46,34,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={onClose}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '32px', width: '100%', maxWidth: '440px', fontFamily: sans }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: serif, fontSize: '20px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>
            Solicitar adopción de {animal.nombre}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} color="#8A8375" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4A4A42', marginBottom: '6px' }}>
              ¿Por qué quieres adoptar a {animal.nombre}?
            </label>
            <textarea style={inputStyle} value={motivo} onChange={(e) => setMotivo(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4A4A42', marginBottom: '6px' }}>
              Cuéntanos sobre tu hogar (espacio, otras mascotas, experiencia)
            </label>
            <textarea style={inputStyle} value={respuestas} onChange={(e) => setRespuestas(e.target.value)} />
          </div>
          {crearSolicitud.isError && (
            <p style={{ color: '#A6564F', fontSize: '13px', marginBottom: '16px' }}>
              {crearSolicitud.error?.response?.data?.error || 'Error al enviar la solicitud.'}
            </p>
          )}
          <button type="submit" disabled={crearSolicitud.isPending} style={{
            width: '100%', padding: '12px', fontSize: '14px', fontWeight: 700, fontFamily: sans,
            backgroundColor: '#356B45', color: '#fff', border: 'none', borderRadius: '9px',
            cursor: crearSolicitud.isPending ? 'default' : 'pointer', opacity: crearSolicitud.isPending ? 0.6 : 1,
          }}>
            {crearSolicitud.isPending ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>
      </div>
    </div>
  );
}

function CatalogoAdoptante() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const { data: animales, isLoading } = useAnimales();
  const { data: misSolicitudes } = useSolicitudesMias();
  const [animalParaAdoptar, setAnimalParaAdoptar] = useState(null);
  const [tab, setTab] = useState('catalogo');

  const disponibles = animales?.filter((a) => a.estado === 'disponible') || [];

  const yaSolicitado = (idAnimal) =>
    misSolicitudes?.some((s) => s.id_animal === idAnimal && (s.estado === 'pendiente' || s.estado === 'en_revision'));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F7F3', fontFamily: sans }}>
      {/* Header simple */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 44px', backgroundColor: '#1F2E22',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PawPrint size={20} color="#F5F5DC" strokeWidth={1.8} />
          <span style={{ fontFamily: serif, fontSize: '17px', fontWeight: 500, color: '#FAF8F3' }}>
            Hogar de Cuatro Patas
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: '#C7CFC3' }}>Hola, {usuario?.nombre}</span>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px',
              fontSize: '12px', fontWeight: 600, fontFamily: sans, backgroundColor: 'transparent',
              color: '#F5F5DC', border: '1px solid #3A4A3D', borderRadius: '8px', cursor: 'pointer',
            }}
          >
            <LogOut size={13} /> Cerrar sesión
          </button>
        </div>
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 32px' }}>
        <h1 style={{ fontFamily: serif, fontSize: '30px', fontWeight: 500, color: '#1F2E22', margin: '0 0 6px' }}>
          Encuentra a tu compañero
        </h1>
        <p style={{ fontSize: '14px', color: '#8A8375', margin: '0 0 28px' }}>
          Animales esperando un hogar lleno de cariño
        </p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          <button
            onClick={() => setTab('catalogo')}
            style={{
              padding: '9px 18px', fontSize: '13px', fontWeight: 600, fontFamily: sans,
              borderRadius: '20px', border: '1px solid #E4DFD1',
              backgroundColor: tab === 'catalogo' ? '#1F2E22' : '#FFFFFF',
              color: tab === 'catalogo' ? '#FFFFFF' : '#4A4A42', cursor: 'pointer',
            }}
          >
            Animales disponibles
          </button>
          <button
            onClick={() => setTab('mias')}
            style={{
              padding: '9px 18px', fontSize: '13px', fontWeight: 600, fontFamily: sans,
              borderRadius: '20px', border: '1px solid #E4DFD1',
              backgroundColor: tab === 'mias' ? '#1F2E22' : '#FFFFFF',
              color: tab === 'mias' ? '#FFFFFF' : '#4A4A42', cursor: 'pointer',
            }}
          >
            Mis solicitudes {misSolicitudes?.length > 0 && `(${misSolicitudes.length})`}
          </button>
        </div>

        {tab === 'catalogo' && (
          <>
            {isLoading && <p style={{ color: '#8A8375' }}>Cargando animales...</p>}
            {!isLoading && disponibles.length === 0 && (
              <p style={{ color: '#8A8375' }}>No hay animales disponibles para adopción por ahora.</p>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
              {disponibles.map((animal) => (
                <div key={animal.id_animal} style={{ ...panelBase, padding: '20px' }}>
                  <div style={{
                    width: '100%', height: '130px', borderRadius: '10px', backgroundColor: '#EAF1E7',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px',
                  }}>
                    <PawPrint size={32} color="#8FA88A" strokeWidth={1.5} />
                  </div>

                  <h3 style={{ fontFamily: serif, fontSize: '19px', fontWeight: 500, color: '#1F2E22', margin: '0 0 4px' }}>
                    {animal.nombre}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#8A8375', margin: '0 0 10px', textTransform: 'capitalize' }}>
                    {animal.especie} · {animal.raza || 'mestizo'} · {animal.sexo}
                    {animal.edad_estimada ? ` · ${animal.edad_estimada} años` : ''}
                  </p>
                  <p style={{ fontSize: '13px', color: '#4A4A42', margin: '0 0 16px', lineHeight: 1.5 }}>
                    {animal.descripcion?.slice(0, 70) || 'Esperando un hogar lleno de cariño.'}
                    {animal.descripcion?.length > 70 ? '…' : ''}
                  </p>

                  {yaSolicitado(animal.id_animal) ? (
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      width: '100%', padding: '10px', fontSize: '13px', fontWeight: 600,
                      backgroundColor: '#F7EFDD', color: '#C8A76A', borderRadius: '8px',
                    }}>
                      <Clock size={14} /> Solicitud enviada
                    </div>
                  ) : (
                    <button
                      onClick={() => setAnimalParaAdoptar(animal)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        width: '100%', padding: '10px', fontSize: '13px', fontWeight: 700, fontFamily: sans,
                        backgroundColor: '#356B45', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer',
                      }}
                    >
                      <Heart size={14} /> Quiero adoptarlo
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'mias' && (
          <div style={{ ...panelBase, overflow: 'hidden' }}>
            {!misSolicitudes || misSolicitudes.length === 0 ? (
              <p style={{ padding: '24px', color: '#8A8375' }}>Aún no has enviado ninguna solicitud.</p>
            ) : (
              misSolicitudes.map((s, i) => {
                const info = estadoInfo[s.estado] || estadoInfo.pendiente;
                const Icon = info.icon;
                return (
                  <div key={s.id_solicitud} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '18px 24px', borderTop: i === 0 ? 'none' : '1px solid #F0ECE0',
                  }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#1F2E22', margin: '0 0 2px' }}>
                        {s.Animal?.nombre}
                      </p>
                      <p style={{ fontSize: '12px', color: '#8A8375', margin: 0 }}>
                        Solicitado el {new Date(s.fecha_solicitud).toLocaleDateString('es-BO', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      fontSize: '12px', fontWeight: 600, padding: '5px 12px', borderRadius: '20px',
                      backgroundColor: info.bg, color: info.color,
                    }}>
                      <Icon size={13} /> {info.label}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>

      {animalParaAdoptar && (
        <ModalSolicitud animal={animalParaAdoptar} onClose={() => setAnimalParaAdoptar(null)} />
      )}
    </div>
  );
}

export default CatalogoAdoptante;