import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Animales from './pages/Animales';
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
    </Routes>
  );
}

export default App;