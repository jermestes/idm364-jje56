import React, { Component } from 'react';

//NOTE FOR TOMORROW
//USE LOCALSTORAGE ONCE ITS SETUP
//SO PEOPLE DONT LOSE ORDER
class Order extends Component {
    render() {
        return (
            <main>
                <h2>This Order</h2>
                <div className="order-slip">
                    <ol className="order-item">
                    {this.props.appState.orderList.map((item,index) => {
                        return (
                            <li key={index}>
                                <h5>{item.quantity} {item.name}(s)</h5> 
                                <p>${item.subTotal}</p>
                                <button value={index} onClick={this.props.removeFromOrder}>Remove</button>
                            </li>
                        )
                    })}
                    </ol>
                </div>
            </main>
        );
    }
}

export default Order;