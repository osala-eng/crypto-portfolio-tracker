import React from 'react';
import './css/ProductHeadline.css';

const ProductHeadline = () => {
    return (
        <div id='product_headline'>
            <div id='prod_head_container'>
                <h1 className='crypto-headline'>
                    Crypto Tracker: All your crypto in one place
                </h1>
                <p id='product_description'>
                    Crypto Tracker is a web app that allows you to easily
                    manage your Crypto currency holdings in one place.
                    Keep track of the prices and your profit/loss trends.
                </p>
            </div>

        </div>
    );
};
export default ProductHeadline;
