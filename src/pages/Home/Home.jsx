import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Home.module.css'

export const Home = props => {
    return (
        <div className={styles.homeContainer}>
            <h1>Pages:</h1>
            <ul>
                <li><NavLink to='/posts'>Article</NavLink></li>
                <li><NavLink to='/announcements'>Announcement</NavLink></li>
            </ul>
        </div>
    )
}