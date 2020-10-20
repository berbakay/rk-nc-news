import React from 'react';
import SelectTopic from './selectTopic';
import SelectUser from './selectUser';


const NavBar = (props) => {
    return(
        <div className="navBar">
        <SelectTopic/>
        <SelectUser changeUser = {props.changeUser}/>
        </div>
    )
}

export default NavBar