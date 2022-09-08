import { createContext } from 'react';

export interface AppContextInterface {
  authToken: string;
}

export const AppContext = createContext<AppContextInterface | null>(null);
