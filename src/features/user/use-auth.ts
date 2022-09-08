import { useLocalStorage } from '../../hooks';
import { User } from './interfaces/user.interface';

export interface UseAuthResponse {
  user: User | null;
  login: (payload: User) => void;
  logout: () => void;
}

export const useAuth = (): UseAuthResponse => {
  const { storedValue: user, setLocalStorage: setUser } =
    useLocalStorage<User>('user');

  return {
    user,
    login: (payload: User) => {
      setUser(payload);
    },
    logout: () => {
      setUser(null);
      window.localStorage.clear();
    },
  };
};
