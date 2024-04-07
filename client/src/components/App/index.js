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
        setAuthUser(user);
      });
      return () => listener();
    }
  }, [firebase]);

  return (
    <div>
      <Router>
        <PrivateRoute authUser={authUser} />
      </Router>
    </div>
  );
};

export default App;
