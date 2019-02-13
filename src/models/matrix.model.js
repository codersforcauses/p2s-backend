// matrix-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const matrix = new Schema(
    {
      category: [
        {
          name: {
            type: String,
            required: true,
          },
          matrix: [
            {
              name: {
                type: String,
                required: true,
              },
              level: [
                {
                  number: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 7,
                  },
                  description: {
                    type: String,
                    required: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    }, {
      timestamps: true,
    },
  );

  return mongooseClient.model('matrix', matrix);
};
