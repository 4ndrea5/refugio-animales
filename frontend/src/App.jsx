import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import Animales from './pages/Animales';
import Adopciones from './pages/Adopciones';
import Salud from './pages/Salud';
import Donaciones from './pages/Donaciones';
import Personas from './pages/Personas';
import CatalogoAdoptante from './pages/CatalogoAdoptante';
import RutaProtegida from './components/RutaProtegida';
import { useAuth } from './context/AuthContext';

function Inicio() {
  const { usuario } = useAuth();
  if (usuario?.rol === 'adoptante') {
    return <CatalogoAdoptante />;
  }
  return <Dashboard />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route
        path="/"
        element={
          <RutaProtegida>
            <Inicio />
          </RutaProtegida>
        }
      />
      <Route
        path="/animales"
        element={
          <RutaProtegida rolesPermitidos={['admin', 'veterinario']}>
            <Animales />
          </RutaProtegida>
        }
      />
      <Route
        path="/adopciones"
        element={
          <RutaProtegida rolesPermitidos={['admin', 'veterinario']}>
            <Adopciones />
          </RutaProtegida>
        }
      />
      <Route
        path="/salud"
        element={
          <RutaProtegida rolesPermitidos={['admin', 'veterinario']}>
            <Salud />
          </RutaProtegida>
        }
      />
      <Route
        path="/donaciones"
        element={
          <RutaProtegida rolesPermitidos={['admin', 'veterinario']}>
            <Donaciones />
          </RutaProtegida>
        }
      />
      <Route
        path="/personas"
        element={
          <RutaProtegida rolesPermitidos={['admin']}>
            <Personas />
          </RutaProtegida>
        }
      />
    </Routes>
  );
}

export default App;