import React, { useEffect, useState } from 'react';
// import { BackendUrl } from '../data/config';
import { ChangeEvent, ClickEvent, ID, MS } from '../data/types';
import './css/Register.css';
import { ErrorMsg, Loading } from './Messages';

const Login = () => {
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    /* istanbul ignore next */
    const handleState = (e: ChangeEvent, id: number) => {
        if (id === ID['1']) {
            setState({
                ...state, username: e.target.value
            });
        }
        else if (id === ID['2']) {
            setState({
                ...state, password: e.target.value
            });
        }
        else {
            throw new Error('Unexpected value');
        }
    };

    /* istanbul ignore next */
    const handleClick = async (e: ClickEvent) => {
        e.preventDefault();
        if (!state.password.length || !state.username.length) {
            setLoading(false);
            setError(true);
        }

        else {
            setLoading(true);
            await fetch('https://google.com', {
                // method: 'POST',
                // body: JSON.stringify(state)
            })
                .then(() => {
                    setLoading(false);
                    // if (res.status !== HTTP['201']) {
                    //     throw new Error('User registration failed');
                    // }
                })
                .catch(() => {
                    setLoading(false);
                    setError(true)
                });
        }
    };
    /* istanbul ignore next */
    useEffect(()=>{
        const time = setTimeout(()=>{
            setError(false);
        }, MS['10000']);

        return (()=>{
            clearTimeout(time);
        });

    }, [loading, error]);

    /* istanbul ignore next */
    const displayMsg = () => {
        if (loading){
            return <Loading />;
        }

        else if (error && !loading){
            return <ErrorMsg />;
        }

        else {
            return <></>;
        }
    };

    return (
        <div id='register-container'>
            <h1 id='login_heading'>Login</h1>
            <form id='login_form'>
                <div className='user-input' id='user-input-div'>
                    <label htmlFor='login_username_field' className='box-label'>username</label>
                    <input type='text' id='login_username_field' name='login_username_field'
                        className='box-input' onChange={(e) => handleState(e,ID['1'])}
                        data-testid={'login-user'} />
                </div>
                <div className='user-input' >
                    <label htmlFor='login_password_field' className='box-label'>password</label>
                    <input type='password' id='login_password_field' name='login_password_field'
                        className='box-input' onChange={(e) => handleState(e,ID['2'])}
                        data-testid={'login-pass'}/>
                </div>
                {displayMsg()}
                <div id='button_container'>
                    <button type='submit' id='login_button' onClick={handleClick}
                    data-testid={'login-btn'}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
