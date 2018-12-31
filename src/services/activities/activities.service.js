// Initializes the `activity` service on path `/activity`
const createService = require('feathers-mongoose');
const createModel = require('../../models/activities.model');
const hooks = require('./activities.hooks');

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/activity', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('activities');

  service.hooks(hooks);
};
