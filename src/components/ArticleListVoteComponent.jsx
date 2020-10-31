import React from 'react'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { patchArticle } from '../apiRequests';

class ArticleListVoteComponent extends React.Component {
    state = {
        votes: 0,
        isLoading: true
    }

    componentDidMount() {
        this.setState({votes: this.props.votes, isLoading: false})
    }

    handleVote = (iterator) => {
        this.setState({isLoading: true});
        patchArticle(this.props.article_id, iterator)
        .then(res => this.setState({votes:res.data.article[0].votes, isLoading: false}));
    }

   render() {
    return  (
    <div className="articleCardButtons">
        <button onClick={() => (this.handleVote(1))}><ArrowUpwardIcon/></button>
        {this.state.isLoading ? <p>??</p> : <p>{this.state.votes}</p>}
        <button onClick={() => (this.handleVote(-1))}><ArrowDownwardIcon/></button>
    </div>
    )}
}

export default ArticleListVoteComponent