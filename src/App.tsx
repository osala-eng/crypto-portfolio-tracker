import React from 'react';
import './App.css';
import './components/css/Register.css'
import Features from './components/Features';
import Footer from './components/Footer';
import Login from './components/Login';
import Logo from './components/Logo';
import ProductHeadline from './components/ProductHeadline';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Logo/>
      <ProductHeadline/>
      <Features/>
      <div id='parent_container_login'>
          <Register/>
          <Login/>
      </div>

      <Footer/>
    </div>
  );
};

export default App;
