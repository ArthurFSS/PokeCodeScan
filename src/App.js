import React from 'react';
import './App.css';
import QrCodeReader from './QrCodeReader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PokeCodes</h1>
        <QrCodeReader />
      </header>
    </div>
  );
}

export default App;
