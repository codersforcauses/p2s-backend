const { Regions } = require('./regions.class');
const createModel = require('../../models/regions.model');
const hooks = require('./regions.hooks');

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/regions', new Regions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('regions');

  service.hooks(hooks);
};
