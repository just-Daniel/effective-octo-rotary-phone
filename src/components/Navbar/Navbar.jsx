import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export const Navbar = props => {
    const location = useLocation();

    return (
        <nav className={styles.navContainer} >
            {
                !(location.pathname === '/' && location.key === 'default') &&
                <ul>
                    <li>
                        <NavLink 
                            className={({isActive}) => (isActive? styles.active : styles.item)} 
                            to='/posts'>
                        Article</NavLink>
                    </li>
                    <li>
                        <NavLink 
                        className={({isActive}) => (isActive? styles.active : styles.item)} 
                        to='/announcements'>
                        Announcement</NavLink>
                    </li>
                </ul>
            }
        </nav>
    )
}