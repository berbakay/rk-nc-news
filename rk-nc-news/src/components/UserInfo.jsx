import React from 'react'
import LoadingPage from './LoadingPage';
import { getSingleUser } from '../apiRequests';

class UserInfo extends React.Component {
    state = {
        userInfo: {},
        isLoading: true,
    }

    componentDidMount() {
        getSingleUser(this.props.username)
        .then(res => {
            this.setState({isLoading: false, userInfo: res.data.user[0]})
        })
    }
    render() {
        if(this.state.isLoading) return(<LoadingPage />)
        if(!this.state.userInfo) return(<p>user not found</p>)
        else return(
        <div>
            <h2>{this.state.userInfo.username}</h2>
            <p>name: {this.state.userInfo.name}</p>
            <img src={this.state.userInfo.avatar_url} alt="user avatar"></img>
        </div>)
    }
}

export default UserInfo