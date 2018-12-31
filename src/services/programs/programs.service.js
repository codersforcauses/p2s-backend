// Initializes the `program` service on path `/program`
const createService = require('feathers-mongoose');
const createModel = require('../../models/programs.model');
const hooks = require('./programs.hooks');

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/program', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('program');

  service.hooks(hooks);
};
