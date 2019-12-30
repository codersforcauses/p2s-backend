const Joi = require('@hapi/joi');

const createSchema = Joi.object().keys({
  name: {
    first: Joi
      .string()
      .regex(/^[a-z\xc3\x80-\xe2\x80\xa7'\- .,]+$/i)
      .required(),
    last: Joi
      .string()
      .regex(/^[a-z\xc3\x80-\xe2\x80\xa7'\- .,]+$/i)
      .required(),
  },
  region: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),

  coach: Joi.object().keys({
    is: Joi.boolean().required(),
  }).required(),

  manager: Joi.object().keys({
    is: Joi.boolean().required(),
  }).required()
    .when('admin.is', {
      is: true,
      then: Joi.object({ is: false }),
    }),

  admin: Joi.object().keys({
    is: Joi.boolean().required(),
  }).required(),
});

const regoSchema = Joi.object().keys({
  _id: Joi.string().required(),
  tempAuth: Joi.string().required(),
  DOB: Joi.date().required(),
  culture: Joi.string().valid(
    'African',
    'African British',
    'American',
    'Arab',
    'Australian - Aboriginal or Torres Strait Islander',
    'Australian - Caucasian',
    'Bangladeshi',
    'Black, Black British',
    'British',
    'Caribbean, Caribbean British',
    'Chinese',
    'European',
    'Indian',
    'Irish',
    'Itinerant',
    'Jewish',
    'New Zealander',
    'Pacific Islander',
    'Pakistani',
    'Sikh',
    'Other',
  ).required(),
  mobile: Joi.string().regex(/^\+61\d{9}$/).required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  password: Joi.string().min(8).required(),
  emergencyContact: Joi.object().keys({
    name: Joi.string()
      .regex(/^[a-z\xc3\x80-\xe2\x80\xa7'\- .,]+$/i)
      .required(),
    phoneNumber: Joi.string().regex(/^\+61\d{9}$/).required(),
  }).required(),
  qualifications: Joi.object().keys({
    policeClearance: Joi.object().keys({
      imageLink: Joi.string(),
    }),
    WWC: Joi.object().keys({
      imageLink: Joi.string(),
    }),
    medClearance: Joi.object().keys({
      imageLink: Joi.string(),
    }),
  }),
  darktheme: Joi.boolean(),
  coach: Joi.object().keys({
    is: Joi.boolean(),
    qual: Joi.object().keys({
      pc_file: Joi.any().allow(null),
      mc_file: Joi.any().allow(null),
      wwc: Joi.object().keys({
        file: Joi.any().allow(null),
        number: Joi.string().allow(null),
      }),
    }),
  }),
});

const loginSchema = Joi.object().keys({
  strategy: Joi.string().valid('local', 'jwt').error(() => ({
    message: 'strategyError',
  })),
  email: Joi.string().email({ minDomainSegments: 2 }).error(() => ({
    message: 'emailError',
  })),
  password: Joi.string().error(() => ({
    message: 'passError',
  })),
  accessToken: Joi.string().error(() => ({
    message: 'accessTokenError',
  })),
});

module.exports = { createSchema, regoSchema, loginSchema };
