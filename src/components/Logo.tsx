import React from 'react';
import logo from '../assets/logo.png';
import './css/Logo.css';
import { Link } from 'react-router-dom'

const logoSize = 150;
const Logo = () => {
  return (
    <div id='logo_disp' className='logo-container'>
      <Link to={'/'}>
        <img src={logo} alt='logo' id='logo' width={logoSize}
          height={logoSize} />
      </Link>
      <div id='name_box'>
        <h1 id='company_name'>Crypto Tracker</h1>
      </div>
    </div>
  );
};

export default Logo;
