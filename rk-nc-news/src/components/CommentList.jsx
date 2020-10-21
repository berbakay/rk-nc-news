import React from 'react'
import LoadingPage from './LoadingPage'
import { getArticleComments } from '../apiRequests'
import CommentCard from './CommentCard'

class CommentList extends React.Component {
    state = {
        comments: [],
        isLoading: true
    }

    componentDidMount() {
        getArticleComments(this.props.article_id)
        .then(res => {
            this.setState({isLoading: false, comments: res.data.comments})
        })
    }

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

    render() {
        if(this.state.isLoading) return(<LoadingPage/>)
        else return(<ul className="commentList">
            {this.state.comments.map(comment => {
                return <CommentCard changeCommentVote ={this.changeCommentVote} key={comment.comment_id}commentInfo = {comment}/>
            })}
        </ul>)
    }
}

export default CommentList