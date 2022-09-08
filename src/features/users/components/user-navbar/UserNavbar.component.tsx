import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowDown } from 'react-icons/fa';

import { AppContext, AppContextInterface } from '../../../../App.context';
import { useProfilePic } from '../../hooks';

import './UserNavbar.css';

export function UserNavbar() {
  const { user, logout } = useContext(AppContext) as AppContextInterface;
  const [isToggled, setIsToggled] = useState(false);
  const { profilePicUrl } = useProfilePic();

  const handleLogout = () => {
    setIsToggled(false);
    logout();
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="UserHeaderContainer">
      {user ? (
        <>
          <button
            type="button"
            className="TopUserHeaderContainer"
            onClick={handleToggle}
          >
            <img className="UserAvatar" src={profilePicUrl} alt="user avatar" />
            <span>{user.displayName}</span>
            <FaArrowDown className={`ToggleArrow ${isToggled && 'toggled'}`} />
          </button>
          <div className={`ToggleContainer ${isToggled && 'toggled'}`}>
            <ul className="UserFunctionsList">
              <Link to="/update-profile" onClick={() => setIsToggled(false)}>
                <li>Update profile</li>
              </Link>
              <button type="button" id="logout" onClick={handleLogout}>
                Logout
              </button>
            </ul>
          </div>
          {/* <Notifications /> */}
          {isToggled && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, prettier/prettier
            <div className="DarkLayout" onClick={() => setIsToggled(false)} />
          )}
        </>
      ) : (
        <Link className="LoginButton" to="/login">
          Login
        </Link>
      )}
    </div>
  );
}
