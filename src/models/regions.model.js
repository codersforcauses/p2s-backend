// regions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = mongoose.Schema.Types;
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
      users: [
        {
          type: ObjectId,
          ref: 'users',
          required: true,
        },
      ],
      schools: [
        {
          type: ObjectId,
          ref: 'schools',
          required: true,
        },
      ],
    },
    {
      timestamps: true,
    },
  );
  regions.plugin(uniqueValidator);

  return mongooseClient.model('regions', regions);
};
