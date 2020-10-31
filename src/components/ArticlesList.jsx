import React from 'react';
import LoadingPage from './LoadingPage';
import { getArticles, getArticlesbyAuthor, getArticlesbyTopic, getTopics, postArticle } from '../apiRequests';
import ArticleCard from './ArticleCard';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PostArticle from './PostArticle';

class ArticlesList extends React.Component {
    state = {
        articles: [],
        article_count: 0,
        slug: '',
        isLoading: true,
        showArticles: false,
        sortQuery: 'created_at',
        sortOrder: 'desc',
        postArticle: false,
        topics:[],
        articleToPost: {title: null, body: null, topic: this.props.topicFilter, author: this.props.author},
        err: null,
        page: 1
    }
 
    componentDidMount() {
        if(this.props.topicFilter) {
            this.props.changeTopic(this.props.topicFilter)
        }
        if(this.props.topicFilter) {
            this.getThisArticlebyTopic()
        } else if (this.props.username) {
            getArticlesbyAuthor(this.props.username, this.state.sortQuery, this.state.sortOrder, this.state.page)
            .then(res => this.setState({isLoading: false, articles: res.data.articles, article_count: res.data.total_count}));;
        } else {
            getArticles(this.state.sortQuery, this.state.sortOrder, this.state.page)
            .then(res => this.setState({isLoading: false, articles: res.data.articles, showArticles: true,  article_count: res.data.total_count}));
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
                if(prevState.sortQuery !== this.state.sortQuery || prevState.sortOrder !== this.state.sortOrder || prevState.page !== this.state.page) {
                    this.setState({isLoading: true}, () => {
                        getArticles(this.state.sortQuery, this.state.sortOrder, this.state.page)
                        .then(res => this.setState({isLoading: false, articles: res.data.articles, showArticles: true}))
                    })
                }
            
            }
            if(this.props.topicFilter) {
                if(this.props.topicFilter !== prevProps.topicFilter || prevState.sortQuery !== this.state.sortQuery || prevState.sortOrder !== this.state.sortOrder || prevState.page !== this.state.page) { 
                    this.setState({isLoading: true}, () => {
                    getArticlesbyTopic(this.props.topicFilter, this.state.sortQuery, this.state.sortOrder, this.state.page)
                    .then(res => this.setState({isLoading: false, articles: res.data.articles, showArticles: true}))
                    })
                }
            }
            if(this.props.username) {
                if(this.props.username !== prevProps.username || prevState.sortQuery !== this.state.sortQuery || prevState.sortOrder !== this.state.sortOrder || prevState.page !== this.state.page) {
                    this.setState({isLoading: true}, () => {
                    getArticlesbyAuthor(this.props.username, this.state.sortQuery, this.state.sortOrder, this.state.page)
                    .then(res => this.setState({isLoading: false, articles: res.data.articles, showArticles: true}))
                    })
                }
            }
            
    }

    getThisArticlebyTopic = () => {
        this.setState({isLoading: true});
        getArticlesbyTopic(this.props.topicFilter, this.state.sortQuery, this.state.sortOrder, this.state.page)
        .then(res => this.setState({isLoading: false, articles: res.data.articles, showArticles: true,  article_count: res.data.total_count}));
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
        console.log(newTopic);
        this.setState(() => {
            const newArticle = {...this.state.articleToPost}
            newArticle.topic = newTopic;
            return {articleToPost: newArticle}
        })
    }

    changeIsLoading = () => {
        this.setState({isLoading: true})
    }

    changePage = (increment) => {
        const numberOfPages = Math.ceil(this.state.article_count/10)
        if(increment === -1 && this.state.page > 1) {
        this.setState({page: this.state.page + increment})
        } else if (increment === 1 && this.state.page < numberOfPages) {
            this.setState({page: this.state.page + increment})
        }
    }

    render() {
        if(this.state.isLoading) return(<LoadingPage />)
        if(this.state.error) return(<p>No Page found</p>)
        else return(
            <div>
            {this.props.username ? <button onClick={this.toggleHide}>{this.state.showArticles ? "Hide" : "Show"}</button> : null}
            {this.state.showArticles && <div>
            <button className="postAnArticle" onClick= {() => {this.setState({postArticle: !this.state.postArticle})}}>Post Article</button>
            {this.state.postArticle && <PostArticle slug={this.props.topicFilter} submitForm={this.submitForm} changeTitle={this.changeTitle} changeBody={this.changeBody} changeTopic={this.changeTopic} topics={this.state.topics}/>}
            <div className="sortButtons">
            <button onClick={() => this.toggleSort('votes')}><HowToVoteIcon/>{this.state.sortQuery === 'votes' ? this.state.sortOrder === 'asc' ? '▲' : '▼' : null}</button>
            <button onClick={() => this.toggleSort('created_at')}><CalendarTodayIcon/> {this.state.sortQuery === 'created_at' ? this.state.sortOrder === 'asc' ? <p>▲</p> : <p>▼</p> : null}</button>
            </div>
            {this.state.articles.length ? <ul id="articleList">
            {this.state.articles.map(article => {
               return <ArticleCard changeArticleVote={this.changeArticleVote} key={article.article_id} articleInfo={article} changeIsLoading={this.changeIsLoading}/> 
            })}
            </ul> : <p>No articles found. Post an article or create topic</p>}
            <div className="pageChanger">
            <button className="changePage" onClick={() => {this.changePage(-1)}}>-</button>{this.state.page}<button className="changePage" onClick={() =>{ this.changePage(1)}}>+</button>
            </div>
            </div>}
            </div>
        )
    }

}

export default ArticlesList