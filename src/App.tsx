import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Root } from './pages';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Root />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

export default App;
