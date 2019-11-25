'use strict';
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const userModel = require('../models/userModel');

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  await res.json(users);
};

const user_get = async (req, res) => {
  const user = await userModel.getUser(req.params.id);
  await res.json(user[0]);
};

const user_create_post = async (req, res) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('user create error', errors);
    res.send(errors.array());
  } else {
    // bcrypt password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.passwd, salt);

    const params = [
      req.body.name,
      req.body.email,
      hash,
    ];
    const result = await userModel.addUser(params);
    await res.json(result);
  }
};

module.exports = {
  user_list_get,
  user_get,
  user_create_post,
};
