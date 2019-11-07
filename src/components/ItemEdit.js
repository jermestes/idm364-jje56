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

    noExtraDec = event => {
        //the 3 variables to decide what to do on period-key press
        let input = (event.target.value);
        let regex = /^\.$/;
        let regex2 = /.[0-9]$/;
        let dotBreaks = regex.test(input);
        let dotBreaks2 = regex2.test(input);
        console.log(`pre-decision price was ${input}, dot here = ${dotBreaks}, ${dotBreaks2}`);
        
        //do not show/take the input if it's not a number, deletion, arrow, or period-key
        if((event.which < 37 || event.which > 40) && (event.which < 48 || event.which > 57) 
        && event.which !== 8 && event.which != 190) {
            event.preventDefault();
            console.log('Irrelevant key...prevented input');
        } 

        //if the pressed key was the period AND no more dots are allowed, meaning that
        //1) the input value already includes a period
        else if(event.which == 190 && (dotBreaks == true || dotBreaks2 == true)) {
            event.preventDefault();
            console.log('already a period here')
            } 
            
            else {
                  this.LiveChange(event);
                }
    }

    render(props) {
        return (
            <form className="item-inventory-form">
                <img id="form-pic" src={require(`../images/${this.props.appState.items[this.props.appState.itemIndex].image}`)} alt={this.props.appState.items[this.props.appState.itemIndex].name}></img>

                <div className="form-area" >
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" 
                        value={this.props.appState.items[this.props.appState.itemIndex].name}
                        onChange={this.LiveChange}></input>
                    </div>

                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" min="0.01" step="0.01" 
                        value={this.props.appState.items[this.props.appState.itemIndex].price}
                        onChange={this.LiveChange} onKeyDown={this.noExtraDec}></input>
                    </div>

                    <div className="availability-control">
                        <label htmlFor="stock"># Available</label>
                        <input pattern="[0-9]*" type="number" name="available" min="0" step="1" value={this.props.appState.items[this.props.appState.itemIndex].available}
                        onChange={this.LiveChange} onKeyDown={this.props.preventNonNums}></input>
                    </div>
                </div>

                <div className="form-area item-caption">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" value={this.props.appState.items[this.props.appState.itemIndex].description}
                    onChange={this.LiveChange}></textarea>
                </div>
            </form>
        );
    }
}

export default ItemEdit;