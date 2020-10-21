import React from 'react'
import { Link } from '@reach/router'
import LoadingPage from './LoadingPage'
import { getArticleById } from '../apiRequests'
import { patchArticle } from '../apiRequests'

class ArticleInfo extends React.Component {
    state = {
        articleInfo: {},
        isLoading: true,
    }

    componentDidMount() {
       getArticleById(this.props.article_id)
       .then(res => {
            this.setState({isLoading: false, articleInfo: res.data.article[0]})
        })
    }

    handleVote = (incrementVote) => {
        this.setState({isLoading: true}, () => {
            patchArticle(this.state.articleInfo.article_id, incrementVote)
            .then(() => {
                const newArticleInfo = {...this.state.articleInfo};
                newArticleInfo.votes = this.state.articleInfo.votes + incrementVote;
                this.setState({articleInfo: newArticleInfo, isLoading: false})
            }) 
        })
        
    }

    render() {
        if(this.state.isLoading) return(<LoadingPage/>)
        else return (<div className="articleInfo">
            <h1>{this.state.articleInfo.title}</h1>
            <p><span className='makeItBold'>topic: </span> {this.state.articleInfo.topic} <span className='makeItBold'>author: </span> <Link to={`/users/${this.state.articleInfo.author}`}>{this.state.articleInfo.author}</Link> <span className='makeItBold'>Posted: </span> {this.state.articleInfo.created_at}</p>
            <p><span className='makeItBold'>votes: </span>{this.state.articleInfo.votes}<span className='makeItBold'> comments: </span>{this.state.articleInfo.comment_count}</p>
            <p id="articleBody">{this.state.articleInfo.body}</p>
            <button onClick={() => this.handleVote(1)}>Upvote</button><button onClick={() => this.handleVote(-1)}>Downvote</button>
            </div>)
    }
}

export default ArticleInfo