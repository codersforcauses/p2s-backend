// A program is a planned group of sessions over a time period.
//
const mongoose = require('mongoose');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = mongoose.Schema.Types;
  const programs = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      school: {
        type: ObjectId,
        ref: 'schools',
        required: true,
      },
      students: [
        {
          type: ObjectId,
          ref: 'students',
        },
      ],
      // Populate Sessions
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('programs', programs);
};
