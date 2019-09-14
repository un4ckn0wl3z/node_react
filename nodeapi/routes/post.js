const express = require('express');
const { getPosts, createPost } = require('../controllers/post');
const router = express.Router();
const { createPostValidator } = require('../validator');

router.get('/', getPosts);
router.post('/', createPostValidator, createPost);


module.exports = router;


