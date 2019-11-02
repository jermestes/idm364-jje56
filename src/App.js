import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

//The navigation, supported by React Router
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav';

//The 3 main interfaces of the site
import Menu from './components/Menu';
import Order from './components/Order';
import Inventory from './components/Inventory';

//The necessary modules for firebase connection
import base from './base';
import firebase from 'firebase';

class App extends Component {
  //Initializing the app with an empty state that will be filled with database info
  constructor() {
    super();
    this.state = {
        items: [],
        itemTypes: [],
        orderNumItems: 0,
        orderList: [],
    };
  }

  //Loading the data from Firebase into the state categories
  componentDidMount() {
    const dbRef = firebase.database().ref('items')
    dbRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let itemTypes = [];
        this.ref = base.syncState('items', {
            context: this,
            state: 'items'
        });
        for (let item in items) {
          if (itemTypes.includes(items[item].type) != true)
          itemTypes.push({
              Type: items[item].type
          })           
      }
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
      this.setState({orderNumItems: this.state.orderNumItems + 1});
      console.log(this.state.itemTypes);
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
      <Router className="App">

        <header className="App-header">
          <h1>The BAKEd Sale</h1>
          <img src={logo} className="App-logo" alt="Best friends eating the best food" />
        </header>

        <Nav orderNumItems={this.state.orderNumItems}/>

        <Switch>
          <Route exact path="/" render={ ()=> 
          <Menu appState={this.state} addToOrder={this.addToOrder.bind(this)}/> } />
          
          <Route path="/order" render={ ()=> 
          <Order appState={this.state} fieldIncrement={this.fieldIncrement.bind(this)} 
          removeFromOrder={this.removeFromOrder.bind(this)}/>} />

          <Route path="/inventory" render={ ()=> 
          <Inventory appState={this.state} inventoryChange={this.inventoryChange.bind(this)} 
          fieldIncrement={this.fieldIncrement.bind(this)} itemTypeFilter={this.itemTypeFilter.bind(this)}
          deleteFromInventory={this.deleteFromInventory.bind(this)}/>}/>

        </Switch>

        <footer>
          <p>©2019 The Baked Sale</p>
          <a href="https://github.com/jermestes/idm364-jje56" target="_BLANK" rel="noopener noreferrer">View Code</a>
        </footer>

      </Router>
  );
  }
}

export default App;
