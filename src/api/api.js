import * as axios from 'axios';


const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

instance.interceptors.request.use(config => {
    const {token} = {...localStorage};

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } 

    return config;
});

export const articleAPI = {
    getPosts (currentPage = 1, limitPage = 5) {
        return instance.get(`${process.env.REACT_APP_POSTS_URL}?_page=${currentPage}&_limit=${limitPage}&_sort=createdAt&_order=desc`)
    },
    getCountPosts() {
        return instance.get(process.env.REACT_APP_POSTS_URL).then(res => res.data.length);
    },
    submitPost(post) {
        return instance.post(process.env.REACT_APP_POSTS_URL, post).then(res => res.data);
    },
    deletePost(postId) {
        return instance.delete(`${process.env.REACT_APP_POSTS_URL}/${postId}`)
    },
    updatePost(post) {
        return instance.patch(`${process.env.REACT_APP_POSTS_URL}/${post.id}`, post)
    }
}

export const announcementAPI = {
    getLimitAnnouncements (countAnn = 10) {
        return instance.get(`${process.env.REACT_APP_ANNOUNCEMENTS_URL}?_sort=createdAt&_order=desc&_limit=${countAnn}`).then(res=> res.data);
    },
    submitAnnouncement (ann) {
        return instance.post(process.env.REACT_APP_ANNOUNCEMENTS_URL, ann).then(res => res.data);
    },
    updateAnnouncement (annId, ann) {
        return instance.patch(`${process.env.REACT_APP_ANNOUNCEMENTS_URL}/${annId}`, ann).then(res => res.data);
    },
    deleteAnnouncement (annId) {
        return instance.delete(`${process.env.REACT_APP_ANNOUNCEMENTS_URL}/${annId}`);
    }
}

export const authAPI = {
    login (user) {
        return instance.post(process.env.REACT_APP_LOGIN_URL, user).then(res => res.data);
    },
    register(user) {
        return instance.post(process.env.REACT_APP_REGISTER_URL, user).then(res => res.data);
    }
}

export const commentAPI = {
    getPostComments(postId) {
        return instance.get(`${process.env.REACT_APP_COMMENTS_URL}?postId=${postId}&_sort=createdAt&_order=asc`).then(res => res.data);
    },
    updateComment(commentId, updateComment) {
        return instance.patch(`${process.env.REACT_APP_COMMENTS_URL}/${commentId}`, updateComment).then(res => res.data);
    },
    deleteComment(commentId) {
        return instance.delete(`${process.env.REACT_APP_COMMENTS_URL}/${commentId}`).then(res => res.data);
    },
    submitComment(newComment) {
        return instance.post(process.env.REACT_APP_COMMENTS_URL, newComment).then(res => res.data);
    }
}

export const userAPI = {
    getAllUsers () {
        return instance.get(process.env.REACT_APP_USERS_URL).then(res => res.data);
    }
}