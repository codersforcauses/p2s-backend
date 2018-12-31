// Initializes the `region` service on path `/region`
const createService = require('feathers-mongoose');
const createModel = require('../../models/regions.model');
const hooks = require('./regions.hooks');

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/regions', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('regions');

  service.hooks(hooks);
};
