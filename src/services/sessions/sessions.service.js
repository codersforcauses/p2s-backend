// Initializes the `session` service on path `/session`
const createService = require('feathers-mongoose');
const createModel = require('../../models/sessions.model');
const hooks = require('./sessions.hooks');

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/session', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('session');

  service.hooks(hooks);
};
