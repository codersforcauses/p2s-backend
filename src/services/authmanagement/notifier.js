/* eslint-disable no-console */
const errors = require('@feathersjs/errors');

module.exports = (app) => {
  const getLink = (type, hash) => {
    const url = 'http://localhost:3030/'.concat(type, '?token=', hash);
    return url;
  };

  const sendEmail = (email) => {
    app.service('mailer').create(email).then((result) => {
      console.log('Sent email', result);
    }).catch((err) => {
      console.log('Error sending email', err);
    });
  };

  const getEmail = (user, subjectData, htmlData) => ({
    from: process.env.SMTP_USER,
    to: user.email,
    subject: subjectData,
    html: htmlData,
  });


  return {
    notifier: (type, user) => {
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
        email = getEmail(user, 'Reset Password', tokenLink);
        return sendEmail(email);

      case 'resetPwd':
        tokenLink = getLink('reset', user.resetToken);
        email = getEmail(user, 'Your password was reset', tokenLink);
        return sendEmail(email);

      case 'passwordChange':
        tokenLink = getLink('verifyChanges', user.verifyToken);
        email = getEmail(user, 'Your account was changed. Please verify the changes', tokenLink);
        return sendEmail(email);

      case 'identityChange':
        tokenLink = getLink('verifyChanges', user.verifyToken);
        email = getEmail(user, 'Your account was changed. Please verify the changes', tokenLink);
        return sendEmail(email);

      default:
        throw errors.GeneralError('Error sending email');
      }
    },
  };
};
