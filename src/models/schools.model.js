// schools-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = mongoose.Schema.Types;
  const schools = new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      address: {
        street: {
          type: String,
          required: true,
        },
        suburb: {
          type: String,
          required: true,
        },
        postcode: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          enum: ['WA', 'NSW', 'ACT', 'VIC', 'QLD', 'SA', 'TAS', 'NT'],
          default: 'WA',
          required: true,
        },
      },
      students: [
        {
          type: ObjectId,
          ref: 'students',
          required: true,
        },
      ],
      programs: [
        {
          type: ObjectId,
          ref: 'programs',
          required: true,
        },
      ],
    },
    {
      timestamps: true,
    },
  );
  schools.plugin(uniqueValidator);

  return mongooseClient.model('schools', schools);
};
