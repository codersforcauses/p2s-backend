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
        if (err) {
          if (err.isJoi) {
            const [{ message }] = err.details;
            if (message === 'emailError') throw new BadRequest('Invalid email');
            else if (message === 'passError') throw new BadRequest('Invalid password');
            else if (message === 'strategyError') throw new BadRequest('Invalid strategy');
            else if (message === 'accessTokenError') throw new BadRequest('Invalid access token');
            else throw new BadRequest(err);
          }
        }
      });
    return context;
  },
};
