import React, { useState } from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Dashbord from './pages/Dashboard';
import Home from './pages/Home';
import Private from './pages/Private';


function App() {
  const [auth, setAuth] = useState(false);
  const [user, setuserName] = useState('JohnW');
  /* istanbul ignore next */
  const authenticate = (User: string) => {
    setAuth(true);
    setuserName(User);
  };

  /* istanbul ignore next */
  const logOut = () => {
    setAuth(false);
    setuserName('');
  }

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home authenticate={authenticate}/>}/>
        <Route path='/dashboard' element={
          <Private access={auth}>
            <Dashbord user={user} logoutFn={logOut}/>
          </Private>
        }/>
      </Routes>
    </HashRouter>
  );
};

export default App;
