// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
        first: {
          type: String,
          required: true,
        },
        last: {
          type: String,
          required: true,
        },
      },
      mobile: {
        type: String,
      },
      emergencyContact: {
        name: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
      },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
      },
      culture: {
        type: String, // TODO add ethnicity options
      },
      DOB: {
        type: Date,
      },
      darktheme: {
        type: Boolean,
        default: false,
      },
      region: {
        type: ObjectId,
        ref: 'regions',
      },
      coach: {
        is: {
          type: Boolean,
          default: false,
        },
        qualifications: {
          policeClearance: {
            verified: {
              type: Boolean,
              default: false,
            },
            imageLink: {
              type: String,
            },
          },
          WWC: {
            verified: {
              type: Boolean,
              default: false,
            },
            imageLink: {
              type: String,
            },
          },
          medClearance: {
            verified: {
              type: Boolean,
              default: false,
            },
            imageLink: {
              type: String,
            },
          },
        },
        feedback: [
          {
            type: ObjectId,
            ref: 'feedback',
            default: '',
          },
        ],
        sessions: [
          {
            type: ObjectId,
            ref: 'sessions',
          },
        ],
      },
      manager: {
        is: {
          type: Boolean,
          default: false,
        },
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
  users.plugin(uniqueValidator, { message: 'That {PATH} is already registered to a user.' });

  return mongooseClient.model('users', users);
};
