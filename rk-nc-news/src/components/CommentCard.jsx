import React from 'react';
import { Link } from '@reach/router'
import { deleteComments, patchComment } from '../apiRequests';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
        <p className="commentAuthor"><Link to={`/users/${comment.author}`}><AccountCircleIcon/>{comment.author}</Link></p>
        <p>{comment.created_at}</p>
        <p>votes: {comment.votes}</p>
        <p className="commentBody">{comment.body}</p>
        <div className="articleInfoButtons">
            <div className="voteButtons">
        <button onClick={() => handleVote(1)}><ArrowUpwardIcon/></button>
        <button onClick={() => handleVote(-1)}><ArrowDownwardIcon/></button>
        </div>
        <button onClick={handleDelete}>del</button>
        </div>
    </li>)
}

export default CommentCard;