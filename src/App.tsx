import React, { useState } from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Dashbord from './pages/Dashboard';
import Home from './pages/Home';
import Private from './pages/Private';


function App() {
  const [auth, setAuth] = useState(false);
  /* istanbul ignore next */
  const authenticate = () => {
    setAuth(true);
  };
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home authenticate={authenticate}/>}/>
        <Route path='/dashboard' element={
          <Private access={!auth}>
            <Dashbord/>
          </Private>
        }/>
      </Routes>
    </HashRouter>
  );
};

export default App;
