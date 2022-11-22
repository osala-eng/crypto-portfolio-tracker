import React from 'react';
import './css/CryptoForm.css';


export const CryptoForm = () => <form id='crypto-input-form'>
    <div className='crypto-input-field'>
        <label htmlFor='dashboard_token' className='crypto-input-label-class'>
            Token
        </label>
        <input type="text" id='dashboard_token' className='crypto-text-input-class' />
    </div>
    <div className='crypto-input-field'>
        <label htmlFor='dashboard_quantity' className='crypto-input-label-class'>
            Qty. Owned
        </label>
        <input type="text" id='dashboard_quantity' className='crypto-text-input-class' />
    </div>
    <div id='crypto-button-container'>
        <button type="submit" id='dashboard_add_button'>Add Asset</button>
    </div>
</form>;
