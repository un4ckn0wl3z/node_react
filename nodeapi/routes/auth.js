const express = require('express');
const { signup } = require('../controllers/auth');
const router = express.Router();
const validator = require('../validator');

router.post('/signup', validator.userSignupValidator, signup);


module.exports = router;


