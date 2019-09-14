const Joi = require('@hapi/joi');

exports.createPostValidator = (req, res, next) => {
    const schema = {
        title: Joi.string().min(4).max(150).required(),
        body: Joi.string().min(4).max(2000).required()
    };
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send({ error: error.details[0].message });
    next();
}