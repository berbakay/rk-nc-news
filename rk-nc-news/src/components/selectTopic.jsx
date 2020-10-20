import React from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';


class SelectTopic extends React.Component {
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

    render () {
        return(
            <div className="selectTopic">
            <label>Select Topic: </label>
        <select value={this.state.topic} onChange={this.handleTopicChange}>
            <option key="blank" value='home'></option>
            {this.state.topics.map(topic => {
                return (<option  key={topic.slug} value={topic.slug}>{topic.slug}</option>)
            })}
        </select>
        </div>
        )
    }
}

export default SelectTopic