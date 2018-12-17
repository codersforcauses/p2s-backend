const users = require('./users/users.service.js');

module.exports = (app) => {
  app.configure(users);
};
