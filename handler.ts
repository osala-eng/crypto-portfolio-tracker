import * as aws from 'aws-sdk';
import * as awsLambda from 'aws-lambda';
import { HTTP, UserCredentials } from './dataLayer/types';
import {DataAccess} from './dataLayer/dataAccess';

aws.config.loadFromPath('./skillreactor/config.json');

export const handle = async (
  event: awsLambda.APIGatewayEvent,
  _context: awsLambda.Context
) => {
  try {
    const {username} = event.queryStringParameters;
    const DBaccess = new DataAccess();
    const response = await DBaccess.assetsQuery(username) as UserCredentials[];
    const assets = response[0].assets;
    const resBody = [];
    for(const asset in assets){
        resBody.push({
          token: asset,
          ...assets[asset]
        });
    }

    return {
      statusCode: HTTP['200'],
      headers: {
        'Content-Type': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify(resBody),
    };
  }
  catch (e) {
    return {
      statusCode: HTTP['400'],
      headers: {
        'Content-Type': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify(e.message),
    }
  }
};
