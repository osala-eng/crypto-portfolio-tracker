import React from 'react';
import './css/Features.css';

const Features = () => {
    return (
        <div id='features-container'>
            <h1 id='features_heading'>Features</h1>
            <div id='features_list'>
                <div className='feature-container'>
                    <p className='feature'>Add/Remove Crypto Assets</p>
                </div>
                <div className='feature-container'>
                    <p className='feature'>Track Prices</p>
                </div>
                <div className='feature-container'>
                    <p className='feature'>View PnL</p>
                </div>
            </div>
        </div>
    );
};

export default Features;
