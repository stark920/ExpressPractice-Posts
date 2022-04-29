const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { errorHandler } = require('./responses');

dotenv.config({ path: './config.env' });
const DB = process.env.DB.replace('<pwd>', process.env.DB_PWD);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection success!'))
  .catch((error) => console.error(error));

const postRouter = require('./routes/posts');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/posts', postRouter);

app.use((error, req, res, next) => {
  errorHandler(res, '傳送資料異常', 400);
});

app.use((req, res, next) => {
  errorHandler(res, '無此路由', 404);
});

app.use((error, req, res, next) => {
  errorHandler(res, "We're having a really bad day.", 500);
});

module.exports = app;
