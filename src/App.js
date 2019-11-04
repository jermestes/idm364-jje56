import React, {Component} from 'react';
import logo from './logo.svg';

import './App.css';

//The navigation, supported by React Router
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav';

//The necessary modules for inventory data
import base from './base';
import firebase from 'firebase';
import restock from './restock';

//The 3 main interfaces of the site
import Menu from './components/Menu';
import Order from './components/Order';
import Inventory from './components/Inventory';



class App extends Component {
  /*LIFECYCLE EVENTS (mount/unmount etc.)*/
  //Initialize the app with an empty state that will be filled with database info
  constructor() {
    super();
    this.state = {
        items: [],
        itemIndex: 0,
        orderList: []
    };
  }

  //Get the state connected to Firebase db
  componentDidMount() {
    const dbRef = firebase.database().ref('items')
    dbRef.on('value', (snapshot) => {
      let peekaboo = [1,2,3];
      let items = snapshot.val();
      console.log(peekaboo);
      console.log(items);
      //sync app state and database together so 
      this.ref = base.syncState('items', {
          context: this,
          state: 'items'
      });
    })
  }

  /*EVENT LISTENERS (onClick, onChange etc.)*/
  //Event to sync any inventory form change to Firebase
  inventoryChange = (key,updatedItem) => {
    //make copy of the current state
    const stateToBe = {...this.state.items};
    //change value of copied state's [key]'th element to value of updated form element 
    stateToBe[key] = updatedItem;
    this.setState({items: stateToBe});
  }

  //Event to reset the menu and inventory to original values
  resetStock = () => {
    this.setState({items: restock});
  }

  //Change item index to keep the select bar in-sync with the item-edit-form
  itemIndexChange = event => {
    //make copy of app's itemIndex state
    let newIndexState = this.state.itemIndex;
    console.log(newIndexState);
    console.log(event.target.value)
    //convert event value from string to integer, then make it value of state copy
    newIndexState = parseInt(event.target.value,10);
    console.log(newIndexState);
    //set state of itemIndex to the updated copy
    this.setState({itemIndex: newIndexState});
  }

  //Event to remove item from the Firebase
  deleteFromInventory = event => {
    window.alert('test');
    const changedItem = this.state.items;
  }

  //Event to add item(s) to the current order  
  addToOrder = event => {
    //get quantity for item(s) being ordered, make copy of order state, and get the item that was just ordered
    let quantity = parseInt(event.currentTarget.previousSibling.value,10);
    let currentOrder = this.state.orderList;
    let newOrderItem = this.state.items[event.currentTarget.name];   
    //add quantity as a property object and use it to reflect subtotal, then push object to the copied state
    newOrderItem.quantity = quantity;
    newOrderItem.subTotal = quantity * newOrderItem.price;
    console.log(newOrderItem);
    currentOrder.push(newOrderItem);
    //setstate to the copy
    this.setState({orderList: currentOrder});
    console.log(this.state.orderList);
  }

  //Event to remove item from the current order  
  removeFromOrder = event => {
    let orderItem = event.target.value;
    let updatedOrder = this.state.orderList;
    updatedOrder.splice(orderItem,1);
    console.log(updatedOrder);
    this.setState({orderList: updatedOrder});
    console.log(this.state.orderList);
  }

  //Event for increase or decrease 
  fieldIncrement = event => {
    window.alert('test');
  }

  render() {
    return (
      <Router className="App">
        <header className="App-header">
          <div id="intro-info-bar">
            <h1>The BAKEd Sale</h1>
            <a href="https://github.com/jermestes/idm364-jje56" target="_BLANK" rel="noopener noreferrer">About</a>
          </div>
          <img src={logo} className="App-logo" alt="Best friends eating the best food" />
        </header>

        <Nav orderNumItems={this.state.orderList.length}/>

        <Switch>
          <Route exact path="/" render={ ()=> 
          <Menu appState={this.state} addToOrder={this.addToOrder.bind(this)}/> } />
          
          <Route path="/order" render={ ()=> 
          <Order appState={this.state} fieldIncrement={this.fieldIncrement.bind(this)} 
          removeFromOrder={this.removeFromOrder.bind(this)}/>} />

          <Route path="/inventory" render={ ()=> 
          <Inventory appState={this.state} 
          itemIndexChange={this.itemIndexChange.bind(this)} 
          inventoryChange={this.inventoryChange.bind(this)} 
          targetItem = {this.state.items[this.state.itemIndex]}
          fieldIncrement={this.fieldIncrement.bind(this)} 
          deleteFromInventory={this.deleteFromInventory.bind(this)} 
          resetStock={this.resetStock.bind(this)} /> } /> 

        </Switch>

        <footer>
          <p>©2019 The Baked Sale</p>
        </footer>

      </Router>
  );
  }
}

export default App;
