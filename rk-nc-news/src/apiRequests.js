import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://nc-news-2-electric-boogaloo.herokuapp.com/api'
})

export function getArticleById (article_id) {
    return instance.get(`/articles/${article_id}`)
}

export function getArticlesbyTopic (topic, sortQuery, order) {
    return instance.get(`/articles?topic=${topic}&sort_by=${sortQuery}&order=${order}`)
}

export function getArticlesbyAuthor (author, sortQuery, order) {
    return instance.get(`/articles?author=${author}&sort_by=${sortQuery}&order=${order}`)
}

export function getArticles(sortQuery, order) {
    return instance.get(`/articles?sort_by=${sortQuery}&order=${order}`)
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