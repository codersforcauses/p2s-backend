/* eslint-disable no-inner-declarations */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const app = require('./app');

const logger = require('./logger.js');

if (process.env.NODE_ENV !== 'production') {
  const faker = require('faker');

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

  const ethnicityList = ['Dog', 'Car', 'Bear', 'Other'];
  const gender = ['Male', 'Female', 'Other'];

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
      isVerified: true,
      gender: faker.random.arrayElement(gender),
      ethnicity: faker.random.arrayElement(ethnicityList),
    };
  }

  function createSchoolObject(region) {
    const suffix = faker.random.arrayElement(schoolSuffixes);
    const format = faker.random.arrayElement(schoolFormats);

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

  function createStudentObject(schoolId) {
    return {
      name: {
        first: faker.name.firstName(),
        last: faker.name.lastName(),
      },
      DOB: faker.date.past(),
      gender: faker.random.arrayElement(gender),
      address: faker.address.streetName(),
      culture: faker.random.arrayElement(ethnicityList),
      birthCountry: faker.address.country(),
      DOA: faker.date.past(),
      schoolYear: faker.random.number({ min: 7, max: 12 }),
      consent: true,
      'language.englishCompetent': true,
      contact: {
        home: {
          name: faker.name.findName(),
          homeNumber: faker.phone.phoneNumber(),
          mobileNumber: faker.phone.phoneNumber(),
        },
        emergency: {
          name: faker.name.findName(),
          mobileNumber: faker.phone.phoneNumber(),
        },
      },
      school: schoolId,
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
        }).catch(err => logger.error(err));
    });
  }

  module.exports = async () => {
    console.time('Time taken');
    logger.info('Starting harvest cycle');
    logger.info('Plowing fields');

    faker.locale = 'en_AU';
    faker.seed(1337);

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
          $select: ['region'],
        },
      }));
    }
    Promise.all(adminPromises);

    logger.info('Growing regions');
    const regions = await Promise.all(regionPromises);

    // Create super admin
    app.service('users') // In case admin tag is changed to false
      .find({ query: { email: 'testadmin@p2srugbyworks.com' } })
      .then((result) => {
        if (result.data.length === 0) {
          return app.service('admin').create({
            email: 'testadmin@p2srugbyworks.com',
            password: 'Qwerty123',
            name: {
              first: 'Test',
              last: 'Admin',
            },
            gender: 'Other',
            ethnicity: 'Other',
            darktheme: true,
            region: regions[0]._id,
            'coach.is': true,
            'manager.is': true,
            isVerified: true,
          });
        }
        return app.service('users').patch(result.data[0]._id, {
          'admin.is': true,
          'coach.is': true,
          'manager.is': true,
        });
      }).catch(err => console.log(err));

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
              $select: ['region'],
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

    logger.info('Growing staff');
    const allStaffPromises = Promise.all(staffPromises)
      .then(() => {
        logger.info('Staff/Region plants grown');
      }).catch(err => console.log(err));

    logger.info('Growing schools');
    const allSchoolPromises = Promise.all(schoolPromises)
      .then(async (schools) => {
        logger.info('School plants grown');

        logger.info('Sowing student seeds');
        const studentPromises = [];

        schools.forEach((school) => {
          for (let i = 0; i < studentsPerSchool; i += 1) {
            const student = createStudentObject(school._id);

            studentPromises.push(findAndCreate('students', student, {
              query: {
                name: student.name,
                gender: student.gender,
                school: student.school,
                $select: ['_id', 'name'],
              },
            }));
          }
        });

        logger.info('Growing students');
        return Promise.all(studentPromises);
      })
      .then(() => {
        logger.info('Student plants grown');
      }).catch(err => console.log(err));

    await Promise.all([allStaffPromises, allSchoolPromises]);

    logger.info('Harvest complete!');
    console.timeEnd('Time taken');
  };
} else { // Production user
  app.service('users') // Check if user database is empty
    .find()
    .then((result) => {
      if (result.data.length === 0) {
        logger.info('Production seeding');
        return app.service('admin').create({
          email: 'p2srugbyworks@gmail.com',
          name: {
            first: 'Dev',
            last: 'Admin',
          },
          darktheme: true,
        });
      }
      return null;
    }).catch(err => console.log(err));
}
