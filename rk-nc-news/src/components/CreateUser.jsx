import React from 'react';
import { createUser } from '../apiRequests';

class CreateUser extends React.Component {
    state = {
        createUser: false,
        userToCreate: {name: null, username: null, avatar_url: null},
        err: null
    }

    changeUsername = (event) => {
        const newUsername = event.target.value;
        this.setState(() => {
            const newUserToCreate = {...this.state.userToCreate};
            newUserToCreate.username = newUsername;
            return {userToCreate: newUserToCreate};
        })
    }

    changeName = (event) => {
        const newName = event.target.value;
        this.setState(() => {
            const newUserToCreate = {...this.state.userToCreate};
            newUserToCreate.name = newName;
            return {userToCreate: newUserToCreate};
        })
    }

    changeAvatar = (event) => {
        console.log(this.state.userToCreate)
        const newAvatar = event.target.value;
        this.setState(() => {
            const newUserToCreate = {...this.state.userToCreate};
            newUserToCreate.avatar_url = newAvatar;
            return {userToCreate: newUserToCreate};
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const userToPost = this.state.userToCreate;
        if(userToPost.username === '' || userToPost.name === '' || userToPost.avatar_url === '') {
            this.setState({err : {code: 400, msg: 'no part of form can be blank'}})
        } else {
            createUser(userToPost)
            .then((res) => {
                this.props.updateUsers(res.data.user)
            })
        }
    }

    toggleCreate = () => {
        this.setState({createUser: !this.state.createUser})
    }

    render() {
        return(
            <div>
                <button onClick={this.toggleCreate}>Create User</button>
                {this.state.createUser && <form onSubmit={this.handleSubmit}>
                    <label>username</label>
                    <input onChange={this.changeUsername}></input>
                    <label>name</label>
                    <input onChange={this.changeName}></input>
                    <label>picture URL</label>
                    <input onChange={this.changeAvatar}></input>
                    <button>Submit</button>
                </form>}
            </div>
        )
    }
}

export default CreateUser