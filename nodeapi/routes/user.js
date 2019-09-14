const express = require('express');
const { userById, allUsers, getUser, updateUser, deleteUser } = require('../controllers/user');
const router = express.Router();
const { requiredSignin } = require('../controllers/auth');

router.get('/', allUsers);
router.get('/:userId', requiredSignin, getUser);
router.put('/:userId', requiredSignin, updateUser);
router.delete('/:userId', requiredSignin, deleteUser);


// any route contain userId
router.param("userId", userById);


module.exports = router;


