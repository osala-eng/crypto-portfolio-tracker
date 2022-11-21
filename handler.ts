import * as aws from 'aws-sdk';
import * as awsLambda from 'aws-lambda';
import { DbResponse, UserCredentials } from './dataLayer/types';
import { DataAccess } from './dataLayer/dataAccess';

aws.config.loadFromPath('./skillreactor/config.json');

export const handle = async (
  event: awsLambda.APIGatewayEvent,
  context: awsLambda.Context
) => {


  try {
    /**
     * Create a DB instance and create a new user
     */
    const user = JSON.parse(event.body) as UserCredentials;
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email);

    if (user.username.length < 5 || !validEmail || user.password.length < 8) {
      throw new Error('Credentials does not meet required standards');
    }
    const DB = new DataAccess();
    const response: DbResponse = await DB.createUser(user);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify(response),
    };
  }
  catch (e) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify(e.message)
    };
  }
};
