import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { DbResponse, userCredentials } from './types';
import * as crypto from 'crypto';

/**
 * Class DataAccess - Handles AWS data operations
 *
 */
export class DataAccess {
    /**
     * constructor
     * @param docClient - DynamoDb client
     * @param tableName - DynamoDb table name
     * @param hasherSecret - Secret key for hashing passwords
     */
    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly tableName: string = 'CryptoPortfolioTracker-user-jashon',
        private readonly hasherSecret: string = 'temp-str'
    ) { };

    /**
     * createUser - Add user creadential to a DB table
     * @param user - User Object
     * @returns - AWS dynamoDb response
     */
    async createUser(user: userCredentials): Promise<DbResponse> {
        const tableData = { ...user, password: this.createHash(user.password) };
        const res = await this.docClient.put({
            TableName: this.tableName,
            Item: tableData
        }).promise();
        return res;
    };

    /**
     * Uses crypto to create a SHA256 hash
     * @param password - string
     * @returns hashed string
     */
    private createHash(password: string): string {
        const hasher = crypto.createHash('sha256');
        return hasher.update(password).digest('hex');
    };
}
