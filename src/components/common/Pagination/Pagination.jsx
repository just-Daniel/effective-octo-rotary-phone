import React, { useState } from 'react';
import styles from './Pagination.module.css'

export const Pagination = ({portionSize = 7, ...props}) => {    
    const pagesCount = Math.ceil(props.countPosts / props.limitPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const totalPortion = Math.ceil(pagesCount / portionSize);
    const [currentPortionNumber, setCurrentPortionNumber] = useState(1);
    const leftPortionPageNumber = (currentPortionNumber - 1) * portionSize;
    const rightPortionPageNumber = currentPortionNumber * portionSize; 

    return (
        <div className={styles.pagination}>
            {   currentPortionNumber > 1 &&
                <button onClick={ () => setCurrentPortionNumber(currentPortionNumber - 1) }>&laquo;</button>
            }
            {
                pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(p => {
                    return <span
                        key={p}
                        className={props.currentPage === p ? styles.active : ''}
                        onClick={ (event)=> props.onPageChanged(event, p) }
                    >{p}</span>
                })
            }
            { totalPortion > currentPortionNumber &&
                <button onClick={ () => setCurrentPortionNumber(currentPortionNumber + 1) }>&raquo;</button>
            }
        </div>
    )
}