import React from 'react';
import { Link } from '@reach/router'
import LoadingPage from './LoadingPage';
import { getArticles, getArticlesbyAuthor, getArticlesbyTopic } from '../apiRequests';
import ArticleCard from './ArticleCard';

class ArticlesList extends React.Component {
    state = {
        articles: [],
        slug: '',
        isLoading: true
    }

    getThisArticlebyTopic = () => {
        this.setState({isLoading: true});
        getArticlesbyTopic(this.props.topicFilter)
        .then(res => this.setState({isLoading: false, articles: res.data.articles}));
    }

    

    componentDidMount() {
        if(this.props.topicFilter) {
            this.props.changeTopic(this.props.topicFilter)
        }
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
               return <ArticleCard articleInfo={article}/> 
            })}
            </ul>
        )
    }

}

export default ArticlesList