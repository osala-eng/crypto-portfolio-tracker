import React from 'react';
import './css/Messages.css';

export const ErrorMsg = () =>
    <div id='signup_error' className='pop-up-msgs'>
        Error: Unable to signup, please fill all the details
    </div>;

export const Loading = () =>
    <div id='loading-data'>Loading, please wait!!!</div>;

export const LoginErr = ({loginerr}:{loginerr: string}) =>
    <div id='login_error' className='pop-up-msgs'>
       {loginerr}
    </div>;
