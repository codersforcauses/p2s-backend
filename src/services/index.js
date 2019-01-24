const error = require('@feathersjs/errors');

const users = require('./users/users.service.js');
const reports = require('./reports/reports.service.js');
const students = require('./students/students.service.js');
const regions = require('./regions/regions.service.js');
const schools = require('./schools/schools.service.js');
const sessions = require('./sessions/sessions.service.js');
const programs = require('./programs/programs.service.js');
const activities = require('./activities/activities.service.js');
const feedback = require('./feedback/feedback.service.js');
const mailer = require('./mailer/mailer.service.js');
const authmanagement = require('./authmanagement/authmanagement.service.js');

const logger = require('../logger.js');

module.exports = (app) => {
  app.configure(users);
  app.configure(reports);
  app.configure(students);
  app.configure(regions);
  app.configure(schools);
  app.configure(sessions);
  app.configure(programs);
  app.configure(activities);
  app.configure(feedback);
  app.configure(mailer);
  app.configure(authmanagement);

  if (process.env.NODE_ENV !== 'production') {
    app
      .service('admin')
      .create({
        email: 'super@admin.god',
        password: 'Qwerty123',
        name: {
          first: 'The one',
          last: 'GOD',
        },
        mobile: '0000000000',
        emergencyContact: {
          name: 'The Universe',
          phoneNumber: '0000000000',
        },
        gender: 'Other',
        ethnicity: 'Other',
        DOB: '01.01.1901',
        darktheme: true,
      })
      .then(() => {
        logger.info('GOD is gucci');
      })
      .catch((err) => {
        if (err.code === 400) {
          logger.info('GOD is good');
        } else {
          throw error.BadRequest('GOD is dead\n'.concat(err));
        }
      });
  }
};
