const generateCreatePage = (submittedURL, link) => {
  return `
  <html>
    <body>
        <h3>The URL : "${submittedURL}" has been shortened to ${link}
        </h3>
    </body>
   </html>
   `;
};

module.exports = { generateCreatePage };
