const AWS = require("aws-sdk");
const querystring = require("querystring");
const crypto = require("crypto");

const { generateCreatePage } = require("./templates/createPage");
const { validateUrl } = require("./helpers/validateUrl");

exports.create = async event => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  // Parse the submitted URL from the event
  const submittedURL = querystring.parse(event.body).link;
  console.log(`This is the submitted url : ${submittedURL}`);

  const isBadUrl = validateUrl(submittedURL);

  if (isBadUrl) return isBadUrl;

  // Generate a random 6 character slug
  const slug = crypto.randomBytes(3).toString("hex");

  console.log(`This is the slug : ${slug}`);

  // Generate HTML string
  const createPage = generateCreatePage(submittedURL, slug);

  console.log(`This is the html ${createPage}`);

  const response = {
    statusCode: 200,
    body: createPage,
    headers: { "Content-Type": "text/html" }
  };
  return response;
};
