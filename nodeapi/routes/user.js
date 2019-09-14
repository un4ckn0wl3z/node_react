const express = require('express');
const { userById, allUsers } = require('../controllers/user');
const router = express.Router();

router.get('/', allUsers);

// any route contain userId
router.param("userId", userById);


module.exports = router;


