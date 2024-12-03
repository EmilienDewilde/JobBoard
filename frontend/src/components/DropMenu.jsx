import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropdownMenu = ({is_login, is_admin, page}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        Menu
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
            <Link to={'/Home'}><li className="dropdown-item">Home</li></Link>
          {page != 'profile' && is_login ? <Link to={'/Profile'}><li className="dropdown-item">Profile</li></Link> : null}
            
          {!is_login  ?
            <Link to={'/Login'}><li className="dropdown-item">Login/register </li> </Link> 
          :null }
          {is_admin && page != 'admin'? 
            <Link to={'/Admin'}><li className="dropdown-item">Admin</li></Link>
          : null}
          {page != 'offers' ? <Link to={'/Offers'}><li className="dropdown-item">Offers</li></Link> : null}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
