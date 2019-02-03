const fs = require("fs");

exports.main = async (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  const basePage = fs.readFileSync(__dirname + "/templates/main.html").toString();
  console.log(`This is the HTML : ${basePage}`);
  const response = {
    statusCode: 200,
    body: basePage,
    headers: { "Content-Type": "text/html" }
  };
  return response;
};
