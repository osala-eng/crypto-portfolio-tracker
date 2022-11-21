import React from 'react';
import './App.css';
import Features from './components/Features';
import Footer from './components/Footer';
import Logo from './components/Logo';
import ProductHeadline from './components/ProductHeadline';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Logo/>
      <ProductHeadline/>
      <Features/>
      <Register/>
      <Footer/>
    </div>
  );
};

export default App;
