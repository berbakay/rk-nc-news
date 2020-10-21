import React from 'react';
import SelectTopic from './selectTopic';
import SelectUser from './selectUser';
import { Link } from '@reach/router';

const NavBar = (props) => {
    return(
        <div className="navBar">
        <Link to="/"><h1 className="headTitle" onClick={() => (props.changeTopic('all'))}>NC/NEWS</h1></Link>
        <SelectTopic changeTopic = {props.changeTopic} topic={props.topic}/>
        <SelectUser changeUser = {props.changeUser}/>
        </div>
    )
}

export default NavBar