// Regions are areas with coaches and students
//
const uniqueValidator = require('mongoose-unique-validator');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const regions = new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      state: {
        type: String,
        enum: [
          'WA',
          'SA',
          'QLD',
          'NT',
          'TAS',
          'NSW',
          'VIC',
        ],
        default: 'WA',
        required: true,
      },
      // Populate Users
      // Populate Schools
    },
    {
      timestamps: true,
    },
  );
  regions.plugin(uniqueValidator, { message: 'Region \'{VALUE}\' already exists.' });

  return mongooseClient.model('regions', regions);
};
