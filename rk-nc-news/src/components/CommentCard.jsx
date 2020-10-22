import React from 'react';
import { Link } from '@reach/router'
import { deleteComments, patchComment } from '../apiRequests';

const CommentCard = (props) => {
    const comment = props.commentInfo;

    const handleVote = (incrementVote) => {
        props.changeIsLoading();
        patchComment(comment.comment_id, incrementVote)
        .then(() => {
            props.changeCommentVote(comment.comment_id, incrementVote);
        })
    }

    const handleDelete = () => {
        deleteComments(props.commentInfo.comment_id)
        .then(() => {
            props.deleteRefresh(props.commentInfo.comment_id);
        })
    }

    return (<li>
        <p className="makeItBold"><Link to={`/users/${comment.author}`}>{comment.author}</Link></p>
        <p><span className="makeItBold">posted:</span> {comment.created_at}</p>
        <p><span className="makeItBold">votes:</span> {comment.votes}</p>
        <p className="commentBody">{comment.body}</p>
        <button onClick={() => handleVote(1)}>Upvote</button><button onClick={() => handleVote(-1)}>Downvote</button>
        <button onClick={handleDelete}>Delete</button>
    </li>)
}

export default CommentCard;