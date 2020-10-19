import React from 'react'

class Topic extends React.Component {
    state = {

    }

    render() {
        return (<p>{this.props.topic_slug}</p>)
    }
}

export default Topic