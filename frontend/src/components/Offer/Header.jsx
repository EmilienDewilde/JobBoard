import React from 'react';
import './styles/Header.css';
import DropdownMenu from '../DropMenu';
import '../styles/DropMenu.css'

const HeaderBar = () => {
  const is_login = localStorage.getItem('is_login');
  const is_admin = localStorage.getItem('is_admin');
  const page = 'offers';


  return (
    <header className="header-bar">
      <div className='header-content'>
        <DropdownMenu is_admin={is_admin} is_login={is_login} page={page}/>
        <h1 className='title'>Offers</h1>
      </div>
    </header>
  );
}
export default HeaderBar;