const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');

module.exports = withSass({
    publicRuntimeConfig: {
        SERVER_URL: process.env.SERVER_URL
      }
});