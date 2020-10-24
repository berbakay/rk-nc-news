import React from 'react'
import { Link, navigate } from '@reach/router'
import LoadingPage from './LoadingPage'
import { deleteArticles, getArticleById } from '../apiRequests'
import { patchArticle } from '../apiRequests';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { dateToTimeString } from '../utils/utils'
import ArticlePageVoteComponent from './ArticlePageVoteComponent';

class ArticleInfo extends React.Component {
    state = {
        articleInfo: {},
        isLoading: true,
        err: null
    }

    componentDidMount() {
       getArticleById(this.props.article_id)
       .then(res => {
            this.setState({isLoading: false, articleInfo: res.data.article[0]})
        })
        .catch(err => {
            console.dir(err)
            this.setState({err: {code: err.response.status, msg: err.response.statusText, isLoading: false}})
        })
    }

    handleDelete = () => {
        deleteArticles(this.props.article_id)
        .then(() => {
            navigate('/')
        })
    }

    render() {
        if(this.state.err) return(<p>article not found</p>)
        if(this.state.isLoading) return(<LoadingPage/>)
        else if(!this.state.articleInfo) return(<p>article not found</p>)
        else return (
        <div className="articleInfo">
            <p className="articleAuthor"><Link to={`/users/${this.state.articleInfo.author}`}><AccountCircleIcon/>{this.state.articleInfo.author}</Link> {dateToTimeString(this.state.articleInfo.created_at)}</p> 
            <h1>{this.state.articleInfo.title}</h1>
            <p id="articleBody">{this.state.articleInfo.body}</p>
            <div className="articleInfoButtons">
                <ArticlePageVoteComponent comment_count={this.state.articleInfo.comment_count} votes={this.state.articleInfo.votes} article_id={this.state.articleInfo.article_id}/>
                <button onClick={this.handleDelete}>del</button>
            </div>
        </div>)
    }
}

export default ArticleInfo