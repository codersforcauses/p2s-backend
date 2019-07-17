const { BadRequest } = require('@feathersjs/errors');

module.exports = {
  /**
  * validates a schema and throws any errors generated
  * @param {Object} context Context object passed from server
  * @param {Object} schema schema
  */
  validateSchema: schema => async (context) => {
    schema.validate(context.data,
      (err) => {
        if (err) throw new BadRequest(err);
      });
    return context;
  },
};
