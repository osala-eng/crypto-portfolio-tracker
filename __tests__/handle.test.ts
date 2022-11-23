import { APIGatewayEventDefaultAuthorizerContext, APIGatewayEventRequestContextWithAuthorizer } from 'aws-lambda/common/api-gateway';
import { handle } from '../handler';
import * as awsLambda from 'aws-lambda';
import {PortfolioRes} from '../dataLayer/types';

//Empty Args
const emptyRequestContext: APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext> = {
  accountId: '',
  apiId: '',
  httpMethod: 'POST',
  authorizer: {},
  protocol: '',
  identity: {
    accessKey: '',
    accountId: '',
    apiKey: '',
    apiKeyId: '',
    caller: '',
    clientCert: null,
    cognitoAuthenticationProvider: '',
    cognitoAuthenticationType: '',
    cognitoIdentityId: '',
    cognitoIdentityPoolId: '',
    principalOrgId: '',
    sourceIp: '',
    user: '',
    userAgent: '',
    userArn: '',
  },
  path: '',
  resourceId: '',
  stage: '',
  requestId: '',
  requestTimeEpoch: 0,
  resourcePath: ''
}

const EMPTY_EVENT: awsLambda.APIGatewayEvent = {
  body: null,
  headers: {},
  multiValueHeaders: {},
  httpMethod: '',
  isBase64Encoded: false,
  path: '',
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: emptyRequestContext,
  resource: ''
}

const EMPTY_CONTEXT: awsLambda.Context = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: '',
  functionVersion: '',
  invokedFunctionArn: '',
  memoryLimitInMB: '',
  awsRequestId: '',
  logGroupName: '',
  logStreamName: '',
  getRemainingTimeInMillis: function (): number {
    throw new Error('Function not implemented.');
  },
  done: function (error?: Error | undefined, result?: any): void {
    throw new Error('Function not implemented.');
  },
  fail: function (error: string | Error): void {
    throw new Error('Function not implemented.');
  },
  succeed: function (messageOrObject: any): void {
    throw new Error('Function not implemented.');
  }
}

//Tests
describe('End to request test', () => {
  test('Return should be 400 status', async () => {
    const response = await handle(EMPTY_EVENT, EMPTY_CONTEXT);
    expect(response.statusCode).toBe(400);
  });

  const EVENT = {...EMPTY_EVENT,
    queryStringParameters: {username: 'JohnW'}
  }
  test('Expect status to be 200 for the right param', async () => {
      const response = await handle(EVENT, EMPTY_CONTEXT);
      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.body) as Array<PortfolioRes>).toBeDefined();
  });

  const WRON_EVENT = {...EMPTY_EVENT,
    queryStringParameters: {notUserName: 'JohnW'}
  }
  test('Expect status to be 400 for wrong query param', async () => {
      const response = await handle(WRON_EVENT, EMPTY_CONTEXT);
      expect(response.statusCode).toBe(400)
  })
});