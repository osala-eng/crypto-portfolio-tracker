import * as AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

export interface UserCredentials {
    username: string;
    password: string;
    email: string;
};

export type DbResponse =
    PromiseResult<AWS.DynamoDB.DocumentClient.PutItemOutput, AWS.AWSError>;
