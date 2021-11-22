import React from 'react';
import { Pagination } from '../common/Pagination/Pagination'

export const Post = props => {
    return (
        <div>
            <Pagination 
                countPosts={ props.countPosts }
                limitPage={ props.limitPage }
                currentPage={ props.currentPage }
                onPageChanged={ props.onPageChanged }
            />
            { 
                props.posts.map(i => <div key={i.id}>
                        <h1>{ i.title }</h1>
                        <p> { i.body } </p>
                    </div>) 
            }
        </div>
    )
}