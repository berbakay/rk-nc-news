import React from 'react'
import ArticlesList from './ArticlesList'
import UserInfo from './UserInfo'

const UserPage = (props) =>  {

    return (
        <div>
            <UserInfo username={props.username}/>
            <h2>Articles</h2>
            <ArticlesList username={props.username}/>
        </div>
    )
}

export default UserPage