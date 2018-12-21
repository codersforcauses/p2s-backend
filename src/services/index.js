const users = require('./users/users.service.js');
const admin = require('./admin/admin.service.js');
const coach = require('./coach/coach.service.js');
const manager = require('./manager/manager.service.js');
const report = require('./report/report.service.js');
const student = require('./student/student.service.js');
const region = require('./region/region.service.js');
const school = require('./school/school.service.js');
const session = require('./session/session.service.js');
const program = require('./program/program.service.js');
const activity = require('./activity/activity.service.js');


module.exports = (app) => {
  app.configure(users);
  app.configure(admin);
  app.configure(coach);
  app.configure(manager);
  app.configure(report);
  app.configure(student);
  app.configure(region);
  app.configure(school);
  app.configure(session);
  app.configure(program);
  app.configure(activity);
};
