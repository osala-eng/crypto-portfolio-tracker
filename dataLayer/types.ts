import * as AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

export interface UserCredentials {
    username: string;
    password: string;
    email: string;
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
}
