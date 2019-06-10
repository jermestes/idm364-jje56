import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import base from '../base';
import firebase from 'firebase';
import Menu from './Menu';
import Order from './Order';
import Inventory from './Inventory';

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
    /*const changedItem = {
      ...this.state.item,
      [event.currentTarget.name]: event.currentTarget.value
    };  */  
  }

  //Event to add a item(s) to the current order  
  addToOrder = event => {
    window.alert('test');
    /*const changedItem = {
      ...this.state.item,
      [event.currentTarget.name]: event.currentTarget.value
    };  */  
  }

  //Event for increase or decrease 
  fieldIncrement = event => {
    window.alert('test');
    /*const changedItem = {
      ...this.state.item,
      [event.currentTarget.name]: event.currentTarget.value
    };  */  
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src="https://placeholder.pics/svg/1000x500/DEDEDE/555555/Hero%20image%20(smiley%20treats)" className="App-logo" alt="Best friends, Best food" />
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
          <Order appState={this.state} fieldIncrement={this.fieldIncrement.bind(this)}/>} />
          
          <Route path="/Inventory" render={ ()=> 
          <Inventory appState={this.state} inventoryChange={this.inventoryChange.bind(this)} 
          fieldIncrement={this.fieldIncrement.bind(this)}/>}/>
        </Switch>
      </div>
    );
  }
}

export default Nav;