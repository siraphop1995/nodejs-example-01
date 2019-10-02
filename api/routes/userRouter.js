const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('Users');
const middleware = require('../utils/middleware');

//read all user
app.get('/user', middleware.authen, async function(req, res, next) {
  console.log('read all');
  try {
    const user = await User.find({}, null);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//create
app.post('/user', middleware.authen, async function(req, res, next) {
  console.log('create');
  try {
    let newUser = new User(req.body);
    const user = await newUser.save();
    return res.json(user);
  } catch (err) {
    next(err);
  }
});

//read one
app.get('/user/:userId', async function(req, res, next) {
  console.log('read one');
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//update
app.post('/user/:userId', middleware.authen, async function(req, res, next) {
  console.log('update');
  try {
    let newUser = req.body;
    const user = await User.findByIdAndUpdate(req.params.userId, newUser);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//delete
app.delete('/user/:userId', middleware.authen, async function(req, res, next) {
  console.log('delete');
  try {
    const user = await User.findByIdAndRemove(req.params.userId);
    const response = {
      message: 'Delete user id: ' + req.params.userId + ' successfully',
      id: user._id
    };
    res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
