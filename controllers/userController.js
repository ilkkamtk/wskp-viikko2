'use strict';
const userModel = require('../models/userModel');

const users = userModel.users;

const user_list_get = (req, res) => {
  res.json(users);
};

const user_get = (req, res) => {
  const user = users.filter((kissa) => {
    if (kissa.id === req.params.id) {
      return kissa;
    }
  });
  res.json(user[0]);
};

module.exports = {
  user_list_get,
  user_get,
};
