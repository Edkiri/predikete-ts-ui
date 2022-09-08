import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './features/ui';
import { Home } from './pages';

import './global.css';
import { AppContext } from './App.context';
import { RequireAuth } from './features/user/require-auth.Component';

export function App() {
  return (
    <Layout>
      <Routes>
        <RequireAuth>
          <Route path="/" element={<Home />} />
        </RequireAuth>
      </Routes>
    </Layout>
  );
}

export function WrappedApp() {
  return (
    <AppContext.Provider value={null}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContext.Provider>
  );
}
