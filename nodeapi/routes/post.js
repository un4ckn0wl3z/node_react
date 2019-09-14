const express = require('express');
const { getPosts, createPost, postsByUser } = require('../controllers/post');
const { requiredSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');


const router = express.Router();
const { createPostValidator } = require('../validator');

router.get('/', getPosts);
router.post('/new/:userId', requiredSignin, createPost, createPostValidator);
router.get('/by/:userId', requiredSignin, postsByUser);

// any route contain userId
router.param("userId", userById);

module.exports = router;


