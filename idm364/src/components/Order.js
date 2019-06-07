import React, { Component } from 'react';

class Order extends Component {    
    render() {
        return (
            <div>
                <h2>This Order</h2>
                <div></div>
                <ul>
                {this.props.appState.orderList.map((orderItem) => {
                    return (
                        <li>{orderItem.amount} {orderItem.name} | {orderItem.cost}</li>
                    )
                })}
                </ul>
            </div>
        );
    }
}

export default Order;