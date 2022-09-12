import { Navbar } from '../navbar/Navbar.component';

import './Header.css';

export function Header() {
  return (
    <header id="Header" className="Header">
      <div className="HeaderRight">
        <Navbar />
      </div>
    </header>
  );
}
