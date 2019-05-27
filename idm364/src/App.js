import React from 'react';
import './css/App.css';
import Nav from './components/Nav';
import base from './base';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <footer>
        <p>©2019</p>
      </footer>
    </div>
  );
}

export default App;
