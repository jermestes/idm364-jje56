import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Order from './Order';
import Inventory from './Inventory';

class Nav extends Component {
    render() {
        return (
        <div>
          <header className="App-header">
            <img src="https://placeholder.pics/svg/1000x500/DEDEDE/555555/Hero%20image%20(smiley%20treats)" className="App-logo" alt="Best friends, Best food" />
            <h1>The BAKED Sale</h1>
            <nav>
              <ul>
                <Link to="/">Menu</Link>
                <Link to="/Order">Order (0)</Link>
                <Link to="/Inventory">Inventory</Link>
              </ul>
            </nav> 
          </header>
          <Switch>
            <Route path="/" exact component={Menu} />
            <Route path="/Order" component={Order} />
            <Route path="/Inventory" component={Inventory} />
          </Switch>
        </div>
        );
    }
}

export default Nav;