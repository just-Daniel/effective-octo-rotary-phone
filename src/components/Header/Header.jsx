import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = props => {
    return (
        <header style={{background: 'yellow', gridArea: 'header'}}>
          <ul>
            <li><NavLink to='/login'>Log in</NavLink></li>
            <li><NavLink to='/register'>Log up</NavLink></li>
          </ul>
        </header>
    )
}