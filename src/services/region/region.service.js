// Initializes the `region` service on path `/region`
const createService = require('feathers-mongoose');
const createModel = require('../../models/region.model');
const hooks = require('./region.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/region', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('region');

  service.hooks(hooks);
};
