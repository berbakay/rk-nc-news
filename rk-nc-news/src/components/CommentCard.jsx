import React from 'react';
import { Link } from '@reach/router'

const CommentCard = (props) => {
    const comment = props.commentInfo;
    return (<li key={comment.comment_id}>
        <p className="makeItBold"><Link to={`/users/${comment.author}`}>{comment.author}</Link></p>
        <p><span className="makeItBold">posted:</span> {comment.created_at}</p>
        <p><span className="makeItBold">votes:</span> {comment.votes}</p>
        <p className="commentBody">{comment.body}</p>
    </li>)
}

export default CommentCard;