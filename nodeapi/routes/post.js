const express = require('express');
const { getPosts, createPost } = require('../controllers/post');
const { requiredSignin } = require('../controllers/auth');

const router = express.Router();
const { createPostValidator } = require('../validator');

router.get('/', requiredSignin, getPosts);
router.post('/', createPostValidator, createPost);


module.exports = router;


