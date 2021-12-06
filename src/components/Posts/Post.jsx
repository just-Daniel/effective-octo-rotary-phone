import React from 'react';
// import Input from '../../UI/Input/Input';
import InputContainer from '../../UI/Input/InputContainer';
// import { Field, Form } from 'react-final-form';
import { Pagination } from '../common/Pagination/Pagination'

export const Post = props => {
    const handleSubmit = event => {
        event.preventDefault();
        console.log('Submit', props.inputsPost);
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <h2>Create new post</h2>

                <InputContainer />

                <button onClick={ props.createPostHandler }>Create</button>
            </form>
            { 
                props.posts.map(i => <div key={i.id}>
                        <h1>{ i.title }</h1>
                        <p> { i.body } </p>
                    </div>) 
            }
            <Pagination 
                countPosts={ props.countPosts }
                limitPage={ props.limitPage }
                currentPage={ props.currentPage }
                onPageChanged={ props.onPageChanged }
            />
        </div>
    )
}