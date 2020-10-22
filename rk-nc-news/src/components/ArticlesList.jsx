import React from 'react';
import LoadingPage from './LoadingPage';
import { getArticles, getArticlesbyAuthor, getArticlesbyTopic, getTopics, postArticle } from '../apiRequests';
import ArticleCard from './ArticleCard';

class ArticlesList extends React.Component {
    state = {
        articles: [],
        slug: '',
        isLoading: true,
        showArticles: false,
        sortQuery: 'created_at',
        sortOrder: 'desc',
        postArticle: false,
        topics:[],
        articleToPost: {title: null, body: null, topic: null, author: this.props.author},
        err: null
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
        getTopics().then(res => this.setState({topics: res.data.topics}))
    }

    componentDidUpdate(prevProps, prevState) {
            if(prevProps.author !== this.props.author) {
                this.setState(() => {
                    const author = this.props.author;
                    const newArticle = {...this.state.articleToPost}
                    newArticle.author = author
                    return {articleToPost: newArticle}
                })
            }
        
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
        this.setState({articles: newArticles, isLoading: false})
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

    submitForm = (event) => {
        event.preventDefault()
        const articleToPost = this.state.articleToPost
        if(articleToPost.title === '' || articleToPost.body === '') {
            this.setState({err : {code: 400, msg: 'title or body can\'t be blank'}})
        } else {
            postArticle(articleToPost)
            .then((res) => {
                this.setState(() => {
                    const newArticles = [...this.state.articles]
                    newArticles.unshift(res.data.article[0]);
                    return {articles: newArticles};
                })
            });
        }
    }

    changeTitle = (event) => {
        const newTitle = event.target.value
        this.setState(() => {
            const newArticle = {...this.state.articleToPost};
            newArticle.title = newTitle
            return {articleToPost: newArticle}
        })
    }

    changeBody = (event) => {
        const newBody = event.target.value
        this.setState(() => {
            const newArticle = {...this.state.articleToPost};
            newArticle.body = newBody
            return {articleToPost: newArticle}
        })
    }

    changeTopic = (event) => {
        const newTopic = event.target.value;
        this.setState(() => {
            const newArticle = {...this.state.articleToPost}
            newArticle.topic = newTopic;
            return {articleToPost: newArticle}
        })
    }

    changeIsLoading = () => {
        this.setState({isLoading: true})
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
            <button onClick= {() => {this.setState({postArticle: !this.state.postArticle})}}>Post An Article</button>
            {this.state.postArticle && 
            <form onSubmit={this.submitForm}>
                <label>Title</label>
                <input label="title" onChange={this.changeTitle}></input>
                <label>Body</label>
                <input label="body" onChange={this.changeBody}></input>
                <label>Select Topic</label>
                <select defaultValue="topic" onChange={this.changeTopic}>
                    <option value="topic" disabled="diabled">Select Topic</option>
                    {this.state.topics.map(topic => {
                    return (<option key={topic.slug} value={topic.slug}>{topic.slug}</option>)
                    })}
                </select>
            <button>Submit</button>
            </form>}
            <ul id="articleList">
            {this.state.articles.map(article => {
               return <ArticleCard changeArticleVote={this.changeArticleVote} key={article.article_id} articleInfo={article} changeIsLoading={this.changeIsLoading}/> 
            })}
            </ul>
            </div>}
            </div>
        )
    }

}

export default ArticlesList