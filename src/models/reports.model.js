// reports-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = mongoose.Schema.Types;
  const reports = new Schema(
    {
      user: {
        type: ObjectId,
        ref: 'users',
        required: true,
      },
      session: {
        type: ObjectId,
        ref: 'session',
        required: true,
      },
      attended: {
        type: Boolean,
        required: true,
      },
      studentReport: {
        matrixResults: [
          {
            type: Number,
            default: 1,
            required: true,
          },
        ],
        comment: {
          type: String,
          required: true,
        },
      },
      activities: [
        {
          activity: {
            type: ObjectId,
            ref: 'activities',
            required: true,
          },
          run: {
            type: Boolean,
            required: true,
          },
        },
      ],
      focus: {
        type: String,
      },
      improvement: {
        type: String,
      },
      approach: {
        type: String,
      },
      restrictions: {
        type: String,
      },
      setbacks: {
        type: String,
      },
      numStaff: {
        type: Number,
      },
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('reports', reports);
};
