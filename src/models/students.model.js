// students-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = mongoose.Schema.Types;
  const students = new Schema(
    {
      name: {
        first: {
          type: String,
          required: true,
        },
        last: {
          type: String,
          required: true,
        },
      },
      DOB: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
      },
      ethnicity: {
        type: String,
        required: true, // TODO add ethnicity options
      },
      schoolYear: {
        type: Number,
        required: true,
      },
      consent: {
        type: Boolean,
        required: true,
        default: false,
      },
      emergencyNumber: {
        type: Number,
        required: true,
      },
      school: {
        type: ObjectId,
        ref: 'schools',
        required: true,
      },
      reports: [
        {
          type: ObjectId,
          ref: 'reports',
        },
      ],
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('students', students);
};
