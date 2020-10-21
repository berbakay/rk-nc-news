import React from 'react'
import { Link } from '@reach/router'

const ArticleCard = (props) => {
    const article = props.articleInfo

    return (
    
    <li key={article.article_id}>
        <h2 className="articleTitle">
            <Link  to={`/articles/${article.article_id}`}>
                {article.title}
            </Link>
        </h2>
        <p><span className='makeItBold'>topic:</span> {article.topic} <span className='makeItBold'>author:</span> <Link  to={`/users/${article.author}`}>
            {article.author}
        </Link> <span className='makeItBold'>Posted:</span> {article.created_at}</p>
        <p><span className='makeItBold'>Votes: </span> {article.votes}</p>
        <p><span className='makeItBold'>Comments: </span> {article.comment_count}</p>
    </li>  )
}

export default ArticleCard;