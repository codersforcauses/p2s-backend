// students-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = mongoose.Schema.Types;
  const students = new Schema(
    {
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
      DOB: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      culture: {
        type: String,
        required: true, // TODO add ethnicity options
      },
      birthCountry: {
        type: String,
        required: true, // TODO add country list
      },
      DOA: {
        type: Date,
      },
      language: {
        englishCompetent: {
          type: Boolean,
          required: true,
        },
        nativeLanguage: {
          type: String,
        },
      },
      medical: {
        allergies: {
          type: String,
        },
        injuries: {
          type: String,
        },
        condition: {
          type: String,
        },
        medication: {
          name: {
            type: String,
          },
          dosage: {
            type: String,
          },
          number: {
            type: Number,
          },
        },
      },
      schoolYear: {
        type: Number,
        required: true,
      },
      consent: {
        type: Boolean,
        required: true,
        default: false,
      },
      contact: {
        home: {
          name: {
            type: String,
            required: true,
          },
          homeNumber: {
            type: String,
            required: true,
          },
          mobileNumber: {
            type: String,
            required: true,
          },
          email: {
            type: String,
          },
        },
        emergency: {
          name: {
            type: String,
            required: true,
          },
          mobileNumber: {
            type: String,
            required: true,
          },
        },
      },
      extraInfo: {
        type: String,
      },
      school: {
        type: ObjectId,
        ref: 'schools',
        required: true,
      },
      trial: {
        type: Boolean,
        required: true,
        default: false,
      },
      reports: [
        {
          type: ObjectId,
          ref: 'reports',
        },
      ],
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('students', students);
};
