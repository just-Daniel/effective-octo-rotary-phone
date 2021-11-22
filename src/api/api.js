import * as axios from 'axios';

// axios.get(`https://ekreative-json-server.herokuapp.com/posts`).then(res => {
//     console.log('result:', res);
// })

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

