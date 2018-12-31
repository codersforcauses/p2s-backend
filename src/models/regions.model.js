// regions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = mongoose.Schema.Types;
  const regions = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      users: [
        {
          type: ObjectId,
          ref: 'users',
          required: true,
        },
      ],
      schools: [
        {
          type: ObjectId,
          ref: 'schools',
          required: true,
        },
      ],
      programs: [
        {
          type: ObjectId,
          ref: 'programs',
          required: true,
        },
      ],
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('regions', regions);
};
