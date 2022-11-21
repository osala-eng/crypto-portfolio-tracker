import React, { useEffect, useState } from 'react';
import { BackendUrl } from '../data/config';
import { ChangeEvent, ClickEvent, HTTP, ID, MS } from '../data/types';
import './css/Register.css';
import { ErrorMsg, Loading } from './Messages';

const Register = () => {
    const [state, setState] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    /* istanbul ignore next */
    const handleState = (e: ChangeEvent, id: number) => {
        if (id === ID[1]) {
            setState({
                ...state, username: e.target.value
            });
        }
        else if (id === ID[2]) {
            setState({
                ...state, email: e.target.value
            })
        }

        else if (id === ID[3]) {
            setState({
                ...state, password: e.target.value
            })
        }
    }

    /* istanbul ignore next */
    const handleClick = async (e: ClickEvent) => {
        e.preventDefault();
        if (!state.email.length || !state.password.length || !state.username.length) {
            setLoading(false);
            setError(true);
        }

        else {
            setLoading(true);
            await fetch(BackendUrl, {
                method: 'POST',
                body: JSON.stringify(state)
            })
                .then((res) => {
                    setLoading(false);
                    if (res.status !== HTTP[201]) {
                        throw new Error('User registration failed');
                    }
                })
                .catch(() => {
                    setLoading(false);
                    setError(true)
                });
        }
    }
    /* istanbul ignore next */
    useEffect(()=>{
        let time: NodeJS.Timeout;

        time = setTimeout(()=>{
            setError(false);
        }, MS[10000]);

        return (()=>{
            clearTimeout(time);
        });

    }, [loading, error]);

    const displayMsg = () => {
        if (loading)
            return <Loading />;

        else if (error && !loading)
            return <ErrorMsg />;

        else return <></>;
    }

    return (
        <div id='register-container'>
            <h1 id='registration_heading'>Registration</h1>
            <form id='registration_form'>
                <div className='user-input'>
                    <label htmlFor='username_field' className='box-label'>username</label>
                    <input type='text' id='username_field' name='username_field'
                        className='box-input' onChange={(e) => handleState(e,ID[1])} />
                </div>
                <div className='user-input' >
                    <label htmlFor='email_field' className='box-label'>email</label>
                    <input type='email' id='email_field' name='email_field'
                        className='box-input' onChange={(e) => handleState(e,ID[2])} />
                </div>
                <div className='user-input'>
                    <label htmlFor='password_field' className='box-label'>password</label>
                    <input type='password' id='password_field' name='password_field'
                        className='box-input' onChange={(e) => handleState(e,ID[3])} />
                </div>
                {displayMsg()}
                <div id='button_container'>
                    <button type='submit' id='signup_button' onClick={handleClick} >Signup</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
