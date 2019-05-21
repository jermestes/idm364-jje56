import React from 'react';
import './css/App.css';
import Nav from './components/Nav';


function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <footer>
        <a href="/">About Us</a>
        <p>©2019</p>
      </footer>
    </div>
  );
}

export default App;
