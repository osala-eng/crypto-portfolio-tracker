import React, { useEffect, useState } from 'react';
import { LoginBackend } from '../data/config';
import { ChangeEvent, ClickEvent, ID, MS, HTTP } from '../data/types';
import './css/Register.css';
import {LoginErr, Loading } from './Messages';
import {useNavigate} from 'react-router-dom';

const Login = ({authenticate}:{authenticate?: ()=> void }) => {
    const [state, setState] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errormes, setErrormes] = useState('');

    const ERRORS = {
        '1': 'Error: Unable to login, please fill all the details',
        '2': 'Error: Unable to login, details do not match',
    };

    const navigate = useNavigate();

    /* istanbul ignore next */
    const handleState = (e: ChangeEvent, id: number) => {
        if (id === ID['1']) {
            setState({
                ...state, username: e.target.value,
            });
        }
        else if (id === ID['2']) {
            setState({
                ...state, password: e.target.value,
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
            setErrormes(ERRORS['1']);
            setError(true);
        }

        else {
            setLoading(true);
            await fetch(LoginBackend, {
                method: 'POST',
                body: JSON.stringify(state),
            })
                .then(res => {
                    setLoading(false);

                    if (res.status !== HTTP['200']) {
                        throw new Error('User registration failed');
                    }
                    else {
                       authenticate!();
                       navigate('/dashboard');
                    }
                })
                .catch(() => {
                    setLoading(false);
                    setErrormes(ERRORS['2']);
                    setError(true);
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
            return <LoginErr loginerr={errormes}/>;
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
                        className='box-input' onChange={e => handleState(e,ID['1'])}
                        data-testid={'login-user'} />
                </div>
                <div className='user-input' >
                    <label htmlFor='login_password_field' className='box-label'>password</label>
                    <input type='password' id='login_password_field' name='login_password_field'
                        className='box-input' onChange={e => handleState(e,ID['2'])}
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
