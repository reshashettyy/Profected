import * as React from 'react';
import Navigation from '../Navigation/Navigation';
import Landing from '../Landing/Landing';
import Matching from '../Matching';
import MainCalendar from '../Calendar/Calendar';
import Resources from '../Resources';
import VideoEmbedding from '../VideoEmbedding';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUp from '../auth/SignUp/SignUp';
import Login from '../auth/Login/Login';

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/maincalendar" element={<MainCalendar />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/videoembedding" element={<VideoEmbedding />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
