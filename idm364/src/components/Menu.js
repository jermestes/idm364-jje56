import React, { Component } from 'react';
import Inventory from './Inventory';

class Menu extends Component {

    render() {
        return (
            <main id="menu-page">
                <h2>Menu</h2>
                <div className="inventory-forms">
                {this.props.appState.items.map((item) => {
                    return (
                        <div className="menu-item">
                            <img src={item.image}></img>
                            <h3>{item.name}</h3>
                            <p>{item.price}</p>
                            <p>{item.description}</p>
                        </div>
                    )
                })}
                </div>
            </main>
        );
    }
}

export default Menu;