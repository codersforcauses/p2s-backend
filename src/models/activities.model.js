// activities-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const activities = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      imageLink: {
        type: String,
      },
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('activities', activities);
};
