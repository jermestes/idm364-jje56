import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import base from '../base';
import firebase from 'firebase';
import Menu from './Menu';
import Order from './Order';
import Inventory from './Inventory';
import logo from '../images/logo.svg';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
        items: [],
        itemTypes: [],
        orderNumItems: 0,
        orderList: []
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref('items')
    dbRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let itemTypes = [];

        for (let item in items) {
            if (itemTypes.includes(items[item].type) != true)
            itemTypes.push({
                Type: items[item].type
            })           
        }

        this.ref = base.syncState('items', {
            context: this,
            state: 'items'
        });
    })
  }

  //Event to sync any inventory form change to Firebase
  inventoryChange = event => {
    window.alert('test');
    const changedItem = this.state.items;
  }

  //Event to reset the menu and inventory to original values
  resetStock = event => {
    window.alert('test');
  }

  //Event to remove item from the Firebase
  deleteFromInventory = event => {
    window.alert('test');
    const changedItem = this.state.items;
  }

  //Event to filter inventory forms (and possibly menu) to only show items of a specific type
  itemTypeFilter = event => {
    window.alert('test');
    const changedItem = this.state.items;
  }

  //Event to add item(s) to the current order  
  addToOrder = event => {
    this.setState({orderNumItems: this.state.orderNumItems + 1})
  }

  //Event to remove item from the current order  
  removeFromOrder = event => {
    window.alert('test');
  }

  //Event for increase or decrease 
  fieldIncrement = event => {
    window.alert('test');
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="Best friends, Best food" />
          <h1>The BAKED Sale</h1>
          <nav>
            <ul className="navbar-links">
              <Link to="/">Menu</Link>
              <Link to="/Order">Order ({this.state.orderNumItems})</Link>
              <Link to="/Inventory">Inventory</Link>
            </ul>
          </nav> 
        </header>
        
        <Switch>
          <Route path="/" exact render={ ()=> 
          <Menu appState={this.state} addToOrder={this.addToOrder.bind(this)}/> } />

          <Route path="/Order" render={ ()=> 
          <Order appState={this.state} fieldIncrement={this.fieldIncrement.bind(this)} 
          removeFromOrder={this.removeFromOrder.bind(this)}/>} />
          
          <Route path="/Inventory" render={ ()=> 
          <Inventory appState={this.state} inventoryChange={this.inventoryChange.bind(this)} 
          fieldIncrement={this.fieldIncrement.bind(this)} itemTypeFilter={this.itemTypeFilter.bind(this)}
          deleteFromInventory={this.deleteFromInventory.bind(this)}/>}/>
        </Switch>
      </div>
    );
  }
}

export default Nav;