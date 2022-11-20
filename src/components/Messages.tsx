import React from 'react'

export const SubmitSuccess = () => {
  return (
    <div id='submit_success' className='pop-ups load-results'>
        Success, username accepted</div>
  );
};

export const SubmitError = () => {
    return (
        <div id='submit_error'>Error: Username too short</div>
    );
};

export const Waiting = () => {
    return <div id='loading-data' className='pop-ups info-loader'>
        Loading please wait...
    </div>
}
