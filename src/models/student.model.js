// student-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = mongoose.Schema.Types;
  const student = new Schema({
    consent: {
      type: Boolean,
      required: true,
      default: false,
    },
    school: {
      type: ObjectId,
      ref: 'school',
      required: true,
    },
    user: {
      type: ObjectId,
      ref: 'users',
      required: true,
    },
  }, {
    timestamps: true,
  });

  return mongooseClient.model('student', student);
};
