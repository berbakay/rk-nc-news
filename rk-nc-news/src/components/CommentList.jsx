import React from 'react'
import LoadingPage from './LoadingPage'
import { Link } from '@reach/router'
import { getArticleComments } from '../apiRequests'

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

    render() {
        if(this.state.isLoading) return(<LoadingPage/>)
        else return(<ul className="commentList">
            {this.state.comments.map(comment => {
                return (<li key={comment.comment_id}>
                    <p className="makeItBold"><Link to={`/users/${comment.author}`}>{comment.author}</Link></p>
                    <p><span className="makeItBold">posted:</span> {comment.created_at}</p>
                    <p><span className="makeItBold">votes:</span> {comment.votes}</p>
                    <p className="commentBody">{comment.body}</p>
                </li>)
            })}
        </ul>)
    }
}

export default CommentList