import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext, AppContextInterface } from '../../App.context';
import { API_URL } from '../../constants';
import { useInputValue } from '../../hooks';
import './Login.css';

interface ApiLoginResponse {
  access_token: string;
  user: {
    id: number;
  };
}

export function Login() {
  const { login } = useContext(AppContext) as AppContextInterface;
  const navigate = useNavigate();
  const password = useInputValue('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setError('');
    const url = `${API_URL}/auth/login`;
    try {
      const { data } = await axios.post<ApiLoginResponse>(url, {
        username: 'orianak',
        password: password.value,
      });
      login({ authToken: data.access_token, id: data.user.id });
      navigate('/');
    } catch (err) {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="LoginContainer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="passwork">
          Contraseña
          <input
            id="passwork"
            type="password"
            placeholder="********"
            {...password}
          />
        </label>
        {error && <span className="FormError">{error}</span>}
        <button type="button">Login</button>
      </form>
    </div>
  );
}
