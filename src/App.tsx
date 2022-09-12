import { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './features/ui';

import { AppContext } from './App.context';
import { RequireAuth, useAuth } from './features/user';
import { BudgetPage, Config, Home, Login } from './pages';
import './global.css';

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
        <Route
          path="/budget"
          element={
            <RequireAuth>
              <BudgetPage />
            </RequireAuth>
          }
        />
        <Route
          path="/config"
          element={
            <RequireAuth>
              <Config />
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
