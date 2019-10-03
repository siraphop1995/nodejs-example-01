const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

app = express();
port = process.env.PORT || 3000;

mongoose.Promise = require('bluebird');
const mongooseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true
};
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0-yejh3.gcp.mongodb.net/test?retryWrites=true&w=majority',
  mongooseConfig,
  function(error) {
    if (error) throw error;
    console.log('Successfully connected to mongodb');
  }
);

//Express middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorHandler);

//Model and router
User = require('./api/models/userListModel');
const userRouter = require('./api/routes/userRouter');
app.use(userRouter);

function errorHandler(err, req, res, next) {
  console.error(err);
  let newError = {
    message: err.message
  };
  res.status(500).send(newError);
}

//Listen port
app.listen(port, () => {
  console.log('Start listen on port: ' + port);
});
