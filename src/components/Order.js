import React, { Component } from 'react';

class Order extends Component {
    confirmOrder = (event) => {
        window.alert('Your order has been placed!');
        this.props.resetOrder(event);
    }
    render() {
        let orderRender;
        let orderStatus = this.props.appState.orderList;
        if(orderStatus.length == 0) {
            orderRender = <p>Nothing ordered right now. Get to shopping!</p>            
        } else {
            let orderTotal = orderStatus.reduce((prev, cur) => prev+cur.subTotal,0);
            orderRender = 
            <div className="order-slip">
                {this.props.appState.orderList.map((item,index) => {
                    return (
                        <div className="ordered-item" key={index}>   
                            <div>
                                <p><strong>{index + 1})</strong> {item.quantity} {item.name}(s)</p> 
                                <p class="order-item-price">${item.subTotal.toFixed(2)}</p>
                            </div>
                            <button value={index} onClick={this.props.removeFromOrder}>Remove</button>
                        </div>
                    )
                })}
                <div id="order-conclusion">
                    <p><strong>Total:</strong> ${orderTotal.toFixed(2)}</p>
                    <button className="confirm-btn" onClick={this.confirmOrder}>Confirm</button>
                </div>
            </div>
        }
        return (
            <main>
                <h2>This Order</h2>
                {orderRender}
            </main>
        );
    }
}

export default Order;