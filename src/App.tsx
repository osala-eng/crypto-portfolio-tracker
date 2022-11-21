import React from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom'
import Dashbord from './pages/Dashboard';
import Home from './pages/Home';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashbord/>}/>
      </Routes>
    </HashRouter>
  );
};

export default App;
