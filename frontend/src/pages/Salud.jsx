import { useState } from 'react';
import { Plus, X, Stethoscope, Syringe, PawPrint } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAnimales } from '../hooks/useAnimales';
import { useHistorialPorAnimal } from '../hooks/useHistorialPorAnimal';
import { useVacunasPorAnimal } from '../hooks/useVacunasPorAnimal';
import { useCrearHistorial } from '../hooks/useCrearHistorial';
import { useCrearVacuna } from '../hooks/useCrearVacuna';

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

function ModalHistorial({ idAnimal, onClose }) {
  const crearHistorial = useCrearHistorial();
  const [form, setForm] = useState({ diagnostico: '', tratamiento: '', peso: '', observaciones: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    crearHistorial.mutate(
      { ...form, id_animal: idAnimal, peso: form.peso ? parseFloat(form.peso) : null },
      { onSuccess: onClose }
    );
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(31,46,34,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={onClose}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '32px', width: '100%', maxWidth: '440px', fontFamily: sans }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: serif, fontSize: '20px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>Nueva consulta médica</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="#8A8375" /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Diagnóstico</label>
            <textarea style={{ ...inputStyle, minHeight: '70px', fontFamily: sans }} value={form.diagnostico} onChange={(e) => setForm({ ...form, diagnostico: e.target.value })} required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Tratamiento</label>
            <textarea style={{ ...inputStyle, minHeight: '60px', fontFamily: sans }} value={form.tratamiento} onChange={(e) => setForm({ ...form, tratamiento: e.target.value })} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Peso (kg)</label>
            <input type="number" step="0.1" style={inputStyle} value={form.peso} onChange={(e) => setForm({ ...form, peso: e.target.value })} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Observaciones</label>
            <textarea style={{ ...inputStyle, minHeight: '50px', fontFamily: sans }} value={form.observaciones} onChange={(e) => setForm({ ...form, observaciones: e.target.value })} />
          </div>
          {crearHistorial.isError && <p style={{ color: '#A6564F', fontSize: '13px', marginBottom: '16px' }}>Error al guardar. Intenta de nuevo.</p>}
          <button type="submit" disabled={crearHistorial.isPending} style={{
            width: '100%', padding: '12px', fontSize: '14px', fontWeight: 700, fontFamily: sans,
            backgroundColor: '#356B45', color: '#fff', border: 'none', borderRadius: '9px',
            cursor: crearHistorial.isPending ? 'default' : 'pointer', opacity: crearHistorial.isPending ? 0.6 : 1,
          }}>
            {crearHistorial.isPending ? 'Guardando...' : 'Guardar consulta'}
          </button>
        </form>
      </div>
    </div>
  );
}

function ModalVacuna({ idAnimal, onClose }) {
  const crearVacuna = useCrearVacuna();
  const [form, setForm] = useState({ tipo_vacuna: '', fecha_aplicacion: '', fecha_proxima_dosis: '', lote: '', observaciones: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    crearVacuna.mutate({ ...form, id_animal: idAnimal }, { onSuccess: onClose });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(31,46,34,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={onClose}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '32px', width: '100%', maxWidth: '440px', fontFamily: sans }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: serif, fontSize: '20px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>Nueva vacuna</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="#8A8375" /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Tipo de vacuna</label>
            <input style={inputStyle} value={form.tipo_vacuna} onChange={(e) => setForm({ ...form, tipo_vacuna: e.target.value })} required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Fecha de aplicación</label>
              <input type="date" style={inputStyle} value={form.fecha_aplicacion} onChange={(e) => setForm({ ...form, fecha_aplicacion: e.target.value })} required />
            </div>
            <div>
              <label style={labelStyle}>Próxima dosis</label>
              <input type="date" style={inputStyle} value={form.fecha_proxima_dosis} onChange={(e) => setForm({ ...form, fecha_proxima_dosis: e.target.value })} />
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Lote</label>
            <input style={inputStyle} value={form.lote} onChange={(e) => setForm({ ...form, lote: e.target.value })} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Observaciones</label>
            <textarea style={{ ...inputStyle, minHeight: '50px', fontFamily: sans }} value={form.observaciones} onChange={(e) => setForm({ ...form, observaciones: e.target.value })} />
          </div>
          {crearVacuna.isError && <p style={{ color: '#A6564F', fontSize: '13px', marginBottom: '16px' }}>Error al guardar. Intenta de nuevo.</p>}
          <button type="submit" disabled={crearVacuna.isPending} style={{
            width: '100%', padding: '12px', fontSize: '14px', fontWeight: 700, fontFamily: sans,
            backgroundColor: '#356B45', color: '#fff', border: 'none', borderRadius: '9px',
            cursor: crearVacuna.isPending ? 'default' : 'pointer', opacity: crearVacuna.isPending ? 0.6 : 1,
          }}>
            {crearVacuna.isPending ? 'Guardando...' : 'Guardar vacuna'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Salud() {
  const { data: animales, isLoading: cargandoAnimales } = useAnimales();
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
  const [modal, setModal] = useState(null);

  const { data: historial, isLoading: cargandoHistorial } = useHistorialPorAnimal(animalSeleccionado?.id_animal);
  const { data: vacunas, isLoading: cargandoVacunas } = useVacunasPorAnimal(animalSeleccionado?.id_animal);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F7F3' }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '40px 44px', boxSizing: 'border-box', fontFamily: sans }}>
        <h1 style={{ fontFamily: serif, fontSize: '32px', fontWeight: 500, color: '#1F2E22', margin: '0 0 6px' }}>Salud</h1>
        <p style={{ fontSize: '14px', color: '#8A8375', margin: '0 0 28px' }}>Historial médico y vacunas por animal</p>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'flex-start' }}>

          {/* Lista de animales */}
          <div style={{ ...panelBase, padding: '12px' }}>
            {cargandoAnimales && <p style={{ padding: '12px', fontSize: '13px', color: '#8A8375' }}>Cargando...</p>}
            {animales?.map((a) => (
              <button
                key={a.id_animal}
                onClick={() => setAnimalSeleccionado(a)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                  padding: '10px 12px', borderRadius: '9px', border: 'none', textAlign: 'left',
                  backgroundColor: animalSeleccionado?.id_animal === a.id_animal ? '#EAF1E7' : 'transparent',
                  cursor: 'pointer', marginBottom: '2px',
                }}
              >
                <PawPrint size={15} color="#356B45" strokeWidth={1.8} />
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#1F2E22', fontFamily: sans }}>{a.nombre}</span>
              </button>
            ))}
          </div>

          {/* Detalle del animal seleccionado */}
          {!animalSeleccionado && (
            <div style={{ ...panelBase, padding: '48px', textAlign: 'center' }}>
              <p style={{ color: '#8A8375', fontSize: '14px' }}>Selecciona un animal para ver su historial médico y vacunas.</p>
            </div>
          )}

          {animalSeleccionado && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Historial médico */}
              <div style={{ ...panelBase, padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Stethoscope size={17} color="#356B45" />
                    <h3 style={{ fontFamily: serif, fontSize: '18px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>
                      Historial médico · {animalSeleccionado.nombre}
                    </h3>
                  </div>
                  <button
                    onClick={() => setModal('historial')}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px',
                      fontSize: '12px', fontWeight: 600, fontFamily: sans, backgroundColor: '#356B45',
                      color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer',
                    }}
                  >
                    <Plus size={13} /> Nueva consulta
                  </button>
                </div>

                {cargandoHistorial && <p style={{ fontSize: '13px', color: '#8A8375' }}>Cargando...</p>}
                {!cargandoHistorial && historial?.length === 0 && <p style={{ fontSize: '13px', color: '#8A8375' }}>Sin registros médicos aún.</p>}

                {historial?.map((h) => (
                  <div key={h.id_historial} style={{ padding: '12px 0', borderTop: '1px solid #F0ECE0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2E22' }}>{h.diagnostico}</span>
                      <span style={{ fontSize: '12px', color: '#8A8375' }}>{formatearFecha(h.fecha)}</span>
                    </div>
                    {h.tratamiento && <p style={{ fontSize: '12px', color: '#4A4A42', margin: '0 0 2px' }}>Tratamiento: {h.tratamiento}</p>}
                    {h.peso && <p style={{ fontSize: '12px', color: '#8A8375', margin: 0 }}>Peso: {h.peso} kg · Atendido por {h.veterinario?.nombre}</p>}
                  </div>
                ))}
              </div>

              {/* Vacunas */}
              <div style={{ ...panelBase, padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Syringe size={17} color="#356B45" />
                    <h3 style={{ fontFamily: serif, fontSize: '18px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>
                      Vacunas · {animalSeleccionado.nombre}
                    </h3>
                  </div>
                  <button
                    onClick={() => setModal('vacuna')}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px',
                      fontSize: '12px', fontWeight: 600, fontFamily: sans, backgroundColor: '#356B45',
                      color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer',
                    }}
                  >
                    <Plus size={13} /> Nueva vacuna
                  </button>
                </div>

                {cargandoVacunas && <p style={{ fontSize: '13px', color: '#8A8375' }}>Cargando...</p>}
                {!cargandoVacunas && vacunas?.length === 0 && <p style={{ fontSize: '13px', color: '#8A8375' }}>Sin vacunas registradas aún.</p>}

                {vacunas?.map((v) => (
                  <div key={v.id_vacuna} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid #F0ECE0' }}>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#1F2E22', margin: '0 0 2px' }}>{v.tipo_vacuna}</p>
                      <p style={{ fontSize: '12px', color: '#8A8375', margin: 0 }}>Aplicada el {formatearFecha(v.fecha_aplicacion)}</p>
                    </div>
                    {v.fecha_proxima_dosis && (
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#A6564F', backgroundColor: '#F7EAE8', padding: '4px 9px', borderRadius: '6px', height: 'fit-content' }}>
                        Próxima: {formatearFecha(v.fecha_proxima_dosis)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {modal === 'historial' && <ModalHistorial idAnimal={animalSeleccionado.id_animal} onClose={() => setModal(null)} />}
      {modal === 'vacuna' && <ModalVacuna idAnimal={animalSeleccionado.id_animal} onClose={() => setModal(null)} />}
    </div>
  );
}

export default Salud;