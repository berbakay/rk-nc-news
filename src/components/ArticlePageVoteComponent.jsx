import React from 'react'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { patchArticle } from '../apiRequests';

class ArticlePageVoteComponent extends React.Component {
    state = {
        votes: 0,
        isLoading: true,
    }

    componentDidMount() {
        this.setState({votes: this.props.votes, isLoading: false})
    }

    handleVote = (incrementVote) => {
        this.setState({isLoading: true}, () => {
            patchArticle(this.props.article_id, incrementVote)
            .then((res) => {
                this.setState({votes: res.data.article[0].votes, isLoading: false})
            })
        })
    }

    render () {
        return (<div className="voteButtons">
        <button onClick={() => this.handleVote(1)}><ArrowUpwardIcon/></button>
        <button onClick={() => this.handleVote(-1)}><ArrowDownwardIcon/></button> 
        <p className="voteTracker">votes: {this.state.isLoading ? '??' : this.state.votes} comments: {this.props.comment_count}</p>
    </div>)
    }
}

export default ArticlePageVoteComponent