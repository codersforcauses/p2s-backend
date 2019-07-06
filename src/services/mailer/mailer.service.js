const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');
// Initializes the `mailer` service on path `/mailer`
const hooks = require('./mailer.hooks');


module.exports = (app) => {
  // Initialize our service with any options it requires
  app.use('/mailer', Mailer(smtpTransport({
    host: 'smtp.mailtrap.io',
    port: 465,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('mailer');

  service.hooks(hooks);
};
