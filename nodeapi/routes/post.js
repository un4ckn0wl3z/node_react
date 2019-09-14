const express = require('express');
const postContoller = require('../controllers/post');
const router = express.Router();

router.get('/', postContoller.getPosts);

module.exports = router;


