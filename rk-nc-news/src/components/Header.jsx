import React from 'react';
import { Link } from '@reach/router'
import SelectTopic from './selectTopic'
import SelectUser from './selectUser'

const Header = (props) => {
    return(
        <header>
        <Link to="/"><h1 className="headTitle" onClick={() => (props.changeTopic('all'))}>NC/NEWS</h1></Link>
        <SelectTopic changeTopic = {props.changeTopic} topic={props.topic}/>
        <SelectUser changeUser = {props.changeUser}/>
        </header>
    )
}

export default Header