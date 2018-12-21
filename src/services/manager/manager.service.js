// Initializes the `manager` service on path `/manager`
const createService = require('feathers-mongoose');
const createModel = require('../../models/manager.model');
const hooks = require('./manager.hooks');

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/manager', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('manager');

  service.hooks(hooks);
};
