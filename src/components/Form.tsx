import React, { useEffect, useState } from 'react';
import { User } from '../utils/types';
import './Form.css';

export const Form = ({fetchCall}:{fetchCall: (userName: User)=>void}) => {
  const [userName, setUserName] = useState('');
  const [busy, setBusy] = useState(false);

  const submitAction = () => {
    setBusy(true);
    fetchCall({username: userName});
  }

  useEffect(()=>{
    setTimeout(()=>{
      setBusy(false);
    }, 1000);

  }, [busy]);

  return (
    <div className='form-container' data-testid='form-id'>
        <form className='input-form'>
            <div>
                <label htmlFor='username_field' className='input-line'>
                    Username
                </label>
                <input type='text' name='username_field' id='username_field'
                className='input-line'
                onChange={(e)=> setUserName(e.target.value)}/>
            </div>
            <input value='Submit' readOnly disabled={busy} onClick={submitAction}
            id='submit_button' className='input-line'/>
        </form>
    </div>
  );
};
