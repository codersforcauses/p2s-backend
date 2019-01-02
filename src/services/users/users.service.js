// Initializes the `users` service on path `/users`
const createService = require('feathers-mongoose');
const logger = require('../..//logger.js');

const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/users', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);

  if (process.env.NODE_ENV !== 'production') {
    service
      .create({
        email: 'super@admin.god',
        password: 'Qwerty123',
        name: {
          first: 'The one',
          last: 'GOD',
        },
        mobile: '0000000000',
        emergencyNum: '0000000000',
        gender: 'Other',
        ethnicity: 'Other',
        DOB: '01.01.1901',
        darktheme: true,
        admin: {
          is: true,
        },
      })
      .catch((err) => {
        if (err.code === 409) {
          logger.info('GOD is good');
        } else {
          throw new Error('GOD is dead\n'.concat(err));
        }
      });
  }
};
