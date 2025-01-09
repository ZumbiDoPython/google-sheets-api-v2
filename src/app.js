const express = require('express');
const bodyParser = require('body-parser');
const sheetRoutes = require('./routes/sheetRoutes');const cors = require('cors');


const app = express();
app.use(cors());


app.use(bodyParser.json());
app.use('/api', sheetRoutes);

module.exports = app;
