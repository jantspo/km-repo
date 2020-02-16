const withSass = require('@zeit/next-sass');

module.exports = withSass({
    publicRuntimeConfig: {
        SERVER_URL: process.env.SERVER_URL
      }
});