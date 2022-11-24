import React, {useState} from 'react';
import { AssetsService } from '../data/config';
import { Assets, Asset, LinkEvent, HTTP } from '../data/types'
import Emitter from './Emitter';
import './css/Table.css';

const Delete = ({ asset, clickDelete, username }:
    { asset: Asset, username?: string
      clickDelete?: ()=>void }) => {

    const [loading, setLoading] = useState(false);

    /* istanbul ignore next */
    const handleClick = async (event: LinkEvent) => {
        event.preventDefault();
        setLoading(true);
        await fetch(AssetsService, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                token: asset.token,
                action: 'DELETE'})})
            .then(res => {
                setLoading(false);
                clickDelete!();
                if(res.status !== HTTP['200'])
                throw new Error('Delete operation failed');
            })
            .catch(err => {
                setLoading(false);
            });
    }
    return <a href='#delete' onClick={handleClick} style={{cursor: loading? 'not-allowed' : 'pointer'}}
        className='delete_button'>delete</a>;
};


const TableData = ({ asset, updateDash, username} :
    { asset: Asset, username?: string, updateDash?: ()=>void }) =>

<tr className='table-row-class'>
    <td className='table_data'>{asset.token}</td>
    <td className='table_data'>{asset.quantity}</td>
    <td className='table_data'>{asset.price ? `$${asset.price}`: ''}</td>
    <td className='table_data'>{asset.totalValue ? `$${asset.totalValue}` : ''}</td>
    <td className='table_data'>{asset.allocation ? `${asset.allocation}%` : ''}</td>
    <td className='table_data table-actions'>
        <Delete asset={asset} clickDelete={updateDash} username={username}/>
        <Edit asset={asset}/>
    </td>
</tr>;

export const Table = ({ assets, updateDash, username }:
     { assets?: Assets, username?: string, updateDash?: ()=> void }) => <table
    id='table-container'>
    <thead>
        <tr>
            <th className='table_heading'>Token</th>
            <th className='table_heading'>Qty. Owned</th>
            <th className='table_heading'>Price</th>
            <th className='table_heading'>Total Value</th>
            <th className='table_heading'>Allocation</th>
            <th className='table_heading'>Actions</th>
        </tr>
    </thead>
    <tbody>
        {
            assets?.map((asset) =>
                <TableData asset={asset} key={asset.token}
                username={username} updateDash={updateDash} />)
        }
    </tbody>

</table>;

function Edit({ asset, clickDelete }:
    { asset: Asset,  clickDelete?: ()=>void }){

    /* istanbul ignore next */
    const handleClick = async (event: LinkEvent) => {
        event.preventDefault();
        Emitter.emit('edit-assets', {
            token: asset.token,
            quantity: asset.quantity});
    };

    return <a href='#edit' onClick={handleClick}
        className='edit_button'>edit</a>;
};
