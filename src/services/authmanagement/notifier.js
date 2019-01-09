/* eslint-disable no-console */
const errors = require('@feathersjs/errors');

module.exports = (app) => {
  function getLink(type, hash) {
    const url = 'http://localhost:3030/'.concat(type, '?token=', hash);
    return url;
  }

  function sendEmail(email) {
    return app.service('mailer').create(email).then((result) => {
      console.log('Sent email', result);
    }).catch((err) => {
      console.log('Error sending email', err);
    });
  }

  function getEmail(user, subjectData, htmlData) {
    return {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: subjectData,
      html: htmlData,
    };
  }


  return {
    notifier: (type, user) => { // , notifierOptions) {
      let tokenLink;
      let email;
      switch (type) {
      case 'resendVerifySignup': // sending the user the verification email
        tokenLink = getLink('verify', user.verifyToken);
        email = getEmail(user, 'Verify Signup', tokenLink);
        return sendEmail(email);

      case 'verifySignup': // confirming verification
        tokenLink = getLink('verify', user.verifyToken);
        email = getEmail(user, 'Confirm Signup', 'Thanks for verifying your email');
        return sendEmail(email);

      case 'sendResetPwd':
        tokenLink = getLink('reset', user.resetToken);
        email = {};
        return sendEmail(email);

      case 'resetPwd':
        tokenLink = getLink('reset', user.resetToken);
        email = {};
        return sendEmail(email);

      case 'passwordChange':
        email = {};
        return sendEmail(email);

      case 'identityChange':
        tokenLink = getLink('verifyChanges', user.verifyToken);
        email = {};
        return sendEmail(email);

      default:
        throw errors.GeneralError('Error sending email');
      }
    },
  };
};
