import React from 'react';
import SelectTopic from './selectTopic';
import SelectUser from './selectUser';


const NavBar = (props) => {
    return(
        <div className="navBar">
        <SelectTopic changeTopic = {props.changeTopic} topic={props.topic}/>
        <SelectUser changeUser = {props.changeUser}/>
        </div>
    )
}

export default NavBar