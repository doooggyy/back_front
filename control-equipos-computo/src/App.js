import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import BarraNavegacion from './barra-navegacion';
import Home from './home';
import Estado from './estado';
import InicioSesion from './inicio-sesion';
import TipoEquipo from './tipo-equipo';
import Marca from './marca';
import Usuario from './usuarios';

function App() {
  return (
    <div className="container">
      <Router>
        <BarraNavegacion />
        <Routes>
          <Route index element={<Home />} />
          <Route path="estado" element={<Estado />} />
          <Route path="marcas" element={<Marca />} />
          <Route path="usuarios" element={<Usuario />} />
          <Route path="tipo-equipo" element={<TipoEquipo />} />
          <Route path="inicio-sesion" element={<InicioSesion />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
