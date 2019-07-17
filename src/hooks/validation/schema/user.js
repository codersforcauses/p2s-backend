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
  DOB: Joi.string().isoDate().required(),
  culture: Joi.string().valid(
    'African, African British',
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
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().required(),
});

module.exports = { createSchema, regoSchema, loginSchema };
