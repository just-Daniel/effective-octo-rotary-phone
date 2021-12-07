import React from 'react';
import { connect } from 'react-redux';
import { Post } from './Post';
import { getPosts, getCountPosts } from '../../redux/posts-reducer'
import Loader from '../../UI/Loader/Loader';
import { changePost, submitPost } from '../../redux/form-reducer'

class PostsContainer extends React.Component {
    componentDidMount() {
        const {currentPage, limitPage} = this.props;

        this.props.getCountPosts()
        this.props.getPosts(currentPage, limitPage)
    }

    onPageChanged = (event, currentPage) => {
        console.log('event', event);
        event.preventDefault();
        this.props.getPosts(currentPage, this.props.limitPage)
    }

    createPostHandler = event => {
        event.preventDefault();

        // this.props.submitPost();
    }

    render() {
        return (
            <>
                {
                    this.props.isFetching && <Loader />
                }
                     <Post 
                        posts={ this.props.posts } 
                        countPosts={ this.props.countPosts }
                        limitPage={ this.props.limitPage }
                        currentPage={ this.props.currentPage }
                        onPageChanged={ this.onPageChanged }


                        onFormChanged={ this.onFormChanged }
                        inputsPost={ this.props.inputsPost }

                        createPostHandler={ this.createPostHandler }
                    />
                
            </>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts,
    currentPage: state.posts.currentPage,
    limitPage: state.posts.limitPage,
    countPosts: state.posts.countPosts,
    isFetching: state.posts.isFetching,
    inputsPost: state.form.post.inputControls
})

const mapDispatchToProps = {
    getPosts,
    getCountPosts,
    changePost,
    submitPost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);