// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { ObjectId } = mongoose.Schema.Types;
  const users = new mongooseClient.Schema({
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    contact: {
      mobile: {
        type: String,
        required: true,
      },
      emergencynum: {
        type: String,
        required: true,
      },
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    ethnicity: {
      type: String,
      required: true, // TODO add ethnicity options
    },
    DOB: {
      type: Date,
      required: true,
    },
    darktheme: {
      type: Boolean,
      required: true,
      default: false,
    },
    student: {
      type: ObjectId,
      ref: 'student',
    },
    coach: {
      type: ObjectId,
      ref: 'coach',
    },
    manager: {
      type: ObjectId,
      ref: 'manager',
    },
    admin: {
      type: ObjectId,
      ref: 'admin',
    },
  },
  {
    timestamps: true,
  });

  return mongooseClient.model('users', users);
};
