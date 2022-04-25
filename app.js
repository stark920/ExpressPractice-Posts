var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const DB = process.env.DB.replace('<pwd>', process.env.DB_PWD);

mongoose.connect(DB).then(() => console.log('DB connection success!'));

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', indexRouter);

app.use(function (req, res, next) {
  res.status(404).json({
    status: 'failed',
    message: '無此路由',
  });
});

app.use(function (req, res, next) {
  res.status(500).json({
    status: 'failed',
    message: "We're having a really bad day.",
  });
});

module.exports = app;
