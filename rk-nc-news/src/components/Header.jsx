import React from 'react';
import NavBar from './NavBar'

const Header = (props) => {
    return(
        <header>
            <NavBar changeUser={props.changeUser} topic={props.topic} changeTopic ={props.changeTopic}/>
        </header>
    )
}

export default Header