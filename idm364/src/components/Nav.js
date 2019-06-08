import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Order from './Order';
import Inventory from './Inventory';
import logo from '../images/logo.svg';

class Nav extends Component {  
  //Renders Header w/ image & nav-bar, followed by Switch that determines the main content
  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="Best friends, Best food" />
          <h1>The BAKED Sale</h1>
          <nav>
            <ul className="navbar-links">
              <Link to="/">Menu</Link>
              <Link to="/Order">Order ({this.props.appState.orderNumItems})</Link>
              <Link to="/Inventory">Inventory</Link>
            </ul>
          </nav> 
        </header>
        
        <Switch>
          <Route path="/" exact render={ ()=> 
          <Menu {...this.props} /> } />

          <Route path="/Order" render={ ()=> 
          <Order {...this.props} />} />
          
          <Route path="/Inventory" render={ ()=> 
          <Inventory {...this.props} />}/>
        </Switch>
      </div>
    );
  }
}

export default Nav;