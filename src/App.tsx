import { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './features/ui';
import { Home } from './pages';

import './global.css';
import { AppContext } from './App.context';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
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
