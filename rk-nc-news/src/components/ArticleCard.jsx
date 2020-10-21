import React from 'react'
import { Link } from '@reach/router'
import { patchArticle } from '../apiRequests'

const ArticleCard = (props) => {
    const article = props.articleInfo

    const handleVote = (incrementVote) => {
        patchArticle(article.article_id, incrementVote)
        .then(() => {
            props.changeArticleVote(article.article_id, incrementVote);
        })
    }

    return (
    
    <li>
        <h2 className="articleTitle">
            <Link  to={`/articles/${article.article_id}`}>
                {article.title}
            </Link>
        </h2>
        <p><span className='makeItBold'>topic:</span> {article.topic} <span className='makeItBold'>author:</span> <Link  to={`/users/${article.author}`}>
            {article.author}
        </Link> <span className='makeItBold'>Posted:</span> {article.created_at}</p>
        <p><span className='makeItBold'>Comments: </span> {article.comment_count}</p>
        <p><span className='makeItBold'>Votes: </span> {article.votes}</p>
        <button onClick={() => handleVote(1)}>Upvote</button><button onClick={() => handleVote(-1)}>Downvote</button>
    </li>  )
}

export default ArticleCard;