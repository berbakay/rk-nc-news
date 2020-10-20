import React from 'react'
import axios from 'axios'

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
        return (<div><p>{this.state.articleInfo.title}</p>
            <p>{this.state.articleInfo.topic}</p>
            <p>{this.state.articleInfo.author}</p>
            <p>{this.state.articleInfo.created_at}</p>
            <p>{this.state.articleInfo.votes}</p>
            <p>{this.state.articleInfo.comment_count}</p>
            <p>{this.state.articleInfo.body}</p>
            </div>)
    }
}

export default ArticleInfo