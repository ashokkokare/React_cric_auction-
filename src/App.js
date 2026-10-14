import { useEffect, useState } from 'react';
import LandingPage from './features/landing/LandingPage';
import { getCurrentUser, logout } from './services/authApi';

function App() {
  const [user, setUser] = useState(null);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then((currentUser) => { if (active) setUser(currentUser); })
      .catch(() => { if (active) setUser(null); })
      .finally(() => { if (active) setSessionReady(true); });
    return () => { active = false; };
  }, []);

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  return (
    <LandingPage
      user={user}
      sessionReady={sessionReady}
      onAuthenticated={setUser}
      onLogout={handleLogout}
    />
  );
}

export default App;
