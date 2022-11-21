import * as aws from 'aws-sdk';
import * as awsLambda from 'aws-lambda';
import { DataAccess } from './dataLayer/dataAccess'
import { HTTP, UserLogin } from './dataLayer/types';
import * as jwt from 'jsonwebtoken';

aws.config.loadFromPath('./skillreactor/config.json');

export const handle = async (
  event: awsLambda.APIGatewayEvent,
  _context: awsLambda.Context
) => {
  try {
    const DBTool = new DataAccess();
    const userDetails = JSON.parse(event.body) as UserLogin;
    const hashedCreds = await DBTool.queryUser(userDetails.username);
    if (!(DBTool.compareHash({ plain: userDetails.password, hash: hashedCreds.password }))) {
      throw new Error('Credentials provided does not match');
    }

    const JWT = jwt.sign({ username: userDetails.username }, hashedCreds.password);
    return {
      statusCode: HTTP['200'],
      headers: {
        'Content-Type': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify(JWT),
    };
  }
  catch (e) {
    return {
      statusCode: HTTP['401'],
      headers: {
        'Content-Type': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify(e.message),
    };
  }
};
