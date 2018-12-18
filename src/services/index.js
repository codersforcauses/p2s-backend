const users = require('./users/users.service.js');
const admin = require('./admin/admin.service.js');
const person = require('./coach/coach.service.js');
const person = require('./manager/manager.service.js');
const person = require('./report/report.service.js');
const person = require('./student/student.service.js');
const person = require('./region/region.service.js');
const person = require('./school/school.service.js');
const person = require('./sessions/sessions.service.js');
const person = require('./program/program.service.js');


module.exports = (app) => {
  app.configure(users);
  app.configure(admin);
  app.configure(coach);
  app.configure(manager);
  app.configure(report);
  app.configure(student);
  app.configure(region);
  app.configure(school);
  app.configure(sessions);
  app.configure(program);
};
