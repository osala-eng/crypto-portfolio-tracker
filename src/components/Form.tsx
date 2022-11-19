import React from 'react';
import './Form.css';

export const Form = () => {
  return (
    <div className='form-container'>
        <form className='input-form'>
            <div>
                <label htmlFor='username_field' className='input-line'>
                    Username
                </label>
                <input type='text' name='username_field' id='username_field'
                className='input-line'/>
            </div>
            <input type='submit' value='Submit'  id='submit_button' className='input-line'/>
        </form>
    </div>
  )
};
