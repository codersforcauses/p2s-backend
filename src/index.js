const logger = require('./logger');
const app = require('./app');
const seeder = require('./seeder');

const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: Promise ', p, reason));

if (process.env.NODE_ENV !== 'production') {
  seeder(app);
} else {
  server.on('listening', () => logger.info('Feathers application started on http://%s:%d', app.get('host'), port));
}
