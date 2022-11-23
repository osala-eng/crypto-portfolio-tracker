import {DynamoDB, AWSError} from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

export interface UserCredentials {
    username: string;
    password: string;
    email: string;
    assets?: Assets;
};

export interface UserLogin {
    username: string;
    password: string;
};

export interface CmpHash {
    plain: string;
    hash: string;
};

export type DbResponse =
    PromiseResult<DynamoDB.DocumentClient.PutItemOutput, AWSError>;

export const HTTP = {
    '401' : 401,
    '200' : 200,
    '201' : 201,
    '400' : 400 };

export interface Asset {
    quantity: number;
};

export interface Assets {
    [token: string]: Asset;
};

export interface AssetQuery {
    username: string;
    token: string;
    quantity: number;
};

export interface PortfolioRes {
    token: string;
    quantity: number;
    totalValue: number;
    price: number;
    allocation?: number;
};
