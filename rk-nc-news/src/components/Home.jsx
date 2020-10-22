import React from 'react'
import ArticlesList from './ArticlesList'

const Home  = (props) => {
  return (
    <div>
      <h1>All Topics</h1>
      <ArticlesList author={props.author}/>
    </div>
  )
}

export default Home