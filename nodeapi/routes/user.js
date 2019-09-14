const express = require('express');
const { userById, allUsers, getUser, updateUser } = require('../controllers/user');
const router = express.Router();
const { requiredSignin } = require('../controllers/auth');

router.get('/', allUsers);
router.get('/:userId', requiredSignin, getUser);
router.put('/:userId', requiredSignin, updateUser);


// any route contain userId
router.param("userId", userById);


module.exports = router;


