import React from 'react';
import { createTopic } from '../apiRequests';

class CreateTopic extends React.Component {
    state = {
        createTopic: false,
        topicToCreate: {slug: null, description: null},
        err: null
    }

    changeSlug = (event) => {
        const newSlug = event.target.value;
        this.setState(() => {
            const newTopicToCreate = {...this.state.topicToCreate};
            newTopicToCreate.slug = newSlug;
            return {topicToCreate: newTopicToCreate};
        })
    }

    changeDescription = (event) => {
        const newDescription = event.target.value;
        this.setState(() => {
            const newTopicToCreate = {...this.state.topicToCreate};
            newTopicToCreate.description = newDescription;
            return {topicToCreate: newTopicToCreate};
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const topicToPost = this.state.topicToCreate;
        if(topicToPost.slug === '' || topicToPost.description === '')  {
            this.setState({err : {code: 400, msg: 'no part of form can be blank'}})
        } else {
            createTopic(topicToPost)
            .then((res) => {
                this.props.updateTopics(res.data.topic);
            })
        }
    }

    toggleCreate = () => {
        this.setState({createTopic: !this.state.createTopic})
    }

    render() {
        return (
            <div>
                <button onClick={this.toggleCreate}>Create Topic</button>
                {this.state.createTopic && <form onSubmit={this.handleSubmit}>
                    <label>Topic Name</label>
                    <input onChange={this.changeSlug}></input>
                    <label>Description</label>
                    <input onChange={this.changeDescription}></input>
                    <button>Submit</button>
                </form>}
            </div>
        )
    }
}

export default CreateTopic