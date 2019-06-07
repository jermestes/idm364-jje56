import React, { Component } from 'react';
import '../css/index.css';

class Inventory extends Component {
    render() {
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
                                <input type="text" name="item_name" value={item.name}
                                onChange={this.props.inventoryChange}></input>
                                
                                <label for="item_price">Price</label>
                                <input type="number" name="item_price" value={item.price.toFixed(2)}
                                onChange={this.props.inventoryChange}></input>
                                
                                <label for="item_stock"># Available</label>
                                <div className="availability-control">
                                    <button className="decrease-amount"
                                    onClick={this.props.fieldIncrement}>-</button>
                                    <input type="number" name="item_stock" value={item.available}
                                    onChange={this.props.inventoryChange}></input>
                                    <button className="increase-amount"
                                    onClick={this.props.fieldIncrement}>+</button>
                                </div>
                            </div>

                            <div className="form-area item-caption">
                                <label for="item_description">Description</label>
                                <input type="text-area" name="item_description" value={item.description}
                                onChange={this.props.inventoryChange}></input>
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