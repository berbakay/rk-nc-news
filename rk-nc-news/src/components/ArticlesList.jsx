import React from 'react';
import axios from 'axios';
import { Link } from '@reach/router'

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

        if(this.state.isLoading) return(<p>loading</p>)
        return(
            <ul>
            {this.state.articles.map(article => {
               return( 
                
               <li key={article.article_id}>
                    <Link  to={`/articles/${article.article_id}`}>
                        <p>{article.title}</p>
                    </Link>
                    <p>{article.topic}</p>
                    <Link  to={`/users/${article.author}`}>
                        <p>{article.author}</p>
                    </Link>
                    <p>{article.votes}</p>
                    <p>{article.created_at}</p>
                </li>
                
            )})}
            </ul>
        )
    }

}

export default ArticlesList