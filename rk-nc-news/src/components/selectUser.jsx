import React from 'react';
import axios from 'axios';
import LoadingPage from './LoadingPage';


class SelectUser extends React.Component {
    state = {users: [], user:'', isLoading: true};

    componentDidMount() {
        axios.get('https://nc-news-2-electric-boogaloo.herokuapp.com/api/users')
        .then(res => {
            this.setState({isLoading: false, users: res.data.users})
        })
    }

    handleUserChange = (event) => {
        this.setState({user: event.target.value})
        this.props.changeUser(event.target.value)
    }

    render () {

        if(this.state.isLoading) return(<LoadingPage />)

        return(
            <div className="selectUser">
            <label>Select User: </label>
        <select value={this.state.user} onChange={this.handleUserChange}>
            {this.state.users.map(user => {
                return (<option  key={user.username} value={user.username}>{user.username}</option>)
            })}
        </select>
        </div>
        )
    }
}

export default SelectUser