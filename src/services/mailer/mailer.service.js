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
      user: '5798e0f4581785', // process.env.SMTP_USER,
      pass: 'ff38c66c7509c9', // process.env.SMTP_PASS,
    },
    // tls: {
    //   ciphers:'SSLv3'
    // },
  })));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('mailer');

  service.hooks(hooks);
};
