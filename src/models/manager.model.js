// manager-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = mongoose.Schema.Types;
  const manager = new Schema({
    coaches: [{
      type: ObjectId,
      required: true,
      ref: 'coach',
    }],
    user: {
      type: ObjectId,
      ref: 'users',
      required: true,
    },
  }, {
    timestamps: true,
  });

  return mongooseClient.model('manager', manager);
};
