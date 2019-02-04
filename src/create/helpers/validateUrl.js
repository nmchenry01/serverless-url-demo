const { isWebUri } = require("valid-url");

const { generateBadUrlPage } = require("../templates/badUrlPage");

const validateUrl = submittedURL => {
  // If the url is invalid, return 400
  if (!isWebUri(submittedURL)) {
    const badUrlPage = generateBadUrlPage(submittedURL);

    const response = {
      statusCode: 400,
      body: badUrlPage,
      headers: { "Content-Type": "text/html" }
    };
    return response;
  }

  return null;
};

module.exports = { validateUrl };
