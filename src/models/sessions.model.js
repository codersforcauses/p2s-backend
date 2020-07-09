// Sessions are when a coach/coaches teach students
//
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
      extraStudents: [
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
      // Populate Feedback
      // Populate Reports
      program: {
        type: ObjectId,
        ref: 'programs',
        required: true,
      },
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
