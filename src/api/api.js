import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ekreative-json-server.herokuapp.com/'
})

export const articleAPI = {
    getPosts (currentPage = 1, limitPage = 5) {
        return instance.get(`posts?_page=${currentPage}&_limit=${limitPage}`)
    },
    getCountPosts() {
        return instance.get(`posts`).then(res => res.data.length);
    },
    submitPost(post) {
        return instance.post(`posts`, post).then(res => res.data);
    },
    deletePost(postId) {
        return instance.delete(`posts/${postId}`)
    },
    updatePost(post) {
        return instance.patch(`posts/${post.id}`, post)
    }
}

export const announcementAPI = {
    getLimitAnnouncements (countAnn = 10) {
        return instance.get(`announcements?_sort=createdAt&_order=desc&limit=${countAnn}`).then(res=> res.data);
    },
    submitAnnouncement (ann) {
        return instance.post(`announcements`, ann).then(res => res.data);
    },
    updateAnnouncement (annId, ann) {
        return instance.patch(`announcements/${annId}`, ann).then(res => res.data);
    },
    deleteAnnouncement (annId) {
        return instance.delete(`announcements/${annId}`);
    }
}

export const authAPI = {
    login (user) {
        return instance.post('login', user).then(res => res.data);
    },
    register(user) {
        return instance.post('register', user).then(res => res.data);
    }
}

export const commentAPI = {
    getPostComments(postId) {
        return instance.get(`comments?postId=${postId}&_sort=createdAt&_order=asc`).then(res => res.data);
    },
    updateComment(commentId, updateComment) {
        return instance.patch(`comments/${commentId}`, updateComment).then(res => res.data);
    },
    deleteComment(commentId) {
        return instance.delete(`comments/${commentId}`).then(res => res.data);
    },
    submitComment(newComment) {
        return instance.post(`comments`, newComment).then(res => res.data);
    }
}
