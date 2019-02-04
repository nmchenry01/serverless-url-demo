const AWS = require("aws-sdk");

const { badGetPage } = require("./templates/badGetPage");

const dynamodb = new AWS.DynamoDB();
const DYNAMO_TABLE = "serverless-url-demo-dev";

exports.handler = async (event, context) => {
  console.info("Received event:", JSON.stringify(event, null, 2));
  const slug = event.pathParameters.slug;

  // Declare params for DynamoDB
  const params = {
    TableName: DYNAMO_TABLE,
    Key: {
      slug: {
        S: slug
      }
    }
  };

  try {
    const dynamodbResponse = await dynamodb.getItem(params).promise();
    console.info(`This is the DynamoDB response : ${JSON.stringify(dynamodbResponse)}`);

    // Check for non-existent slug
    if (!dynamodbResponse || Object.keys(dynamodbResponse) === 0) {
      const response = {
        statusCode: 400,
        body: badGetPage(slug),
        headers: { "Content-Type": "text/plain" }
      };
      return response;
    }

    const redirectTarget = dynamodbResponse.Item.longUrl.S;
    console.info(`This is the redirect target : ${redirectTarget}`);
    const response = {
      statusCode: 302,
      body: redirectTarget,
      headers: { Location: `${redirectTarget}`, "Content-Type": "text/plain" }
    };
    return response;
  } catch (err) {
    console.info(`There was an error with getItem from DynamoDB : ${err}`);
  }
};
