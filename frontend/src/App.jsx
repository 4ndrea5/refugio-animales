import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<h1>Página principal (pronto)</h1>} />
    </Routes>
  );
}

export default App;