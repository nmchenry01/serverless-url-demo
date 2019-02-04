const badGetPage = slug => {
  return `
<html>
  <body>
    <h1>
        The slug "${slug}" doesn't appear to be valid. Please try creating one.
    </h1>
    <form action="/dev/" method="GET">
        <input type="submit" value="Create a slug" />
    </form>
  </body>
</html>
`;
};

module.exports = { badGetPage };
