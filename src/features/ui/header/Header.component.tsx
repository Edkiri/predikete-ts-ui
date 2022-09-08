import { useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';

import { Navbar } from '../navbar/Navbar.component';

import logo from '../../../assets/main-logo.png';

import './Header.css';
import { UserNavbar } from '../../users/components';

export function Header() {
  const [displayedNav, setDisplayedNav] = useState(false);

  const handleToggleMenu = () => {
    setDisplayedNav(!displayedNav);
  };

  return (
    <header id="Header" className="Header">
      <a href="/">
        <img className="logo" src={logo} alt="" />
      </a>
      <div className="HeaderRight">
        {!displayedNav && <UserNavbar />}
        <button className="MenuButton" onClick={handleToggleMenu} type="button">
          {displayedNav ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {displayedNav && <Navbar hideMenu={() => setDisplayedNav(false)} />}
    </header>
  );
}
