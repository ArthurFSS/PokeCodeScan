// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QrCodeReader from './QrCodeReader';
import Estoque from './Estoque';

const App = () => {
  const navStyle = {
    backgroundColor: '#007bff',
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    flex: 1,
    textTransform: 'uppercase',
  };

  return (
    <Router>
      <div>
        <nav style={navStyle}>
          <Link to="/" style={linkStyle}>Scanner</Link>
          <Link to="/estoque" style={linkStyle}>Estoque</Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<QrCodeReader />} />
          <Route path="/estoque" element={<Estoque />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
