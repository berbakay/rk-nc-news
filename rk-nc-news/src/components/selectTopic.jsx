import React from 'react';
import { navigate } from '@reach/router';
import LoadingPage from './LoadingPage';
import { getTopics } from '../apiRequests';


class SelectTopic extends React.Component {
    state = {
        topics: [], 
        topic:'', 
        isLoading: true
    };

    componentDidMount() {
        getTopics()
        .then(res => {
            this.setState({isLoading: false, topics: res.data.topics})
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
        if(this.state.isLoading) return(<LoadingPage />)
        else return(
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