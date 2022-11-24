import { APIGatewayEventDefaultAuthorizerContext, APIGatewayEventRequestContextWithAuthorizer } from "aws-lambda/common/api-gateway";
import { handle } from "../handler";
import * as awsLambda from "aws-lambda";
import { HTTPCODES } from "../models/models";

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
    expect(response.statusCode).toBe(HTTPCODES.C400);
  });
});

//Test with username >= 5
const SUCCESS_EVENT = {
  ...EMPTY_EVENT,
  body: JSON.stringify({username: 'Iam User'})
}

describe('Successfull test case', ()=> {
  test('Return should be 200 status code', async () => {
    const response = await handle(SUCCESS_EVENT, EMPTY_CONTEXT);
    expect(response.statusCode).toBe(HTTPCODES.C200);
  })
})