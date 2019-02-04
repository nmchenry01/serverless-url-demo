const generateCreatePage = (submittedURL, link) => {
  return `
  <html>
    <body>
        <a href="${submittedURL}">${link}</a>
        <h3>The URL : "${submittedURL}" has been shortened to <a href="${submittedURL}">${link}</a>
        </h3>
    </body>
   </html>
   `;
};

module.exports = { generateCreatePage };
