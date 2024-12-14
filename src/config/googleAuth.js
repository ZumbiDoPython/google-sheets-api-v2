const { google } = require('googleapis');
const path = require('path');

const auth = new google.auth.GoogleAuth({
  keyFile: path.resolve(__dirname, '../../credentials.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets('v4');

module.exports = { auth, sheets };
