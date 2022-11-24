import React, { useEffect, useState } from 'react';
import { ChangeEvent, ClickEvent, HTTP, ID, MS } from '../data/types';
import { AssetsService } from '../data/config';
import Emitter from './Emitter';
import './css/CryptoForm.css';


export const CryptoForm = ({
    username, update, test=false }: {
    username?: string,
    test?: boolean
    update?: ()=>void }) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        username: username,
        token: '',
        quantity: NaN });
    const [edit, setEdit] = useState(false)

    /* istanbul ignore next */
    const handleSubmit = async (event: ClickEvent) => {
        event.preventDefault();
        if (state.quantity < 0 || !state.username || !state.token.length) {
            setError(true);
        }
        else {
            setLoading(true);
            await fetch(AssetsService, {
                method: 'POST',
                body: JSON.stringify(state)})
                .then(res => {
                    setLoading(false);
                    if (res.status !== HTTP['200']) {
                        throw new Error('Operation failed');
                    }
                    setState({...state, token: '', quantity: NaN});
                    // Update tokens table on success
                    update!();
                    setEdit(false);
                })
                .catch(() => {
                    setError(true);
                    setState({...state, token: '', quantity: NaN});
                    setEdit(false);
                });
        }
    };


    /* istanbul ignore next */
    useEffect(() => {
        const timer = setTimeout(() => {
            setError(false);
        }, MS['10000']);

        const listner = Emitter.addListener('edit-assets',
            ({token, quantity}:{token: string, quantity: number})=>{
                setEdit(true);
                setState( s => { return {...s,  token, quantity}})
        });

        return () => {
            clearTimeout(timer);
            listner.remove();
        }
    }, [error]);

    /* istanbul ignore next */
    const changeEvent = (event: ChangeEvent, id: number) => {
        if (id === ID['0']) {
            setState({ ...state, token: event.target.value });
        }
        else if (id === ID['1']) {
            setState({ ...state, quantity: +event.target.value});
        }
        else {
            throw new Error('ID value unexpected');
        }
    };

    return <form id='crypto-input-form'>
        <div className='crypto-input-field'>
            <label htmlFor='dashboard_token' className='crypto-input-label-class'>
                Token
            </label>
            <input type='text' id='dashboard_token' onChange={e => changeEvent(e, ID['0'])}
                className='crypto-text-input-class' value={state.token} />
        </div>
        <div className='crypto-input-field'>
            <label htmlFor='dashboard_quantity' className='crypto-input-label-class'>
                Qty. Owned
            </label>
            <input type='number' id='dashboard_quantity' onChange={e => changeEvent(e, ID['1'])}
                className='crypto-text-input-class' value={state.quantity} />
        </div>
        <div id='crypto-button-container'>
            <button type='submit' id='dashboard_add_button'
                onClick={handleSubmit} disabled={loading}>{(edit || test) ? 'Save Asset' : 'Add Asset'}</button>
            <div id='add_asset_error' style={{ display: error ? 'block' : 'none' }}
            >Error: Please fill all the details</div>
        </div>
    </form>;
};
