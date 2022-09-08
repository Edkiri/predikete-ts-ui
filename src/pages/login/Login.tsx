import axios from 'axios';
import { API_URL } from '../../constants';
import { useInputValue } from '../../hooks';

export function Login() {
  const password = useInputValue('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const url = `${API_URL}/auth/login`;
    try {
      const axiosResponse = await axios.post(url, {
        username: 'orianak',
        password: password.value,
      });
      console.log(axiosResponse);
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  return (
    <div className="LoginContainer">
      <form onSubmit={handleSubmit}>
        <h2>Contraseña</h2>
        <input type="password" {...password} />
        <button type="button">Login</button>
      </form>
    </div>
  );
}
