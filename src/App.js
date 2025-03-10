import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Results from './Results';
import Admin from './Admin';

function App() {
  const [username, setUsername] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/results" element={<Results username={username} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Login onLogin={setUsername} />} />
      </Routes>
    </Router>
  );
}

export default App;
