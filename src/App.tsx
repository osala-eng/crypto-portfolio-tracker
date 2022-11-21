import React from 'react';
import './App.css';
import Features from './components/Features';
import Footer from './components/Footer';
import Logo from './components/Logo';
import ProductHeadline from './components/ProductHeadline';

function App() {
  return (
    <div className="App">
      <Logo/>
      <ProductHeadline/>
      <Features/>
      <Footer/>
    </div>
  );
};

export default App;
