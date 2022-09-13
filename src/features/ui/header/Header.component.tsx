import { FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar.component';

import './Header.css';

export function Header() {
  const navigate = useNavigate();
  const goToConfigPage = () => {
    navigate('/config');
  };
  return (
    <header id="Header" className="Header">
      <div className="HeaderRight">
        <Navbar />
      </div>
      <div className="OptionsContainer">
        <button type="button" onClick={goToConfigPage}>
          <FaCog className="Icon" />
        </button>
      </div>
    </header>
  );
}
