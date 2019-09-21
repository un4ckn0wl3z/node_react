const _ = require('lodash');
const User = require('../models/user');
const formidable = require('formidable');
const fs = require('fs');

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
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!authorized) {
        return res.status(403).send({
            error: 'User is not authorized to perform this action.'
        });
    }
    next();
}


exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).send({
                error: err
            });
        }
        res.json(users);

    }).select('name email updated created');
}

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

// exports.updateUser = (req, res, next) => {
//     let user = req.profile;
//     user = _.extend(user, req.body);
//     user.updated = Date.now();
//     user.save((err) => {
//         if (err) {
//             return res.status(400).send({
//                 error: 'You are not authorized to perform this action.'
//             });
//         }
//         user.hashed_password = undefined;
//         user.salt = undefined;
//         res.json({
//             user
//         });
//     });

// }

exports.updateUser = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded.'
            });
        }

        let user = req.profile;
        user = _.extend(user, fields);
        user.updated = Date.now();
        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }
        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        });

    });

}

exports.deleteUser = (req, res) => {
    let user = req.profile;
    user.remove((err, user) => {
        if (err) {
            return res.status(400).send({
                error: err
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({
            user
        });
    });
}