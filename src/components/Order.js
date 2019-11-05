import React, { Component } from 'react';

//NOTE FOR TOMORROW
//USE LOCALSTORAGE ONCE ITS SETUP
//SO PEOPLE DONT LOSE ORDER
class Order extends Component {
    render() {
        let orderRender;
        let orderStatus = this.props.appState.orderList;
        if(orderStatus.length == 0) {
            orderRender = <p>Nothing ordered right now. Get to shopping!</p>            
        } else {
            orderRender = 
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