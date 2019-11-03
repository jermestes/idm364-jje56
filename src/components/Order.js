import React, { Component } from 'react';

//NOTE FOR TOMORROW
//USE LOCALSTORAGE ONCE ITS SETUP
//SO PEOPLE DONT LOSE ORDER
class Order extends Component {
    render() {
        return (
            <main>
                <h2>This Order</h2>
                {this.props.appState.orderList.map((item) => {
                    return (
                        <div className="order-item">
                            <ol><li>({/*item.quantity*/}) {/*item.name*/} hi | {/*item.subtotal*/}</li></ol>
                        </div>
                    )
                })}
                
            </main>
        );
    }
}

export default Order;