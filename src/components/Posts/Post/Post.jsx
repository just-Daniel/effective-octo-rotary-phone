import React from 'react';
import classes from './Post.module.css';

const Post = props => {
    // console.log('Item: ', props.item);

    return (
        <div className={classes.Post}>
            {
                (props.initialized && props.item.userId === props.userId ) &&
                <div className={classes.mainButtons}>
                    <button 
                        className={classes.edit}
                    >Edit</button>

                    <button 
                        className={classes.delete}
                        onClick={() => props.onDeletePost(props.item, props.userId, props.currentPage)}
                    >Delete</button>
                </div>
            }

            <div>
                <h1>{ props.item.title }</h1>
                <p> { props.item.body } </p>
            </div>

            <div className={classes.buttonPostsComment}>
                <button className={classes.commentBtn}>Comments</button>
            </div>
        
        </div>
    )
}

export default Post;