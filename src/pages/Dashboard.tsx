import React from 'react';
import '../App.css';
import { CryptoForm } from '../components/CryptoForm';
import Logo from '../components/Logo';
import {Table} from '../components/Table';
import {assets} from '../data/mockdata';

function Dashbord() {
  return (
    <div className="App">
      <Logo/>
      <div id='dashboard-container'>
          <div id='dashboard_heading'>Dashboard</div>
          <Table assets={assets}/>
          <CryptoForm/>
      </div>
    </div>
  );
};

export default Dashbord;
