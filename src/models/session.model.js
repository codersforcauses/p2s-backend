// session-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = mongoose.Schema.Types;
  const session = new Schema({
    date: {
      type: Date,
      required: true,
    },
    school: {
      type: ObjectId,
      ref: 'school',
    },
    coaches: [{
      type: ObjectId,
      ref: 'coach',
      required: true,
    }],
    program: {
      type: ObjectId,
      ref: 'program',
      required: true,
    },
    reports: [{
      type: ObjectId,
      ref: 'report',
      required: true,
    }],
    activities: [{
      activity: {
        type: ObjectId,
        ref: 'activity',
        required: true,
      },
      planned: {
        type: Boolean,
        required: true,
      },
    }],
  }, {
    timestamps: true,
  });

  return mongooseClient.model('session', session);
};
