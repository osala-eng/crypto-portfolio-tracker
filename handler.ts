import * as aws from "aws-sdk";
import * as awsLambda from "aws-lambda";

aws.config.loadFromPath("./skillreactor/config.json");

export const handle = async (
  event: awsLambda.APIGatewayEvent,
  context: awsLambda.Context
) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "*/*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
    body: "Hello!",
  };
};
