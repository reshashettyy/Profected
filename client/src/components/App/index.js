import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import PrivateRoute from '../Navigation/PrivateRoute';
import {FirebaseContext} from '../Firebase';

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (firebase) {
      const listener = firebase.auth.onAuthStateChanged(user => {
        if (user) {
          setAuthUser(user);
        } else {
          setAuthUser(null);
        }
      });
      return () => listener();
    }
  }, [firebase]);
  const authenticated = !!authUser;
  return (
    <div>
      <PrivateRoute authenticated={authenticated} authUser={authUser} />
    </div>
  );
};
export default App;
