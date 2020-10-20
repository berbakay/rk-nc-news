import React from 'react'
import axios from 'axios'
import { Link } from '@reach/router'

class ArticleInfo extends React.Component {
    state = {
        articleInfo: {}
    }

    componentDidMount() {
        axios.get(`https://nc-news-2-electric-boogaloo.herokuapp.com/api/articles/${this.props.article_id}`)
        .then(res => {
            this.setState({articleInfo: res.data.article[0]})
        })
    }

    render() {
        return (<div className="articleInfo">
            <h1>{this.state.articleInfo.title}</h1>
            <p><span className='makeItBold'>topic: </span> {this.state.articleInfo.topic} <span className='makeItBold'>author: </span> <Link to={`/users/${this.state.articleInfo.author}`}>{this.state.articleInfo.author}</Link> <span className='makeItBold'>Posted: </span> {this.state.articleInfo.created_at}</p>
            <p><span className='makeItBold'>votes: </span>{this.state.articleInfo.votes}<span className='makeItBold'> comments: </span>{this.state.articleInfo.comment_count}</p>
            <p id="articleBody">{this.state.articleInfo.body}</p>
            </div>)
    }
}

export default ArticleInfo