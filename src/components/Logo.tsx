import React from 'react';
import './css/Logo.css';
import { Link } from 'react-router-dom';

const logo = require('../assets/logo.png');



const logoSize = 150;
const Logo = ({logout=false, logoutFn}:
  {logout?: boolean, logoutFn?: ()=>void}) => {
  return (
    <div id='logo_disp' className='logo-container'>
      <Link to={'/'}>
        <img src={logo} alt='logo' id='logo' width={logoSize}
          height={logoSize} />
      </Link>
      <div id='name_box'>
        <h1 id='company_name'>Crypto Tracker</h1>
      </div>
      <div id='logout_link' style={{display: logout ? 'block' : 'none'}}
        onClick={logoutFn}>Logout</div>
    </div>
  );
};

export default Logo;
