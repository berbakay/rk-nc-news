import React from 'react'
import axios from 'axios'
import LoadingPage from './LoadingPage';

class UserInfo extends React.Component {
    state = {
        userInfo: {},
        isLoading: true
    }

    componentDidMount() {
        axios.get(`https://nc-news-2-electric-boogaloo.herokuapp.com/api/users/${this.props.username}`)
        .then(res => {
            this.setState({isLoading: false, userInfo: res.data.user[0]})
        })
    }

    render() {
        if(this.state.isLoading) return(<LoadingPage />)
        return(
        <div>
            <h2>{this.state.userInfo.username}</h2>
            <p>name: {this.state.userInfo.name}</p>
            <img src={this.state.userInfo.avatar_url} alt="user avatar"></img>
        </div>)
    }
}

export default UserInfo