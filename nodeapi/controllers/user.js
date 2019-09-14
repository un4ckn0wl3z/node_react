const User = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        req.profile = user; // adds profile object to req with user info
        next();

    });
}

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
    if (!authorized) {
        return res.status(403).send({
            error: 'User is not authorized to perform this action.'
        });
    }
    next();
}


exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if(err){
            return res.status(400).send({
                error: err
            });
        }
        res.json({
            users
        });

    }).select('name email updated created');
}