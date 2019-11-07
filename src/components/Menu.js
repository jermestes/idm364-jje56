import React, { Component } from 'react';

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            quantity: 1 
        }
        console.log(this.props);
    }
    componentDidMount() {
        console.log(this.props);
    }

    adjustQuantity = event => {
        if(typeof(parseInt(event.target.value)) === 'number') {
            this.setState({quantity: event.target.value});
            event.target.value = this.state.quantity;
        } else {
            event.preventDefault();
            console.log(parseInt(event.target.value));
            console.log('entered a non-number');
        }
        
    }

    render() {
        let button;
        return ( 
            <main>
                <h2>Menu</h2>
                <div className="menu-catalog">
                {this.props.appState.items.map((item,index) => {
                    if(item.available < 1) {
                        button = <button onClick={this.props.addToOrder} name={index} disabled>Out of stock</button>; 
                    } else {
                        button = <button onClick={this.props.addToOrder} name={index}>Add To Order</button>;
                    }
                    return (
                        <div className="menu-item" key={index}>
                            <img src={require(`../images/${item.image}`)} alt={item.name} className="main-img"></img>
                            <h3>{item.name}</h3>
                            <p name="item_price" value={item.price}>${item.price} each</p>
                            <p>{item.description}</p>
                            <input pattern="[0-9]*" maxLength='2' min="1" type="number" name="item_quantity" defaultValue={1}
                            onKeyDown={this.props.preventNonNums}></input>
                            {button}
                        </div>
                    )
                })}
                </div>
                
            </main>
        );
    }
}

export default Menu;