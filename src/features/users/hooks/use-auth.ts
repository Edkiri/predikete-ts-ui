import { useLocalStorage } from '../../../hooks';

export interface UserInterface {
  id: number;
  displayName: string;
  authToken: string;
  profilePic?: string | null;
}

export interface UseAuthResponse {
  user: UserInterface | undefined;
  login: (payload: UserInterface) => void;
  logout: () => void;
}

export const useAuth = (): UseAuthResponse => {
  const { storedValue: user, setLocalStorage: setUser } =
    useLocalStorage<UserInterface>('user');

  return {
    user,
    login: (payload: UserInterface) => {
      console.log('Login');
      setUser(payload);
    },
    logout: () => {
      console.log('logout');
      setUser(undefined);
      window.localStorage.clear();
    },
  };
};
