import React from 'react';
import './App.css';
import Header from './components/Header';
import { Router } from '@reach/router';
import Home from './components/Home'
import Topic from './components/Topic';
import ArticlePage from './components/ArticlePage';
import UserPage from './components/UserPage';
import Default from './components/Default'

class App extends React.Component {

  state = {
    currentUser: 'tickle122',
    currentTopic: 'all'
  }

  changeTopic = (newTopic) => {
    this.setState({currentTopic: newTopic})
  }

  changeUser = (newUser) => {
    this.setState({currentUser: newUser});
  }

  render() {return (
    <div className="App">
      <Header changeTopic={this.changeTopic} topic={this.state.currentTopic} changeUser={this.changeUser}/>
      <Router default={false} >
        <Home topic={this.state.topic} author={this.state.currentUser} path='/' />
        <Topic author={this.state.currentUser} path='/topics/:topic_slug' changeTopic={this.changeTopic}/>
        <ArticlePage author={this.state.currentUser} path='/articles/:article_id'/>
        <UserPage path='/users/:username'/>
        <Default path='/*'/>
      </Router>
    </div>
  );
  }
}

export default App;
