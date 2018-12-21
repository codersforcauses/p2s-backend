/* eslint-disable no-param-reassign */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { Forbidden } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => Promise.resolve((context) => {
  if (context.type !== 'before') {
    return Promise.reject(new Error('The feathers-permissions hook should only be used as a \'before\' hook.'));
  }
  const { user } = context.params;

  if (!user) {
    if (context.params.provider) {
      throw new Forbidden('You do not have the correct permissions (invalid permission entity).');
    }

    return context;
  }

  const permissions = [];

  if (user.admin) {
    permissions.push('admin:*');
  }
  if (user.manager) {
    permissions.push('manager:*');
  }
  if (user.admin) {
    permissions.push('coach:*');
  }

  const { method } = context;

  const requiredPermissions = [
    '*',
    `*:${method}`,
  ];

  options.roles.forEach((role) => {
    requiredPermissions.push(
      `${role}`,
      `${role}:*`,
      `${role}:${method}`,
    );
  });

  const permitted = permissions.some(permission => requiredPermissions.includes(permission));

  context.params.permitted = context.params.permitted || permitted;

  if (context.params.provider && options.error !== false && !context.params.permitted) {
    throw new Forbidden('You do not have the correct permissions.');
  }

  return context;
});
