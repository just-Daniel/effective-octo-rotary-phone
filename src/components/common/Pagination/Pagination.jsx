import React from 'react';
import styles from './Pagination.module.css'

export const Pagination = props => {
    
    const pagesCount = Math.ceil(props.countPosts / props.limitPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const onSubClick = () => {
        if (props.currentPage === 1) return 
        props.onPageChanged(props.currentPage - 1) 
    }

    const onAddClick = () => {
        if (props.currentPage === pagesCount) return 
        props.onPageChanged(props.currentPage + 1) 
    }    

    return (
        <div className={styles.pagination}>
            <span className={props.currentPage === 1 ? styles.disabled : ''} onClick={ onSubClick }>&laquo;</span>
            {
                pages.map(p => {
                    return <span
                        key={p}
                        className={props.currentPage === p ? styles.active : ''}
                        onClick={ ()=> props.onPageChanged(p) }
                    >{p}</span>
                })
            }
            <span className={props.currentPage === pagesCount ? styles.disabled : ''} onClick={ onAddClick }>&raquo;</span>
        </div>
    )
}