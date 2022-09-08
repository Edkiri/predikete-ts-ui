import { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './features/ui';
import { Home } from './pages';

import './global.css';
import { AppContext } from './App.context';
import { RequireAuth, useAuth } from './features/user';
import { Login } from './pages/login/Login';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
      </Routes>
    </Layout>
  );
}

export function WrappedApp() {
  const { user, login, logout } = useAuth();
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return (
    <AppContext.Provider value={value}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContext.Provider>
  );
}
