import React, { Component } from 'react';

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            quantity: 1 
        }
    }
    adjustQuantity = event => {
        if(typeof(parseInt(event.target.value)) !== 'number') {
            console.log(parseInt(event.target.value));

            console.log('entered a non-number');

        } else {
            this.setState({quantity: event.target.value});
        }
        
    }

    render() {
        return (
            <main>
                <h2>Menu</h2>
                <div className="menu-catalog">
                {this.props.appState.items.map((item,index) => {
                    return (
                        <div className="menu-item" key={index}>
                            <img src={item.image} alt={item.name}></img>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p name="item_stock" value={item.price}>${item.price} each</p>
                            <input type="number" name="item_stock" defaultValue={1}></input>
                            <button onClick={this.props.addToOrder} name={index}>Add To Order</button>
                        </div>
                    )
                })}
                </div>
                
            </main>
        );
    }
}

export default Menu;