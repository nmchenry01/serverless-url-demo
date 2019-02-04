const { mainPage } = require("./templates/main");

exports.handler = async (event) => {
  console.info("Received event:", JSON.stringify(event, null, 2));
  console.info(`This is the HTML : ${mainPage}`);
  const response = {
    statusCode: 200,
    body: mainPage,
    headers: { "Content-Type": "text/html" }
  };
  return response;
};
