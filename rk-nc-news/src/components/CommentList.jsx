import React from 'react'
import LoadingPage from './LoadingPage'
import { getArticleComments } from '../apiRequests'
import CommentCard from './CommentCard'

class CommentList extends React.Component {
    state = {
        comments: [],
        isLoading: true,
        showComments: false,
        sortQuery: 'created_at',
        sortOrder: 'desc'
    }

    componentDidMount() {
        getArticleComments(this.props.article_id, this.state.sortQuery, this.state.sortOrder)
        .then(res => {
            this.setState({isLoading: false, comments: res.data.comments})
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.sortQuery !== this.state.sortQuery || prevState.sortOrder !== this.state.sortOrder) {
            getArticleComments(this.props.article_id, this.state.sortQuery, this.state.sortOrder)
            .then(res => this.setState({isLoading: false, comments: res.data.comments}))
    }}

    changeCommentVote = (comment_id, incrementVote) => {
        const newComments = this.state.comments.map(comment => {
            const newComment = {...comment}
            if(comment.comment_id === comment_id) {
                newComment.votes = comment.votes + incrementVote;
                return newComment
            } else {
                return newComment
            }
        })
        this.setState({comments: newComments})
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

    render() {
        if(this.state.isLoading) return(<LoadingPage/>)
        else return(
        <div>
            <button onClick={this.toggleHide}>{this.state.showComments ? "Hide" : "Show"}</button>
            {this.state.showComments && <div>
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