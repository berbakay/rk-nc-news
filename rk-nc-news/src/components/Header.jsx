import React from 'react';
import NavBar from './NavBar'
import { Link } from '@reach/router'

const Header = (props) => {
    return(
        <header>
            <Link to="/"><h1 onClick={() => (props.changeTopic('all'))}>NC/NEWS</h1></Link>
            <NavBar changeUser={props.changeUser} topic={props.topic} changeTopic ={props.changeTopic}/>
        </header>
    )
}

export default Header