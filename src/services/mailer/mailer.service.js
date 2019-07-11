const Mailer = require('feathers-mailer');
const hooks = require('./mailer.hooks');


module.exports = (app) => {
  // Initialize our service with any options it requires
  app.use('/mailer', Mailer({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  }));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('mailer');

  service.hooks(hooks);
};
