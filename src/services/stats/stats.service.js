// Initializes the `stats` service on path `/stats`
const createService = require('feathers-mongoose');
const createModel = require('../../models/stats.model');
const hooks = require('./stats.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/stats', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('stats');

  service.hooks(hooks);
};
