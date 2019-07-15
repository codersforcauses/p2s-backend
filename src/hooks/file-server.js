/* eslint-disable camelcase */
// Use this hook to manipulate incoming or outgoing data.
const { google } = require('googleapis');
const { stringify } = require('flatted/cjs');

const googleCredentials = JSON.parse(process.env.GDRIVE_CREDENTIALS);
const token = JSON.parse(process.env.GDRIVE_TOKEN);

const client = () => {
  const { installed } = googleCredentials;
  const accessToken = token;
  const { OAuth2 } = google.auth;
  const oauth = new OAuth2(
    installed.client_id,
    installed.client_secret,
    installed.redirect_uris[0],
  );
  oauth.setCredentials(accessToken);

  return oauth;
};

const drive = google.drive({
  version: 'v3',
  auth: client,
});

const refreshToken = client => client.refreshAccessToken()
  .then(({ access_token }) => {
    client.credentials.access_token = access_token;
    // we update our environment variable with the right token
    process.env.GDRIVE_TOKEN = stringify(client.credentials);
  })
  .catch(e => e);

module.exports = {
  /**
   * Gets the file from context, uploads it to G-Drive and inserts a file id instead.
   * @param {Object} context query object passed from client to server
   */
  createPathFromFile: () => (context) => {
    // drive.files.create
    console.log(context.data);
    return context;
  },

  /**
   * Gets the file path from context, downloads it to G-Drive and inserts a file instead.
   * @param {Object} context query object passed from client to server
   */
  getFileFromPath: () => (context) => {
    console.log(context.data);
    return context;
  },

  /**
   * Uploads the current file from context to G-Drive and replaces the file id.
   * @param {Object} context query object passed from client to server
   */
  replaceFile: () => (context) => {
    console.log(context.data);
    return context;
  },

  /**
   * Returns a list of id's of all files in the G-Drive in a particular folder.
   * @param {Object} context query object passed from client to server
   */
  getFileFromFolder: () => (context) => {
    console.log(context.data);
    return context;
  },

  /**
   * Returns a list of id's of all files in the G-Drive in a particular folder.
   * @param {Object} context query object passed from client to server
   */
  getAllFiles: () => (context) => {
    console.log(context);
    return context;
  },
};
