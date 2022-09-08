import { createContext } from 'react';
import { User } from './features/user/interfaces/user.interface';

export interface AppContextInterface {
  user: User | null;
  login: (payload: User | null) => void;
  logout: () => void;
}

export const AppContext = createContext<AppContextInterface | null>(null);
