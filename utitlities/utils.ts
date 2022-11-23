import {PortfolioRes} from '../dataLayer/types';
import fetch from 'node-fetch';

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
    private tokenIds = '';
    private totalValue = 0;

    /**
     * Class construcor
     * @param data - Data in type of portfolio response array
     * @param vscurrencies currency used default to usd
     * @param apiEndpoint coingecko api endpoint
     */
    constructor(
        private readonly data: Array<UserAssets>,
        private readonly vscurrencies: string = 'usd',
        private readonly apiEndpoint: string = 'https://api.coingecko.com/api/v3/simple/price'){
            this.data.forEach(ele => this.tokenIds += `${ele.token},`);
        };

    /**
     * Method to fetch Pricess
     */
    async fetchPrices() {
        await fetch(
            `${this.apiEndpoint}/?ids=${this.tokenIds}&vs_currencies=${this.vscurrencies}`,
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
        this.data.forEach(ele => {
            const temp: PortfolioRes = {
                token: ele.token,
                quantity: ele.quantity,
                totalValue: +(ele.quantity * this.prices[ele.token].usd).toFixed(0),
                price: this.prices[ele.token].usd};
            this.userPortfolio = [...this.userPortfolio, temp];
        });
        this.userPortfolio.forEach(asset => {
            this.totalValue += asset.totalValue;
        });
        this.userPortfolio.forEach(asset => {
            const percent = 100;
            const alloc = +((asset.totalValue / this.totalValue) * percent).toFixed(0);
            asset.allocation = alloc;
        });
    };
};
