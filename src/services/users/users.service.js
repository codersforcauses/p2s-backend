const { Users } = require('./users.class');

const createModel = require('../../models/users.model');

const userHooks = require('./users.hooks');
const adminHooks = require('./admin.hooks');
const managerHooks = require('./manager.hooks');
const coachHooks = require('./coach.hooks');

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));
  // Get our initialized service so that we can register hooks
  const userService = app.service('users');
  userService.hooks(userHooks);

  app.use('/admin', new Users(options, app));
  const adminService = app.service('admin');
  adminService.hooks(adminHooks);

  app.use('/manager', new Users(options, app));
  const managerService = app.service('manager');
  managerService.hooks(managerHooks);

  app.use('/coach', new Users(options, app));
  const coachService = app.service('coach');
  coachService.hooks(coachHooks);
};
