const Joi = require('@hapi/joi');

const matrixSchema = Joi.object().keys({
  category: Joi.array().items({
    name: Joi.string(),
    matrix: Joi.array().items({
      name: Joi.string(),
      level: Joi.array().items({
        number: Joi.number().min(1).max(7),
        description: Joi.string(),
      }),
    }),
  }),
});

module.exports = { matrixSchema };
