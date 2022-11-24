import React , {useEffect, useState} from 'react';
import '../App.css';
import { CryptoForm } from '../components/CryptoForm';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import {Table} from '../components/Table';
import { HoldingsBackend } from '../data/config';
import { Assets } from '../data/types';

function Dashbord({user, logoutFn}:{user: string, logoutFn: ()=>void}) {
  const [holdings, setHoldings] = useState<Assets | undefined>();
  const [newToken, setNewToken] = useState(false);

  /* istanbul ignore next */
  const update = () => {
    setNewToken(!newToken);
  };

  /* istanbul ignore next */
  useEffect(()=> {
    const load = async () => {
      await fetch(`${HoldingsBackend}/?username=${user}`,
      { method: 'GET' })
        .then(res => res.json())
        .then(res => {
          const assets = res as Assets;
          setHoldings(assets);
        })
        .catch(e => {
          console.log(e.message);
        });
    };
    load();

  }, [user, newToken]);

  return (
    <div className="App">
      <div id='sort-content'>
        <Logo logout logoutFn={logoutFn}/>
        <div id='dashboard-container'>
            <div id='dashboard_heading'>Dashboard</div>
            <Table assets={holdings} username={user} updateDash={update}/>
            <CryptoForm username={user} update={update}/>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Dashbord;
