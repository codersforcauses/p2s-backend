// admin-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = mongoose.Schema.Types;
  const admin = new Schema({
    user: {
      type: ObjectId,
      ref: 'users',
      required: true,
    },
  }, {
    timestamps: true,
  });

  return mongooseClient.model('admin', admin);
};
