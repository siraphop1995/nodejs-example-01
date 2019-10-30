const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('Users');
const { authen } = require('../utils/middleware');

//get all users
app.get('/getAllUsers', authen, async function(req, res, next) {
  console.log('getAllUsers');
  try {
    const user = await User.find({}, null);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//create user
app.post('/createUser', authen, async function(req, res, next) {
  console.log('createUser');
  try {
    let newUser = new User(req.body);
    const user = await newUser.save();
    return res.json(user);
  } catch (err) {
    next(err);
  }
});

//find user by id
app.get('/findUserById/:userId', authen, async function(req, res, next) {
  console.log('findUserById');
  try {
    const user = await User.findOne({ _id: req.params.userId });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//find user
app.post('/findUser', authen, async function(req, res, next) {
  console.log('findUser');
  try {
    const query = req.body;
    const user = await User.findOne(query);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//update user
app.patch('/updateUser/:userId', authen, async function(req, res, next) {
  console.log('updateUser');
  try {
    let newUser = req.body;
    const user = await User.updateOne({ _id: req.params.userId }, newUser);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//delete user
app.delete('/deleteUser/:userId', authen, async function(req, res, next) {
  console.log('deleteUser');
  try {
    const user = await User.deleteOne({ _id: req.params.userId });
    let message = 'No user remove';
    if (user.deletedCount >= 1) {
      message = 'Delete user id: ' + req.params.userId + ' successfully';
    }
    const response = {
      message: message,
      id: user._id
    };
    res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
