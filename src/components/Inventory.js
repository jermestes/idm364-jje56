import React, { Component } from 'react';
import ItemEdit from './ItemEdit';

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemIndex: this.props.appState[this.props.itemIndex]
        }
    }

    selectorIndexChange = event => {
        this.setState({itemIndex: event.target.value});
    }

    render(props) {
        //inventoryRender holds what to display on inventory section based on inventory status
        let inventoryRender;
        //the inventory information from the main app.js state
        let inventoryStatus = this.props.appState.items;
        if(inventoryStatus.length == 0) {
            //Have a loading message while getting the inventory
            inventoryRender = <p>Loading inventory...</p>
        } else {
            //Generate the realtime edit form with selector holding all the available items to choose from
            inventoryRender = 
                <div className="inventory-forms">
                    <div id="inventory-btns-container">
                        <button id="reset-stock-btn" className="inventory-btn" onClick={this.props.resetStock}>Reset Stock</button>
                        
                        <select className="inventory-btn" value={this.props.appState.itemIndex} onChange={this.props.itemIndexChange}>
                            {this.props.appState.items.map((item,index) => { 
                                return (
                                    <option key={index} onClick={this.props.itemIndexChange} value={index}>{item.name}</option>
                                )
                            })}
                        </select>                        
                    </div>                    

                    <ItemEdit appState={this.props.appState}
                    targetItem = {this.props.targetItem}
                    inventoryChange={this.props.inventoryChange} 
                    fieldIncrement={this.props.fieldIncrement} 
                    deleteFromInventory={this.props.deleteFromInventory} 
                    resetStock={this.props.resetStock}
                    itemIndexChange={this.props.itemIndexChange}
                    preventNonNums={this.props.preventNonNums} />
                </div>                
        }
        return (
            <main>
                <h2>Inventory</h2>
                {inventoryRender}                
            </main>
        );
    }
}

export default Inventory;