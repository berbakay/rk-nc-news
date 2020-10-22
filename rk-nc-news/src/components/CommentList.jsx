import React from 'react'
import LoadingPage from './LoadingPage'
import { getArticleComments, postComment } from '../apiRequests'
import CommentCard from './CommentCard'

class CommentList extends React.Component {
    state = {
        comments: [],
        isLoading: true,
        showComments: true,
        sortQuery: 'created_at',
        sortOrder: 'desc',
        commentToPost: {username: this.props.author, body: null},
        err: null
    }

    componentDidMount() {
        getArticleComments(this.props.article_id, this.state.sortQuery, this.state.sortOrder)
        .then(res => {
            this.setState({isLoading: false, comments: res.data.comments})
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.sortQuery !== this.state.sortQuery || prevState.sortOrder !== this.state.sortOrder) {
            this.setState({isLoading: true}, () => {
                getArticleComments(this.props.article_id, this.state.sortQuery, this.state.sortOrder)
                .then(res => this.setState({isLoading: false, comments: res.data.comments}))
            })   
    }}

    changeCommentVote = (comment_id, incrementVote) => {
        this.setState({isLoading: true}, () => {
        const newComments = this.state.comments.map(comment => {
            const newComment = {...comment}
            if(comment.comment_id === comment_id) {
                newComment.votes = comment.votes + incrementVote;
                return newComment
            } else {
                return newComment
            }
        })
        this.setState({comments: newComments, isLoading: false})
        })
    }

    toggleHide = () => {
        this.setState({showComments : !this.state.showComments})
    }

    toggleSort = (sortQuery) => {
        if(this.state.sortOrder === 'desc') {
            this.setState({ sortQuery, sortOrder: 'asc' });
        } else {
            this.setState({ sortQuery, sortOrder: 'desc' });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const commentToPost = this.state.commentToPost;
        if(commentToPost.body === '') {
            this.setState({err : {code: 400, msg: 'body can\'t be blank'}})
        } else {
            postComment(this.props.article_id, commentToPost)
            .then(res => {
                console.log(res.data)
                this.setState(() => {
                    const newComments = [...this.state.comments];
                    newComments.unshift(res.data.comment[0])
                    return {comments: newComments};
                })
            })
        }
    }

    handleMsgChange = (event) => {
        const newBody = event.target.value;
        this.setState(() => {
            const newComment = {...this.state.commentToPost};
            newComment.body = newBody;
            return {commentToPost: newComment}
        })
    }

    render() {
        if(this.state.isLoading) return(<LoadingPage/>)
        else return(
        <div>
            <button onClick={this.toggleHide}>{this.state.showComments ? "Hide" : "Show"}</button>
            {this.state.showComments && <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Msg:</label>
                    <input onChange={this.handleMsgChange}></input>
                    <button>submit</button>
                </form>
                <label>Sort By: </label>
            <button onClick={() => this.toggleSort('votes')}>Votes{this.state.sortQuery === 'votes' ? this.state.sortOrder === 'asc' ? '▲' : '▼' : null}</button>
            <button onClick={() => this.toggleSort('created_at')}>Date Posted {this.state.sortQuery === 'created_at' ? this.state.sortOrder === 'asc' ? '▲' : '▼' : null}</button>
            <ul className="commentList">
                {this.state.comments.map(comment => {
                    return <CommentCard changeCommentVote ={this.changeCommentVote} key={comment.comment_id}commentInfo = {comment}/>
                })}
            </ul>
            </div>}
        </div>)
    }
}

export default CommentList