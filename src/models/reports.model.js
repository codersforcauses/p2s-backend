// Reports are per student notes for each session
//
const mongoose = require('mongoose');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = mongoose.Schema.Types;
  const reports = new Schema(
    {
      attended: {
        type: String,
        enum: [
          'Present',
          'SchoolAbsent',
          'SchoolAttended',
          'TeacherResricted',
          'TeacherRescrictedExam',
        ],
        required: true,
      },
      matrixResults: [
        {
          type: Number,
          default: 1,
          required: true,
        },
      ],
      notes: {
        type: String,
      },
      student: {
        type: ObjectId,
        ref: 'students',
        required: true,
      },
      session: {
        type: ObjectId,
        ref: 'sessions',
        required: true,
      },
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('reports', reports);
};
