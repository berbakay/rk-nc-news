import React from 'react'
import { Link } from '@reach/router'
import { patchArticle } from '../apiRequests';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { dateToTimeString } from '../utils/utils';

const ArticleCard = (props) => {
    const article = props.articleInfo

    const handleVote = (incrementVote) => {
        props.changeIsLoading()
        patchArticle(article.article_id, incrementVote)
        .then(() => {
            props.changeArticleVote(article.article_id, incrementVote);
        })
    }

    return (
    
    <li>
        <div className="articleCardButtons">
        <button onClick={() => handleVote(1)}><ArrowUpwardIcon/></button>
        <p>{article.votes}</p>
        <button onClick={() => handleVote(-1)}><ArrowDownwardIcon/></button>
        </div>
        <div className="articleInformation">
        <h2 className="articleTitle">
            <Link  to={`/articles/${article.article_id}`}>
                {article.title}
            </Link>
        </h2>
        <p><AccountCircleIcon/> <Link  to={`/users/${article.author}`}>{article.author}</Link> </p>
        <p>comments: {article.comment_count}</p> 
        <p>{article.topic}</p> 
        <p>{dateToTimeString(article.created_at)}</p>
       
        </div>
    </li>  )
}

export default ArticleCard;