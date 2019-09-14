const express = require('express');
const { getPosts, createPost } = require('../controllers/post');
const router = express.Router();
const validator = require('../validator');

router.get('/', getPosts);
router.post('/', validator.createPostValidator, createPost);


module.exports = router;


