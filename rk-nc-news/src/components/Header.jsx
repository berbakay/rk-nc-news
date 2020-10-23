import React from 'react';
import { Link } from '@reach/router'
import SelectTopic from './selectTopic'
import SelectUser from './selectUser'

const Header = (props) => {
    return(
        <div className="headerWrap">
        <header>
        <h1 className="headTitleSM" onClick={() => (props.changeTopic('all'))}><Link to="/"> NC</Link></h1>
        <SelectTopic changeTopic = {props.changeTopic} topic={props.topic}/>
        <SelectUser changeUser = {props.changeUser}/>
        </header>
        </div>
    )
}

export default Header