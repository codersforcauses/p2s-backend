// programs-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
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
      sessions: [
        {
          type: ObjectId,
          ref: 'sessions',
          required: true,
        },
      ],
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
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('programs', programs);
};
