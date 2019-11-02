import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <ul>
                <NavLink exact to="/" activeClassName="activeNavLink"><li>Menu</li></NavLink>
                <NavLink to="/Order" activeClassName="activeNavLink"><li>Order ({this.props.orderNumItems})</li></NavLink>
                <NavLink to="/Inventory" activeClassName="activeNavLink"><li>Inventory</li></NavLink>
            </ul>
        );
    }
}

export default Nav;