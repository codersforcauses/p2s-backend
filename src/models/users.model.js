// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { ObjectId } = mongoose.Schema.Types;
  const users = new mongooseClient.Schema(
    {
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
        emergencyNum: {
          type: String,
          required: true,
        },
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
        is: {
          type: Boolean,
          default: false,
        },
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
      },
      manager: {
        is: {
          type: Boolean,
          default: false,
        },
        coaches: [
          {
            type: ObjectId,
            required: true,
            ref: 'users',
          },
        ],
      },
      admin: {
        is: {
          type: Boolean,
          default: false,
        },
      },
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('users', users);
};
