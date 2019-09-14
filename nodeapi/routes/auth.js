const express = require('express');
const { signup, signin, signout } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const router = express.Router();
const { userSignupValidator } = require('../validator');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

// any route contain userId
router.param("userId", userById);


module.exports = router;


