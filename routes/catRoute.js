'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const catController = require('../controllers/catController');

router.get('/', catController.cat_list_get);

router.get('/:id', catController.cat_get);

router.post('/', upload.single('cat'), (req, res, next) => {
  console.log('cat post file', req.file);
  if (req.file === undefined) {
    res.json({
      error: 'No file',
    });
  } else if(!req.file.mimetype.includes('image')){
    res.json({
      error: 'Not an image',
    });
  } else {
    next();
  }
});

router.post(
    '/', [
      body('name', 'cannot be empty').isLength({min: 1}),
      body('age', 'must be number').isNumeric().isLength({min: 1}),
      body('weight', 'must be number').isNumeric().isLength({min: 1}),
      body('owner', 'must be number').isNumeric().isLength({min: 1}),
    ],
    catController.cat_create_post,
);

router.put(
    '/', [
      body('name', 'cannot be empty').isLength({min: 1}),
      body('age', 'must be number').isNumeric().isLength({min: 1}),
      body('weight', 'must be number').isNumeric().isLength({min: 1}),
      body('owner', 'must be number').isNumeric().isLength({min: 1}),
    ],
    catController.cat_update_put,
);

router.delete('/:id', catController.cat_delete);

module.exports = router;
