import * as AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

export interface UserCredentials {
    username: string;
    password: string;
    email: string;
    assets?: Assets
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
    PromiseResult<AWS.DynamoDB.DocumentClient.PutItemOutput, AWS.AWSError>;

export const HTTP = {
    '401' : 401,
    '200' : 200,
    '201' : 201,
    '400' : 400
}

export interface Asset {
    quantity: number;
}

export interface Assets {
    [token: string]: Asset
}

export interface AssetQuery {
    username: string;
    token: string;
    quantity: number;
};
