const { Reports } = require('./reports.class');
const createModel = require('../../models/reports.model');
const hooks = require('./reports.hooks');

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/reports', new Reports(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('reports');

  service.hooks(hooks);
};
