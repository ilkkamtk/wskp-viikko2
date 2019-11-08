'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const catController = require('../controllers/catController');

router.get('/', catController.cat_list_get);

router.get('/:id', catController.cat_get);

router.post('/',  upload.single('cat'), (req, res, next) => {
  console.log('cat post file', req.file);
  // tiedostonnimi bodyyn, jos haluaa
  req.body.filename = req.file.filename;
  next();
});

router.post('/', catController.cat_create_post);

router.put('/', (req, res) => {
  res.send('With this endpoint you can edit cats.');
});

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete cats.');
});

module.exports = router;
