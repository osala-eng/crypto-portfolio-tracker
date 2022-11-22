import * as aws from 'aws-sdk';
import * as awsLambda from 'aws-lambda';
import {AssetQuery, HTTP, UserCredentials} from './dataLayer/types';
import {DataAccess} from './dataLayer/dataAccess';

aws.config.loadFromPath('./skillreactor/config.json');

export const handle = async (
  event: awsLambda.APIGatewayEvent,
  _context: awsLambda.Context
) => {
  try {
    const updateData = JSON.parse(event.body) as AssetQuery;
    if(!updateData.username.length || !updateData.token.length || updateData.quantity < 0){
      throw new Error('missing the required data');
    }
    const DBhandler = new DataAccess();
    const res = await DBhandler.updateAssets(updateData);

  return {
    statusCode: HTTP['201'],
    headers: {
      'Content-Type': '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
    },
    body: JSON.stringify(res),
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
  };
}
};
