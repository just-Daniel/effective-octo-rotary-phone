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
    }
}

export const announcementAPI = {
    getAnnouncements () {
        return instance.get(`announcements`).then(res=> res.data);
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
