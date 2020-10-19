import React from 'react';
import axios from 'axios';

class ArticlesList extends React.Component {
    state = {
        articles: [],
        slug: ''
    }

    getArticlesbyTopic = () => {
        axios.get(`https://nc-news-2-electric-boogaloo.herokuapp.com/api/articles?topic=${this.props.topicFilter}`)
        .then(res => this.setState({articles: res.data.articles}));
    }

    componentDidMount() {
        if(this.props.topicFilter) {
            this.getArticlesbyTopic();
        } else {
            axios.get('https://nc-news-2-electric-boogaloo.herokuapp.com/api/articles')
            .then(res => this.setState({articles: res.data.articles}));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.topicFilter !== this.props.topicFilter) {
            this.getArticlesbyTopic();
        }
    }

    render() {
        return(
            <ul>
            {this.state.articles.map(article => {
               return( <li key={article.article_id}>
                    <p>{article.title}</p>
                    <p>{article.topic}</p>
                    <p>{article.author}</p>
                    <p>{article.votes}</p>
                    <p>{article.created_at}</p>
                </li>
            )})}
            </ul>
        )
    }

}

export default ArticlesList