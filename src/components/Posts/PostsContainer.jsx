import React from 'react';
import { connect } from 'react-redux';
import { Post } from './Posts';
import { getPosts, getCountPosts } from '../../redux/posts-reducer'
import Loader from '../common/Loader/Loader';

class PostsContainer extends React.Component {
    componentDidMount() {
        const {currentPage, limitPage} = this.props;

        this.props.getCountPosts()
        this.props.getPosts(currentPage, limitPage)
    }

    onPageChanged = (currentPage) => {
        this.props.getPosts(currentPage, this.props.limitPage)
    }

    render() {
        return (
            <>
                {
                    this.props.isFetching ? <Loader />
                    : <Post 
                        posts={ this.props.posts } 
                        countPosts={ this.props.countPosts }
                        limitPage={ this.props.limitPage }
                        currentPage={ this.props.currentPage }
                        onPageChanged={ this.onPageChanged }
                    />
                }
            </>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts,
    currentPage: state.posts.currentPage,
    limitPage: state.posts.limitPage,
    countPosts: state.posts.countPosts,
    isFetching: state.posts.isFetching
})

const mapDispatchToProps = {
    getPosts,
    getCountPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);