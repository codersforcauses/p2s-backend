const Joi = require('@hapi/joi');

const activitySchema = Joi.object().keys({
  name: Joi.string().error(() => ({
    message: 'emailError',
  })),
  description: Joi.string().error(() => ({
    message: 'passError',
  })),
  imageLink: Joi.string().error(() => ({
    message: 'accessTokenError',
  })),
});

module.exports = { activitySchema };
