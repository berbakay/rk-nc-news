import React from 'react';
import LoadingPage from './LoadingPage';
import { getUsers } from '../apiRequests';
import CreateUser from './CreateUser'


class SelectUser extends React.Component {
    state = {
        users: [], 
        user:'', 
        isLoading: true};

    componentDidMount() {
        getUsers()
        .then(res => {
            this.setState({isLoading: false, users: res.data.users})
        })
    }

    handleUserChange = (event) => {
        this.setState({user: event.target.value})
        this.props.changeUser(event.target.value)
    }

    updateUsers = (newUser) => {
        this.setState(() => {
            const newUsers = [...this.state.users];
            newUsers.push(newUser);
            return{users: newUsers};
        })
    }

    render () {
        if(this.state.isLoading) return(<LoadingPage />)
        else return(
            <div className="selectUser">
            <label>Select User: </label>
        <select value={this.state.user} onChange={this.handleUserChange}>
            {this.state.users.map(user => {
                return (<option  key={user.username} value={user.username}>{user.username}</option>)
            })}
        </select>
        <CreateUser updateUsers={this.updateUsers}/>
        </div>
        )
    }
}

export default SelectUser