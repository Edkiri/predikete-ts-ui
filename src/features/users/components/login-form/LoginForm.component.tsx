import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import { AppContext, AppContextInterface } from '../../../../App.context';
import { useInputValue } from '../../../../hooks';
import { API_URL } from '../../../../constants';
import { ApiLoginResponse } from '../../../../api-interfaces';

import './LoginForm.css';

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AppContext) as AppContextInterface;

  const navigate = useNavigate();

  const email = useInputValue('');
  const password = useInputValue('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const formData = { email: email.value, password: password.value };
    setLoading(true);
    setError('');
    axios
      .post<ApiLoginResponse>(`${API_URL}/auth/login`, formData, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 201) {
          const { user, access_token } = res.data;
          login({
            id: user.id,
            displayName: user.displayName,
            authToken: access_token,
          });
          navigate('/');
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="LoginFormContainer">
      <h2>Login</h2>

      <div className="LoginForm">
        <div className="FormItem">
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="text"
              placeholder="oriana@example.com"
              disabled={loading}
              {...email}
            />
          </label>
        </div>
        <div className="FormItem">
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              placeholder="*****"
              disabled={loading}
              {...password}
            />
          </label>
        </div>
      </div>

      <p className="SignupP">
        Don`t have an account?<Link to="/signup">Create new</Link>
      </p>
      {error && <p className="FormError">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
