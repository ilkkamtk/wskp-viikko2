'use strict';
const catModel = require('../models/catModel');

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  await res.json(cats);
};

const cat_get = async (req, res) => {
  const cat = await catModel.getCat(req.params.id);
  await res.json(cat[0]);
};

module.exports = {
  cat_list_get,
  cat_get,
};
