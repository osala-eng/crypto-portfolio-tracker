import fetch from 'node-fetch';
import {PortfolioRes} from '../dataLayer/types';

/**
 * Portfolio response array
 */
type Port = PortfolioRes[];

/**
 * User asset data
 */
interface UserAssets{
    token: string;
    quantity: number;
};

/**
 * Price request interface
 */
interface Prices {
    [key: string]: {
        usd: number;
    };
};

/**
 * Class to handle user portfolio request
 */
export class Portforlio  {
    userPortfolio: Port = [];
    private prices: Prices;
    private tokenIds: string = '';
    private totalValue: number = 0;

    /**
     * Class construcor
     * @param data - Data in type of portfolio response array
     * @param vs_currencies currency used default to usd
     * @param apiEndpoint coingecko api endpoint
     */
    constructor(
        private readonly data: Array<UserAssets>,
        private readonly vs_currencies: string = 'usd',
        private readonly apiEndpoint: string = 'https://api.coingecko.com/api/v3/simple/price'){
            this.data.map((ele) => this.tokenIds += `${ele.token},`);
        };

    /**
     * Method to fetch Pricess
     */
    async fetchPrices() {
        await fetch(
            `${this.apiEndpoint}/?ids=${this.tokenIds}&vs_currencies=${this.vs_currencies}`,
            {method: 'GET'})
            .then(res => res.json())
            .then(res => {
                this.prices = res as Prices;
            });
    };

    /**
     * Method to update results after fetching prices
     */
    updateResults() {
        this.data.map(ele => {
            const temp: PortfolioRes = {
                token: ele.token,
                quantity: ele.quantity,
                totalValue: +(ele.quantity * this.prices[ele.token].usd).toFixed(2),
                price: this.prices[ele.token].usd};
            this.userPortfolio = [...this.userPortfolio, temp];
        });
        this.userPortfolio.map(asset => {
            this.totalValue += asset.totalValue;
        });
        this.userPortfolio.map(asset => {
            const alloc = +((asset.totalValue / this.totalValue) * 100).toFixed(1);
            asset.allocation = alloc;
        });
    };
};
