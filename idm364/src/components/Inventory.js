import React, { Component } from 'react';
import base from '../base';
import firebase from 'firebase';
import '../css/index.css';

const itemTypes = [
    'Brownie',
    'Combo',
    'Cookie',
    'Milkshake',
    'Muffin',
    'Pie'];

class Inventory extends Component {
    /*constructor() {
        super();
        this.state = {
            items: []
        };
    }*/

    state = {
        items: []
    };

    componentDidMount() {
        const dbRef = firebase.database().ref('items')
        dbRef.on('value', (snapshot) => {
            let items = snapshot.val();
            //let itemTypes = [];
            let realState = [];
            for (let item in items) {
                /*realState.push({
                    Name: items[item].name,
                    Price: items[item].price,
                    Availability: items[item].available,
                    Description: items[item].description,
                    Image: items[item].image,
                    Type: items[item].type
                }
                
                itemTypes.push({
                    Type: items[item].type
                })*/
            }

            this.ref = base.syncState('items', {
                context: this,
                state: 'items'
            });

            /*this.setState({
                items: realState
            })*/
        })
    } 

    render() {
        return (
            <main id="inventory-page">
                <div className="inventory-forms-sidebar">
                    <h2>Inventory</h2> 
                    <ul id="inventory-forms-sidebar-tabs">
                        <li>Brownies</li>
                        <li>Cookies</li>
                        <li>Combo</li>
                        <li>Milkshake</li>
                        <li>Muffin</li>
                    </ul>
                </div>
                
                <div className="inventory-forms">
                {this.state.items.map((item) => {
                    return (
                        <form className="item-inventory-form">
                            <div className="form-image-control">
                                <img src={item.image}></img>
                                <button className="change-image"></button>
                            </div>

                            <div className="form-area small-inputs" >
                                <label for="item_name">Name</label>
                                <input type="text" name="item_name" value={item.name}></input>
                                
                                <label for="item_price">Price</label>
                                <input type="number" name="item_price" value={item.price}></input>
                                
                                <label for="item_stock"># Available</label>
                                <div className="availability-control">
                                    <button className="decrease-amount">-</button>
                                    <input type="number" name="item_stock" value={item.available}></input>
                                    <button className="increase-amount">+</button>
                                </div>
                            </div>

                            <div className="form-area item-caption">
                                <label for="item_description"></label>
                                <input type="text-area" name="item_description" value={item.description}></input>
                            </div>
                        </form>
                    )
                })}
                </div>
            </main>
        );
    }
}

export default Inventory;