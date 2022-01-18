import React, { useEffect, useState } from 'react';
import Loader from '../../UI/Loader/Loader';
import Post from '../../components/Posts/Post/Post';
import CreatePost from '../../components/Posts/CreatePost';
import cls from '../../components/Posts/Post/Post.module.css';
import { connect } from 'react-redux';
import { getPosts, getCountPosts } from '../../redux/posts-reducer'
import { changePost, changePostEdit, initEditPostForm, initComment, showOnSubmitPostError, showOnSubmitEditPostError } from '../../redux/form-reducer';
import { submitPost, deletePost, updatePost, onEditingPost, closeEditingPost } from '../../redux/posts-reducer';
import { Pagination } from '../../UI/Pagination/Pagination';
import { getPostComments } from '../../redux/comments-reducer';
import { getAllUsers } from '../../redux/users-reducer';


const useInit = (getCountPosts, getPosts, currentPage, limitPage) => {
    const [mounted, setMounted] = useState(false);
    const resetInit = () => setMounted(false);
    
    useEffect(() => {
        getCountPosts();
        getPosts(currentPage, limitPage);
    }, [mounted, getCountPosts, getPosts, currentPage, limitPage]);
    
    return resetInit;
}

const Article = props => {
    const {token} = {...localStorage};
    const isAuth = (props.isAuth || token);
    const {currentPage, limitPage} = props;
    const [show, setShow] = useState(true);

    const resetInit = useInit(props.getCountPosts, props.getPosts, currentPage, limitPage);
    
    useEffect(() => {
      resetInit()
    }, [resetInit]);
    

    const onPageChanged = (event, currentPage) => {
        event.preventDefault();
        props.getPosts(currentPage, props.limitPage)
    }

    const submitPostCreator = (event, setOnClickDisabled) => {
        event.preventDefault();
        
        const p = props;

        if(!p.isFormPostValid) {
            return p.showOnSubmitPostError(true);
        }

        setOnClickDisabled(true);
        props.submitPost(p.inputsPost, p.userId, p.currentPage).finally(() => {
            setOnClickDisabled(false);
        });
    }

    const onClickEditPost = (item, isEditingPostsId) => {
        props.onEditingPost(item, isEditingPostsId);
        props.initEditPostForm(item);
    }

    const onSaveEditPost = (event, post, editedPost, userId, currentPage, setOnClickDisabled) => {
        event.preventDefault();

        if(!props.isFormEditPostValid) {
            return props.showOnSubmitEditPostError(true);
        }

        setOnClickDisabled(true);
        
        props.updatePost(post, editedPost, userId, currentPage).finally(() => {
            setOnClickDisabled(false);
        });
    }

    const showComments = async (event, postId, isShowingComments) => {
        event.preventDefault();
        await props.getAllUsers();
        props.getPostComments(postId, isShowingComments);
        props.initComment();
    }

    
    

    return (
        <div className={cls.Article}>
            {
                props.isFetching && <Loader />
            }
            
            {
                isAuth &&
                <div className={cls.CreateArticleContainer}>
                    {
                        show
                        ? <button onClick={() => setShow(false)}>Create</button>
                        : <>
                            <button onClick={() => setShow(true)}>Close</button>
                            <CreatePost 
                                inputsPost={ props.inputsPost }
                                changePost={ props.changePost }
                                submitPostCreator={ submitPostCreator }
                                showOnPostError={ props.showOnPostError }
                            />
                        </>
                    }
                </div>
            }
            <div className={cls.PostsContainer}>
            { 
                props.posts.map(item => (
                    <Post
                        key={item.id}
                        item={ item }
                        initialized={ isAuth }
                        userId={ props.userId }
                        onDeletePost={ props.deletePost }
                        currentPage={ props.currentPage }

                        onClickEditPost={ onClickEditPost }
                        onSaveEditPost={ onSaveEditPost }
                        showOnEditPostError={ props.showOnEditPostError }

                        inputsPostEdit={ props.inputsPostEdit }
                        changePost={ props.changePostEdit }

                        isEditingPostsId={ props.isEditingPostsId }
                        closeEditingPost={ props.closeEditingPost }

                        showComments={ showComments }
                        isFetchingComments={ props.isFetchingComments }
                        isShowingComments={ props.isShowingComments }
                        clickedPostId={ props.clickedPostId }
                    />
                ))
            }
            </div>

            <Pagination 
                countPosts={ props.countPosts }
                limitPage={ props.limitPage }
                currentPage={ props.currentPage }
                onPageChanged={ onPageChanged }
            />
            
        </div>
    )

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

export default connect(mapStateToProps, mapDispatchToProps)(Article);