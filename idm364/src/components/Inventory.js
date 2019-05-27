import React, { Component } from 'react';
import base from '../base';
import firebase from 'firebase';

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
            let realState = [];
            for (let item in items) {
                realState.push({
                    Name: items[item].name,
                    Price: items[item].price,
                    Availability: items[item].available,
                    Description: items[item].description,
                    Image: items[item].image,
                    Type: items[item].type
                })
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
            <div>
                <h1>Inventory</h1> 
                {this.state.items.map((item) => {
                    return (
                        <p>{item.name}</p>
                    )
                })}
            </div>
        );
    }
}

export default Inventory;