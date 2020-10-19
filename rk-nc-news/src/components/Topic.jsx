import React from 'react'
import ArticlesList from './ArticlesList'

const Topic = (props) => {
    return (
        <div>
            <ArticlesList topicFilter = {props.topic_slug}/>
        </div>
    )
}

export default Topic