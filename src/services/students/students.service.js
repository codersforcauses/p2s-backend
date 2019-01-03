// Initializes the `students` service on path `/students`
const createService = require('feathers-mongoose');
const createModel = require('../../models/students.model');
const hooks = require('./students.hooks');

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/students', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('students');

  service.hooks(hooks);
};
