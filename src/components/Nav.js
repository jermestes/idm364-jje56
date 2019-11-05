import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <ul id="navbar">
                <NavLink exact to="/" activeClassName="activeNavLink" >
                    <li className="nav-li">Menu</li>
                </NavLink>

                <NavLink to="/Order" activeClassName="activeNavLink" >
                    <li className="nav-li">Order ({this.props.orderNumItems})</li>
                </NavLink>

                <NavLink to="/Inventory" activeClassName="activeNavLink" >
                    <li className="nav-li">Inventory</li>
                </NavLink>
            </ul>
        );
    }
}

export default Nav;