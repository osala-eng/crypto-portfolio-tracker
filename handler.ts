import {config} from 'aws-sdk';
import {APIGatewayEvent, Context} from 'aws-lambda';
import { HTTP, UserCredentials } from './dataLayer/types';
import {DataAccess} from './dataLayer/dataAccess';
import {Portforlio} from './utitlities/utils';

config.loadFromPath('./skillreactor/config.json');

export const handle = async (
  event: APIGatewayEvent,
  _context: Context ) => {
  try {
    const {username} = event.queryStringParameters;
    const DBaccess = new DataAccess();
    const response = await DBaccess.assetsQuery(username) as UserCredentials[];
    const assets = response[0].assets;
    const resBody = [];
    for(const asset in assets){
      if(asset){
        resBody.push({
          token: asset,
          ...assets[asset]});
      }
    }

    const PortHandler = new Portforlio(resBody);
    await PortHandler.fetchPrices();
    PortHandler.updateResults();

    return {
      statusCode: HTTP['200'],
      headers: {
        'Content-Type': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'},
      body: JSON.stringify(PortHandler.userPortfolio)};
  }
  catch (e) {
    return {
      statusCode: HTTP['400'],
      headers: {
        'Content-Type': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'},
      body: JSON.stringify(e.message)};
  }
};
