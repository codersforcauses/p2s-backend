// reports-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
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
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('reports', reports);
};
