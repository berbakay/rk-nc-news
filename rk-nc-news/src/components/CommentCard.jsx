import React from 'react';
import { Link } from '@reach/router'
import { deleteComments} from '../apiRequests';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { dateToTimeString } from '../utils/utils';
import CommentCardVoteComponent from './CommentCardVoteComponent';

const CommentCard = (props) => {
    const comment = props.commentInfo;

    const handleDelete = () => {
        deleteComments(comment.comment_id)
        .then(() => {
            props.deleteRefresh(comment.comment_id);
        })
    }

    return (<li>
        <p className="commentAuthor"><Link to={`/users/${comment.author}`}><AccountCircleIcon/>{comment.author}</Link></p>
        <p>{dateToTimeString(comment.created_at)}</p>
        <p className="commentBody">{comment.body}</p>
        <div className="articleInfoButtons">
            <CommentCardVoteComponent votes={comment.votes} comment_id={comment.comment_id}/>
        <button onClick={handleDelete}>del</button>
        </div>
    </li>)
}

export default CommentCard;