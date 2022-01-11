import React from 'react';
import { connect } from 'react-redux';
import { getPosts, getCountPosts } from '../../redux/posts-reducer'
import Loader from '../../UI/Loader/Loader';
import { changePost, changePostEdit, initEditPostForm, initComment, showOnSubmitPostError, showOnSubmitEditPostError } from '../../redux/form-reducer';
import { submitPost, deletePost, updatePost, onEditingPost, closeEditingPost } from '../../redux/posts-reducer';
import CreatePost from './CreatePost';
import { Pagination } from '../../UI/Pagination/Pagination';
import Post from './Post/Post';
import { getPostComments } from '../../redux/comments-reducer';
import { getAllUsers } from '../../redux/users-reducer'
import cls from './Post/Post.module.css';

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

    submitPostCreator = (event, setOnClickDisabled) => {
        event.preventDefault();
        
        const p = this.props;

        if(!p.isFormPostValid) {
            return p.showOnSubmitPostError(true);
        }

        setOnClickDisabled(true);
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

        if(!this.props.isFormEditPostValid) {
            return this.props.showOnSubmitEditPostError(true);
        }

        setOnClickDisabled(true);
        
        this.props.updatePost(post, editedPost, userId, currentPage).finally(() => {
            setOnClickDisabled(false);
        });
    }

    showComments = async (event, postId, isShowingComments) => {
        event.preventDefault();
        await this.props.getAllUsers();
        this.props.getPostComments(postId, isShowingComments);
        this.props.initComment();
    }

    render() { 
        const {token} = {...localStorage};
        const isAuth = (this.props.isAuth || token);

        return (
            <div className={cls.Article}>
                {
                    this.props.isFetching && <Loader />
                }
                
                {
                    isAuth &&
                    <CreatePost 
                        inputsPost={ this.props.inputsPost }
                        changePost={ this.props.changePost }
                        submitPostCreator={ this.submitPostCreator }
                        showOnPostError={ this.props.showOnPostError }
                    />
                }
                <div className={cls.PostsContainer}>
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
                            showOnEditPostError={ this.props.showOnEditPostError }

                            inputsPostEdit={ this.props.inputsPostEdit }
                            changePost={ this.props.changePostEdit }

                            isEditingPostsId={ this.props.isEditingPostsId }
                            closeEditingPost={ this.props.closeEditingPost }

                            showComments={ this.showComments }
                            isFetchingComments={ this.props.isFetchingComments }
                            isShowingComments={ this.props.isShowingComments }
                            clickedPostId={ this.props.clickedPostId }
                        />
                    ))
                }
                </div>

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
    showOnEditPostError: state.form.postEdit.showOnSubmitError,
    isFormEditPostValid: state.form.postEdit.isFormValid,
    isFormPostValid: state.form.post.isFormValid,
    showOnPostError: state.form.post.showOnSubmitError,
    userId: state.auth.id,
    isAuth: state.auth.isAuth,
    isFetchingComments: state.comments.isFetchingComments,
    isShowingComments: state.comments.isShowingComments,
    clickedPostId: state.comments.clickedPostId
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
    closeEditingPost,
    getPostComments,
    initComment,
    showOnSubmitPostError,
    showOnSubmitEditPostError,
    getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);