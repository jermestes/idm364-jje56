import React, { Component } from 'react';

class Menu extends Component {
    //Loops through the all the items in the state and renders a div for each individual item
    render() {
        return (
            <main id="menu-page">
                <h2>Menu</h2>
                <div className="menu-catalog">
                {this.props.appState.items.map((item) => {
                    return (
                        <div className="menu-item">
                            <img src={item.image} alt={item.name}></img>
                            <h3>{item.name}</h3>
                            <p>${item.price.toFixed(2)} - {item.description}</p>
                            <div className="availability-control">
                                <button className="decrease-amount"
                                onClick={this.props.fieldIncrement}>-</button>
                                <input type="number" name="item_stock" value="1"
                                onChange={this.props.inventoryChange}></input>
                                <button className="increase-amount"
                                onClick={this.props.fieldIncrement}>+</button>
                            </div>
                            <button onClick={this.props.addToOrder}>Add To Order</button>
                        </div>
                    )
                })}
                </div>
            </main>
        );
    }
}

export default Menu;