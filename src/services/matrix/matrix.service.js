const { Matrix } = require('./matrix.class');
const createModel = require('../../models/matrix.model');
const hooks = require('./matrix.hooks');

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/matrix', new Matrix(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('matrix');

  service.hooks(hooks);
};
