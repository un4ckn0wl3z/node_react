const express = require('express');
const { getPosts, createPost, postsByUser, postById, isPoster, deletePost } = require('../controllers/post');
const { requiredSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');


const router = express.Router();
const { createPostValidator } = require('../validator');

router.get('/', getPosts);
router.post('/new/:userId', requiredSignin, createPost, createPostValidator);
router.get('/by/:userId', requiredSignin, postsByUser);
router.delete('/:postId', requiredSignin, isPoster, deletePost);


// any route contain userId
router.param("userId", userById);

// any route contain postId
router.param("postId", postById);

module.exports = router;


