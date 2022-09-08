import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from '../../../../constants';
import { useInputValue } from '../../../../hooks';

import './SignUpForm.css';

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const email = useInputValue('');
  const username = useInputValue('');
  const password = useInputValue('');
  const rePassword = useInputValue('');

  const navigate = useNavigate();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    if (password.value === rePassword.value) {
      const formData = {
        displayName: username.value,
        email: email.value,
        password: password.value,
      };
      axios
        .post(`${API_URL}/user/signup`, formData, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        })
        .then((res) => {
          setLoading(false);
          if (res.status === 201) {
            navigate('/verify');
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data.message);
        });
    } else {
      setLoading(false);
      setError('Passwords does not match');
    }
  };

  return (
    <form className="SignupFormContainer" onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <div className="SignupForm">
        <div className="FormItem">
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              placeholder="oriana@example.com"
              disabled={loading}
              {...email}
            />
          </label>
        </div>
        <div className="FormItem">
          <label htmlFor="username">
            Username
            <input
              id="username"
              type="text"
              placeholder="OrianaK"
              disabled={loading}
              {...username}
            />
          </label>
        </div>
        <div className="FormItem">
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              placeholder="*******"
              disabled={loading}
              {...password}
            />
          </label>
        </div>
        <div className="FormItem">
          <label htmlFor="rePassword">
            Password confirmation
            <input
              id="rePassword"
              type="password"
              placeholder="*******"
              {...rePassword}
              disabled={loading}
            />
          </label>
        </div>
      </div>
      {loading && <p className="FormLoading">Loading...</p>}
      {error && <p className="FormError">{error}</p>}

      <button type="submit" disabled={loading}>
        Sign up
      </button>
    </form>
  );
}
