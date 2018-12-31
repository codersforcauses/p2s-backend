// sessions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = mongoose.Schema.Types;
  const sessions = new Schema(
    {
      date: {
        type: Date,
        required: true,
      },
      school: {
        type: ObjectId,
        ref: 'schools',
      },
      coaches: [
        {
          type: ObjectId,
          ref: 'coaches',
          required: true,
        },
      ],
      program: {
        type: ObjectId,
        ref: 'programs',
        required: true,
      },
      reports: [
        {
          type: ObjectId,
          ref: 'reports',
          required: true,
        },
      ],
      activities: [
        {
          activity: {
            type: ObjectId,
            ref: 'activities',
            required: true,
          },
          planned: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('sessions', sessions);
};
