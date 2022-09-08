import axios from 'axios';
import { useContext } from 'react';
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
  const password = useInputValue('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const url = `${API_URL}/auth/login`;
    try {
      const { data } = await axios.post<ApiLoginResponse>(url, {
        username: 'orianak',
        password: password.value,
      });
      login({ authToken: data.access_token, id: data.user.id });
    } catch (err) {
      console.log('ERROR', err);
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
        <button type="button">Login</button>
      </form>
    </div>
  );
}
