const mainPage = `
<html>
  <body>
    <h1>
      Hi!
    </h1>
    <form action="/dev/create" method="POST">
      <label for="uri">Link:</label>
      <input type="text" id="link" name="link" size="40" autofocus />
      <br />
      <br />
      <input type="submit" value="Shorten it" />
    </form>
  </body>
</html>
`;

module.exports = { mainPage };
