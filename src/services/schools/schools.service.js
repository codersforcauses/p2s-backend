// Initializes the `school` service on path `/school`
const createService = require('feathers-mongoose');
const createModel = require('../../models/schools.model');
const hooks = require('./schools.hooks');

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/schools', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('schools');

  service.hooks(hooks);
};
