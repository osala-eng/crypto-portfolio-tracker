import React , {useState} from 'react';
import '../App.css';
import { CryptoForm } from '../components/CryptoForm';
import Logo from '../components/Logo';
import {Table} from '../components/Table';
import {assets} from '../data/mockdata';

function Dashbord({user}:{user: string}) {
  const [holdings, setHoldings] = useState([{
    token: 'Test',
    quantity: NaN,
    price: NaN,
    total: NaN,
    allocation: NaN
  }]);


  return (
    <div className="App">
      <Logo/>
      <div id='dashboard-container'>
          <div id='dashboard_heading'>Dashboard</div>
          <Table assets={holdings}/>
          <CryptoForm username={user}/>
      </div>
    </div>
  );
};

export default Dashbord;
