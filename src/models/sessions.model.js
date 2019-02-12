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
      students: [
        {
          type: ObjectId,
          ref: 'students',
        },
      ],
      coaches: [
        {
          type: ObjectId,
          ref: 'users',
        },
      ],
      reports: [
        {
          type: ObjectId,
          ref: 'reports',
          required: true,
        },
      ],
      feedback: [
        {
          type: ObjectId,
          ref: 'feedback',
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
      type: {
        type: String,
        enum: ['Rugby', 'Classroom', 'Rugby/Classroom', 'Employability', 'Tournament', 'Induction'],
      },
      location: {
        type: String,
      },
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('sessions', sessions);
};
