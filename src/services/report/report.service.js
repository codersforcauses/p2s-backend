// Initializes the `report` service on path `/report`
const createService = require('feathers-mongoose');
const createModel = require('../../models/report.model');
const hooks = require('./report.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/report', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('report');

  service.hooks(hooks);
};
