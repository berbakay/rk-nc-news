import React from 'react';
import { patchComment } from '../apiRequests';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class CommentCardVoteComponent extends React.Component {
    state = {
        votes: 0,
        isLoading: true
    }

    componentDidMount() {
        this.setState({votes: this.props.votes, isLoading: false})
    }

    handleVote = (incrementVote) => {
        this.setState({isLoading: true}, () => {
            patchComment(this.props.comment_id, incrementVote)
            .then((res) => {
                this.setState({votes: res.data.comment.votes, isLoading: false});
            })
        }) 
    }

    render() {
        return (
        <div className="voteButtons">
        <button onClick={() => this.handleVote(1)}><ArrowUpwardIcon/></button>
        <button onClick={() => this.handleVote(-1)}><ArrowDownwardIcon/></button>
        <p>votes: {this.state.isLoading ? '??' : this.state.votes}</p>
        </div>
        )
    }
}

export default CommentCardVoteComponent