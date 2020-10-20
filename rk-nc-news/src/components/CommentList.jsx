import React from 'react'
import axios from 'axios'

class CommentList extends React.Component {
    state = {
        comments: [],
    }

    componentDidMount() {
        axios.get(`https://nc-news-2-electric-boogaloo.herokuapp.com/api/articles/${this.props.article_id}/comments`)
        .then(res => {
            console.log(res.data)
            this.setState({comments: res.data.comments})
        })
    }

    render() {
        return(<ul>
            {this.state.comments.map(comment => {
                return (<li key={comment.comment_id}>
                    <p>{comment.author}</p>
                    <p>{comment.created_at}</p>
                    <p>{comment.votes}</p>
                    <p>{comment.body}</p>
                </li>)
            })}
        </ul>)
    }
}

export default CommentList