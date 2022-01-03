import React from 'react';
import { connect } from 'react-redux';
// import Post from './Post/Post';
import { getPosts, getCountPosts } from '../../redux/posts-reducer'
import Loader from '../../UI/Loader/Loader';
import { changePost, changePostEdit, initEditPostForm } from '../../redux/form-reducer';
import { submitPost, deletePost, updatePost, onEditingPost, closeEditingPost } from '../../redux/posts-reducer';
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

    onClickEditPost = (item, isEditingPostsId) => {
        this.props.onEditingPost(item, isEditingPostsId);
        this.props.initEditPostForm(item);
    }

    onSaveEditPost = (event, post, editedPost, userId, currentPage, setOnClickDisabled) => {
        event.preventDefault();
        setOnClickDisabled(true);
        
        this.props.updatePost(post, editedPost, userId, currentPage);
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

                            onClickEditPost={ this.onClickEditPost }
                            onSaveEditPost={ this.onSaveEditPost }

                            inputsPostEdit={ this.props.inputsPostEdit }
                            changePost={ this.props.changePostEdit }

                            isEditingPostsId={ this.props.isEditingPostsId }
                            closeEditingPost={ this.props.closeEditingPost }
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
    isEditingPostsId: state.posts.isEditingPostsId,
    inputsPost: state.form.post.inputControls,
    inputsPostEdit: state.form.postEdit.inputControls,
    isFormValid: state.form.post.isFormValid,
    userId: state.auth.id,
    isAuth: state.auth.isAuth
})

const mapDispatchToProps = {
    getPosts,
    getCountPosts,
    changePost,
    submitPost,
    deletePost,
    initEditPostForm,
    changePostEdit,
    updatePost,
    onEditingPost,
    closeEditingPost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);