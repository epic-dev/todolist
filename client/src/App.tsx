import React, { useEffect, useState } from 'react';
import './fonts/Roboto-Regular.ttf';
import './fonts/Roboto-Medium.ttf';
import { useAppSelector } from './redux/hooks';
import { EnvironmentLabel, Layout, SessionProvider } from './shared/components';
import { authHooks } from './modules/Authentication';
import { Outlet } from 'react-router-dom';

function App() {
  const [isProd] = useState<boolean>(process.env.NODE_ENV === 'production');
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  authHooks.useCheckAuth();

  return (
    <React.StrictMode>
      <EnvironmentLabel display={!isProd} env={process.env.NODE_ENV} />
      <SessionProvider>
        <Layout>
          <Outlet />
        </Layout>
      </SessionProvider>
    </React.StrictMode>
  );
}

export default App;
