const badPutPage = `
  <html>
    <body>
      <h1>
        There was an error trying to PUT to DynamoDB. Please try again.
      </h1>
      <form action="/dev/" method="GET">
        <input type="submit" value="Try Again" />
      </form>
    </body>
  </html>
  `;

module.exports = { badPutPage };
