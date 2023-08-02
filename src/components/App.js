import AppRouter from 'components/Router';
import { useEffect, useState } from 'react';
import { authService } from 'myFirebase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: authService.currentUser.displayName
            ? authService.currentUser.displayName
            : 'Anonymous',
          uid: authService.currentUser.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: authService.currentUser.displayName
        ? authService.currentUser.displayName
        : 'Anonymous',
      uid: authService.currentUser.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        'Initializing'
      )}
      <footer style={{ textAlign: 'center' }}>
        {' '}
        &copy; {new Date().getFullYear()} My React Twitter 
      </footer>
    </>
  );
}

export default App;
