import React from 'react';
import './css/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="https://placeholder.pics/svg/1000x500/DEDEDE/555555/Hero%20image%20(smiley%20treats)" className="App-logo" alt="Best friends, Best food" />
        <h1>The BAKEd Sale</h1>
        <p>"Treats that help you sleep"</p>
        <nav>
          <ul>
            <li>Menu</li>
            <li>Order (0)</li>
            <li>Inventory</li>
          </ul>
        </nav>
      </header>
      <main></main>
      <footer>
        <a href="/">About Us</a>
        <p>©2019</p>
      </footer>
    </div>
  );
}

export default App;
