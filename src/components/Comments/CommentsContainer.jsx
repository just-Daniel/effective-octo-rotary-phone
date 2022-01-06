import React from 'react';
import { connect } from 'react-redux';
import classes from './Comments.module.css';

const CommentsContainer = props => {

    return (
        <div className={classes.CommentsContainer}>
            <ul>
                {/* <li>
                    <div className={classes.CommentItem}>
                        <div className={classes.ButtonsComment}>
                            <button className={classes.edit}>Edit</button>
                            <button className={classes.delete}>Delete</button>
                        </div>
                        <div className={classes.CommentItemContent}>
                            <p>
                            Provident id temporejjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj voluptatibus modi sequi tempore incidunt officiis. Sapiente sit quis similique. Expedita harum reiciendis laborum facere esse ut velit vel.
                            </p>
                            <time>10:00</time>
                        </div>
                    </div>
                </li> */}
                {
                    props.comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <div className={classes.CommentItem}>
                                    <div className={classes.ButtonsComment}>
                                        <button className={classes.edit}>Edit</button>
                                        <button className={classes.delete}>Delete</button>
                                    </div>
                                    <div className={classes.CommentItemContent}>
                                        <p>
                                            {comment.body}
                                        </p>
                                        <time>10:00</time>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <form>
                <textarea>

                </textarea>
                <button className={classes.create}>Create</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    comments: state.comments.comments
})

export default connect(mapStateToProps)(CommentsContainer);