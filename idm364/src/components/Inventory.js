import React, { Component } from 'react';
import '../css/index.css';

class Inventory extends Component {
    //Event to sync any inventory form change to Firebase
    inventoryChange = event => {
        // Take a copy of the current item
        const updatedItem = {
        ...this.props.appState,
        // ES6 dynamically get the 'name' attribute of the
        // input element that is being updated.
        // [event.currentTarget.name]
        // Then set the value to whatever is entered in that input:
        [event.currentTarget.name]: event.currentTarget.value
        }; 

        this.props.updateItem(this.props.appState, updatedItem);
    }
    
    render() {
        //Loops through the all the items in the state and renders a control form for each individual item
        //Renders a sidebar that sorts which item control forms are shown based on the type of item it is
        return (
            <main id="inventory-page">
                <div className="inventory-forms-sidebar">
                    <h2>Inventory</h2> 
                    <ul id="inventory-forms-sidebar-tabs">
                        <li>Brownies</li>
                        <li>Cookies</li>
                        <li>Combo</li>
                        <li>Milkshake</li>
                        <li>Muffin</li>
                    </ul>

                    <button>Reset Stock</button>
                </div>
                
                <div className="inventory-forms">
                {this.props.appState.items.map((item) => {
                    return (
                        <form className="item-inventory-form">
                            <div className="form-image-control">
                                <img src={item.image} alt={item.name}></img>
                            </div>

                            <div className="form-area small-inputs" >
                                <label for="item_name">Name</label>
                                <input type="text" name="name" value={item.name}
                                onChange={this.inventoryChange}></input>
                                
                                <label for="item_price">Price</label>
                                <input type="number" name="price" value={item.price.toFixed(2)}
                                onChange={this.inventoryChange}></input>
                                
                                <label for="item_stock"># Available</label>
                                <div className="availability-control">
                                    <button className="decrease-amount"
                                    onClick={this.props.fieldIncrement}>-</button>
                                    <input type="number" name="available" value={item.available}
                                    onChange={this.inventoryChange}></input>
                                    <button className="increase-amount"
                                    onClick={this.props.fieldIncrement}>+</button>
                                </div>
                            </div>

                            <div className="form-area item-caption">
                                <label for="item_description">Description</label>
                                <input type="text-area" name="description" value={item.description}
                                onChange={this.inventoryChange}></input>
                                <button className="delete"
                                    onClick={this.props.deleteFromInventory}>DELETE</button>
                            </div>
                        </form>
                    )
                })}
                </div>
            </main>
        );
    }
}

export default Inventory;