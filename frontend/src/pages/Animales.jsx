import { useState } from 'react';
import { Plus, X, PawPrint } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAnimales } from '../hooks/useAnimales';
import { useCrearAnimal } from '../hooks/useCrearAnimal';

const sans = '"Inter", system-ui, sans-serif';
const serif = '"Fraunces", Georgia, serif';

const estadoColor = {
  disponible: { bg: '#EAF1E7', text: '#2E7D32' },
  en_proceso: { bg: '#F7EFDD', text: '#C8A76A' },
  adoptado: { bg: '#E9E7E1', text: '#5A5A50' },
  en_tratamiento: { bg: '#F7EAE8', text: '#A6564F' },
  no_disponible: { bg: '#F0ECE0', text: '#8A8375' },
};

const estadoLabel = {
  disponible: 'Disponible',
  en_proceso: 'En proceso',
  adoptado: 'Adoptado',
  en_tratamiento: 'En tratamiento',
  no_disponible: 'No disponible',
};

function ModalNuevoAnimal({ onClose }) {
  const crearAnimal = useCrearAnimal();
  const [form, setForm] = useState({
    nombre: '',
    especie: 'perro',
    raza: '',
    edad_estimada: '',
    sexo: 'macho',
    tamano: 'mediano',
    color: '',
    descripcion: '',
  });

  const handleChange = (campo) => (e) => setForm({ ...form, [campo]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    crearAnimal.mutate(
      { ...form, edad_estimada: form.edad_estimada ? parseInt(form.edad_estimada) : null },
      { onSuccess: onClose }
    );
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    fontFamily: sans,
    border: '1px solid #E4DFD1',
    borderRadius: '8px',
    backgroundColor: '#FAF8F3',
    color: '#1F2E22',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: '#4A4A42',
    marginBottom: '6px',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(31,46,34,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          padding: '32px',
          width: '100%',
          maxWidth: '480px',
          maxHeight: '90vh',
          overflowY: 'auto',
          fontFamily: sans,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: serif, fontSize: '22px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>
            Registrar animal
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} color="#8A8375" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Nombre</label>
            <input style={inputStyle} value={form.nombre} onChange={handleChange('nombre')} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Especie</label>
              <select style={inputStyle} value={form.especie} onChange={handleChange('especie')}>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Sexo</label>
              <select style={inputStyle} value={form.sexo} onChange={handleChange('sexo')}>
                <option value="macho">Macho</option>
                <option value="hembra">Hembra</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Raza</label>
              <input style={inputStyle} value={form.raza} onChange={handleChange('raza')} />
            </div>
            <div>
              <label style={labelStyle}>Edad estimada</label>
              <input type="number" min="0" style={inputStyle} value={form.edad_estimada} onChange={handleChange('edad_estimada')} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Tamaño</label>
              <select style={inputStyle} value={form.tamano} onChange={handleChange('tamano')}>
                <option value="pequeno">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Color</label>
              <input style={inputStyle} value={form.color} onChange={handleChange('color')} />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Descripción</label>
            <textarea
              style={{ ...inputStyle, minHeight: '80px', resize: 'vertical', fontFamily: sans }}
              value={form.descripcion}
              onChange={handleChange('descripcion')}
            />
          </div>

          {crearAnimal.isError && (
            <p style={{ color: '#A6564F', fontSize: '13px', marginBottom: '16px' }}>
              Error al registrar el animal. Intenta de nuevo.
            </p>
          )}

          <button
            type="submit"
            disabled={crearAnimal.isPending}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: sans,
              backgroundColor: '#356B45',
              color: '#fff',
              border: 'none',
              borderRadius: '9px',
              cursor: crearAnimal.isPending ? 'default' : 'pointer',
              opacity: crearAnimal.isPending ? 0.6 : 1,
            }}
          >
            {crearAnimal.isPending ? 'Guardando...' : 'Registrar animal'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Animales() {
  const { data: animales, isLoading } = useAnimales();
  const [filtro, setFiltro] = useState('todos');
  const [modalAbierto, setModalAbierto] = useState(false);

  const animalesFiltrados = animales ? animales.filter((a) => filtro === 'todos' || a.estado === filtro) : [];

  const filtros = [
    { valor: 'todos', label: 'Todos' },
    { valor: 'disponible', label: 'Disponibles' },
    { valor: 'en_proceso', label: 'En proceso' },
    { valor: 'adoptado', label: 'Adoptados' },
    { valor: 'en_tratamiento', label: 'En tratamiento' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F7F3' }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '40px 44px', boxSizing: 'border-box', fontFamily: sans }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontFamily: serif, fontSize: '32px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>
              Animales
            </h1>
            <p style={{ fontSize: '14px', color: '#8A8375', margin: '6px 0 0' }}>
              {animales ? animales.length : 0} animales registrados en el refugio
            </p>
          </div>

          <button
            onClick={() => setModalAbierto(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 18px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: sans,
              backgroundColor: '#356B45',
              color: '#fff',
              border: 'none',
              borderRadius: '9px',
              cursor: 'pointer',
            }}
          >
            <Plus size={16} /> Registrar animal
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          {filtros.map((f) => (
            <button
              key={f.valor}
              onClick={() => setFiltro(f.valor)}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: sans,
                borderRadius: '20px',
                border: '1px solid #E4DFD1',
                backgroundColor: filtro === f.valor ? '#1F2E22' : '#FFFFFF',
                color: filtro === f.valor ? '#FFFFFF' : '#4A4A42',
                cursor: 'pointer',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {isLoading && <p style={{ color: '#8A8375' }}>Cargando animales...</p>}

        {!isLoading && animalesFiltrados.length === 0 && (
          <p style={{ color: '#8A8375' }}>No hay animales en esta categoría.</p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {animalesFiltrados.map((animal) => {
            const colores = estadoColor[animal.estado] || estadoColor.disponible;
            return (
              <div
                key={animal.id_animal}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid #ECE7DB',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '10px',
                    backgroundColor: '#EAF1E7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                  }}
                >
                  <PawPrint size={32} color="#8FA88A" strokeWidth={1.5} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <h3 style={{ fontFamily: serif, fontSize: '19px', fontWeight: 500, color: '#1F2E22', margin: 0 }}>
                    {animal.nombre}
                  </h3>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 9px',
                      borderRadius: '20px',
                      backgroundColor: colores.bg,
                      color: colores.text,
                    }}
                  >
                    {estadoLabel[animal.estado]}
                  </span>
                </div>

                <p style={{ fontSize: '13px', color: '#8A8375', margin: '0 0 10px', textTransform: 'capitalize' }}>
                  {animal.especie} · {animal.raza || 'mestizo'} · {animal.sexo}
                </p>

                <p style={{ fontSize: '13px', color: '#4A4A42', margin: 0, lineHeight: 1.5 }}>
                  {animal.descripcion ? animal.descripcion.slice(0, 80) : 'Sin descripción.'}
                  {animal.descripcion && animal.descripcion.length > 80 ? '…' : ''}
                </p>
              </div>
            );
          })}
        </div>
      </main>

      {modalAbierto && <ModalNuevoAnimal onClose={() => setModalAbierto(false)} />}
    </div>
  );
}

export default Animales;