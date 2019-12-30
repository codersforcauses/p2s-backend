const Joi = require('@hapi/joi');

const studentSchema = Joi.object().keys({
  name: Joi.object().keys({
    first: Joi
      .string()
      .regex(/^[a-z\xc3\x80-\xe2\x80\xa7'\- .,]+$/i),
    last: Joi
      .string()
      .regex(/^[a-z\xc3\x80-\xe2\x80\xa7'\- .,]+$/i),
  }),
  DOB: Joi.date().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other'),
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
  ),
  birthCountry: Joi.string(),
  DOA: Joi.date().allow(null),
  language: Joi.object().keys({
    englishCompetent: Joi.boolean(),
    nativeLanguage: Joi.string(),
  }),
  medical: Joi.object().keys({
    allergies: Joi.string(),
    injuries: Joi.string(),
    condition: Joi.string(),
    medication: Joi.object().keys({
      name: Joi.string(),
      dosage: Joi.string(),
      number: Joi.number(),
    }),
  }),
  schoolYear: Joi.number(),
  consent: Joi.boolean(),
  contact: Joi.object().keys({
    home: Joi.object().keys({
      name: Joi.string(),
      homeNumber: Joi.string(),
      mobileNumber: Joi.string(),
      email: Joi.string(),
    }),
    emergency: Joi.object().keys({
      name: Joi.string(),
      mobileNumber: Joi.string(),
    }),
  }),
  extraInfo: Joi.string(),
  school: Joi.string(),
  trial: Joi.boolean(),
  reports: Joi.array().items(Joi.string()),
});

module.exports = { studentSchema };
