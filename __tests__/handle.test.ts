import { APIGatewayEventDefaultAuthorizerContext, APIGatewayEventRequestContextWithAuthorizer } from "aws-lambda/common/api-gateway";
import { handle } from "../handler";
import * as awsLambda from "aws-lambda";

//Empty Args
const emptyRequestContext: APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext> = {
  accountId: "",
  apiId: "",
  httpMethod: "POST",
  authorizer: {},
  protocol: "",
  identity: {
    accessKey: "",
    accountId: "",
    apiKey: "",
    apiKeyId: "",
    caller: "",
    clientCert: null,
    cognitoAuthenticationProvider: "",
    cognitoAuthenticationType: "",
    cognitoIdentityId: "",
    cognitoIdentityPoolId: "",
    principalOrgId: "",
    sourceIp: "",
    user: "",
    userAgent: "",
    userArn: "",
  },
  path: "",
  resourceId: "",
  stage: "",
  requestId: "",
  requestTimeEpoch: 0,
  resourcePath: ""
}

const EMPTY_EVENT: awsLambda.APIGatewayEvent = {
  body: null,
  headers: {},
  multiValueHeaders: {},
  httpMethod: "",
  isBase64Encoded: false,
  path: "",
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: emptyRequestContext,
  resource: ""
}

const EMPTY_CONTEXT: awsLambda.Context = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: "",
  functionVersion: "",
  invokedFunctionArn: "",
  memoryLimitInMB: "",
  awsRequestId: "",
  logGroupName: "",
  logStreamName: "",
  getRemainingTimeInMillis: function (): number {
    throw new Error("Function not implemented.");
  },
  done: function (error?: Error | undefined, result?: any): void {
    throw new Error("Function not implemented.");
  },
  fail: function (error: string | Error): void {
    throw new Error("Function not implemented.");
  },
  succeed: function (messageOrObject: any): void {
    throw new Error("Function not implemented.");
  }
}

//Tests
describe("Test initial output of handler", () => {
  test("Return should be 400 status", async () => {
    const response = await handle(EMPTY_EVENT, EMPTY_CONTEXT);
    expect(response.statusCode).toBe(400);
  });
});

const user = JSON.stringify({
  username: 'JohnDo',
  email: 'mail@mail.com',
  password: 'password'
});

describe('Make a request with valid user data', ()=> {
  const DATA_EVENT = {...EMPTY_EVENT, body: user};
  test('Add a new user to return 200', async ()=>{
    const res = await handle(DATA_EVENT, EMPTY_CONTEXT);
    expect(res.statusCode).toBe(200);
  });
});

const wrongUser = JSON.stringify({
  username: 'John',
  email: 'mail@mail.com',
  password: 'password'
});

describe('Make a request with an invalid user data', ()=> {
  const DATA_EVENT = {...EMPTY_EVENT, body: wrongUser};
  test('Expect an error message with code 400', async ()=>{
    const res = await handle(DATA_EVENT, EMPTY_CONTEXT);
    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.body)).toBe('Credentials does not meet required standards');
  });
});