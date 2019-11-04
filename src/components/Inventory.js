import React, { Component } from 'react';
import ItemEdit from './ItemEdit';

//NOTE FOR TOMORROW
//MAKE ONE FORM
//WITH VARIABLE THAT CHECKS FOR INDEX OF THE ARRAY
//AND THE FORM WILL REPLACE THE VALUES OF EACH INPUT WITH THE CORRESPONDING VALUES OF CURRENT INDEX
//AND MAKE A DROPDOWN THAT LISTS ALL CHOICES OF ITEMS ARRAY

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
        return (
            <main>
                <h2>Inventory</h2>
                <div className="inventory-forms">
                    <select value={this.state.itemIndex} onChange={this.selectorIndexChange}>
                        {this.props.appState.items.map((item,index) => { 
                            return (
                                <option key={index} onClick={this.props.itemIndexChange} value={index}>{item.name}</option>
                            )
                        })}
                    </select>

                    <button onClick={this.props.resetStock}>Reset Stock</button>

                    <ItemEdit appState={this.props.appState}
                    targetItem = {this.props.appState.items[this.props.appState.itemIndex]}
                    inventoryChange={this.props.inventoryChange} 
                    fieldIncrement={this.props.fieldIncrement} 
                    deleteFromInventory={this.props.deleteFromInventory} 
                    resetStock={this.props.resetStock}
                    itemIndexChange={this.props.itemIndexChange} />
                </div>                
            </main>
        );
    }
}

export default Inventory;