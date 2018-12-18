// Initializes the `activity` service on path `/activity`
const createService = require('feathers-mongoose');
const createModel = require('../../models/activity.model');
const hooks = require('./activity.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/activity', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('activity');

  service.hooks(hooks);
};
