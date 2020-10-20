import React from 'react';
import NavBar from './NavBar'
import { Link } from '@reach/router'

const Header = (props) => {
    return(
        <header>
            <Link to="/"><h1>NC/NEWS</h1></Link>
            <NavBar changeUser={props.changeUser}/>
        </header>
    )
}

export default Header