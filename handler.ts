import * as aws from 'aws-sdk';
import * as awsLambda from 'aws-lambda';
import { HTTPCODES, User } from './models/models'

aws.config.loadFromPath('./skillreactor/config.json');

export const handle = async (
  event: awsLambda.APIGatewayEvent,
  context: awsLambda.Context
) => {
  const userName = JSON.parse(event.body) as User;
  try {
    if (!userName || userName.username.length < 5) {
      throw new Error('Username too short or undefined');
    }
    return {
      statusCode: HTTPCODES.C200,
      headers: {
        'Content-Type': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify({}),
    };
  }
  catch (e) {
    return {
      statusCode: HTTPCODES.C400,
      headers: {
        'Content-Type': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify(e.message),
    };
  }
};
