import { Link } from 'react-router-dom';

import './Navbar.css';

export function Navbar() {
  return (
    <nav id="Menu" className="Menu">
      <ul>
        <Link to="/">Obras</Link>
        <Link to="/config">Configuración</Link>
      </ul>
    </nav>
  );
}
