import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ekreative-json-server.herokuapp.com/'
})

export const articleAPI = {
    getPosts (currentPage = 1, limitPage = 5) {
        return instance.get(`posts?_page=${currentPage}&_limit=${limitPage}`)
    },
    getCountPosts() {
        return instance.get(`posts`).then(res => res.data.length)
    }
}

export const announcementAPI = {
    getAnnouncements () {
        return instance.get(`announcements`).then(res=> res.data);
    }
}
