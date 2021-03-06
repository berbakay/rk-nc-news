import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://nc-news-2-electric-boogaloo.herokuapp.com/api'
})

export function getArticleById (article_id) {
    return instance.get(`/articles/${article_id}`)
}

export function getArticlesbyTopic (topic, sortQuery, order, page) {
    return instance.get(`/articles?topic=${topic}&sort_by=${sortQuery}&order=${order}&p=${page}`)
}

export function getArticlesbyAuthor (author, sortQuery, order, page) {
    return instance.get(`/articles?author=${author}&sort_by=${sortQuery}&order=${order}&p=${page}`)
}

export function getArticles(sortQuery, order, page) {
    return instance.get(`/articles?sort_by=${sortQuery}&order=${order}&p=${page}`)
}

export function getArticleComments(article_id, sortQuery, order) {
    return instance.get(`/articles/${article_id}/comments?sort_by=${sortQuery}&order=${order}`)
}

export function getTopics() {
    return instance.get('/topics');
}

export function getUsers() {
    return instance.get('/users');
}

export function getSingleUser(username) {
    return instance.get(`/users/${username}`)
}

export function patchArticle(article_id, incrementVote) {
    return instance.patch(`/articles/${article_id}`, {inc_votes: incrementVote})
}

export function patchComment(comment_id, incrementVote) {
    return instance.patch(`/comments/${comment_id}`, {inc_votes: incrementVote})
}

export function postArticle(articleToPost) {
    return instance.post(`/articles`, articleToPost)
}

export function postComment(article_id, commentToPost) {
    return instance.post(`/articles/${article_id}/comments`, commentToPost)
}

export function createUser(userToCreate) {
    return instance.post(`/users`, userToCreate)
}

export function createTopic(topicToCreate) {
    return instance.post('/topics', topicToCreate)
}

export function deleteArticles(article_id) {
    return instance.delete(`/articles/${article_id}`)
}

export function deleteComments(comment_id) {
    return instance.delete(`/comments/${comment_id}`)
}