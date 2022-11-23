import React , {useEffect, useState} from 'react';
import '../App.css';
import { CryptoForm } from '../components/CryptoForm';
import Logo from '../components/Logo';
import {Table} from '../components/Table';
import { HoldingsBackend } from '../data/config';
import { Assets } from '../data/types';

function Dashbord({user}:{user: string}) {
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
          console.log(res)
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
      <Logo/>
      <div id='dashboard-container'>
          <div id='dashboard_heading'>Dashboard</div>
          <Table assets={holdings}/>
          <CryptoForm username={user} update={update}/>
      </div>
    </div>
  );
};

export default Dashbord;
