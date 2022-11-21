import React from 'react';
import './css/Register.css';

const Register = () => {
    return (
        <div id='register-container'>
            <h1 id='registration_heading'>Registration</h1>
            <form id='registration_form'>
                <div className='user-input'>
                    <label htmlFor="username_field" className='box-label'>username</label>
                    <input type="text" id='username_field' name='username_field'
                        className='box-input' />
                </div>
                <div className='user-input' >
                    <label htmlFor="email_field" className='box-label'>email</label>
                    <input type="email" id='email_field' name='email_field'
                        className='box-input' />
                </div>
                <div className='user-input'>
                    <label htmlFor="password_field" className='box-label'>password</label>
                    <input type="password" id='password_field' name='password_field'
                        className='box-input' />
                </div>
                <div id='button_container'>
                    <button type="submit" id='signup_button'>Signup</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
