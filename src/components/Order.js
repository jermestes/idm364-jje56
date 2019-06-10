import React, { Component } from 'react';

class Order extends Component {
    constructor() {
        super();
        this.state = {
            numItems: 0,
            orderItems: [],
            orderCost: []
        };
    }
    
    render() {
        return (
            <div>
                <h2>This Order</h2>
            </div>
        );
    }
}

export default Order;