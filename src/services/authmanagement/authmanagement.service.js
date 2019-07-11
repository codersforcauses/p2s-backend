// Initializes the `authmanagement` service on path `/authmanagement`
const authManagement = require('feathers-authentication-management');
const notifier = require('./notifier');

module.exports = (app) => {
  // Initialize our service with any options it requires
  app.configure(authManagement(notifier(app)));
};
