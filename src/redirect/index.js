
exports.redirect = async (event, context) => {
  console.info("Received event:", JSON.stringify(event, null, 2));
  const slug = event.pathParameters.slug;
  const redirectTarget = "https://www.google.com";
  const response = {
    statusCode: 302,
    body: redirectTarget,
    headers: { Location: `${redirectTarget}`, "Content-Type": "text/plain" }
  };
  return response;
};
