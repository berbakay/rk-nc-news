import React from 'react';
import './App.css';
import Header from './components/Header';
import { Router } from '@reach/router';
import Home from './components/Home'
import Topic from './components/Topic';
import ArticlePage from './components/ArticlePage';
import UserPage from './components/UserPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Home path='/' />
        <Topic path='/topics/:topic_slug'/>
        <ArticlePage path='/articles/:article_id'/>
        <UserPage path='/users/:username'/>
      </Router>
    </div>
  );
}

export default App;
