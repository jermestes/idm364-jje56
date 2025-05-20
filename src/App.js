import React, {Component} from 'react';
import logo from './logo.svg';

import './main.css';

//The navigation, supported by React Router
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Nav from './components/Nav';

//The necessary modules for inventory data
import { getDatabase, ref, onValue } from 'firebase/database';
import { base } from './base'; // from your refactored firebase.js
import { set } from 'firebase/database';
import restock from './restock';

//The 3 main interfaces of the site
import Menu from './components/Menu';
import Order from './components/Order';
import Inventory from './components/Inventory';



class App extends Component {
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
    const dbRef = ref(base, 'items');
  
    // One-way sync from DB → state
    onValue(dbRef, (snapshot) => {
      const items = snapshot.val() || [];
      this.setState({ items });
    });
  }
  

  //Event to sync any inventory form change to Firebase
  inventoryChange = (key, updatedItem) => {
    const stateToBe = { ...this.state.items };
    stateToBe[key] = updatedItem;
  
    this.setState({ items: stateToBe });
  
    // Push the whole updated items state to Firebase
    const dbRef = ref(base, 'items');
    set(dbRef, stateToBe);
  }

  //Event to reset the menu and inventory to original values
  resetStock = () => {
    this.setState({items: restock});
  }

  //Event to reset the menu and inventory to original values
  resetOrder = () => {
    this.setState({orderList: []});
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

  //Make sure order and stock quantity can't be NaN or decimal
  preventNonNums = event => {
    //If the key != arrows, backspace, or numbers
    if((event.which < 37 || event.which > 40) && (event.which < 48 || event.which > 57) && event.which !== 8 && event.which !== 46) {
      event.preventDefault();
      console.log('prevented, foo');
    } else {
      console.log('turkey');
    }
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

        <Routes>
          <Route exact path="/" element={
          <Menu appState={this.state} addToOrder={this.addToOrder.bind(this)}
          preventNonNums={this.preventNonNums.bind(this)}/> } />
          
          <Route path="/order" element={
          <Order appState={this.state} removeFromOrder={this.removeFromOrder.bind(this)}
          resetOrder={this.resetOrder.bind(this)}/>} />

          <Route path="/inventory" element={
          <Inventory appState={this.state} 
          itemIndexChange={this.itemIndexChange.bind(this)} 
          inventoryChange={this.inventoryChange.bind(this)} 
          targetItem = {this.state.items[this.state.itemIndex]}
          resetStock={this.resetStock.bind(this)} 
          preventNonNums={this.preventNonNums.bind(this)}/> } /> 

        </Routes>

        <footer>
          <p>©2025 The Baked Sale</p>
        </footer>

      </Router>
  );
  }
}

export default App;
