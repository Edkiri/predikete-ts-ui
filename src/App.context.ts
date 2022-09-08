import { createContext } from 'react';
import { UseAuthResponse } from './features/users/hooks/use-auth';

export interface AppContextInterface extends UseAuthResponse {}

export const AppContext = createContext<AppContextInterface | null>(null);
