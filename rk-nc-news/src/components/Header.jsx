import React from 'react';
import { Link } from '@reach/router'
import SelectTopic from './selectTopic'
import SelectUser from './selectUser'

const Header = (props) => {
    return(
        <header>
        <h1 className="headTitleLG" onClick={() => (props.changeTopic('all'))}> <Link to="/">NC/NEWS</Link></h1>
        <h1 className="headTitleSM" onClick={() => (props.changeTopic('all'))}><Link to="/"> NC</Link></h1>
        <SelectTopic changeTopic = {props.changeTopic} topic={props.topic}/>
        <SelectUser changeUser = {props.changeUser}/>
        </header>
    )
}

export default Header