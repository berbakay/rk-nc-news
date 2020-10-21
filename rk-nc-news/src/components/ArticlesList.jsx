import React from 'react';
import LoadingPage from './LoadingPage';
import { getArticles, getArticlesbyAuthor, getArticlesbyTopic } from '../apiRequests';
import ArticleCard from './ArticleCard';

class ArticlesList extends React.Component {
    state = {
        articles: [],
        slug: '',
        isLoading: true,
        showArticles: false,
        sortQuery: 'created_at',
        sortOrder: 'desc'
    }
 
    componentDidMount() {
        if(this.props.topicFilter) {
            this.props.changeTopic(this.props.topicFilter)
        }
        if(this.props.topicFilter) {
            this.getThisArticlebyTopic()
        } else if (this.props.username) {
            getArticlesbyAuthor(this.props.username, this.state.sortQuery, this.state.sortOrder)
            .then(res => this.setState({isLoading: false, articles: res.data.articles}));;
        } else {
            getArticles(this.state.sortQuery, this.state.sortOrder)
            .then(res => this.setState({isLoading: false, articles: res.data.articles, showArticles: true}));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        
            if(!this.props.topicFilter && !this.props.username) {
                if(prevState.sortQuery !== this.state.sortQuery || prevState.sortOrder !== this.state.sortOrder) {
                    this.setState({isLoading: true}, () => {
                        getArticles(this.state.sortQuery, this.state.sortOrder)
                        .then(res => this.setState({isLoading: false, articles: res.data.articles, showArticles: true}))
                    })
                }
            
            }
            if(this.props.topicFilter) {
                if(this.props.topicFilter !== prevProps.topicFilter || prevState.sortQuery !== this.state.sortQuery || prevState.sortOrder !== this.state.sortOrder) { 
                    this.setState({isLoading: true}, () => {
                    getArticlesbyTopic(this.props.topicFilter, this.state.sortQuery, this.state.sortOrder)
                    .then(res => this.setState({isLoading: false, articles: res.data.articles, showArticles: true}))
                    })
                }
            }
            if(this.props.username) {
                if(this.props.username !== prevProps.username || prevState.sortQuery !== this.state.sortQuery || prevState.sortOrder !== this.state.sortOrder) {
                    this.setState({isLoading: true}, () => {
                    getArticlesbyAuthor(this.props.username, this.state.sortQuery, this.state.sortOrder)
                    .then(res => this.setState({isLoading: false, articles: res.data.articles, showArticles: true}))
                    })
                }
            }
            
    }

    getThisArticlebyTopic = () => {
        this.setState({isLoading: true});
        getArticlesbyTopic(this.props.topicFilter, this.state.sortQuery, this.state.sortOrder)
        .then(res => this.setState({isLoading: false, articles: res.data.articles, showArticles: true}));
    }

    changeArticleVote = (article_id, incrementVote) => {
        const newArticles = this.state.articles.map(article => {
            const newArticle = {...article}
            if(article.article_id === article_id) {
                newArticle.votes = article.votes + incrementVote;
                return newArticle;
            } else {
                return newArticle;
            }
        })
        this.setState({articles: newArticles})
    }

    toggleHide = () => {
        this.setState({showArticles: !this.state.showArticles})
    }

    toggleSort = (sortQuery) => {
        if(this.state.sortOrder === 'desc') {
            this.setState({ sortQuery, sortOrder: 'asc' });
        } else {
            this.setState({ sortQuery, sortOrder: 'desc' });
        }
        
    }

    render() {
        if(this.state.isLoading) return(<LoadingPage />)
        else return(
            <div>
            {this.props.username ? <button onClick={this.toggleHide}>{this.state.showArticles ? "Hide" : "Show"}</button> : null}
            {this.state.showArticles && <div>
                <label>Sort By: </label>
            <button onClick={() => this.toggleSort('votes')}>Votes{this.state.sortQuery === 'votes' ? this.state.sortOrder === 'asc' ? '▲' : '▼' : null}</button>
            <button onClick={() => this.toggleSort('created_at')}>Date Posted {this.state.sortQuery === 'created_at' ? this.state.sortOrder === 'asc' ? '▲' : '▼' : null}</button>
            <ul id="articleList">
            {this.state.articles.map(article => {
               return <ArticleCard changeArticleVote={this.changeArticleVote} key={article.article_id} articleInfo={article}/> 
            })}
            </ul>
            </div>}
            </div>
        )
    }

}

export default ArticlesList