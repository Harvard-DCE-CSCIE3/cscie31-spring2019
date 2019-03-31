// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const apiphotos = require('./routes/api/api.photos');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0-shard-00-00-njksd.mongodb.net:27017,cluster0-shard-00-01-njksd.mongodb.net:27017,cluster0-shard-00-02-njksd.mongodb.net:27017/cscie31?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);

// initialize express
const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// set up routes and routers
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/api/photos', apiphotos);

// catch any remaining routing errors
app.use((req, res, next)=>{
  const err = new Error('Not Found' + req.url);
  err.status = 404;
  next(err);
});
module.exports = app;
