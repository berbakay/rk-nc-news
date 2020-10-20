import React from 'react'
import ArticleInfo from './ArticleInfo'
import CommentList from './CommentList'


const ArticlePage = (props) => {
        return (
                <div className='articlePage'>
                        <ArticleInfo article_id={props.article_id}/>
                        <div id="commentSection">
                        <h3>Comments</h3>
                        <CommentList article_id={props.article_id}/>
                        </div>
                </div>
                )
}

export default ArticlePage