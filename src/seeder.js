const faker = require('faker');

const app = require('./app');

const logger = require('./logger.js');

const schoolSuffixes = [
  'School',
  'High School',
  'College',
  'School for Boys',
  'School for Girls',
  'High School for Boys',
  'High School for Girls',
  'College for Boys',
  'College for Girls',
  'College for the Gifted',
  'School for the Gifted',
  'High School for the Gifted',
];
const schoolFormats = ['{{name.lastName}} ', '{{name.firstName}} ', '{{address.county}} ', '{{address.country}} ', '{{address.city}} '];

const regionCount = 10;
const adminCount = 5;
const managersPerRegion = 2;
const coachsPerRegion = 10;
const schoolsPerRegion = 5;
const studentsPerSchool = 10;

const testPass = 'a';

function createUserObject(role, regionId) {
  const name = {
    first: faker.name.firstName(),
    last: faker.name.lastName(),
  };

  return {
    name,
    email: faker.internet.email(name.first, name.last, role.concat('.fake.net')),
    password: testPass,
    region: regionId,
  };
}

function createSchoolObject(region) {
  const suffix = schoolSuffixes[faker.random.number(schoolSuffixes.length - 1)];
  const format = schoolFormats[faker.random.number(schoolFormats.length - 1)];

  return {
    region: region._id,
    name: faker.fake(format.concat(suffix)),
    phoneNumber: faker.phone.phoneNumber(),
    address: {
      street: faker.address.streetName(),
      suburb: region.name,
      postcode: faker.address.zipCode(),
    },
  };
}

function findAndCreate(serviceName, object, params) {
  const service = app.service(serviceName);

  return new Promise((resolve) => {
    service.find(params)
      .then((result) => {
        if (result.data.length === 0) {
          service.create(object, params)
            .then(resolve);
        } else {
          resolve(result.data[0]);
        }
      });
  });
}

module.exports = async () => {
  console.time('Time taken');
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
    const region = { name };
    regionPromises.push(findAndCreate('regions', region, { query: { name } }));
  }

  // Create admins
  const adminPromises = [];

  for (let i = 0; i < adminCount; i += 1) {
    const admin = createUserObject('admin');
    adminPromises.push(findAndCreate('admin', admin, {
      query: {
        email: admin.email,
        $select: ['_id', 'region'],
      },
    }));
  }
  Promise.all(adminPromises);

  logger.info('Growing regions');
  const regions = await Promise.all(regionPromises);

  logger.info('Sowing manager and coach seeds');

  const staffPromises = [];
  const schoolPromises = [];

  regions.forEach((region) => {
    for (let i = 0; i < managersPerRegion; i += 1) {
      const manager = createUserObject('manager', region._id);

      staffPromises.push(
        findAndCreate('manager', manager, {
          query: {
            email: manager.email,
            $select: ['_id', 'region'],
          },
        }),
      );
    }

    for (let i = 0; i < coachsPerRegion; i += 1) {
      const coach = createUserObject('coach', region._id);

      staffPromises.push(
        findAndCreate('coach', coach, {
          query: {
            email: coach.email,
            $select: ['_id', 'region'],
          },
        }),
      );
    }

    for (let i = 0; i < schoolsPerRegion; i += 1) {
      const school = createSchoolObject(region);

      schoolPromises.push(findAndCreate('schools', school, {
        query: {
          name: school.name,
          $select: [
            '_id',
          ],
        },
      }));
    }
  });

  logger.info('Growing Staff');
  const allStaffPromises = Promise.all(staffPromises)
    .finally(() => {
      logger.info('Staff/Region plants grown');
    });

  logger.info('Growing Schools');
  const allSchoolPromises = Promise.all(schoolPromises);

  allSchoolPromises.then((schools) => {
    logger.info(`TODO: create ${schools.length * studentsPerSchool} students`);
  });

  allSchoolPromises.finally(() => {
    logger.info('School plants grown');
  });

  await Promise.all([allStaffPromises, allSchoolPromises]);

  logger.info('Harvest complete!');
  console.timeEnd('Time taken');
};
