import React from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import HomeIcon from '@material-ui/icons/Home';


class NavBar extends React.Component {
    state = {topics: [], topic:''};

    componentDidMount() {
        axios.get('https://nc-news-2-electric-boogaloo.herokuapp.com/api/topics')
        .then(res => {
            this.setState({topics: res.data.topics})
        })
    }

    handleTopicChange = (event) => {
        this.setState({topic: event.target.value})
        if(event.target.value !== 'home') {
            const topic = event.target.value;
            navigate(`/topics/${topic}`);
        }  
    }

    handleHomeClick = (event) => {
        this.setState({topic: ''})
    }

    render () {
        return(
        <div>
         <Link to='/' onClick={this.handleHomeClick}><HomeIcon /></Link>
        <select value={this.state.topic} onChange={this.handleTopicChange}>
            <option key="blank" value='home'></option>
            {this.state.topics.map(topic => {
                return (<option  key={topic.slug} value={topic.slug}>{topic.slug}</option>)
            })}
        </select>
        </div>)
    }
}

export default NavBar