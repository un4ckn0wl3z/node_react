const Post = require('../models/post');
const formidable = require('formidable');
const fs = require('fs');


exports.getPosts = (req, res) => {
    const posts = Post.find().select('_id title body')
        .then(posts => {
            res.json({
                posts
            });
        }).catch(err => {
            res.status(400).json({
                error: err
            });
        });
}

exports.createPost = (req, res, next) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded.'
            });
        }
        let post = new Post(fields);
        post.postedBy = req.profile;
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.status(400).json(result);
        });

    });
}

