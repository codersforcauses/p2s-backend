const Joi = require('@hapi/joi');

const matrixSchema = Joi.object().keys({
  category: Joi.array().items({
    name: Joi.string().error(() => ({
      message: 'matrixError',
    })),
    matrix: Joi.array().items({
      name: Joi.string().error(() => ({
        message: 'matrixError',
      })),
      level: Joi.array().items({
        number: Joi.number().min(1).max(7).error(() => ({
          message: 'matrixError',
        })),
        description: Joi.string().error(() => ({
          message: 'matrixError',
        })),
      }).error(() => ({
        message: 'matrixError',
      })),
    }).error(() => ({
      message: 'matrixError',
    })),
  }).error(() => ({
    message: 'matrixError',
  })),
}).error(() => ({
  message: 'matrixError',
}));

module.exports = { matrixSchema };
