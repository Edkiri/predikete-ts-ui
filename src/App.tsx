import { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './features/ui';
import { Home, Login, NotFound, Signup, Verify, MyGroups } from './pages';

import './global.css';
import { useAuth } from './features/users/hooks';
import { AppContext } from './App.context';
import { RequireAuth } from './features/users/containers';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/my-groups"
          element={
            <RequireAuth>
              <MyGroups />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export function WrappedApp() {
  const userValues = useAuth();
  const values = useMemo(() => ({ ...userValues }), [userValues]);
  return (
    <AppContext.Provider value={values}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContext.Provider>
  );
}
