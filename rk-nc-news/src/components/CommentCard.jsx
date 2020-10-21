import React from 'react';
import { Link } from '@reach/router'
import { patchComment } from '../apiRequests';

const CommentCard = (props) => {
    const comment = props.commentInfo;

    const handleVote = (incrementVote) => {
        patchComment(comment.comment_id, incrementVote)
        .then(() => {
            props.changeCommentVote(comment.comment_id, incrementVote);
        })
    }

    return (<li>
        <p className="makeItBold"><Link to={`/users/${comment.author}`}>{comment.author}</Link></p>
        <p><span className="makeItBold">posted:</span> {comment.created_at}</p>
        <p><span className="makeItBold">votes:</span> {comment.votes}</p>
        <p className="commentBody">{comment.body}</p>
        <button onClick={() => handleVote(1)}>Upvote</button><button onClick={() => handleVote(-1)}>Downvote</button>
    </li>)
}

export default CommentCard;