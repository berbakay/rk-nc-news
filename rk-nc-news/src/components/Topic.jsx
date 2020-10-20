import React from 'react'
import ArticlesList from './ArticlesList'

const Topic = (props) => {
    return (
        <div>
            <h1 className="topicHeading">{props.topic_slug}</h1>
            <ArticlesList topicFilter = {props.topic_slug}/>
        </div>
    )
}

export default Topic