import React from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';

import './Home.css';

export function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/my-groups');
  };

  return (
    <div className="HomeContainer">
      <div className="HeroContainer">
        <img className="LogoImage" src={logo} alt="" />
        <h1>
          Make your <strong>pools</strong> and compite!
        </h1>
      </div>
      <h4 className="ForFree">
        For free<span>!</span>
      </h4>
      <p className="HeroSubtitle">
        Create or join a group and start your predictions
      </p>
      <button type="button" onClick={handleClick} className="StartButton">
        Get Started!
      </button>
      <div className="HomeBgImage"></div>
      <div className="overlay"></div>
    </div>
  );
}
