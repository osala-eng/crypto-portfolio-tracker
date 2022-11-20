import React, { useEffect, useState } from 'react';
import { User } from '../utils/types';
import './Form.css';

export const Form = ({ fetchCall }: { fetchCall: (userName: User) => void }) => {
  const [userName, setUserName] = useState('');
  const [busy, setBusy] = useState(false);

  /* istanbul ignore next */
  const submitAction = () => {
    setBusy(true);
    fetchCall({ username: userName });
  };

  /* istanbul ignore next */
  const userFn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  };

  /* istanbul ignore next */
  useEffect(() => {
    setTimeout(() => {
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
          <input type='text' onChange={userFn.bind(this)} name='username_field'
            className='input-line' id='username_field' placeholder='username' />
        </div>
        <button type='submit' disabled={busy} data-testid='subbtn'
          onClick={submitAction} id='submit_button' className='input-line' >Submit</button>
      </form>
    </div>
  );
};
