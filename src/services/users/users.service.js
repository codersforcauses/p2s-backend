// Initializes the `users` service on path `/users`
const createService = require('feathers-mongoose');

const createModel = require('../../models/users.model');

const userHooks = require('./users.hooks');
const adminHooks = require('./admin.hooks');
const managerHooks = require('./manager.hooks');
const coachHooks = require('./coach.hooks');

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/users', createService(options));
  // Get our initialized service so that we can register hooks
  const userService = app.service('users');
  userService.hooks(userHooks);

  app.use('/admin', createService(options));
  const adminService = app.service('admin');
  adminService.hooks(adminHooks);

  app.use('/manager', createService(options));
  const managerService = app.service('manager');
  managerService.hooks(managerHooks);

  app.use('/coach', createService(options));
  const coachService = app.service('coach');
  coachService.hooks(coachHooks);
  return userService;
};
