import { useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';

import { Navbar } from '../navbar/Navbar.component';

import './Header.css';

export function Header() {
  const [displayedNav, setDisplayedNav] = useState(false);

  const handleToggleMenu = () => {
    setDisplayedNav(!displayedNav);
  };

  return (
    <header id="Header" className="Header">
      <div className="HeaderRight">
        <button className="MenuButton" onClick={handleToggleMenu} type="button">
          {displayedNav ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {displayedNav && <Navbar hideMenu={() => setDisplayedNav(false)} />}
    </header>
  );
}
