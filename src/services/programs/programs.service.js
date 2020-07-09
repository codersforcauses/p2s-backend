const { Programs } = require('./programs.class');
const createModel = require('../../models/programs.model');
const hooks = require('./programs.hooks');

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/programs', new Programs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('programs');

  service.hooks(hooks);
};
