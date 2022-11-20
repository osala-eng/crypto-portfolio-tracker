import React from 'react';

export const SubmitSuccess = () =>
    <html id='submit_success' className='pop-ups load-results'>
        Success, username accepted
    </html>;

export const SubmitError = () =>
    <html id='submit_error'>
        Error: Username too short
    </html>;


export const Waiting = () =>
    <div id='loading-data' className='pop-ups info-loader'>
        Loading please wait...
    </div>;
