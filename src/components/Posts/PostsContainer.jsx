import React from 'react';
import { connect } from 'react-redux';
// import Post from './Post/Post';
import { getPosts, getCountPosts } from '../../redux/posts-reducer'
import Loader from '../../UI/Loader/Loader';
import { changePost } from '../../redux/form-reducer';
import { submitPost, deletePost } from '../../redux/posts-reducer';
import CreatePost from './CreatePost';
import { Pagination } from '../../UI/Pagination/Pagination';
import Post from './Post/Post';

class PostsContainer extends React.Component {
    componentDidMount() {
        const {currentPage, limitPage} = this.props;

        this.props.getCountPosts()
        this.props.getPosts(currentPage, limitPage)
    }

    onPageChanged = (event, currentPage) => {
        event.preventDefault();
        this.props.getPosts(currentPage, this.props.limitPage)
    }

    createPostHandler = (event, setOnClickDisabled) => {
        event.preventDefault();
        setOnClickDisabled(true);
        const p = this.props;

        this.props.submitPost(p.inputsPost, p.userId, p.currentPage).finally(() => {
            setOnClickDisabled(false);
        });
    }

    render() {
        
        const {token} = {...localStorage};
        const isAuth = (this.props.isAuth || token);
        
        return (
            <div>
                {
                    this.props.isFetching && <Loader />
                }
                
                {
                    isAuth &&
                    <CreatePost 
                        inputsPost={ this.props.inputsPost }
                        changePost={ this.props.changePost }
                        createPostHandler={ this.createPostHandler }
                        isFormValid={ this.props.isFormValid }
                    />
                }

                { 
                    this.props.posts.map(item => (
                        <Post
                            key={item.id}
                            item={ item }
                            initialized={ isAuth }
                            userId={ this.props.userId }
                            onDeletePost={ this.props.deletePost }
                            currentPage={ this.props.currentPage }
                        />
                    ))
                }

                <Pagination 
                    countPosts={ this.props.countPosts }
                    limitPage={ this.props.limitPage }
                    currentPage={ this.props.currentPage }
                    onPageChanged={ this.onPageChanged }
                />
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts,
    currentPage: state.posts.currentPage,
    limitPage: state.posts.limitPage,
    countPosts: state.posts.countPosts,
    isFetching: state.posts.isFetching,
    inputsPost: state.form.post.inputControls,
    isFormValid: state.form.post.isFormValid,
    userId: state.auth.id,
    isAuth: state.auth.isAuth
})

const mapDispatchToProps = {
    getPosts,
    getCountPosts,
    changePost,
    submitPost,
    deletePost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);