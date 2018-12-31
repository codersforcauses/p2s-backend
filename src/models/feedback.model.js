// feedback-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = mongoose.Schema.Types;
  const feedback = new Schema(
    {
      text: {
        type: String,
        required: true,
      },
      user: {
        type: ObjectId,
        ref: 'users',
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

  return mongooseClient.model('feedback', feedback);
};
