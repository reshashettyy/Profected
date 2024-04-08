import * as React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Navigation from '../Navigation/Navigation';
import Landing from '../Landing/Landing';
import Matching from '../Matching';
import MainCalendar from '../Calendar/Calendar';
import Resources from '../Resources';
import Auth from '../auth/Test/Auth'; 
import Profile from '../Profile/Profile';

const PrivateRoute = ({ authUser }) => {
  const isAuthenticated = !!authUser;
  const theme = useTheme(); // Access the theme object

  return (
    <React.Fragment>
      <Navigation isAuthenticated={isAuthenticated} />
      <Box sx={{ paddingTop: theme.mixins.toolbar.minHeight + 24 + 'px' }}> {/* Adjust the padding based on the AppBar height */}
         <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/matching"
            element={authUser ? <Matching /> : <Navigate to="/auth" />}
          />
          <Route
            path="/maincalendar"
            element={authUser ? <MainCalendar /> : <Navigate to="/auth" />}
          />
          <Route
            path="/resources"
            element={authUser ? <Resources /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!authUser ? <Auth /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/auth" />}
          />
        </Routes>
      </Box>
    </React.Fragment>
  );
};

export default PrivateRoute;
