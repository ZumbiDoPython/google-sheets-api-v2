const express = require('express');
const bodyParser = require('body-parser');
const sheetRoutes = require('./routes/sheetRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api', sheetRoutes);

module.exports = app;
