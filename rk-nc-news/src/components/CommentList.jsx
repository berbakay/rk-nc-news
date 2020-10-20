import React from 'react'
import axios from 'axios'
import LoadingPage from './LoadingPage'

class CommentList extends React.Component {
    state = {
        comments: [],
        isLoading: true
    }

    componentDidMount() {
        axios.get(`https://nc-news-2-electric-boogaloo.herokuapp.com/api/articles/${this.props.article_id}/comments`)
        .then(res => {
            console.log(res.data)
            this.setState({isLoading: false, comments: res.data.comments})
        })
    }

    render() {

        if(this.state.isLoading) return(<LoadingPage/>)
        
        return(<ul className="commentList">
            {this.state.comments.map(comment => {
                return (<li key={comment.comment_id}>
                    <p className="makeItBold">{comment.author}</p>
                    <p><span className="makeItBold">posted:</span> {comment.created_at}</p>
                    <p><span className="makeItBold">votes:</span> {comment.votes}</p>
                    <p className="commentBody">{comment.body}</p>
                </li>)
            })}
        </ul>)
    }
}

export default CommentList