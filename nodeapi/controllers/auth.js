const jwt = require('jsonwebtoken');
const User = require('../models/user');
const expressJwt = require('express-jwt');

require('dotenv').config();

exports.signup = async (req, res) => {
    const userExists = await User.findOne({
        email: req.body.email
    });

    if (userExists) return res.status(403).json({
        error: 'Email is taken!'
    });

    const user = await new User(req.body);
    await user.save();
    res.status(200).json({
        message: 'Signup success! Please login.'
    });
}

exports.signin = async (req, res) => {
    // find user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: 'User with that email does not exist. Please signin.'
            });
        }
        // if found
        // validate email and password
        // create method in model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password do not match.'
            });
        }
        // generate token
        const token = jwt.sign({
            _id: user._id,
            name: user.name
        }, process.env.JWT_SECRET);

        // generate cookies
        res.cookie("t", token, {
            expired: new Date() + 9999
        });

        const { _id, name, email } = user;
        return res.json({
            token,
            user:{ _id, name, email }
        });

    });
}


exports.signout = async (req, res) => {
    res.clearCookie("t");
    return res.json({
        message: 'Signout success!'
    });
}

exports.requiredSignin = expressJwt({
    secret: process.env.JWT_SECRET
});