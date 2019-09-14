const express = require('express');
const postContoller = require('../controllers/post');
const router = express.Router();
const validator = require('../validator');

router.get('/post', postContoller.getPosts);
router.post('/post', validator.createPostValidator, postContoller.createPost);


module.exports = router;


