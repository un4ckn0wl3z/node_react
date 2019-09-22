const express = require('express');
const { 
    userById, 
    allUsers, 
    getUser, 
    updateUser, 
    deleteUser, 
    userPhoto, 
    addFollowing, 
    addFollower,
    removeFollowing,
    removeFollower
} = require('../controllers/user');

const router = express.Router();
const { requiredSignin } = require('../controllers/auth');


router.put('/follow', requiredSignin, addFollowing, addFollower);
router.put('/unfollow', requiredSignin, removeFollowing, removeFollower);

router.get('/', allUsers);
router.get('/:userId', requiredSignin, getUser);
router.put('/:userId', requiredSignin, updateUser);
router.delete('/:userId', requiredSignin, deleteUser);

// get user image
router.get('/photo/:userId', userPhoto);



// any route contain userId
router.param("userId", userById);


module.exports = router;


