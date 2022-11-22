import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Assets, AssetQuery, CmpHash, DbResponse, UserCredentials } from './types';
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
        private readonly hasherSecret: string = 'temp-str',
    ) { };

    /**
     * createUser - Add user creadential to a DB table
     * @param user - User Object
     * @returns - AWS dynamoDb response
     */
    async createUser(user: UserCredentials): Promise<DbResponse> {
        const tableData = { ...user, password: this.createHash(user.password) };
        return await this.docClient.put({
            TableName: this.tableName,
            Item: tableData
        }).promise();
    };
    /**
     * query User from a table
     * @param user - string username
     * @returns
     */
    async queryUser(user: string) {
        const { Item } = await this.docClient.get({
            TableName: this.tableName,
            Key: {
                username: user
            }
        }).promise();

        return Item as UserCredentials;
    };

    /**
     * Update assets in ther user table
     * @param updateData
     * @returns Promise <void>
     */
    async updateAssets(updateData: AssetQuery) {
        const Key = { username: updateData.username };
        let assets: Assets;
        const response = (await this.queryUser(updateData.username)) as UserCredentials;
        if (!!response.assets){
            assets = response.assets as Assets;
        }
        const newAsseet = JSON.parse(
            `{"${updateData.token}" : { "quantity": ${updateData.quantity}}}`) as Assets;

        const updateAssets = { ...assets!, ...newAsseet };

        return await this.docClient.update({
            TableName: this.tableName,
            Key,
            UpdateExpression: `set assets = :new_assets`,
            ExpressionAttributeValues: {
                ':new_assets': `${updateAssets}`
            }
        }).promise();
    };

    /**
     * Checks if the hash of a string provided matches it
     * @param key - object containig a string and hash to comare it with
     * @returns
     */
    compareHash = (key: CmpHash): boolean => this.createHash(key.plain) === key.hash;

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
