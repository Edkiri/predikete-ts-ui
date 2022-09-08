import { Link } from 'react-router-dom';

import './Navbar.css';

interface NavbarProps {
  hideMenu: () => void;
}

export function Navbar({ hideMenu }: NavbarProps) {
  return (
    <nav id="Menu" className="Menu">
      <ul>
        <Link onClick={hideMenu} to="/">
          Home
        </Link>
      </ul>
    </nav>
  );
}
