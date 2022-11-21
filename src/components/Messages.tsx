import React from 'react';
import './css/Messages.css';

export const ErrorMsg = () =>
    <html id='signup_error' className='pop-up-msgs'>
        Error: Unable to signup, please fill all the details
    </html>;

export const Loading = () =>
    <div id='loading-data'>Loading, please wait!!!</div>;
