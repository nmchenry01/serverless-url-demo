const AWS = require("aws-sdk");
const querystring = require("querystring");
const crypto = require("crypto");

const { generateCreatePage } = require("./templates/createPage");
const { badPutPage } = require("./templates/badPutPage");
const { validateUrl } = require("./helpers/validateUrl");

const dynamodb = new AWS.DynamoDB();
const DYNAMO_TABLE = "serverless-url-demo-dev";

exports.handler = async event => {
  console.info("Received event:", JSON.stringify(event, null, 2));

  // Parse the referring website
  const referrer = event.headers.Referer;

  // Parse the submitted URL from the event
  const submittedURL = querystring.parse(event.body).link;
  console.info(`This is the submitted url : ${submittedURL}`);

  const isBadUrl = validateUrl(submittedURL);

  if (isBadUrl) return isBadUrl;

  // Generate a random 6 character slug
  const slug = crypto.randomBytes(3).toString("hex");
  console.info(`This is the slug : ${slug}`);

  // Declare params for DynamoDB
  const params = {
    TableName: DYNAMO_TABLE,
    Item: {
      slug: {
        S: slug
      },
      longUrl: {
        S: submittedURL
      }
    },
    ConditionExpression: "attribute_not_exists(longUrl)"
  };

  try {
    // Attempt to putItem to DynamoDB
    const response = await dynamodb.putItem(params).promise();
    console.info(
      `This was the DynamoDB response : ${JSON.stringify(response)}`
    );
  } catch (err) {
    // Redirect to an error page. This should be rare.
    const response = {
      statusCode: 400,
      body: badPutPage,
      headers: { "Content-Type": "text/html" }
    };
    console.error(
      `There was an error submitting to DynamoDB : ${JSON.stringify(err)}`
    );
    return response;
  }

  const link = `${referrer}${slug}`;

  // Generate HTML string
  const createPage = generateCreatePage(submittedURL, link);

  console.info(`This is the html ${createPage}`);

  const response = {
    statusCode: 200,
    body: createPage,
    headers: { "Content-Type": "text/html" }
  };
  return response;
};
