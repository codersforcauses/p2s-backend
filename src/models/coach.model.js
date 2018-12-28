// coach-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = mongoose.Schema.Types;
  const coach = new Schema(
    {
      qualifications: {
        policeClearance: {
          type: Boolean,
          require: true,
          default: false,
        },
        WWC: {
          type: Boolean,
          require: true,
          default: false,
        },
        medClearance: {
          type: Boolean,
          require: true,
          default: false, // TODO link to file server
        },
      },
      user: {
        type: ObjectId,
        ref: 'users',
        required: true,
      },
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('coach', coach);
};
