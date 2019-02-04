const generateBadUrlPage = submittedUrl => {
  return `
<html>
  <body>
    <h1>
      The URL "${submittedUrl}" doesn't appear to be valid. Please try again.
    </h1>
    <form action="/dev/" method="GET">
      <input type="submit" value="Try Again" />
    </form>
  </body>
</html>
`;
};

module.exports = { generateBadUrlPage };
