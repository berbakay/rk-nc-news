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
        this.props.changeTopic(event.target.value);
        this.setState({topic: event.target.value})
        if(event.target.value !== 'all') {
            const topic = event.target.value;
            navigate(`/topics/${topic}`);
        } else {
            navigate('/');
        }
    }

    render () {
        if(this.state.isLoading) return(<LoadingPage />)
        else return(
            <div className="selectTopic">
            <label>Select Topic: </label>
        <select value={this.props.topic} onChange={this.handleTopicChange}>
            <optgroup label="Select Topic">
            <option key="blank" value='all'>All</option>
            {this.state.topics.map(topic => {
                return (<option key={topic.slug} value={topic.slug}>{topic.slug}</option>)
            })}
            </optgroup>
        </select>
        </div>
        )
    }
}

export default SelectTopic