// Initializes the `coach` service on path `/coach`
const createService = require('feathers-mongoose');
const createModel = require('../../models/coach.model');
const hooks = require('./coach.hooks');

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/coach', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('coach');

  service.hooks(hooks);
};
