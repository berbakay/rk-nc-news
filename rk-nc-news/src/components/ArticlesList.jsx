import React from 'react';
import axios from 'axios';
import { Link } from '@reach/router'
import LoadingPage from './LoadingPage';

class ArticlesList extends React.Component {
    state = {
        articles: [],
        slug: '',
        isLoading: true
    }

    getArticlesbyTopic = () => {
        axios.get(`https://nc-news-2-electric-boogaloo.herokuapp.com/api/articles?topic=${this.props.topicFilter}`)
        .then(res => this.setState({isLoading: false, articles: res.data.articles}));
    }

    getArticlesbyAuthor = () => {
        axios.get(`https://nc-news-2-electric-boogaloo.herokuapp.com/api/articles?author=${this.props.username}`)
        .then(res => this.setState({isLoading: false, articles: res.data.articles}));
    }

    componentDidMount() {
        if(this.props.topicFilter) {
            this.getArticlesbyTopic();
        } else if (this.props.username) {
            this.getArticlesbyAuthor();
        } else {
            axios.get('https://nc-news-2-electric-boogaloo.herokuapp.com/api/articles')
            .then(res => this.setState({isLoading: false, articles: res.data.articles}));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.topicFilter !== this.props.topicFilter) {
            this.getArticlesbyTopic();
        }
    }

    render() {

        if(this.state.isLoading) return(<LoadingPage />)
        return(
            <div>
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
                    <p></p>
                </li>
                
            )})}
            </ul>
            </div>
        )
    }

}

export default ArticlesList