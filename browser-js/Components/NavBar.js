import React from 'react';

//props should be...
// title for the navbar
//
const NavBar = (props) => {

  return (
    <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
      <ul className="list-inline navbar-nav">
        <li className="list-inline-item nav-item"><span className="nav-link glyphicon glyphicon-arrow-left" /></li>
        <li className="list-inline-item nav-item"><span className="nav-link glyphicon glyphicon-home" /></li>
        {props.canEdit && <li className="list-inline-item nav-item"><span className=" nav-link glyphicon glyphicon-pencil" /></li>}
        {props.canAddTo && <li className="list-inline-item nav-item"><span className=" nav-link glyphicon glyphicon-plus" /></li>}
      </ul>
    </nav>
  )


}

export default NavBar;
