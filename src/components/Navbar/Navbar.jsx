import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = props => {
    return (
        <nav style={{background: 'red', gridArea: 'navbar'}}>
            <ul>
                <li><NavLink to='/posts'>Article</NavLink></li>
                <li><NavLink to='/announcements'>Announcement</NavLink></li>
            </ul>
        </nav>
    )
}