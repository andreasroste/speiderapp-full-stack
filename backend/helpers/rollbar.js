const Rollbar = require("rollbar");

module.exports = new Rollbar({
    accessToken: (process.env.ROLLBAR_ACCESS_TOKEN || '1d7b0f7f5f82458daca9c5079928e187'),
    captureUncaught: true,
    captureUnhandledRejections: true
});