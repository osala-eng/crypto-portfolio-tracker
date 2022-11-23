import React , {useEffect, useState} from 'react';
import { setConstantValue } from 'typescript';
import '../App.css';
import { CryptoForm } from '../components/CryptoForm';
import Logo from '../components/Logo';
import {Table} from '../components/Table';
import { HoldingsBackend } from '../data/config';
import {assets} from '../data/mockdata';
import { Assets, HTTP } from '../data/types';

function Dashbord({user}:{user: string}) {
  const [holdings, setHoldings] = useState<Assets | undefined>();

  useEffect(()=> {
    (async () => {
      await fetch(`${HoldingsBackend}/?username=${user}`,
      { method: 'GET' })
        .then(res => res.json())
        .then(res => {
          if(res.status !== HTTP['200']){
            throw new Error('Could not get');
          }
          const assets = res.body as Assets;
          setHoldings(assets);
        })
        .catch(e => {
          console.log(e.message)
        });
    });

  }, [holdings])

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
