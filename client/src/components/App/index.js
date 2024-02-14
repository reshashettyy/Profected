import * as React from 'react';
import Navigation from '../Navigation/Navigation';
import Landing from '../Landing';
import Matching from '../Matching';
import Calendar from '../Calendar';
import Resources from '../Resources';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </Router>
  );
}
