import React, { Component } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer'
import base from './base';
import firebase from 'firebase';
import './css/App.css';

class App extends Component {
  //Loading a blank state with all necessary state subtypes
  state = {
    items: [],
    itemTypes: [],
    orderNumItems: 0,
    orderList: []
  };

  //Connecting app to Firebase DB, to sync state with it
  componentDidMount() {
    const dbRef = firebase.database().ref('items')
    dbRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let itemTypes = [];

        //loop to get distinct item types for sorting in other components
        for (let item in items) {
            if (itemTypes.includes(items[item].type) != true)
            itemTypes.push({
                Type: items[item].type
            })           
        }

        //ties app and database changes together
        this.ref = base.syncState('items', {
            context: this,
            state: 'items'
        });
    })
  }

    //Event to sync any inventory form change to Firebase
  /*inventoryChange = event => {
    ...this.state.items, 
    [event.currentTarget.name]: event.currentTarget.value;
  }*/

  updateItem = (key, updatedItem) => {
    // console.log('update sign');
    // 1. copy the current state
    const signs = { ...this.state.items };
    // 2. update that state key/value
    signs[key] = updatedItem;
    // 3. set the new copy to the component state
    this.setState({ signs });
  };

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

  //No main div because that view is generated in Nav
  render() {
    return (
      <div className="App">
        <Nav appState={this.state} fieldIncrement={this.fieldIncrement.bind(this)} 
          removeFromOrder={this.removeFromOrder.bind(this)} addToOrder={this.addToOrder.bind(this)}
          updateItem={this.updateItem.bind(this)} itemTypeFilter={this.itemTypeFilter.bind(this)}
          deleteFromInventory={this.deleteFromInventory.bind(this)}>
        </Nav>
        
        <Footer></Footer>
    </div>
    );
  }
}

export default App;