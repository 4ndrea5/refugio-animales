import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Animales from './pages/Animales';
import Adopciones from './pages/Adopciones';
import Salud from './pages/Salud';
import Donaciones from './pages/Donaciones';
import RutaProtegida from './components/RutaProtegida';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RutaProtegida>
            <Dashboard />
          </RutaProtegida>
        }
      />
      <Route
        path="/animales"
        element={
          <RutaProtegida>
            <Animales />
          </RutaProtegida>
        }
      />
      <Route
        path="/adopciones"
        element={
          <RutaProtegida>
            <Adopciones />
          </RutaProtegida>
        }
      />
      <Route
        path="/salud"
        element={
          <RutaProtegida>
            <Salud />
          </RutaProtegida>
        }
      />
      <Route
        path="/donaciones"
        element={
          <RutaProtegida>
            <Donaciones />
          </RutaProtegida>
        }
      />
    </Routes>
  );
}

export default App;