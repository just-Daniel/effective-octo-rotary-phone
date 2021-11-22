import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export const Navbar = props => {
    const location = useLocation();
    if (location.pathname === '/' && location.key === 'default') return <nav className={styles.navContainer}></nav>

    return (
        <nav className={styles.navContainer} >
            <ul>
                <li><NavLink to='/posts'>Article</NavLink></li>
                <li><NavLink to='/announcements'>Announcement</NavLink></li>
            </ul>
        </nav>
    )
}