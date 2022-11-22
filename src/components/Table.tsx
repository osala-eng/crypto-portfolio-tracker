import { Assets, Asset } from '../data/types'
import './css/Table.css';

const TableData = ({ asset }: { asset: Asset }) => <tr className='table-row-class'>
    <td className='table_data'>{asset.token}</td>
    <td className='table_data'>{asset.qtyOwed}</td>
    <td className='table_data'>{asset.price}</td>
    <td className='table_data'>{asset.total}</td>
    <td className='table_data'>{`${asset.alloacation} %`}</td>
</tr>;

export const Table = ({ assets }: { assets: Assets }) => <table
    id='table-container'>
    <thead>
        <tr>
            <th className='table_heading'>Token</th>
            <th className='table_heading'>Qty. Owned</th>
            <th className='table_heading'>Price</th>
            <th className='table_heading'>Total Value</th>
            <th className='table_heading'>Allocation</th>
        </tr>
    </thead>
    <tbody>
        {
            assets.map((asset) => <TableData asset={asset} key={asset.token} />)
        }
    </tbody>

</table>;