import React from 'react'
import { Link } from '@reach/router'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { dateToTimeString } from '../utils/utils';
import ArticleListVoteComponent from './ArticleListVoteComponent';

const ArticleCard = (props) => {
    const article = props.articleInfo

    return (
    <li>
       
        
        <ArticleListVoteComponent article_id={article.article_id} votes={article.votes}/>
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