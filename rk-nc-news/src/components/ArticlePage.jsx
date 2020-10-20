import React from 'react'
import ArticleInfo from './ArticleInfo'
import CommentList from './CommentList'


const ArticlePage = (props) => {
        return (
                <div>
                        <ArticleInfo article_id={props.article_id}/>
                        <h2>Comments</h2>
                        <CommentList article_id={props.article_id}/>
                </div>
                )
}

export default ArticlePage