// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },

  },
  {
    timestamps: true,
  });

  return mongooseClient.model('users', users);
};
