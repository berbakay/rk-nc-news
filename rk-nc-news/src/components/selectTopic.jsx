import React from 'react';
import { navigate } from '@reach/router';
import LoadingPage from './LoadingPage';
import { getTopics } from '../apiRequests';
import CreateTopic from './CreateTopic';
import {Select, MenuItem} from '@material-ui/core'

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

    updateTopics = (newTopic) => {
        this.setState(() => {
            const newTopics = [...this.state.topics];
            newTopics.push(newTopic);
            return{topics: newTopics};
        })
    }


    render () {
        if(this.state.isLoading) return(<LoadingPage />)
        else return(
            <div className="selectTopic">
        <Select value={this.props.topic}  onChange={this.handleTopicChange} displayEmpty>
            <MenuItem disabled>Select Topic</MenuItem>
            <MenuItem value="all">All</MenuItem>
            {this.state.topics.map(topic => {
                return (<MenuItem key={topic.slug} value={topic.slug}>{topic.slug}</MenuItem>)
            })}
        </Select>
        <CreateTopic updateTopics={this.updateTopics}/>
        </div>
        )
    }
}

export default SelectTopic