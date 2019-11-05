import React, { Component } from 'react';

class ItemEdit extends Component {
    LiveChange = event => {
        const changeSync = {
            ...this.props.targetItem,
            [event.target.name]: event.target.value
        };
        this.props.inventoryChange(this.props.appState.itemIndex,changeSync);
        console.log(`Changed ${event.target.name}`);
    }

    render(props) {
        return (
            <form className="item-inventory-form">
                <img id="form-pic" src={require(`../images/${this.props.appState.items[this.props.appState.itemIndex].image}`)} alt={this.props.appState.items[this.props.appState.itemIndex].name}></img>

                <div className="form-area small-inputs" >
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={this.props.appState.items[this.props.appState.itemIndex].name}
                    onChange={this.LiveChange}></input>
                    
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" step="0.01" value={this.props.appState.items[this.props.appState.itemIndex].price}
                    onChange={this.LiveChange}></input>
                    
                    <label htmlFor="stock"># Available</label>
                    <div className="availability-control">
                        <button className="decrease-amount"
                        onClick={this.props.fieldIncrement}>-</button>
                        <input type="number" name="available" value={this.props.appState.items[this.props.appState.itemIndex].available}
                        onChange={this.LiveChange}></input>
                        <button className="increase-amount"
                        onClick={this.props.fieldIncrement}>+</button>
                    </div>
                </div>

                <div className="form-area item-caption">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" value={this.props.appState.items[this.props.appState.itemIndex].description}
                    onChange={this.LiveChange}></textarea>
                    <button className="delete"
                        onClick={this.props.deleteFromInventory}>DELETE</button>
                </div>
            </form>
        );
    }
}

export default ItemEdit;