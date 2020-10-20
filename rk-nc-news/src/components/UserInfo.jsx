import React from 'react'
import axios from 'axios'

class UserInfo extends React.Component {
    state = {
        userInfo: {},
    }

    componentDidMount() {
        axios.get(`https://nc-news-2-electric-boogaloo.herokuapp.com/api/users/${this.props.username}`)
        .then(res => {
            this.setState({userInfo: res.data.user[0]})
        })
    }

    render() {
        return(
        <div>
            <h2>{this.state.userInfo.username}</h2>
            <p>name: {this.state.userInfo.name}</p>
            <img src={this.state.userInfo.avatar_url} alt="user avatar"></img>
        </div>)
    }
}

export default UserInfo