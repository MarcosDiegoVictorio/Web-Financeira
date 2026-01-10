import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Categorias from './pages/Categorias';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Quando o caminho for vazio (raiz), mostra Login */}
        <Route path="/" element={<Login />} />
        
        {/* Quando o caminho for /menu, mostra o Menu */}
        <Route path="/menu" element={<Menu />} />

        {/* Quando o caminho for /categorias, mostra Categorias */}
        <Route path="/categorias" element={<Categorias />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;