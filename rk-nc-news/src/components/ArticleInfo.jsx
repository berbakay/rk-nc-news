import React from 'react'
import { Link, navigate } from '@reach/router'
import LoadingPage from './LoadingPage'
import { deleteArticles, getArticleById } from '../apiRequests'
import { patchArticle } from '../apiRequests';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

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

    handleDelete = () => {
        deleteArticles(this.props.article_id)
        .then(() => {
            navigate('/')
        })
    }

    render() {
        if(this.state.isLoading) return(<LoadingPage/>)
        else if(!this.state.articleInfo) return(<p>article not found</p>)
        else return (<div className="articleInfo">
             <p><Link to={`/users/${this.state.articleInfo.author}`}><AccountCircleIcon/>{this.state.articleInfo.author}</Link></p>
            <h1>{this.state.articleInfo.title}</h1>
            <p>{this.state.articleInfo.created_at}</p>
            <p>votes: {this.state.articleInfo.votes} comments: {this.state.articleInfo.comment_count}</p>
            <p id="articleBody">{this.state.articleInfo.body}</p>
            <div className="articleInfoButtons">
                <div className="voteButtons">
                    <button onClick={() => this.handleVote(1)}><ArrowUpwardIcon/></button>
                    <button onClick={() => this.handleVote(-1)}><ArrowDownwardIcon/></button>  
                </div>
                <button onClick={this.handleDelete}>del</button>
            </div>
            </div>)
    }
}

export default ArticleInfo