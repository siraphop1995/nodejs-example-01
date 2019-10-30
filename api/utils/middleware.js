const mongoose = require('mongoose');

async function authen(req, res, next) {
  console.log('authen');
  next();
}

module.exports = {
  authen: authen
};
