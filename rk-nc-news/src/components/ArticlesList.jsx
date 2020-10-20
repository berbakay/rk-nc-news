import React from 'react';
import { Link } from '@reach/router'
import LoadingPage from './LoadingPage';
import { getArticles, getArticlesbyAuthor, getArticlesbyTopic } from '../apiRequests';

class ArticlesList extends React.Component {
    state = {
        articles: [],
        slug: '',
        isLoading: true
    }

    getThisArticlebyTopic = () => {
        getArticlesbyTopic(this.props.topicFilter)
        .then(res => this.setState({isLoading: false, articles: res.data.articles}));
    }

    componentDidMount() {
        if(this.props.topicFilter) {
            this.getThisArticlebyTopic()
        } else if (this.props.username) {
            getArticlesbyAuthor(this.props.username)
            .then(res => this.setState({isLoading: false, articles: res.data.articles}));;
        } else {
            getArticles()
            .then(res => this.setState({isLoading: false, articles: res.data.articles}));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.topicFilter !== this.props.topicFilter) {
            this.getThisArticlebyTopic()
        }
    }

    render() {
        if(this.state.isLoading) return(<LoadingPage />)
        else return(
            <ul id="articleList">
            {this.state.articles.map(article => {
               return( 
               <li key={article.article_id}>
                    <Link  to={`/articles/${article.article_id}`}>
                        <h2>{article.title}</h2>
                    </Link>
                    <p><span className='makeItBold'>topic:</span> {article.topic} <span className='makeItBold'>author:</span> <Link  to={`/users/${article.author}`}>
                        {article.author}
                    </Link> <span className='makeItBold'>Posted:</span> {article.created_at}</p>
                    <p><span className='makeItBold'>Votes: </span> {article.votes}</p>
                    <p><span className='makeItBold'>Comments: </span> {article.comment_count}</p>
                </li>  
            )})}
            </ul>
        )
    }

}

export default ArticlesList