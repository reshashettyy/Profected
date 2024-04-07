import * as React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Landing from '../Landing/Landing';
import Matching from '../Matching';
import MainCalendar from '../Calendar/Calendar';
import Resources from '../Resources';
import SignUp from '../auth/SignUp/SignUp';
import Login from '../auth/Login/Login';
import Profile from '../Profile/Profile';

const PrivateRoute = ({authUser}) => {
  const isAuthenticated = !!authUser;

  return (
    <React.Fragment>
      <Navigation isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/matching"
          element={authUser ? <Matching /> : <Navigate to="/login" />}
        />
        <Route
          path="/maincalendar"
          element={authUser ? <MainCalendar /> : <Navigate to="/login" />}
        />
        <Route
          path="/resources"
          element={authUser ? <Resources /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </React.Fragment>
  );
};

export default PrivateRoute;
