const querystring = require("querystring");

const prefix = "thisisatest.com";

exports.create = async (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  const submittedURL = querystring.parse(event.body).link;

  const createPage = `<html><body><h3>This is the url : ${submittedURL}</h3></body></html>`

  const response = {
    statusCode: 200,
    body: createPage,
    headers: { "Content-Type": "text/html" }
  };
  return response;
};
