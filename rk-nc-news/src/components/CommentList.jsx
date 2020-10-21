import React from 'react'
import LoadingPage from './LoadingPage'
import { Link } from '@reach/router'
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

    render() {
        if(this.state.isLoading) return(<LoadingPage/>)
        else return(<ul className="commentList">
            {this.state.comments.map(comment => {
                return <CommentCard commentInfo = {comment}/>
            })}
        </ul>)
    }
}

export default CommentList