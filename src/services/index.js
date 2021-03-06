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
const matrix = require('./matrix/matrix.service.js');

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
  app.configure(matrix);
  app.configure(mailer);
  app.configure(authmanagement);
};
