const faker = require('faker');

const app = require('./app');

const logger = require('./logger.js');

const regionCount = 5;
const adminCount = 2;
const managersPerRegion = 2;
const coachsPerRegion = 10;

const testPass = 'a';

function createUserPromise(serviceName, regionId) {
  const name = {
    first: faker.name.firstName(),
    last: faker.name.lastName(),
  };
  const email = faker.internet.email(name.first, name.last, serviceName.concat('.fake.net'));

  const service = app.service(serviceName);

  const promise = new Promise((resolve) => {
    service.find({
      query: {
        email,
        $select: ['_id', 'region'],
      },
    })
      .then((result) => {
        if (result.data.length === 0) {
          service.create({
            name,
            email,
            password: testPass,
            region: regionId,
          }, {
            query: {
              email,
              $select: ['_id', 'region'],
            },
          })
            .then(resolve);
        } else {
          resolve(result.data[0]);
        }
      });
  });
  return promise;
}

module.exports = async () => {
  logger.info('Starting harvest cycle');
  logger.info('Plowing fields');

  faker.locale = 'en_AU';
  faker.seed(1337);

  // Create super admin
  app.service('admin')
    .find({ query: { email: 'super@admin.god' } })
    .then((result) => {
      if (result.data.length === 0) {
        return app.service('admin').create({
          email: 'super@admin.god',
          password: 'Qwerty123',
          name: {
            first: 'The one',
            last: 'GOD',
          },
          gender: 'Other',
          ethnicity: 'Other',
          darktheme: true,
        });
      }
      return result.data[0];
    });

  logger.info('Sowing region seeds');

  // Create base regions
  const regionPromises = [];

  for (let i = 0; i < regionCount; i += 1) {
    const name = faker.address.city();
    regionPromises.push(app.service('regions')
      .find({ query: { name } })
      .then((result) => {
        if (result.data.length === 0) {
          return app.service('regions')
            .create({ name });
        }
        return result.data[0];
      }));
  }

  // Create admins
  const adminPromises = [];

  for (let i = 0; i < adminCount; i += 1) {
    adminPromises.push(createUserPromise('admin'));
  }
  Promise.all(adminPromises);

  logger.info('Growing regions');
  const regions = await Promise.all(regionPromises);

  logger.info('Sowing manager and coach seeds');

  const staffPromises = [];

  regions.forEach((region) => {
    for (let i = 0; i < managersPerRegion; i += 1) {
      staffPromises.push(createUserPromise('manager', region._id));
    }

    for (let i = 0; i < coachsPerRegion; i += 1) {
      staffPromises.push(createUserPromise('coach', region._id));
    }
  });

  logger.info('Growing staff');
  const users = await Promise.all(staffPromises);

  logger.info('Cross-pollinating regions with staff');
  const regionPatches = users.map(user => app.service('regions').get(user.region)
    .then((region) => {
      const duplicate = region.users.some(regionID => regionID.toString() === user._id.toString());
      if (!duplicate) {
        return app.service('regions').patch(user.region, { $push: { users: user._id } });
      }
      return region;
    }));

  logger.info('Growing the super plants');
  await Promise.all(regionPatches);

  logger.info('Harvest complete!');
};
