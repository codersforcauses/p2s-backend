const error = require('@feathersjs/errors');
const faker = require('faker');

const logger = require('./logger.js');

const regionCount = 5;
const adminCount = 2;
const managerCount = regionCount * 2;
const coachCount = regionCount * 3;

const testPass = 'a';

module.exports = async (app) => {
  logger.info('Starting harvest cycle');
  logger.info('Plowing fields');

  faker.locale = 'en_AU';
  faker.seed(1337);

  // Create super admin
  await app
    .service('admin')
    .find({ query: { email: 'super@admin.god' } })
    .then((result) => {
      if (result.data.length === 0) {
        return app.service.create({
          email: 'super@admin.god',
          password: 'Qwerty123',
          name: {
            first: 'The one',
            last: 'GOD',
          },
          mobile: '0000000000',
          gender: 'Other',
          ethnicity: 'Other',
          DOB: '01.01.1901',
          darktheme: true,
        })
          .then(() => {
            logger.info('GOD is gucci');
          });
      }
      Promise.resolve();
    });

  logger.info('Sowing seeds');
  // Create base regions
  const regionNames = [];

  for (let i = 0; i < regionCount; i += 1) {
    regionNames.push(faker.address.city());
  }

  const regionPromises = regionNames.map(name => app.service('regions')
    .find({ query: { name } })
    .then((result) => {
      if (result.data.length === 0) {
        return app.service('regions')
          .create({
            name,
          });
      }
      return Promise.resolve();
    }));

  // Create admins
  const adminNames = [];

  for (let i = 0; i < adminCount; i += 1) {
    adminNames.push({
      first: faker.name.firstName(),
      last: faker.name.lastName(),
    });
  }

  const adminPromises = adminNames.map(name => app.service('admin')
    .find({ query: { name } })
    .then((result) => {
      if (result.data.length === 0) {
        return app.service('admin')
          .create({
            name,
            email: faker.internet.email(name.first, name.last, 'p2s.fake.net'),
            password: testPass,
          });
      }
      return Promise.resolve();
    }));

  // Create managers

  // Create coaches

  logger.info('Starting growth');

  await Promise.all([...regionPromises, ...adminPromises])
    .catch((err) => {
      logger.info(err.message);
    });

  logger.info('Full harvest!');
};
