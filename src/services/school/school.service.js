// Initializes the `school` service on path `/school`
const createService = require('feathers-mongoose');
const createModel = require('../../models/school.model');
const hooks = require('./school.hooks');

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/school', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('school');

  service.hooks(hooks);
};