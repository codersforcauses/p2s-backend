// Initializes the `matrix` service on path `/matrix`
const createService = require('feathers-mongoose');
const createModel = require('../../models/matrix.model');
const hooks = require('./matrix.hooks');

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
  };

  // Initialize our service with any options it requires
  app.use('/matrix', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('matrix');

  service.hooks(hooks);
};
